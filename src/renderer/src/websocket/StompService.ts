import { Client } from '@stomp/stompjs'
import { create } from 'zustand'

interface StompResponse<T> {
  code: number
  msg: string
  data: T
}

interface StompState {
  topics: Record<string, any | null>
  setTopicData: <T>(topic: string, data: T) => void
  setError: (topic: string, message: string) => void
  resetTopic: (topic: string) => void // 添加重置特定主题的方法
  resetAllTopics: () => void // 添加重置特定主题的方法

}

export const useStompStore = create<StompState>(set => ({
  topics: {},
  setTopicData: (topic, data) => set(state => ({
    topics: {
      ...state.topics,
      [topic]: data,
    },
  })),
  setError: (topic, message) => set(state => ({
    topics: {
      ...state.topics,
      [topic]: {
        ...state.topics[topic],
        msg: message,
        code: 500,
        data: null,
      },
    },
  })),

  resetTopic: topic => set(state => ({
    topics: {
      ...state.topics,
      [topic]: null, // 将特定主题的数据重置为null
    },
  })),

  resetAllTopics: () => set(() => ({
    topics: {}, // 重置所有主题数据为初始空对象
  })),
}))

class StompService {
  private static instance: StompService
  private client: Client

  private constructor() {
    this.client = new Client({
      brokerURL: 'ws://192.168.88.168:8900/ws',
      // connectHeaders: {
      //   login: 'user',
      //   passcode: 'password',
      // },
      debug(str) {
        console.log(`STOMP: ${str}`)
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected')
        this.subscribeTopics()
      },
      onStompError: (frame) => {
        console.error(`Broker reported error: ${frame.headers.message}`)
        console.error(`Additional details: ${frame.body}`)
      },
    })

    this.client.activate()
  }

  public static getInstance(): StompService {
    if (!StompService.instance) {
      StompService.instance = new StompService()
    }
    return StompService.instance
  }

  private subscribeTopics() {
    const topics = [
      /**
       * 模式切换结果通知
       */
      '/device/changeMode',

      /**
       * 柜信息变更通知
       */
      '/device/cabinet/info',

      /**
       * 格子开门结果通知
       */
      '/device/cell/open',

      /**
       * 格子状态变更通知
       */
      '/device/cell/change',

      /**
       * 格子获取状态结果通知
       */
      '/device/cell/status',

      /**
       * 同步盘点结果回复
       */
      '/device/rfidReader/inventory',

      /**
       * 盘点标签上报（异步接口时通过该接口上报）
       */
      '/device/rfidReader/inventory/tag',

      /**
       * 指纹采集结果上报
       */
      '/device/fingerPrint/collection',
    ]

    topics.forEach((topic) => {
      this.client.subscribe(topic, (message) => {
        const response: StompResponse<any> = JSON.parse(message.body)
        console.log(`========${topic}=========`)
        console.log(response)
        if (response.code === 200) {
          useStompStore.getState().setTopicData(topic, response.data)
        }
        else {
          useStompStore.getState().setError(topic, response.msg)
        }
      })
    })
  }

  public openDoor(cabinets: any) {
    this.client.publish({
      destination: '/app/cell/open',
      body: JSON.stringify({ cabinets }),
    })
  }

  public getDeviceInfo() {
    this.client.publish({
      destination: '/app/changeMode',
      body: JSON.stringify({
        mode: '1',
      }),
    })
  }
}

export default StompService
