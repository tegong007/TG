import React, { useEffect } from 'react'
import useAuthStore from '../../../store/AuthStore'

const HomeFlag: React.FC = () => {
  const { resetAuth } = useAuthStore()
  useEffect(() => {
    resetAuth()
  }, [resetAuth])
  return (
    <>
      {/* nothing */}
    </>
  )
}

export default HomeFlag
