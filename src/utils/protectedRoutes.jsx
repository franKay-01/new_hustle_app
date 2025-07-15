import { Outlet, Navigate } from "react-router-dom"
import Cookies from "js-cookie"

const ProtectedRoute = () => {
  const fakeAuth = Cookies.get('token')
  const builder = () => {
    return (
      <Outlet />
    )
  }
  return !!fakeAuth ? builder() : <Navigate to='/login' />
}

export default ProtectedRoute