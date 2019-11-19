import Taro, { useEffect, useState, Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";
import { IThread } from "../../interface/thread";
import { useAsyncEffect } from "../../util";
import api from "../../util/api";
import { ThreadList } from "../../components/thread_list";

function NodeDetail() {
    const [loading, setLoading] = useState(true)
    const [threads, setThreads] = useState<IThread[]>([])

    useEffect(() => {
        const parms = this as Component
        console.log(`full_name=====>${parms.$router.params.full_name}`);
        Taro.setNavigationBarTitle({
            title: decodeURI(parms.$router.params.full_name)
        })
    }, [])
    useAsyncEffect( async ()=>{
        const me = this as Component
        const short_name = me.$router.params.short_name
        try {
            const {data: {id}} = await Taro.request({
                url: api.getNodeInfo({
                    name: short_name
                })
            })
            const res = await Taro.request<IThread[]>({
                url: api.getLatestTopic({
                    node_id: id
                })
            })
            setLoading(false)
            setThreads(res.data)
        } catch (error) {
            Taro.showToast({
                title: '载入远程数据错误'
            })
        }
    }, []);
    return (
        <View className='index'>
            <ThreadList 
                threads={threads} 
                loading={loading}
            />
        </View>
    )
}

export default NodeDetail