import React, { Suspense } from 'react'
import useTakeStore from '../../store/TakeStore'

const TakePage: React.FC = () => {
  const { currentStepComponent: CurrentStep } = useTakeStore()
  return (
    <Suspense>
      <CurrentStep />
      {/* 其他逻辑和组件 */}
    </Suspense>
  )
}

export default TakePage
