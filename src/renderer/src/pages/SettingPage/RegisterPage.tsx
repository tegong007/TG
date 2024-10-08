import React from 'react'
import { useNavigate } from 'react-router-dom'
import CommonButton from '../../components/button/CommonButton'
import MachineInfoList from './compoents/MachineInfoList'
import CabinetTemplate from './compoents/CabinetTemplate'

const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const backHomeClick = (): void => {
    navigate('/')
  }

  return (
    <div className=" h-full relative">

      <div className="flex h-4/5">
        <div className="flex-1 p-3 ">
          <MachineInfoList />
        </div>
        <div className="flex-1 p-3 bg-neutral-100">
          <CabinetTemplate />
        </div>
      </div>

      <div className="flex h-1/5 items-center justify-center gap-24">
        <CommonButton
          type="outline"
          onClick={() => {
            navigate(-1)
          }}
        >
          返回
        </CommonButton>
        <CommonButton type="solid" onClick={backHomeClick}>
          提交修改
        </CommonButton>
      </div>
    </div>
  )
}

export default RegisterPage
