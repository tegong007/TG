import type React from 'react'
import FailIcon from '@icons/fail.svg'
import { useNavigate } from 'react-router-dom'
import CountdownTimer from '../../components/CountdownTimer'
import useWarehouseStore from '../../store/WarehouseStore'
import CommonButton from '../../components/button/CommonButton'

export interface ErrorProps {
  errMsg: string
  enableRetry: boolean
}

const ErrorPage: React.FC = () => {
  const { errorProps, resetState, backToCurrentStep } = useWarehouseStore()
  const { errMsg, enableRetry } = errorProps
  const navigate = useNavigate()
  const backHomeClick = (): void => {
    resetState()
    navigate('/')
  }
  return (
    <div className="flex flex-col relative h-full">
      <CountdownTimer />
      <div className="flex flex-col h-4/5 items-center justify-center">
        <img src={FailIcon} alt="" />
        <div className="m-12 text-red-500 text-3xl font-bold">
          {errMsg}
        </div>
      </div>
      <div className="flex h-1/5 items-center justify-center gap-24">
        {enableRetry && (
          <CommonButton type="outline" onClick={backToCurrentStep}>
            重试
          </CommonButton>
        )}
        <CommonButton type="solid" onClick={backHomeClick}>
          返回首页
        </CommonButton>
      </div>
    </div>
  )
}

export default ErrorPage
