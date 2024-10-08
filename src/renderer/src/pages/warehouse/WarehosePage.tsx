import React, { Suspense } from 'react'
import useWarehouseStore from '../../store/WarehouseStore'

const WarehousePage: React.FC = () => {
  const { currentStepComponent: CurrentStep } = useWarehouseStore()
  return (
    <Suspense>
      <CurrentStep />
      {/* 其他逻辑和组件 */}
    </Suspense>
  )
}

export default WarehousePage
