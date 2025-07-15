import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import logo from '../../assets/images/logo_alt.png'
import login_img from '../../assets/images/login_image.png'
import useAuthFunctions from '../../utils/authentication';
import { ShowToast } from '../../components/showToast';
import useFunctions from '../../utils/functions';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, onAuthStateChanged, getAuth, signOut} from 'firebase/auth';
import { generateToken, auth} from "../../notifications/firebase"


export default function LoginPage(){
  const [form, setForm] = useState({email: '', password: ''})
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [user, setUser] = useState(null);

  const { hustleNormalLogin, hustleSocialLogin } = useAuthFunctions()
  const { createCookies } = useFunctions()

  const history = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
	}

  const checkLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              
              Cookies.set("latitude", latitude)
              Cookies.set("longitude", longitude)
            }
          );
        }else if (result.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              
              Cookies.set("latitude", latitude)
              Cookies.set("longitude", longitude)
            },
            (error) => {
              ShowToast("error", `Error getting geolocation: ${error}`);
            }
          );
        }else{
          console.log('Location access denied');
          ShowToast("error", "NB: Your location is turned off. Job searches may not be accurate")
          return
        }
      })
    }
  }

  const login = async () => {
    setIsLoginLoading(true)
    
    if (!form.email || !form.password){
      setIsLoginLoading(false)
      ShowToast("error", "Please provide valid credentails")
      return
    }

    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    let device_token;

    if (!isMobile){
      device_token = await generateToken();
    }
    
    const params = {
      "email": form.email,
      "password": form.password,
      "device_token": device_token === undefined ? "WEB" : device_token
    }

    const {response_code, account, msg} = await hustleNormalLogin(params)

    checkLocation()

    if (response_code === 200){
      setIsLoginLoading(false)

      createCookies(account.token, account.full_name, account.contact_info?.country, 
        account.verified_details.has_verified_email, account.verified_details.has_verified_id_details, 
        account.verified_details.has_verified_business_details, account.is_creator, account.id, account.hustler_uuid,
        account.contact_info.avatar, form.email)

      switch (account.is_creator){
        case false:
          return history('/')
        default:
          return history('/creator/home')
      }
    }else{
      setIsLoginLoading(false)
      ShowToast("error", msg)
      return
    }
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      await submitSocialAccountLogin()
    } catch (error) {
      console.error(error.message);
    }
  };

  const submitSocialAccountLogin = async () => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    let device_token;

    if (!isMobile){
      device_token = await generateToken();
    }

    const params = {
      'email': user.email,
      'provider_id': user.uid,
      'social_uid': user.providerData[0].uid,
      "device_token": device_token === undefined ? "WEB" : device_token
    }

    checkLocation()

    const {response_code, account} = await hustleSocialLogin(params)
    if (response_code === 200){
      setIsLoginLoading(false)
      
      createCookies(account.token, account.full_name, account?.contact_info?.country, 
        account.verified_details.has_verified_email, account.verified_details.has_verified_id_details, 
        account.verified_details.has_verified_business_details, account.is_creator, account.id, account.hustler_uuid,
        account.contact_info.avatar, form.email)
      
      switch (account.is_creator){
        case false:
          return history('/')
        default:
          return history('/requester/home')
      }
    }else{
      setIsLoginLoading(false)
      ShowToast("error", "Account creation from social account failed. Try again!")
      return
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null);
      }
    });
  
    return () => unsubscribe();
  }, [])

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2'>
      <div
        className="hidden relative lg:flex md:flex bg-cover bg-center min-h-[100vh] flex items-center justify-center"
        style={{ backgroundImage: `url(${login_img})` }}
      >
      </div>
      <div>
        <div className='flex flex-col pt-12 lg:pt-24 md:pt-24 items-center'>
          <img src={logo} alt="logo" className='auth-card-img'/>

          <h1 className='register-card-header mt-4'>Welcome back!</h1>
          <p className='register-card-p mt-2'>Sign in to continue your Hustle.</p>
        
        </div>
        <div className="grid grid-cols-1 gap-2 px-4 lg:px-28 md:px-12 mt-4">
          <div>
            <label className="form-label mt-1 mb-2">Enter Email</label>
            <input onChange={handleChange} value={form.first_name} name="email" 
            className="auth-input-box block" type="text"/>
          </div>
          <div className='relative'>
            <label className="form-label mt-4">Password</label>
            <input onChange={handleChange} value={form.password} name="password" className="auth-input-box block" type="password"/>
            <svg className='absolute right-4 top-1/2 cursor-pointer' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5299 10.0423L9.46992 15.1023C8.81992 14.4523 8.41992 13.5623 8.41992 12.5723C8.41992 10.5923 10.0199 8.99232 11.9999 8.99232C12.9899 8.99232 13.8799 9.39233 14.5299 10.0423Z" stroke="#C7C7C7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.8198 6.34232C16.0698 5.02232 14.0698 4.30232 11.9998 4.30232C8.46984 4.30232 5.17984 6.38232 2.88984 9.98232C1.98984 11.3923 1.98984 13.7623 2.88984 15.1723C3.67984 16.4123 4.59984 17.4823 5.59984 18.3423" stroke="#C7C7C7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.41992 20.1023C9.55992 20.5823 10.7699 20.8423 11.9999 20.8423C15.5299 20.8423 18.8199 18.7623 21.1099 15.1623C22.0099 13.7523 22.0099 11.3823 21.1099 9.97232C20.7799 9.45232 20.4199 8.96232 20.0499 8.50232" stroke="#C7C7C7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15.5104 13.2723C15.2504 14.6823 14.1004 15.8323 12.6904 16.0923" stroke="#C7C7C7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.47 15.1023L2 22.5723" stroke="#C7C7C7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22.0003 2.57233L14.5303 10.0423" stroke="#C7C7C7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div> 
          <p className='forgot-password-p underline'>Forgotten password?</p>
          { isLoginLoading ? 
            <button className='flex register-card-button justify-center items-center mt-4'>
              <h1 className='register-card-h1'>... loading</h1>
            </button>
            :
            <button onClick={() => login()} className='flex cursor-pointer register-card-button justify-center items-center mt-4'>
              <h1 className='register-card-h1'>Sign in</h1>
            </button>
          }
          
          <h1 className="auth-card-p auth-card-p-alt mt-4">Don’t have an account as a Hustle Creator?
            <Link to={'/register'} className="register-account-link cursor-pointer ml-1">Create an account here</Link>
          </h1>

          <div className='flex flex-row gap-1 items-center justify-center mt-4'>
            <hr className='default'/>
            <h1 className='register-card-p'>Or Sign in with</h1>
            <hr className='default'/>
          </div>
          <div className='flex justify-center mt-4'>
            <button onClick={() => signInWithGoogle()} className='social-button flex flex-row items-center justify-center gap-2'>
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_7326_113749)">
                <path d="M8.86104 1.50251C6.46307 2.33438 4.39506 3.91332 2.96077 6.00738C1.52649 8.10145 0.801526 10.6003 0.892371 13.1368C0.983217 15.6734 1.88508 18.1139 3.4655 20.1C5.04591 22.0861 7.22158 23.5131 9.67292 24.1713C11.6603 24.6841 13.7424 24.7066 15.7404 24.2369C17.5504 23.8303 19.2238 22.9607 20.5967 21.7131C22.0256 20.375 23.0627 18.6728 23.5967 16.7894C24.177 14.7413 24.2803 12.5874 23.8985 10.4931H12.7385V15.1225H19.2017C19.0725 15.8609 18.7957 16.5656 18.3878 17.1944C17.98 17.8233 17.4494 18.3635 16.8279 18.7825C16.0387 19.3046 15.149 19.6558 14.216 19.8138C13.2803 19.9877 12.3205 19.9877 11.3848 19.8138C10.4364 19.6177 9.53923 19.2262 8.75042 18.6644C7.4832 17.7674 6.53168 16.493 6.03167 15.0231C5.52319 13.5257 5.52319 11.9024 6.03167 10.405C6.38759 9.35541 6.97598 8.39976 7.75292 7.60938C8.64203 6.68828 9.76766 6.02988 11.0063 5.7064C12.245 5.38292 13.5488 5.40688 14.7748 5.77563C15.7325 6.06962 16.6083 6.58326 17.3323 7.27563C18.061 6.55063 18.7885 5.82376 19.5148 5.09501C19.8898 4.70313 20.2985 4.33001 20.6679 3.92876C19.5627 2.90027 18.2654 2.09999 16.8504 1.57376C14.2736 0.638112 11.4541 0.612968 8.86104 1.50251Z" fill="white"/>
                <path d="M8.8607 1.50244C11.4536 0.612298 14.2731 0.63678 16.8501 1.57182C18.2654 2.10162 19.562 2.90576 20.6657 3.93807C20.2907 4.33932 19.8951 4.71432 19.5126 5.10432C18.7851 5.83057 18.0582 6.55432 17.332 7.27557C16.6079 6.5832 15.7321 6.06955 14.7745 5.77557C13.5489 5.40552 12.2451 5.38018 11.0061 5.70233C9.76712 6.02449 8.64079 6.68168 7.7507 7.60182C6.97377 8.3922 6.38538 9.34785 6.02945 10.3974L2.14258 7.38807C3.53384 4.62912 5.94273 2.51874 8.8607 1.50244Z" fill="#E33629"/>
                <path d="M1.1114 10.3694C1.32032 9.33399 1.66716 8.3313 2.14265 7.38812L6.02953 10.405C5.52105 11.9024 5.52105 13.5257 6.02953 15.0231C4.73453 16.0231 3.4389 17.0281 2.14265 18.0381C0.952308 15.6687 0.589275 12.9691 1.1114 10.3694Z" fill="#F8BD00"/>
                <path d="M12.7381 10.4911H23.8981C24.2799 12.5854 24.1766 14.7393 23.5963 16.7874C23.0623 18.6708 22.0252 20.373 20.5963 21.7111C19.3419 20.7324 18.0819 19.7612 16.8275 18.7824C17.4494 18.3629 17.9802 17.8222 18.3881 17.1926C18.796 16.5631 19.0726 15.8577 19.2013 15.1186H12.7381C12.7363 13.5774 12.7381 12.0343 12.7381 10.4911Z" fill="#587DBD"/>
                <path d="M2.14062 18.0381C3.43687 17.0381 4.7325 16.0331 6.0275 15.0231C6.52851 16.4935 7.48138 17.7679 8.75 18.6644C9.54127 19.2236 10.4404 19.6119 11.39 19.8044C12.3257 19.9784 13.2855 19.9784 14.2213 19.8044C15.1542 19.6465 16.0439 19.2952 16.8331 18.7731C18.0875 19.7519 19.3475 20.7231 20.6019 21.7019C19.2292 22.9501 17.5558 23.8204 15.7456 24.2275C13.7476 24.6972 11.6655 24.6747 9.67813 24.1619C8.10632 23.7422 6.63814 23.0024 5.36563 21.9888C4.01874 20.9194 2.91867 19.5718 2.14062 18.0381Z" fill="#319F43"/>
                </g>
                <defs>
                <clipPath id="clip0_7326_113749">
                <rect width="24" height="24" fill="white" transform="translate(0.5 0.713074)"/>
                </clipPath>
                </defs>
              </svg>
              <h1 className='register-card-p'>Sign up with Google</h1>
            </button>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}