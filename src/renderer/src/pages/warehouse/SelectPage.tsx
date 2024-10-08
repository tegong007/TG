import React from 'react'
import { useNavigate } from 'react-router-dom'
import CountdownTimer from '../../components/CountdownTimer'
import CommonButton from '../../components/button/CommonButton'
import 入库图 from '../../static/image/ruku.png'
import 出库图 from '../../static/image/chuku.png'
import type { WarehouseOperationType } from '../../store/WarehouseStore'
import useWarehouseStore from '../../store/WarehouseStore'

const SelectPage: React.FC = () => {
  const navigate = useNavigate()
  const { setWarehouseOperation, currentStepIndex, nextStep, resetState }
    = useWarehouseStore()
  const backHomeClick = (): void => {
    resetState()
    navigate('/')
  }
  const handleWarehouseOperationClick = (operation: WarehouseOperationType) => {
    console.log(currentStepIndex)
    setWarehouseOperation(operation)
    nextStep()
    // navigate('/warehouse/opendoor')
  }
  return (
    <div className="flex flex-col relative h-full">
      <CountdownTimer />
      <div className="flex h-4/5 gap-24 items-center justify-center">
        <div
          className="h-3/5 active:scale-95 transition-all"
          onClick={() => {
            handleWarehouseOperationClick('Inbound')
          }}
        >
          <img src={入库图} />
        </div>
        <div
          className="h-3/5 active:scale-95 transition-all"
          onClick={() => {
            handleWarehouseOperationClick('Outbound')
          }}
        >
          <img src={出库图} />
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
export default SelectPage
