import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import 指纹认证 from '@images/zhiwenyanzheng.png'
import 密码认证 from '@images/mimayanzheng.png'
import CountdownTimer from '../../components/CountdownTimer'
import CommonButton from '../../components/button/CommonButton'

import useAuthStore from '../../store/AuthStore'
import { AuthApi } from '../../api'
// import type { LoginPasswordResult } from './components/PasswordModal'
import PasswordModal from './components/PasswordModal'
import FaceCompareModal from './components/FaceCompareModal'
import FingerprintModal from './components/FingerprintModal'

const LoginPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const navigatePath = location.state.navigatePath || '/'
  const { setOperatorAuth } = useAuthStore()

  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false)
  const [isFaceCompareModalOpen, setFaceCompareModalOpen] = useState(false)
  const [isFingerprintModalOpen, setFingerprintModalOpen] = useState(false)

  const handleLogin = () => {
    // 这里执行验证逻辑，例如 API 请求验证
    const isAuthenticated = true // 假设验证通过
    console.log(navigatePath)

    if (isAuthenticated) {
      setOperatorAuth({
        id: 1000001,
        org: '测试机构',
        name: '测试用户',
        token: 'xxxxx',
      })
      navigate(navigatePath, { replace: true }) // 验证通过后跳转到目标页面
    }
  }
  const handlePasswordSubmit = async (username: string, password: string) => {
    // 这里执行验证逻辑，例如 API 请求验证
    console.log(username, password)
    const userData = await AuthApi.loginWithPassword({ username, password })
    if (userData.isSuccess) {
      console.log(navigatePath)
      setOperatorAuth({
        id: userData.data?.userId ?? -1,
        org: userData.data?.orgName ?? '未命名组织',
        name: userData.data?.nickName ?? '未命名用户',
        token: `Bearer ${userData.data!.access_token}`,
      })
      navigate(navigatePath, { replace: true }) // 验证通过后跳转到目标页面
    }
    return userData
  }

  return (
    <div className="h-full relative">
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setPasswordModalOpen(false)
        }}
        onSubmit={handlePasswordSubmit}
      />
      <FaceCompareModal
        isOpen={isFaceCompareModalOpen}
        onClose={() => {
          setFaceCompareModalOpen(false)
        }}
      />
      <FingerprintModal
        isOpen={isFingerprintModalOpen}
        onClose={() => {
          setFingerprintModalOpen(false)
        }}
      />
      <div className="h-4/5 flex flex-col">
        <CountdownTimer />
        <div className="flex items-center justify-center p-3 text-3xl font-bold text-blue-500">
          请选择柜员的验证方式
        </div>
        <div className="flex h-96 mt-8 items-center justify-center gap-28">
          <div
            className="w-72 h-72 active:scale-95 transition-all"
            onClick={() => {
              setFingerprintModalOpen(true)
              setTimeout(() => {
                handleLogin()
              }, 1500)
            }}
          >
            <img src={指纹认证} />
          </div>
          <div
            className="w-72 h-72 active:scale-95 transition-all"
            onClick={() => {
              setPasswordModalOpen(true)
            }}
          >
            <img src={密码认证} />
          </div>
          <div
            className="w-72 h-72 bg-red-300 active:scale-95 transition-all"
            onClick={() => {
              setFaceCompareModalOpen(true)
            }}
          >
            人脸认证
          </div>
        </div>
      </div>
      <div className="flex h-1/5 items-center justify-center">
        <CommonButton type="outline" onClick={() => navigate('/')}>
          返回首页
        </CommonButton>
      </div>
    </div>
  )
}

export default LoginPage
