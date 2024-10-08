import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate()
  const isAuthenticated = false // 在这里检查用户是否已验证，例如从全局状态或上下文中获取

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('No login, redirect to login page')
      navigate('/login', { state: { from: location.pathname + location.search } })
      console.log(location) // 跳转到 LoginPage 并保存目标路径
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null // 或者返回一个加载中的组件
  }

  return <Outlet /> // 渲染受保护的路由
}

export default ProtectedRoute
