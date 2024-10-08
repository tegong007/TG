import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import CountdownTimer from './CountdownTimer'

interface LoadingProps {
  msg?: string
  showCountdown?: boolean
}

const DataLoading: React.FC<LoadingProps> = ({ msg, showCountdown = true }) => {
  const showMsg = msg || '正在校验数据，请稍后...'
  return (
    <div className="h-full flex relative items-center justify-center text-3xl text-blue-500 font-bold">
      {showCountdown && <CountdownTimer />}
      <Spin indicator={<LoadingOutlined style={{ fontSize: 42 }} spin />} />
      <div className="ml-5">
        <div>{showMsg}</div>
      </div>
    </div>
  )
}

export default DataLoading
