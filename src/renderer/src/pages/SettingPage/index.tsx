import React from 'react'
import { Outlet } from 'react-router-dom'

const SettingIndex: React.FC = () => {
  return (
    <div className="h-full w-full">
      <Outlet />
    </div>
  )
}

export default SettingIndex
