import type { LoginVo } from '../types/auth/Login'
import { sendRequest } from './index'

interface LoginPasswordParams {
  username: string
  password: string
}

async function loginWithPassword({ username, password }: LoginPasswordParams) {
  return sendRequest<LoginVo>({
    method: 'post',
    url: '/api/password/login',
    data: {
      clientId: '428a8310cd442757ae699df5d894f051',
      grantType: 'password',
      username,
      password,
    },
  })
}

export {
  loginWithPassword,
}
