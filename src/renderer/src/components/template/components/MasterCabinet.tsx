import React, { useEffect, useState } from 'react'
import DataLoading from '../../DataLoading'
import type { DeviceResVo } from '../../../types/device/deviceList'
import { getLatticeList } from '../../../api/device'
import type { LatticeResVo } from '../../../types/device/latticeList'

interface MasterCabinetProps {
  cabinet: DeviceResVo
  onSelect: (lattice: LatticeResVo) => void
}

interface errTips {
  isErr: boolean
  errMsg: string
}

interface LatticeItemProps {
  lattice: LatticeResVo
  selectLattice: LatticeResVo | null
  type: 'common' | 'large'
  onSelect: (lattice: LatticeResVo) => void
}

const LatticeItem: React.FC<LatticeItemProps> = ({ lattice, selectLattice, type, onSelect }) => {
  const [py, setPy] = useState('')
  const [bg, setBg] = useState('')
  useEffect(() => {
    if (type === 'common') {
      setPy('py-1')
    }
    else if (type === 'large') {
      setPy('py-4')
    }
  }, [type])

  useEffect(() => {
    if (!lattice.enable) {
      setBg('bg-gray-400')
      return
    }
    if (selectLattice && selectLattice.id === lattice.id) {
      setBg('bg-blue-500 text-white')
    }
    else {
      setBg('bg-blue-200')
    }
  }, [lattice.enable, lattice.id, selectLattice])
  return (
    <div className={`px-2 font-bold ${bg} ${py}`} onClick={() => onSelect(lattice)}>
      {lattice.latticeCode}
    </div>
  )
}

const MasterCabinet: React.FC<MasterCabinetProps> = ({ cabinet, onSelect }) => {
  const [loading, setLoading] = useState(true)
  const [latticeList, setLatticeList] = useState<LatticeResVo[]>([])
  const [selectLattice, setSelectLattice] = useState<LatticeResVo | null>(null)
  const [err, setErr] = useState<errTips>({ isErr: false, errMsg: '' })

  const handleSelectLattice = (lattice: LatticeResVo) => {
    if (!lattice.enable) {
      return
    }
    console.log(lattice.id)
    setSelectLattice(lattice)
    onSelect(lattice)
  }

  useEffect(() => {
    setLoading(true)
    const getLatticeInfo = async () => {
      if (!cabinet.id) {
        setErr({ isErr: true, errMsg: '无法获取主柜ID，请联系管理员' })
        return
      }
      const latticeInfo = await getLatticeList(cabinet.id)
      if (!latticeInfo.isSuccess) {
        setErr({ isErr: true, errMsg: latticeInfo.errMsg })
        return
      }
      if (!latticeInfo.data) {
        setErr({ isErr: true, errMsg: '无法获取主柜数据，请联系管理员' })
        return
      }
      if (latticeInfo.data.length !== 15) {
        setErr({ isErr: true, errMsg: '主柜柜体数量不正确，请联系管理员' })
        return
      }
      setErr({ isErr: false, errMsg: '' })
      setLatticeList(latticeInfo.data)
    }
    (async (): Promise<void> => {
      await getLatticeInfo()
      setLoading(false)
    })()
    console.log('重新加载')
  }, [cabinet.id])

  if (loading) {
    return <DataLoading showCountdown={false} msg={`正在获取${cabinet.cabinetName}的数据。。。`} />
  }
  if (err.isErr) {
    return (
      <div className="flex h-full w-full text-red-600 text-3xl font-bold items-center justify-center">
        {err.errMsg}
      </div>
    )
  }
  return (
    <div className="h-full w-full ">
      <div className="grid grid-cols-6 gap-2">
        <div className="col-start-1 col-span-3 text-right">
          <LatticeItem lattice={latticeList[0]} selectLattice={selectLattice} type="common" onSelect={handleSelectLattice} />
        </div>
        <div className="col-start-4 col-span-3">
          <LatticeItem lattice={latticeList[7]} selectLattice={selectLattice} type="common" onSelect={handleSelectLattice} />
        </div>
        <div className="col-start-1 col-span-1 text-center">
          <LatticeItem lattice={latticeList[1]} selectLattice={selectLattice} type="common" onSelect={handleSelectLattice} />
        </div>
        <div className="col-start-2 col-span-1 text-center">
          <LatticeItem lattice={latticeList[2]} selectLattice={selectLattice} type="common" onSelect={handleSelectLattice} />
        </div>
        <div className="col-start-3 col-span-1 text-center">
          <LatticeItem lattice={latticeList[3]} selectLattice={selectLattice} type="common" onSelect={handleSelectLattice} />
        </div>
        <div className="col-start-4 col-span-3">
          <LatticeItem lattice={latticeList[8]} selectLattice={selectLattice} type="common" onSelect={handleSelectLattice} />
        </div>
      </div>

      <div className="grid grid-cols-6 grid-rows-2 grid-flow-col gap-2 mt-2">
        <div className="col-start-1 col-span-3 row-start-1 row-span-2 bg-gray-300">
          <div className="h-full w-full flex items-center justify-center">屏幕区域，不可选择</div>
        </div>
        <div className="col-start-4 col-span-3 row-span-1">
          <LatticeItem lattice={latticeList[9]} selectLattice={selectLattice} type="common" onSelect={handleSelectLattice} />
        </div>
        <div className="col-start-4 col-span-3 row-span-1">
          <LatticeItem lattice={latticeList[10]} selectLattice={selectLattice} type="common" onSelect={handleSelectLattice} />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2 mt-2">
        <div className="col-start-1 col-span-3 text-right">
          <LatticeItem lattice={latticeList[4]} selectLattice={selectLattice} type="large" onSelect={handleSelectLattice} />
        </div>
        <div className="col-start-4 col-span-3">
          <LatticeItem lattice={latticeList[11]} selectLattice={selectLattice} type="large" onSelect={handleSelectLattice} />
        </div>
        <div className="col-start-1 col-span-3 text-right">
          <LatticeItem lattice={latticeList[5]} selectLattice={selectLattice} type="large" onSelect={handleSelectLattice} />
        </div>
        <div className="col-start-4 col-span-3">
          <LatticeItem lattice={latticeList[12]} selectLattice={selectLattice} type="large" onSelect={handleSelectLattice} />
        </div>
        <div className="col-start-1 col-span-3  text-right">
          <LatticeItem lattice={latticeList[6]} selectLattice={selectLattice} type="large" onSelect={handleSelectLattice} />
        </div>
        <div className="col-start-4 col-span-3">
          <LatticeItem lattice={latticeList[13]} selectLattice={selectLattice} type="large" onSelect={handleSelectLattice} />
        </div>
        <div
          className="col-start-1 col-span-6 text-center"
          onClick={() => { }}
        >
          <div>
            <LatticeItem lattice={latticeList[14]} selectLattice={selectLattice} type="large" onSelect={handleSelectLattice} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MasterCabinet
