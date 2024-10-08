import React from 'react'
import { Toaster } from '../../components/ui/toaster'
import OperationHeader from './components/OperationHeader'

// import OperationProgress from './components/OperationProgress'
import OperationContent from './components/OperationContent'
import './OperationStyles.css'

const OperationLayout: React.FC = () => {
  return (
    <div className="operation-global">
      <OperationHeader />
      {/* <OperationProgress /> */}
      <OperationContent />
      <Toaster />
    </div>
  )
}

export default OperationLayout
