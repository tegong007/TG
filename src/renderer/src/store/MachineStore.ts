import { create } from 'zustand'
import type { cabinetInfoVo } from '../types/machine/cabinetInfo'

interface MachineStoreState {
  deviceCode: string
  setDeviceCode: (value: string) => void
  cabinetInfoStore: cabinetInfoVo[] | null
  setCabinetInfoStore: (cabinetInfo: cabinetInfoVo[]) => void
}

const useMachineStore = create<MachineStoreState>((set, get) => ({
  deviceCode: '23874874G7F732',
  setDeviceCode: (value: string) => set({ deviceCode: value }),
  cabinetInfoStore: null,
  setCabinetInfoStore: (cabinetInfo: cabinetInfoVo[]) => set({ cabinetInfoStore: cabinetInfo }),
}))

export default useMachineStore
