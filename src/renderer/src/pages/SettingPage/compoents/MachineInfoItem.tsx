import React from 'react'
import { cn } from '../../../utils'

interface MachineInfoItemProps {
  className?: string
}

const MachineInfoItem: React.FC<MachineInfoItemProps> = ({ className }) => {
  const itemClasses = cn('flex p-5 w-full text-2xl font-bold text-blue-600', className)

  return (
    <div className={itemClasses}>
      <div className="w-5/12">设备名称</div>
      <div className="w-6/12 text-right">右侧对齐的内容</div>
      <div className="w-1/12 pl-5">{'>'}</div>
    </div>
  )
}

export default MachineInfoItem
