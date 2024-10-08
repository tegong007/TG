import { create } from 'zustand'

interface MouseClickEffectState {
  enableEffect: boolean
  toggleEffect: () => void
  setEnableEffect: (value: boolean) => void // 添加一个方法来直接设置 showEffect
}

export const useMouseClickEffect = create<MouseClickEffectState>(set => ({
  enableEffect: false,
  toggleEffect: (): void => set(state => ({ enableEffect: !state.enableEffect })),
  setEnableEffect: (value: boolean): void => set({ enableEffect: value }), // 定义设置 showEffect 的方法
}))
