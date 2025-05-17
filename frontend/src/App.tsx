import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import HomePage from '@pages/HomePage'
import AdminLogin from '@pages/admin/AdminLogin'
import AdminDashboard from '@pages/admin/AdminDashboard'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<PrivateRoute />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            {/* Outras rotas protegidas do admin */}
          </Route>
          {/* Outras rotas públicas */}
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}

export default App