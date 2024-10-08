import React, { Suspense } from 'react'
import useAgencyStore from '../../store/AgencyStore'

const AgencyPage: React.FC = () => {
  const { currentStepComponent: CurrentStep } = useAgencyStore()
  return (
    <Suspense>
      <CurrentStep />
      {/* 其他逻辑和组件 */}
    </Suspense>
  )
}

export default AgencyPage
