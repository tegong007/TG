import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import 出入库图 from '../../static/image/churuku.png'
import 取出归还图 from '../../static/image/quchuguihuan.png'
import 交换图 from '../../static/image/jiaohuan.png'
import 代办事项图 from '../../static/image/daibanshixiang.png'
import StompService, { useStompStore } from '../../websocket/StompService'
import type { cabinetInfoVo } from '../../types/machine/cabinetInfo'
import useMachineStore from '../../store/MachineStore'
import HomeFlag from './components/HomeFlag'

interface InitMachineProps {
  onSuccess: () => void
}

const InitMachine: React.FC<InitMachineProps> = ({ onSuccess }) => {
  const [initMsg, setInitMsg] = useState('正在获取设备状态，请稍后')
  const [stompRetry, setStompRetry] = useState<number>(0)
  const deviceInfoTopic = '/device/cabinet/info'
  const cabinetInfo = useStompStore(state => state.topics[deviceInfoTopic] as cabinetInfoVo[] | undefined)
  const { setCabinetInfoStore } = useMachineStore()

  const { resetTopic } = useStompStore()
  useEffect(() => {
    StompService.getInstance()
    resetTopic(deviceInfoTopic)
    try {
      StompService.getInstance().getDeviceInfo()
    }
    catch (e) {
      console.error(e)
      setTimeout(() => {
        setStompRetry(stompRetry + 1)
      }, 1000)
    }
  }, [resetTopic, stompRetry])

  useEffect(() => {
    if (cabinetInfo) {
      setInitMsg('正在同步设备信息，请稍后')
      setCabinetInfoStore(cabinetInfo)
      setTimeout(() => {
        onSuccess()
      }, 1000)
    }
  }, [cabinetInfo])

  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <div className="flex items-center justify-center text-3xl text-blue-500 font-bold">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 42 }} spin />} />
        <div className="ml-5">
          <div>{initMsg}</div>
        </div>
      </div>
      {stompRetry > 3 && (
        <div className="text-2xl text-red-600 font-bold">
          重试次数：
          {stompRetry}
        </div>
      )}
      {/* {cabinetInfo && JSON.stringify(cabinetInfo[0].cabinetName)} */}
    </div>
  )
}

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const naviGo = (navigatePath: string): void => {
    navigate('/login', { state: { navigatePath } })
  }
  const [initSuccess, setInitSuccess] = useState(false)

  if (!initSuccess) {
    return (
      <InitMachine onSuccess={() => { setInitSuccess(true) }} />
    )
  }

  return (
    <div className="relative h-full">
      <HomeFlag />
      <div className="flex h-full items-center justify-center">
        <div
          className="flex items-center justify-center w-64 h-96 m-5 active:scale-95 transition-all"
          onClick={() => {
            naviGo('/warehouse')
          }}
        >
          <img src={出入库图} alt="" />
        </div>

        <div
          className="flex items-center justify-center w-64 h-96 m-5 active:scale-95 transition-all"
          onClick={() => {
            naviGo('/take')
          }}
        >
          <img src={取出归还图} alt="" />
        </div>

        <div
          className="flex items-center justify-center w-64 h-96 m-5 active:scale-95 transition-all"
          onClick={() => {
            naviGo('/exchange')
          }}
        >
          <img src={交换图} alt="" />
        </div>

        <div
          className="flex items-center justify-center w-64 h-96 m-5 active:scale-95 transition-all"
          onClick={() => {
            naviGo('/agency')
          }}
        >
          <img src={代办事项图} alt="" />
        </div>
      </div>

    </div>
  )
}

export default HomePage
