import React, { useEffect, useState } from 'react'

// 由于组件不接收任何外部 props，这里不需要定义 props 类型
const Clock: React.FC = () => {
  // 使用 Date 类型定义状态
  const [time, setTime] = useState<Date>(new Date())

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date()) // 每秒更新时间
    }, 1000)

    // 清理函数：组件卸载时清除定时器
    console.log('Clock has Rendered.')
    return () => {
      console.log('Clock has Clear.')
      clearInterval(timerId)
    }
  }, [])

  return <div>{time.toLocaleTimeString()}</div>
}

export default Clock
