import React, { useEffect, useState } from 'react'
import CountdownTimer from '../../components/CountdownTimer'
import useWarehouseStore from '../../store/WarehouseStore'
import useCountdownStore from '../../store/CountdownStore'
import type { LatticeResVo } from '../../types/device/latticeList'
import DataLoading from '../../components/DataLoading'
import { getStockList } from '../../api/device'
import type { LabelVo } from '../../types/device/labelList'

interface CheckDataProps {
  lattice: LatticeResVo
  onError: (error: string) => void
  onCheckResult: (labelList: LabelVo[]) => void
}
interface OpenDoorProps {
  lattice: LatticeResVo
  onError: (error: string) => void
  onOpenResult: () => void
}
interface CloseAndInventory {
  lattice: LatticeResVo
  onError: (error: string) => void
  onInventoryResult: () => void
}

interface ErrTips {
  isErr: boolean
  errMsg: string
}

const CheckData: React.FC<CheckDataProps> = ({ lattice, onError, onCheckResult }) => {
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (!lattice.id) {
        onError('柜格ID为空。')
        return
      }
      const labelList = await getStockList(lattice.id.toString())
      if (!labelList.isSuccess) {
        onError('柜格校验请求失败。请检查网络连接。')
        return
      }
      if (!labelList.data) {
        onError('规格数据请求失败。柜格数据未定义，请联系管理员。')
        return
      }
      setTimeout(() => {
        onCheckResult(labelList.data!)
      }, 1000)
    }
    (async (): Promise<void> => {
      await fetchData()
    })()
  }, [])
  return (
    <div className="h-full w-full">
      <DataLoading msg="正在校验柜格数据，请稍后。。。" showCountdown={false} />
    </div>
  )
}

const OpenDoor: React.FC<OpenDoorProps> = ({ lattice, onError, onOpenResult }) => {
  useEffect(() => {
    setTimeout(() => {
      // onError('OpenDoorErr')
      onOpenResult()
    }, 3000)
  }, [])
  return (
    <div className="h-full w-full">
      <DataLoading msg="正在开门，请稍后。。。" showCountdown={false} />
    </div>
  )
}

const CloseAndInventory: React.FC<CloseAndInventory> = ({
  lattice,
  onError,
  onInventoryResult,
}) => {
  useEffect(() => {
    setTimeout(() => {
      onInventoryResult()
    }, 2000)
  }, [])
  return (
    <div className="h-full w-full">
      <DataLoading msg="正在盘点，请稍后。。。" showCountdown={false} />
    </div>
  )
}

const InventoryPage: React.FC = () => {
  const { prevStep, nextStep, selectedLatticeStore, errorStep } = useWarehouseStore()
  const { resetCountdown } = useCountdownStore()
  const [currentInventoryStep, setCurrentInventoryStep] = useState<number>(0)
  const [err, setErr] = useState<ErrTips>({ isErr: false, errMsg: '' })
  const [previousLabelList, setPreviousLabelList] = useState<LabelVo[]>([])
  const [inventoryEpcList, setInventoryEpcList] = useState<string[]>([])
  const handleInventoryStepError = (errMsg: string) => {
    setErr({ errMsg, isErr: true })
  }

  const handleCheckResult = (labelList: LabelVo[]) => {
    console.log(labelList)
    setPreviousLabelList(labelList)
    setCurrentInventoryStep(currentInventoryStep + 1)
  }

  const handleInventoryResult = () => {
    setCurrentInventoryStep(currentInventoryStep + 1)
    console.log('ok')
  }

  const handleOpenResult = () => {
    setCurrentInventoryStep(currentInventoryStep + 1)
    console.log('ok')
  }
  useEffect(() => {
    resetCountdown()
    if (currentInventoryStep > 2) {
      nextStep()
    }
  }, [currentInventoryStep, nextStep, resetCountdown])

  useEffect(() => {
    if (!selectedLatticeStore) {
      setErr({ isErr: true, errMsg: '柜格数据为空' })
    }
  }, [selectedLatticeStore])

  useEffect(() => {
    if (err.isErr) {
      errorStep({ errMsg: err.errMsg, enableRetry: true })
    }
  }, [err, errorStep])

  return (
    <div className="h-full w-full relative">
      <CountdownTimer />
      <div className="h-full w-full flex flex-col items-center">
        {currentInventoryStep === 0 && (
          <CheckData
            lattice={selectedLatticeStore!}
            onError={handleInventoryStepError}
            onCheckResult={handleCheckResult}
          />
        )}
        {currentInventoryStep === 1 && (
          <OpenDoor
            lattice={selectedLatticeStore!}
            onError={handleInventoryStepError}
            onOpenResult={handleOpenResult}
          />
        )}
        {currentInventoryStep === 2 && (
          <CloseAndInventory
            lattice={selectedLatticeStore!}
            onError={handleInventoryStepError}
            onInventoryResult={handleInventoryResult}
          />
        )}
      </div>
    </div>
  )
}

export default InventoryPage
