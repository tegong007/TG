import React from 'react'
import { Route } from 'react-router-dom'
import OperationLayout from '../layout/Operation/OperationLayout'
import SelectPage from '../pages/warehouse/SelectPage'

const OperationRoutes: React.FC = () => {
  return (
    <Route path="/operation" element={<OperationLayout />}>
      <Route index element={<SelectPage />} />
      {/* 更多步骤 */}
    </Route>
  )
}

export default OperationRoutes
