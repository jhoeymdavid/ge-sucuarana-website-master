import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar autenticação quando o componente é montado
    checkAuthentication()
    
    // Adicionar listener para eventos de storage
    window.addEventListener('storage', checkAuthentication)
    
    // Cleanup listener quando o componente é desmontado
    return () => {
      window.removeEventListener('storage', checkAuthentication)
    }
  }, [])

  const checkAuthentication = () => {
    const localToken = localStorage.getItem('token')
    const sessionToken = sessionStorage.getItem('token')
    
    // Se o token existir no localStorage mas não no sessionStorage,
    // significa que a sessão foi reiniciada (aba fechada e reaberta)
    if (localToken && !sessionToken) {
      // Limpar o token do localStorage para forçar novo login
      localStorage.removeItem('token')
      setIsAuthenticated(false)
    } else if (localToken && sessionToken) {
      // Token válido em ambos os storages
      setIsAuthenticated(true)
    } else {
      // Sem token em nenhum storage
      setIsAuthenticated(false)
    }
    
    setLoading(false)
  }

  // Quando o usuário faz login, o token é armazenado em ambos localStorage e sessionStorage
  // Isso é feito no componente AdminLogin

  if (loading) {
    // Pode adicionar um componente de loading aqui se desejar
    return <div>Carregando...</div>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />
}

export default PrivateRoute