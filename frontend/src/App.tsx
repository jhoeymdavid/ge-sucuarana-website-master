import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Navbar from '@components/Navbar'
import HomePage from '@pages/HomePage'
import AdminLogin from '@pages/admin/AdminLogin'
import AdminDashboard from '@pages/admin/AdminDashboard'

const App = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Box>
      {/* <Footer /> Removido conforme solicitado */}
    </Box>
  )
}

export default App