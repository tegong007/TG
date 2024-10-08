import type React from 'react'
import { lazy } from 'react'
import { create } from 'zustand'

const ExchangeOpenDoorPage = lazy(() => import('../pages/exchange/ExchangeOpenDoorPage'))

const stepsComponents = [ExchangeOpenDoorPage]

interface ExchangeStoreState {
  currentStepIndex: number
  currentStepComponent: React.ComponentType
  nextStep: () => void
  prevStep: () => void
  resetState: () => void
}

const useExchangeStore = create<ExchangeStoreState>((set, get) => ({
  currentStep: 0,
  currentStepIndex: 0, // 默认从第一个步骤开始
  currentStepComponent: stepsComponents[0], // 默认当前步骤组件
  nextStep: () => {
    const { currentStepIndex } = get()
    const nextIndex: number = currentStepIndex + 1
    if (nextIndex < stepsComponents.length) {
      set({
        currentStepIndex: nextIndex,
        currentStepComponent: stepsComponents[nextIndex],
      })
    }
  },

  prevStep: () => {
    const { currentStepIndex } = get()
    const prevIndex: number = currentStepIndex - 1
    if (prevIndex >= 0) {
      set({
        currentStepIndex: prevIndex,
        currentStepComponent: stepsComponents[prevIndex],
      })
    }
  },

  resetState: (): void => {
    set({
      currentStepIndex: 0,
      currentStepComponent: stepsComponents[0],
    })
  },
}))

export default useExchangeStore
