import './assets/main.css'
import React, { useEffect } from 'react'
import ClickEffect from './components/globleClick/ClickEffect'
import MainRoutes from './routes/MainRoutes'
import StompService from './websocket/StompService'

function App(): React.ReactElement {
  useEffect(() => {
    StompService.getInstance()
  }, [])
  return (
    <>
      <ClickEffect />
      <MainRoutes />
    </>
  )
}

export default App
