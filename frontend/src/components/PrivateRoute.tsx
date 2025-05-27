import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthentication()
    
    window.addEventListener('storage', checkAuthentication)
    
    return () => {
      window.removeEventListener('storage', checkAuthentication)
    }
  }, [])

  const checkAuthentication = () => {
    const localToken = localStorage.getItem('token')
    const sessionToken = sessionStorage.getItem('token')
    
    if (localToken && !sessionToken) {
      localStorage.removeItem('token')
      setIsAuthenticated(false)
    } else if (localToken && sessionToken) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
    
    setLoading(false)
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />
}

export default PrivateRoute