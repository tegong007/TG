import React from 'react'
import { useNavigate } from 'react-router-dom'
import DataLoading from '../../components/DataLoading'
import CommonButton from '../../components/button/CommonButton'

const ShutdownPage: React.FC = () => {
  const navigate = useNavigate()
  const backHomeClick = () => {
    navigate('/')
  }
  return (
    <div className="flex h-full items-center justify-center">
      <DataLoading showCountdown={false} msg="正在关机..." />
      <CommonButton
        type="solid"
        onClick={backHomeClick}
      >
        返回
      </CommonButton>
    </div>
  )
}

export default ShutdownPage
