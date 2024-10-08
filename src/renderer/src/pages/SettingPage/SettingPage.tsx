import React from 'react'
import 柜端注册 from '@images/guiduanzhuce.png'
import 关机 from '@images/guanji.png'
import { useNavigate } from 'react-router-dom'
import CommonButton from '../../components/button/CommonButton'

const SettingPage: React.FC = () => {
  const navigate = useNavigate()
  const backHomeClick = (): void => {
    navigate('/')
  }
  return (
    <div className="h-full w-full">
      <div className="flex h-4/5 w-full items-center justify-center gap-24">
        <div className="w-72 h-72 active:scale-95 transition-all">
          <img
            src={柜端注册}
            onClick={() => { navigate('/setting/register') }}
          />
        </div>
        <div className="w-72 h-72 active:scale-95 transition-all">
          <img src={关机} />
        </div>
      </div>
      <div className="flex h-1/5 items-center justify-center gap-24">
        <CommonButton type="outline" onClick={backHomeClick}>
          返回首页
        </CommonButton>
      </div>
    </div>
  )
}

export default SettingPage
