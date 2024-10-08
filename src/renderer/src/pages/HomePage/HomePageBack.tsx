import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

interface HomePageProps {
  message: string
}

const HomePage: React.FC<HomePageProps> = (props) => {
  const navigate = useNavigate()
  const gotoSetting: () => void = () => {
    console.log('goto setting')
    navigate('/setting')
  }
  const gotoTest: () => void = () => {
    console.log('test')
    navigate('/operation')
  }
  return (
    <div>
      <h1>{props.message}</h1>
      <p>This is the main area of the application.</p>
      <Button onClick={gotoSetting}>设置</Button>
      <Button onClick={gotoTest}>test</Button>
    </div>
  )
}

export default HomePage
