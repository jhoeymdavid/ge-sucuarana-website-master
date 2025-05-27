import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Navbar from '@components/Navbar'
import HomePage from '@pages/HomePage'
import AdminLogin from '@pages/admin/AdminLogin'
import AdminDashboard from '@pages/admin/AdminDashboard'
import ContactPage from './pages/ContactPage'
import ComoSeTornarEscoteiro from './pages/ComoSeTornarEscoteiro/ComoSeTornarEscoteiro'
import NewsPage from './pages/NewsPage'
import NewsDetail from './pages/NewsDetail'
import QuemSomos from './pages/QuemSomos'
import PrivateRoute from '@components/PrivateRoute'

const App = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
          <Route path = "/contato" element = {<ContactPage />} />
          <Route path="/como-se-tornar-escoteiro" element={<ComoSeTornarEscoteiro />} />
          <Route path="/noticias" element={<NewsPage />} />
          <Route path="/noticias/:id" element={<NewsDetail />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App