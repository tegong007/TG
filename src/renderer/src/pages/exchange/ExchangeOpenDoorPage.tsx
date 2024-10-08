import React from 'react'
import { useNavigate } from 'react-router-dom'
import useExchangeStore from '../../store/ExchangeStore'
import CommonButton from '../../components/button/CommonButton'

const ExchangeOpenDoorPage: React.FC = () => {
  const navigate = useNavigate()
  const { nextStep, resetState } = useExchangeStore()
  const backHomeClick = (): void => {
    resetState()
    navigate('/')
  }
  return (
    <div className="flex flex-col h-full relative">
      <div className="flex h-4/5 items-center justify-center">
        ExchangeOpenDoorPage
      </div>
      <div className="flex h-1/5 items-center justify-center gap-24">
        <CommonButton type="outline" onClick={backHomeClick}>
          返回首页
        </CommonButton>
        <CommonButton type="solid" onClick={nextStep}>
          下一步
        </CommonButton>
      </div>
    </div>
  )
}

export default ExchangeOpenDoorPage
