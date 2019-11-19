import Taro, { useState ,useEffect} from "@tarojs/taro";
import { View, RichText, Image } from "@tarojs/components";
import { GlobalState, useAsyncEffect, prettyHTML, timeagoInst } from "../../util/index";
import { IThread } from "../../interface/thread";
import { Thread } from "../../components/thread";
import api from "../../util/api";
import { Loading } from "../../components/loading";
import './index.scss'


function ThreadDetail() {
    const [topic] = useState(GlobalState.thread)
    const [loading, setLoading] = useState(true)
    const [replies, setReplies] = useState<IThread[]>([])
    const [content, setContent] = useState('')
    
    useEffect(() => {
        Taro.setNavigationBarTitle({
            title: GlobalState.thread.title.substr(0, 6)
        })        
    })
    useAsyncEffect( async () =>{
        try {
            const id = GlobalState.thread.tid
            const [{data}, {data: [{content_rendered}]}] = await Promise.all([
                Taro.request<IThread[]>({
                    url: api.getReplies({
                        'topic_id': id
                    })
                }),
                Taro.request<IThread[]>({
                    url: api.getTopics({
                        id
                    })
                })
            ])
            console.log(`data=====>>${data}`);
            console.log(`content_rendered=====>${content_rendered}`);
            setLoading(false)
            setReplies(data)
            setContent(prettyHTML(content_rendered))
        } catch (error) {
            Taro.showToast({
                title: '载入远程数据错误'
            })
        }
    }, []);
    const replieEl = replies.map((reply, index) => {
        const time = timeagoInst.format(reply.last_modified * 1000, 'zh')
        return (
            <View className='reply' key={reply.id}>
                <Image className='avatar' src={reply.member.avatar_large} />
                <View className='mian'>
                    <View className='author'>
                        {reply.member.username}
                    </View>
                    <View className='time'>
                        {time}
                    </View>
                    <RichText className='content' nodes={prettyHTML(reply.content_rendered)} />
                    <View className='floor'>
                        {index + 1} 楼
                    </View>
                </View>
            </View>
        )
    })
    const contenEl = loading
        ? <Loading />
        : (
            <View>
                <View className='main-content'>
                    <RichText nodes={content} />
                </View>
                <View className='replies'>
                    {replieEl}
                </View>
            </View>
        )

    return (
        <View className='detail'>
            <Thread 
                node={topic.node}
                title={topic.title}
                last_modified={topic.last_modified}
                replies={topic.replies}
                tid={topic.id}
                member={topic.member}
                not_navi={true}
            />
            {contenEl}
        </View>
    )
}

export default ThreadDetail