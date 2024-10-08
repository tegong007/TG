import React, { useState } from 'react'
import SuccessIcon from '@icons/success.svg'
import { useNavigate } from 'react-router-dom'
import useWarehouseStore, { OperationTypeDescriptions } from '../../store/WarehouseStore'
import CommonButton from '../../components/button/CommonButton'
import CountdownTimer from '../../components/CountdownTimer'
import DataLoading from '../../components/DataLoading'

const ResultSuccess: React.FC = () => {
  const { warehouseOperation, resetState } = useWarehouseStore()
  const navigate = useNavigate()
  const backHomeClick = (): void => {
    resetState()
    navigate('/')
  }
  return (
    <div className="flex flex-col relative h-full">
      <CountdownTimer />
      <div className="flex flex-col h-4/5 items-center justify-center">
        <img src={SuccessIcon} alt="" />
        <div className="m-12 text-blue-500 text-3xl font-bold">
          {OperationTypeDescriptions[warehouseOperation]}
          成功
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

const ResultPage: React.FC = () => {
  const [loading, setLoading] = useState(true)
  setTimeout(() => {
    setLoading(false)
  }, 500)
  return (
    <>
      {loading && <DataLoading msg="正在提交数据，请稍后..." />}
      {!loading && <ResultSuccess />}
    </>
  )
}

export default ResultPage
