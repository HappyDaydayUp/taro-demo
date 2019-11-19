import Taro, { Component, Config } from '@tarojs/taro'
import '@tarojs/async-await'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/hot/hot',
      'pages/node_detail/node_detail',
      'pages/nodes/nodes',
      'pages/thread_detail/thread_detail',
    ],
    tabBar:{
      list: [
        {
          iconPath: 'resource/latest.png',
          selectedIconPath: 'resource/lastest_on.png',
          pagePath: 'pages/index/index',
          text: '最新'
        },
        {
          iconPath: 'resource/hotest.png',
          selectedIconPath: 'resource/hotest_on.png',
          pagePath: 'pages/hot/hot',
          text: '热门'
        },
        {
          iconPath: 'resource/node.png',
          selectedIconPath: 'resource/node_on.png',
          pagePath: 'pages/nodes/nodes',
          text: '节点'
        }
      ],
      color: '#000',
      selectedColor: '#56abe4',
      backgroundColor: '#fff',
      borderStyle: 'white'
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'V2EX',
      navigationBarTextStyle: 'black'
    }
  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    console.log('启动中。。。。。');
    
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
