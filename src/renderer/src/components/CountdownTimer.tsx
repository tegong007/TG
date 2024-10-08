// CountdownTimer.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCountdownStore from '../store/CountdownStore'
import ClockIcon from '../static/icon/timeout_icon.svg?react'
import TimeoutDialog from './dialog/TimeOutDialog'

interface CountdownTimerProps {
  initialTime?: number
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialTime }) => {
  const [timeoutInterval, setTimeoutInterval] = useState<NodeJS.Timeout | null>(null)
  const [hasTimeout, setHasTimeout] = useState(false)
  const navigate = useNavigate()
  const {
    timeLeft,
    resetTrigger,
    decrementTime,
    startCountdown,
    resetCountdown,
  } = useCountdownStore()

  useEffect(() => {
    startCountdown(initialTime || 6000) // 每次重置时初始化时间
    // console.log('CountdownTimer has reset')
    const timerId = setInterval(() => {
      decrementTime()
    }, 1000)
    setTimeoutInterval(timerId)

    return () => {
      // console.log('CountdownTimer has clear')
      clearInterval(timerId)
    }
  }, [resetTrigger, decrementTime, startCountdown, initialTime])

  useEffect(() => {
    if (timeLeft === 0 && timeoutInterval !== null) {
      clearInterval(timeoutInterval)
      setHasTimeout(true)
      setTimeout(() => {
        navigate('/')
      }, 5000)
      console.log('要被超时了🥵🥵🥵🥵')
    }
  }, [navigate, timeLeft, timeoutInterval])

  useEffect(() => {
    const handleGlobalClick = () => {
      if (!hasTimeout) {
        resetCountdown()
      }
    }

    document.addEventListener('click', handleGlobalClick)

    return () => {
      document.removeEventListener('click', handleGlobalClick)
    }
  }, [hasTimeout, resetCountdown])

  return (
    <div className="absolute top-0 right-0 text-red-600 text-3xl font-bold p-2 rounded">
      <div className="flex items-center justify-center">
        <ClockIcon />
        <div className="mb-2">
          {`${timeLeft} 秒`}
        </div>
      </div>
      <TimeoutDialog isOpen={hasTimeout} onClose={() => {}} />
    </div>
  )
}

export default CountdownTimer
