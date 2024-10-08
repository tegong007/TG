// countdownStore.ts
import { create } from 'zustand'

interface CountdownState {
  timeLeft: number
  resetTrigger: number
  hasTimedOut: boolean
  startCountdown: (initialTime: number) => void
  resetCountdown: () => void
  decrementTime: () => void
  handleTimeout: () => void
  isDialogOpen: boolean
  closeDialog: () => void
}

const useCountdownStore = create<CountdownState>((set, get) => ({
  timeLeft: 0,
  resetTrigger: 0,
  hasTimedOut: false,
  startCountdown: initialTime => set({ timeLeft: initialTime, hasTimedOut: false }),
  resetCountdown: () =>
    set(state => ({ resetTrigger: state.resetTrigger + 1, hasTimedOut: false })),
  decrementTime: () => {
    const { timeLeft, hasTimedOut, handleTimeout } = get()
    if (timeLeft > 0) {
      set({ timeLeft: timeLeft - 1 })
    }
    else if (!hasTimedOut) {
      handleTimeout()
    }
  },
  handleTimeout: () => {
    set({ hasTimedOut: true, isDialogOpen: true })
    // 执行固定初始化操作，例如退出用户等
  },
  isDialogOpen: false,
  closeDialog: () => set({ isDialogOpen: false }),
}))

export default useCountdownStore
