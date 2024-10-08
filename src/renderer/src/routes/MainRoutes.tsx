import { Route, Routes } from 'react-router-dom'
import React from 'react'
import HomePage from '../pages/HomePage/HomePage'
import SettingPage from '../pages/SettingPage/SettingPage'

import OperationLayout from '../layout/Operation/OperationLayout'
import LoginPage from '../pages/LoginPage/LoginPage'
import TakePage from '../pages/take/TakePage'
import WarehousePage from '../pages/warehouse/WarehosePage'
import AgencyPage from '../pages/agency/AgencyPage'
import ExchangePage from '../pages/exchange/ExchangePage'
import ShutdownPage from '../pages/ShutdownPage/ShutdownPage'
import SettingIndex from '../pages/SettingPage'
import RegisterPage from '../pages/SettingPage/RegisterPage'
// import ProtectedRoute from './ProtectedRoute'

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<OperationLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="setting" element={<SettingIndex />}>
          <Route index element={<SettingPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="shutdown" element={<ShutdownPage />} />
        <Route path="warehouse" element={<WarehousePage />} />
        <Route path="take" element={<TakePage />} />
        <Route path="agency" element={<AgencyPage />} />
        <Route path="exchange" element={<ExchangePage />} />
      </Route>
    </Routes>
  )
}

// const MainRoutes: React.FC = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<OperationLayout />}>
//         <Route index element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//
//         {/* Protected routes */}
//         <Route element={<ProtectedRoute />}>
//           {/*<Route index element={<HomePage />} />*/}
//           <Route path="/setting" element={<SettingPage />} />
//           <Route path="/operation" element={<SelectPage />} />
//         </Route>
//       </Route>
//     </Routes>
//   )
// }

export default MainRoutes
