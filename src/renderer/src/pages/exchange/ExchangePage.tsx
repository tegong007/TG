import React, { Suspense } from 'react'
import useExchangeStore from '../../store/ExchangeStore'

const ExchangePage: React.FC = () => {
  const { currentStepComponent: CurrentStep } = useExchangeStore()
  return (
    <Suspense>
      <CurrentStep />
      {/* 其他逻辑和组件 */}
    </Suspense>
  )
}

export default ExchangePage
