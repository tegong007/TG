import React from 'react'
import { ScrollArea } from '../../../components/ui/scroll-area'
import MachineInfoItem from './MachineInfoItem'

const MachineInfoList: React.FC = () => {
  return (
    <ScrollArea className="h-full w-full border-4 border-blue-500 overflow-y-auto bg-red-800">
      <MachineInfoItem className="bg-gray-100" />
      <MachineInfoItem className="bg-white" />
      <MachineInfoItem className="bg-gray-100" />
      <MachineInfoItem className="bg-white" />
      <MachineInfoItem className="bg-gray-100" />
      <MachineInfoItem className="bg-white" />
      <MachineInfoItem className="bg-gray-100" />
      <MachineInfoItem className="bg-white" />
      <MachineInfoItem className="bg-gray-100" />
      <MachineInfoItem className="bg-white" />
      <MachineInfoItem className="bg-gray-100" />
      <MachineInfoItem className="bg-white" />
    </ScrollArea>
  )
}

export default MachineInfoList
