import React from 'react'
import { Outlet } from 'react-router-dom'
import '../OperationStyles.css'
import { ErrorBoundary } from 'react-error-boundary'
import CommonButton from '../../../components/button/CommonButton'

// 将 fallbackRender 改为一个 React 组件，名字以大写字母开头
function FallbackRender({ error, resetErrorBoundary }) {
  return (
    <div className="h-full w-full">
      <div className="h-4/5 w-full pt-5 flex flex-col items-center">
        <div className="text-red-600 text-3xl font-bold">
          出现了预期外的错误
        </div>
        <div className="border-2 border-red-500 mt-5 p-2 w-4/5 h-4/5">
          {error.message}
        </div>
      </div>
      <div className="flex h-1/5 items-center justify-center gap-24">
        <CommonButton type="outline" onClick={resetErrorBoundary}>
          重试
        </CommonButton>
      </div>
    </div>
  )
}

const MainContent: React.FC = () => {
  return (
    <div className="h-full w-full p-5 operation-container">
      <div className="h-full w-full border-4 border-blue-500 rounded-2xl p-2">
        <ErrorBoundary fallbackRender={FallbackRender}>
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default MainContent
