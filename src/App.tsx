import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom'
import './App.css'
import CouponRedemptionPage from './CouponRedemptionPage'
import AdminPage from './AdminPage'
import UserPage from './UserPage'

function App() {
  return (
    <>
      <h1>Loyalty Coupon Portal</h1>
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/user/*" element={<UserPage />} />
          <Route path="/user/claim-coupon/:couponId" element={<CouponRedemptionPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
