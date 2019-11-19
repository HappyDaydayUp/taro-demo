import Taro, { useState, useLayoutEffect, useReachBottom, usePullDownRefresh } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { IThread } from "../../interface/thread";
import { useAsyncEffect } from "../../util";
import api from "../../util/api";
import { ThreadList } from "../../components/thread_list";

function Hot() {
    usePullDownRefresh(() => {
        console.log('usePullDownRefresh====>');
    })
    useReachBottom(() => {
        console.log('useReachBottom====>');
    });
    const [ loading, setLoading] = useState(true)
    const [ threads, setThreads] = useState<IThread[]>([])
    useLayoutEffect(() => {
        console.log('useLayoutEffect=====>>>');
        Taro.setNavigationBarTitle({
            title: '热门'
        })
    });
    useAsyncEffect( async() => {
        try {
            const res = await Taro.request<IThread[]>({
                url: api.getHotNodes()
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
                loading={loading}
                threads={threads}
            />
        </View>
    )
}

export default Hot