import React from 'react'
import useAuthStore from '../../../store/AuthStore'

const UserDisplay: React.FC = () => {
  const { operatorAuth } = useAuthStore()
  return (
    <div>
      {operatorAuth
        ? (
          <div className="flex items-center gap-2">
            <div>{operatorAuth.org}</div>
            <div>{operatorAuth.name}</div>
            <div>{operatorAuth.id}</div>
          </div>
          )
        : (
          <div>柜员未登录</div>
          )}
    </div>
  )
}

export default UserDisplay
