import React from 'react'
import 取出图 from '@images/quchu.png'
import 归还图 from '@images/guihuan.png'
import { useNavigate } from 'react-router-dom'
import CommonButton from '../../components/button/CommonButton'
import type { TakeOperationType } from '../../store/TakeStore'
import useTakeStore from '../../store/TakeStore'

const TakeSelectPage: React.FC = () => {
  const { setTakeOperation, resetState, nextStep } = useTakeStore()
  const navigate = useNavigate()
  const backHomeClick = (): void => {
    resetState()
    navigate('/')
  }
  const handleTakeClick = (operation: TakeOperationType) => {
    setTakeOperation(operation)
    nextStep()
  }
  return (
    <div className="flex flex-col relative h-full">
      <div className="flex h-4/5 gap-24 items-center justify-center">
        <div
          className="h-3/5"
          onClick={() => {
            handleTakeClick('TakeOut')
          }}
        >
          <img src={取出图} />
        </div>
        <div
          className="h-3/5"
          onClick={() => {
            handleTakeClick('TakeIn')
          }}
        >
          <img src={归还图} />
        </div>
      </div>
      <div className="flex h-1/5 items-center justify-center">
        <CommonButton type="outline" onClick={backHomeClick}>
          返回首页
        </CommonButton>
      </div>
    </div>
  )
}

export default TakeSelectPage
