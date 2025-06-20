import { useEffect, useState } from 'react';
import bgImage from '../../assets/images/login_img.png'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';
import { ShowToast } from '../../components/showToast';
import { toast } from 'react-toastify';

export default function ConfirmationPage(){
  const [timer, setTimer] = useState(1); // seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (!canResend) return;

    toast.success(
      <div className="custom-toast">
        <span>A new verification link has been sent to your email. Kindly click to verify your account on hustle</span>
      </div>
    , {
      position: "top-left",
      autoClose: 5000,
      closeOnClick: true,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: false,
      closeButton: false,
      className: 'custom-toast-wrapper',
    });
    // Your resend logic here (API call, etc.)
    console.log('Resend email triggered');

    // Reset the timer
    setTimer(60);
    setCanResend(false);
  };

  return (
    <div className='bg-[#0A4F42]'>
      <div
        className="relative bg-cover bg-center min-h-[100vh] flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className='auth-card w-[60%] flex flex-col justify-center items-center gap-4'>
          <img src={logo} alt="logo" className='auth-card-img mb-4'/>
          <svg width="206" height="93" viewBox="0 0 206 93" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M116.679 61.7591C136.905 70.7093 172.068 85.0524 204.5 92.2683" stroke="#FDBA40" stroke-width="1.05667" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2.11 4.23"/>
            <path d="M99.7109 53.9743C99.7109 53.9743 106.191 57.1645 116.682 61.8105" stroke="#1F1F1F" stroke-width="1.05667" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2.11 4.23"/>
            <path d="M92.4303 53.5056L106.975 23.4016L1.5 0.98175L92.4303 53.5056Z" fill="white" stroke="#1F1F1F" stroke-width="1.33447" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M99.5211 27.0475L92.4303 53.5056L1.5 0.98175L99.5211 27.0475Z" fill="#FDBA40" stroke="#1F1F1F" stroke-width="1.33447" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M99.5211 27.0475L82.9711 39.403L1.5 0.98175L99.5211 27.0475Z" fill="white" stroke="#1F1F1F" stroke-width="1.33447" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M106.975 23.4016L121.709 18.1859L1.5 0.98175L106.975 23.4016Z" fill="white" stroke="#1F1F1F" stroke-width="1.33447" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M71.9434 48.8225L75.358 50.6454" stroke="#1F1F1F" stroke-width="1.05667" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M53.3135 38.871L64.7488 44.9728" stroke="#1F1F1F" stroke-width="1.05667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <h1 className='lh auth-card-header'>Complete your email verification</h1>
          <p className='confirmation-card-p mt-2 mb-2'>We’ve just sent an email to the address: sample@mail.com. Kindly check your email and click on the verification link to verify your account on Hustle.</p>
          <button 
            onClick={handleResend}
            disabled={!canResend} to={'/login'} 
            className='flex auth-card-button confirmation-card-button-alt justify-center items-center'>
            <h1 className='auth-card-h1'>
              {canResend
                ? 'Resend verification email'
                : `Resend verification email in ${timer}s`
              }
            </h1>
          </button>
          <Link to={'/register'} className='flex auth-card-button auth-card-opt justify-center items-center'>
            <h1 className='auth-card-h1'>Skip</h1>
          </Link>
        </div>
      </div>
    </div>
  )
}