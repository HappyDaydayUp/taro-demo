import Taro, { useEffect } from "@tarojs/taro";
import { View, Text, Navigator } from "@tarojs/components";
import AllNodes from "./all_node";
import "./nodes.scss";
import api from "../../util/api";


function Nodes() {
    useEffect(() => {
        Taro.setNavigationBarTitle({
            title: '节点'
        })
    });

    const element = AllNodes.map(item => {
        return (
            <View className='container' key={item.title}>
                <View className='title'>
                    <Text className='title-text'>{item.title}</Text>
                </View>
                <View className='nodes'>
                    {item.nodes.map(node => {
                        return (
                            <Navigator
                                className='tag'
                                key={node.full_name}
                                url={`/pages/node_detail/node_detail${api.queryString(node)}`}
                            >
                                <Text>{node.full_name}</Text>
                            </Navigator> 
                        )
                    })}
                </View>
            </View>
        )
    })

    return (
        <View className='node-container'>{element}</View>
    )
}

export default Nodes