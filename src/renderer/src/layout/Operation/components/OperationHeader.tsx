import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Clock from '../../../components/Clock'
import UserDisplay from './UserDisplay'

const OperationHeader: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [clickTime, setClickTime] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  const clickTimeOut = 800
  const hiddenSettingClick = () => {
    if (location.pathname !== '/') {
      return
    }
    const now = new Date().getTime()
    if (now - clickTime > clickTimeOut) {
      setClickCount(0)
    }
    else {
      setClickCount(clickCount + 1)
      console.log(clickCount)
      if (clickCount >= 1) {
        setClickCount(0)
        navigate('/setting')
      }
    }
    setClickTime(now)
  }

  return (
    <div className="flex items-center text-white font-bold text-2xl h-16 py-3 px-6 w-full operation-header">
      <div className="flex items-center" onClick={hiddenSettingClick}>中国农业发展银行</div>
      <div className="flex-grow"></div>
      <div className="flex items-center mx-4">
        {/* 待定组件 */}
      </div>
      <div className="flex-grow"></div>
      <div className="flex items-center gap-5">
        <UserDisplay />
        <Clock />
      </div>
    </div>
  )
}

export default OperationHeader
