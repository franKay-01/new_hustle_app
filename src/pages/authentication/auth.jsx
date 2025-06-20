import bgImage from '../../assets/images/login_img.png'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';

export default function AuthPage(){
  return (
    <div className='bg-[#0A4F42]'>
      <div
        className="relative bg-cover bg-center min-h-[100vh] flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className='auth-card flex flex-col justify-center items-center gap-4'>
          <img src={logo} alt="logo" className='auth-card-img'/>
          <h1 className='lh auth-card-header'>We’re glad to have you on board 🎊🥳</h1>
          <Link to={'/login'} className='flex auth-card-button justify-center items-center'>
            <h1 className='auth-card-h1'>Sign in</h1>
          </Link>
          <Link to={'/register'} className='flex auth-card-button auth-card-opt justify-center items-center'>
            <h1 className='auth-card-h1'>Create an account</h1>
          </Link>
        </div>
      </div>
    </div>
  )
}