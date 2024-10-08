import React, { useEffect, useState } from 'react'
import type { DeviceResVo } from '../../types/device/deviceList'
import { ScrollArea } from '../ui/scroll-area'
import type { LatticeResVo } from '../../types/device/latticeList'
import MasterCabinet from './components/MasterCabinet'
import SlaveCabinet from './components/SlaveCabinet'

interface CabinetTemplateProps {
  deviceList: DeviceResVo[]
  onChange: (lattice: LatticeResVo | null) => void
}

interface CabinetItemProps {
  device: DeviceResVo
  isSelected: boolean
}

const CabinetItem: React.FC<CabinetItemProps> = ({ device, isSelected }) => {
  const getTypeName = (type: string | undefined): string => {
    let typeName = ''
    switch (type) {
      case '1':
        typeName = '主柜'
        break
      case '2':
        typeName = '副柜'
        break
      default:
        typeName = '未知'
        break
    }
    return typeName
  }
  const itemClass = isSelected
    ? 'w-full p-2 border-2 border-white bg-blue-500 text-2xl text-white font-bold'
    : 'w-full p-2 border-2 border-white bg-blue-100 text-2xl font-bold text-blue-500'
  return (
    <div className={itemClass}>
      <div className="h-full w-full flex items-center justify-center">
        {`[${getTypeName(device.type)}]${device.cabinetName}`}
      </div>
    </div>
  )
}

const CabinetTemplate: React.FC<CabinetTemplateProps> = ({ deviceList, onChange }) => {
  const [selectedCabinet, setSelectedCabinet] = useState<DeviceResVo | null>(null)
  const [selectedLattice, setSelectedLattice] = useState<LatticeResVo | null>(null)
  const handleSelectCabinet = (device: DeviceResVo) => {
    setSelectedLattice(null)
    setSelectedCabinet(device)
  }
  const handleSelectLattice = (lattice: LatticeResVo) => {
    setSelectedLattice(lattice)
  }

  useEffect(() => {
    onChange(selectedLattice)
  }, [onChange, selectedLattice])

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-1/4 h-full ">
        <div className="flex h-1/6 items-center justify-center text-blue-500 text-3xl font-bold">
          选择柜类型
        </div>
        <div className="h-5/6 w-full ">
          <ScrollArea className="h-full w-full border-blue-500 border-4 overflow-y-auto">
            {deviceList.map(device => (
              <div
                key={device.id}
                onClick={() => {
                  handleSelectCabinet(device)
                }}
              >
                <CabinetItem device={device} isSelected={device.id === selectedCabinet?.id} />
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 h-full">
        <div className="flex h-1/6 items-center justify-center text-blue-500 text-3xl font-bold">
          {selectedLattice?.latticeCode ? `已选择 [ ${selectedLattice?.latticeCode} ] 号格，点击下一步打开格门` : '请选择柜格'}
        </div>
        <div className="h-5/6 w-full px-4">
          <div className="h-full w-full border-4 border-blue-500">
            {!selectedCabinet && (
              <div className="h-full w-full flex items-center justify-center text-blue-500 text-3xl font-bold">
                请在左侧选择要操作的柜类型
              </div>
            )}
            {selectedCabinet?.type === '1' && <MasterCabinet cabinet={selectedCabinet} onSelect={handleSelectLattice} />}
            {selectedCabinet?.type === '2' && <SlaveCabinet cabinet={selectedCabinet} onSelect={handleSelectLattice} />}
          </div>
        </div>
      </div>
    </div>
  )
}
export default CabinetTemplate
