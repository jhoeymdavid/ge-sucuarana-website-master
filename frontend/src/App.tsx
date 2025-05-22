import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Navbar from '@components/Navbar'
import HomePage from '@pages/HomePage'
import AdminLogin from '@pages/admin/AdminLogin'
import AdminDashboard from '@pages/admin/AdminDashboard'
import ContactPage from './pages/ContactPage'
import ComoSeTornarEscoteiro from './pages/ComoSeTornarEscoteiro/ComoSeTornarEscoteiro'

const App = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path = "/contato" element = {<ContactPage />} />
          <Route path="/como-se-tornar-escoteiro" element={<ComoSeTornarEscoteiro />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App