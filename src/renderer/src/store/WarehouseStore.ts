import type React from 'react'
import { lazy } from 'react'
import { create } from 'zustand'
import type { ErrorProps } from '../pages/warehouse/ErrorPage'
import type { LatticeResVo } from '../types/device/latticeList'
import type { LabelVo } from '../types/device/labelList'

const SelectPage = lazy(() => import('../pages/warehouse/SelectPage'))
const OpenDoorPage = lazy(() => import('../pages/warehouse/OpenDoorPage'))
const ConfirmPage = lazy(() => import('../pages/warehouse/ConfirmPage'))
const ResultPage = lazy(() => import('../pages/warehouse/ResultPage'))
const InventoryPage = lazy(() => import('../pages/warehouse/InventoryPage'))
const ErrorPage = lazy(() => import('../pages/warehouse/ErrorPage'))

const stepsComponents = [SelectPage, OpenDoorPage, InventoryPage, ConfirmPage, ResultPage]

export type WarehouseOperationType = 'Inbound' | 'Outbound'
export const OperationTypeDescriptions: Record<WarehouseOperationType, string> = {
  Inbound: '入库',
  Outbound: '出库',
}

interface handleAssetsProps {
  previousLabelList: LabelVo[]
  inventoryEpcList: string[]
}

interface WarehouseStoreState {
  warehouseOperation: WarehouseOperationType
  setWarehouseOperation: (value: WarehouseOperationType) => void
  currentStepIndex: number
  currentStepComponent: React.ComponentType
  nextStep: () => void
  prevStep: () => void
  backToCurrentStep: () => void
  errorProps: ErrorProps
  errorStep: (errorProps: ErrorProps) => void
  selectedLatticeStore: LatticeResVo | null
  setSelectedLatticeStore: (lattice: LatticeResVo | null) => void
  handleAssets: handleAssetsProps | null
  setHandleAssets: (handleAssets: handleAssetsProps) => void
  resetState: () => void
}

const useWarehouseStore = create<WarehouseStoreState>((set, get) => ({
  warehouseOperation: 'Inbound', // 默认值
  setWarehouseOperation: warehouseOperation => set({ warehouseOperation }),
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

  backToCurrentStep: () => {
    const { currentStepIndex } = get()
    set({
      currentStepComponent: stepsComponents[currentStepIndex],
    })
  },

  errorProps: { errMsg: '', enableRetry: true },

  errorStep: (errorProps: ErrorProps) => {
    set({
      errorProps,
      currentStepComponent: ErrorPage,
    })
  },

  selectedLatticeStore: null,
  setSelectedLatticeStore: (lattice: LatticeResVo | null) => set({ selectedLatticeStore: lattice }),

  handleAssets: null,
  setHandleAssets: (handleAssets: handleAssetsProps) => set({ handleAssets }),

  resetState: (): void => {
    set({
      currentStepIndex: 0,
      currentStepComponent: stepsComponents[0],
      selectedLatticeStore: null,
    })
  },
}))

export default useWarehouseStore
