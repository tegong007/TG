import { create } from 'zustand'
import axios from 'axios'

export interface BaseAuth {
  id: number
  org: string
  name: string
  token: string
}

interface AuthStoreState {
  action: string | null
  setAction: (value: string) => void
  operatorAuth: BaseAuth | null
  setOperatorAuth: (value: BaseAuth) => void
  resetAuth: () => void
}

const useAuthStore = create<AuthStoreState>((set, get) => ({
  action: null,
  setAction: (value: string) => set({ action: value }),
  operatorAuth: null,
  setOperatorAuth: (value: BaseAuth) => {
    set({ operatorAuth: value })
    axios.defaults.headers.common.Authorization = value.token
  },
  resetAuth: () => {
    set({ action: null, operatorAuth: null })
    axios.defaults.headers.common.Authorization = ''
  },
}))

export default useAuthStore
