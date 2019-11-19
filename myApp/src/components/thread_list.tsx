import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components"; 
import { Loading } from "./loading";
import { Thread } from "./thread";
import { IMember } from "../interface/member";
import { INode } from "../interface/node";


interface IThread {
    title: string,
    member: IMember,
    node: INode,
    last_modified: number,
    id: number,
    replies: number,
    key?: number
}

interface IProps {
    threads: IThread[],
    loading: boolean
}

class ThreadList extends Component<IProps, {}> {
    static defaultProps: IProps  = {
        threads: [],
        loading: true
    }
    render () {
        const {loading, threads} = this.props
       if (loading) {
           return (
               <Loading />
           )
       }
       const element = threads.map((thread) => {
           return (
               <Thread 
                    key={thread.id}
                    node={thread.node}
                    title={thread.title}
                    last_modified={thread.last_modified}
                    replies={thread.replies}
                    tid={thread.id}
                    member={thread.member}
                />
           )
       })
       
        return (
            <View className='thread-list'>
                {element}
            </View>
        )
    }
}

export { ThreadList }

