import Taro, {useEffect} from '@tarojs/taro'
import { View,} from '@tarojs/components'
import './index.scss'
import { IThread } from '../../interface/thread';
import { useAsyncEffect } from '../../util';
import api from '../../util/api';
import { ThreadList } from '../../components/thread_list';

function Index() {
  const [loading, setLoading] = Taro.useState(true)
  const [threads, setThreads] = Taro.useState<IThread[]>([])

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '最新'
    })
  });

  useAsyncEffect(async () => {
    try {
      const res = await Taro.request<IThread[]>({
        url: api.getLatestTopic()
      })
      setLoading(false)
      setThreads(res.data)      
    } catch (error) {
      Taro.showToast({
        title: `数据错误${error}`
      })  
    }
  }, [])
  return (
    <View className="index">
      <ThreadList 
        threads={threads} 
        loading={loading}
      />
    </View>
  )
}

export default Index;



