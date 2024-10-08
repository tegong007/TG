import type React from 'react'
import { lazy } from 'react'
import { create } from 'zustand'

const TakeSelectPage = lazy(() => import('../pages/take/TakeSelectPage'))

const stepsComponents = [TakeSelectPage]

export type TakeOperationType = 'TakeIn' | 'TakeOut'
export const OperationTypeDescriptions: Record<TakeOperationType, string> = {
  TakeIn: '归还',
  TakeOut: '取出',
}

interface TakeStoreState {
  takeOperation: TakeOperationType
  setTakeOperation: (value: TakeOperationType) => void
  currentStepIndex: number
  currentStepComponent: React.ComponentType
  nextStep: () => void
  prevStep: () => void
  resetState: () => void
}

const useTakeStore = create<TakeStoreState>((set, get) => ({
  takeOperation: 'TakeIn', // 默认值
  setTakeOperation: takeOperation => set({ takeOperation }),
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

export default useTakeStore
