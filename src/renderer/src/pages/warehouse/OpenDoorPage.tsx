import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import useWarehouseStore from '../../store/WarehouseStore'
import { getDeviceList } from '../../api/device'
import CountdownTimer from '../../components/CountdownTimer'
import CommonButton from '../../components/button/CommonButton'
import DataLoading from '../../components/DataLoading'
import CabinetTemplate from '../../components/template/CabinetTemplate'
import useMachineStore from '../../store/MachineStore'
import type { DeviceResVo } from '../../types/device/deviceList'
import type { LatticeResVo } from '../../types/device/latticeList'

const OpenDoorPage: React.FC = () => {
  const { nextStep, prevStep, errorStep, setSelectedLatticeStore } = useWarehouseStore()
  const [loading, setLoading] = useState(true)
  const [deviceList, setDeviceList] = useState<DeviceResVo[]>([])
  const { deviceCode } = useMachineStore()
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res = await getDeviceList(deviceCode)
        if (!res.isSuccess) {
          errorStep({ errMsg: res.errMsg, enableRetry: true })
          return
        }
        if (!res.data || res.data.length === 0) {
          errorStep({ errMsg: '未找到可操作柜，请联系管理员', enableRetry: true })
          return
        }
        setDeviceList(res.data)
      }
      catch (error: any) {
        console.error(error)
        errorStep({ errMsg: `网络异常: ${error.message}`, enableRetry: true })
      }
      finally {
        setLoading(false)
      }
    }

    (async (): Promise<void> => {
      await fetchData()
    })()
  }, [deviceCode, errorStep])

  const HandleContent: React.FC = () => {
    const [selectLattice, setSelectLattice] = useState<LatticeResVo | null>(null)
    const [messageApi, contextHolder] = message.useMessage()
    const handleNextStep = () => {
      if (!selectLattice) {
        messageApi.error('请先选择柜格')
        return
      }
      setSelectedLatticeStore(selectLattice)
      nextStep()
    }
    return (
      <div className="flex flex-col relative h-full">
        {contextHolder}
        <CountdownTimer />
        <div className="flex flex-col h-4/5 items-center">
          <div className="h-full w-5/6 ">
            <CabinetTemplate deviceList={deviceList} onChange={setSelectLattice} />
          </div>
        </div>
        <div className="flex h-1/5 items-center justify-center gap-24">
          <CommonButton type="outline" onClick={prevStep}>
            返回
          </CommonButton>
          <CommonButton type="solid" onClick={() => { handleNextStep() }}>
            下一步
          </CommonButton>
        </div>
      </div>
    )
  }

  if (loading) {
    return <DataLoading msg="正在获取设备列表，请稍后..." />
  }
  return <HandleContent />
}

export default OpenDoorPage
