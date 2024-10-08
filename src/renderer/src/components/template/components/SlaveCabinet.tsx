import React, { useEffect, useState } from 'react'
import DataLoading from '../../DataLoading'
import type { DeviceResVo } from '../../../types/device/deviceList'
import type { LatticeResVo } from '../../../types/device/latticeList'
import { getLatticeList } from '../../../api/device'

interface SlaveCabinetProps {
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
  onSelect: (lattice: LatticeResVo) => void
}

const LatticeItem: React.FC<LatticeItemProps> = ({ lattice, selectLattice, onSelect }) => {
  const [bg, setBg] = useState('')

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
    <div className={`h-full w-full flex items-center justify-center text-2xl font-bold ${bg}`} onClick={() => onSelect(lattice)}>
      {lattice.latticeCode}
    </div>
  )
}

const SlaveCabinet: React.FC<SlaveCabinetProps> = ({ cabinet, onSelect }) => {
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
        setErr({ isErr: true, errMsg: '无法获取副柜ID，请联系管理员' })
        return
      }
      const latticeInfo = await getLatticeList(cabinet.id)
      if (!latticeInfo.isSuccess) {
        setErr({ isErr: true, errMsg: latticeInfo.errMsg })
        return
      }
      if (!latticeInfo.data) {
        setErr({ isErr: true, errMsg: '无法获取副柜数据，请联系管理员' })
        return
      }
      if (latticeInfo.data.length !== 6) {
        setErr({ isErr: true, errMsg: '副柜柜体数量不正确，请联系管理员' })
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
    <div className="h-full w-full flex flex-col gap-2">
      <div className="h-1/6">
        <LatticeItem lattice={latticeList[0]} selectLattice={selectLattice} onSelect={handleSelectLattice} />
      </div>
      <div className="h-1/6">
        <LatticeItem lattice={latticeList[1]} selectLattice={selectLattice} onSelect={handleSelectLattice} />
      </div>
      <div className="h-1/6">
        <LatticeItem lattice={latticeList[2]} selectLattice={selectLattice} onSelect={handleSelectLattice} />
      </div>
      <div className="h-1/6">
        <LatticeItem lattice={latticeList[3]} selectLattice={selectLattice} onSelect={handleSelectLattice} />
      </div>
      <div className="h-1/6">
        <LatticeItem lattice={latticeList[4]} selectLattice={selectLattice} onSelect={handleSelectLattice} />
      </div>
      <div className="h-1/6">
        <LatticeItem lattice={latticeList[5]} selectLattice={selectLattice} onSelect={handleSelectLattice} />
      </div>

    </div>
  )
}

export default SlaveCabinet
