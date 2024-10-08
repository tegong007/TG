import React, { useRef, useState } from 'react'
import { Input } from 'antd'
import type { InputRef } from 'antd'
import { Dialog, DialogContent } from '../../../components/ui/dialog'
import { Sheet, SheetContent } from '../../../components/ui/sheet'
import CustomKeyboard from '../../../components/keyboard/CustomKeyboard'
import type { LoginVo } from '../../../types/auth/Login'

import 'react-simple-keyboard/build/css/index.css'
import DataLoading from '../../../components/DataLoading'
import type { ApiResponse } from '../../../types/ApiResponse'

// export interface LoginPasswordResult {
//   isSuccess: boolean
//   errMsg: string
// }

interface PasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (username: string, password: string) => Promise<ApiResponse<LoginVo>>
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [isOpenKeyboard, setIsOpenKeyboard] = useState(false)
  const [username, setUsername] = useState('lubingbing')
  const [password, setPassword] = useState('123456')
  const [inputField, setInputField] = useState('username') // 'username' or 'password'
  const usernameRef = useRef<InputRef>(null)
  const passwordRef = useRef<InputRef>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleFocus = (field: 'username' | 'password') => {
    setIsOpenKeyboard(true)
    setInputField(field)
  }

  // PasswordModal.tsx
  const handleConfirm = async () => {
    setIsLoading(true)
    setErrorMessage('') // 清除之前的错误消息
    const res = await onSubmit(username, password)
    if (res.isSuccess) {
      onClose()
    }
    else {
      setIsLoading(false)
      setErrorMessage(res.errMsg)
    }
  }

  const handleModalClose = () => {
    // 清空输入状态
    setUsername('')
    setPassword('')
    setErrorMessage('')
    // 关闭键盘
    setIsOpenKeyboard(false)
    // 调用传入的 onClose，如果有其他逻辑也在这里执行
    onClose()
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        {isLoading
          ? <DataLoading msg="登录中..." showCountdown={false} />
          : (
            <div className="flex flex-col">
              <div className="flex p-2 items-center justify-center text-2xl font-bold text-blue-500">
                密码验证
              </div>
              <div>
                <div className="text-blue-500 font-bold text-2xl">账号</div>
                <div className="w-full">
                  <Input
                    size="large"
                    ref={usernameRef}
                    placeholder="请输入账号"
                    onFocus={() => handleFocus('username')}
                    onChange={event => setUsername(event.target.value)}
                    value={username}
                  />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-blue-500 font-bold text-2xl">密码</div>
                <div className="w-full">
                  <Input.Password
                    ref={passwordRef}
                    size="large"
                    placeholder="请输入密码"
                    onFocus={() => handleFocus('password')}
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                  />
                </div>
              </div>
              {errorMessage && (
                <div className="mt-3 text-red-500 font-bold text-lg">{errorMessage}</div>
              )}
              <div className="mt-3">
                <button
                  className="w-full my-3 p-3 text-2xl text-white font-bold bg-blue-400 rounded"
                  onClick={handleConfirm}
                  type="button"
                >
                  确认
                </button>
                <button
                  className="w-full my-3 p-3 text-2xl text-blue-500 font-bold bg-gray-200 rounded"
                  onClick={handleModalClose}
                  type="button"
                >
                  取消
                </button>
              </div>
            </div>
            )}
      </DialogContent>
      <Sheet
        open={isOpenKeyboard}
        onOpenChange={() => {
          setIsOpenKeyboard(false)
        }}
      >
        <Sheet open={isOpenKeyboard} onOpenChange={() => setIsOpenKeyboard(false)}>
          <SheetContent side="bottom">
            <CustomKeyboard
              input={inputField === 'username' ? username : password}
              setInput={inputField === 'username' ? setUsername : setPassword}
              onClose={() => setIsOpenKeyboard(false)}
            />
          </SheetContent>
        </Sheet>
      </Sheet>
    </Dialog>
  )
}

export default PasswordModal
