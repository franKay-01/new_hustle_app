import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Logo from '../assets/images/logo_alt.png'
import { Link, useNavigate } from 'react-router-dom'
import { Popover } from '@headlessui/react'
import { useEffect } from 'react'
import Cookies from 'js-cookie';
import { ShowToast } from './showToast'
import { useState } from 'react'
import NoImgIcon from "../assets/images/client_img.svg"

export default function Navbar() {
  const [active, setActive] = useState(false)
  const [navigation, setNavigation] = useState([])
  const [hustleInfo, setHustleInfo] = useState('')

  const navigate = useNavigate();

  const handleChange = (e) => {
    setHustleInfo(e.target.value)
  }
  
  const updateNavigation = () => {
    if (Cookies.get('is_ct') === undefined){
      setNavigation([
        { name: 'My Feed', href: '/', current: false },
        { name: 'My Hustles', href: '/my/hustles', current: false },
      ])
      return
    }

    if (Cookies.get("token") && Cookies.get('is_ct') === 'true') {
      setNavigation([ 
        { name: 'My Feed', href: '/creator/home', current: false },
        { name: 'My Hustles', href: '/creator/hustles', current: false },
      ])
    } else {
      setNavigation([
        { name: 'My Feed', href: '/', current: false },
        { name: 'My Hustles', href: '/my/hustles', current: false },
      ])
    }
    
  }

  const logout = () => {
    const cookieNames = Object.keys(Cookies.get());

    cookieNames.forEach(cookieName => {
      Cookies.remove(cookieName);
    });

    setActive(false)
    window.location.href = '/'
  }

  useEffect(()=> {
    const token = Cookies.get("token")
    if (token) {
      setActive(true)
    }

    updateNavigation()

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
                console.error('Error getting geolocation:', error);
              }
          );
        }else{
          console.log('Location access denied');
        }
      })
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  },[])

  const searchHustles = () => {
    if (hustleInfo !== ''){
      navigate('/search', { state: { hustleInfo } });
    }
  }

  return (
    <Disclosure as="nav" className="bg-white nav-position">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex flex-row items-center justify-between h-16">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center mt-4 rounded-md text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                  <XIcon className="block h-9 w-9" aria-hidden="true" />
                  ) : (
                  <MenuIcon className="block h-12 w-12" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="justify-center flex-shrink-0 flex sm:justify-start mr-12">
              <h1 className="text-xl font-semibold">Welcome {Cookies.get('full_name')}! 👋</h1>
              </div>

              <div className="flex-1 flex items-center sm:items-stretch z-1 nav-items-margin">
                <div className="hidden sm:block relative">
                  <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Search for available hustles"
                    className="w-[20rem] px-4 py-2 bg-[#EBEBEC] rounded-md border focus:outline-none"
                  />
                  <svg onClick={() => searchHustles()} className='absolute right-3 top-3 w-5 h-5 cursor-pointer' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.5">
                    <path d="M7.66634 13.9997C11.1641 13.9997 13.9997 11.1641 13.9997 7.66634C13.9997 4.16854 11.1641 1.33301 7.66634 1.33301C4.16854 1.33301 1.33301 4.16854 1.33301 7.66634C1.33301 11.1641 4.16854 13.9997 7.66634 13.9997Z" stroke="#30343D" stroke-width="1.00145" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.6663 14.6663L13.333 13.333" stroke="#30343D" stroke-width="1.00145" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="hidden lg:block lg:w-auto">
                { active ? 
                  <div className='flex flex-row space-x-2 justify-center items-center'>
                    { Cookies.get('avatar') === 'null' ? 
                      <span className='user-icon'></span>
                      :
                      <img src={Cookies.get('avatar') ? Cookies.get('avatar') : NoImgIcon} className="icon-img w-8 h-8"/>
                    }
                    <div className="accepted-badge">
                      { Cookies.get('is_ct') === 'false' ? 
                        <div className='flex flex-row items-center space-x-1'>
                          <h1 className="accepted-text-alt">Hustler</h1>
                        </div>
                        :
                        <div className='flex flex-row items-center space-x-1'>
                          <h1 className="accepted-text-alt">Creator</h1>
                        </div>
                      }
                    </div>
                  </div>
                :
                  <>
                    <div className="flex items-center space-x-2">
                      <img
                        src="/path-to-avatar.jpg"
                        alt="avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">Amiefa Obed</p>
                        <p className="text-sm text-gray-500">Miami, FL</p>
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>

          {/* Mobile */}
          <Disclosure.Panel className="sm:hidden mobile-nav-bg">
            <div className="px-2 pt-2 pb-3 ">
              <Link to={'/'} spy={true} smooth={true} className={"block px-3 py-2 mobile-nav-text"}>
                Home
              </Link>

              {Cookies.get("token") ? 
                <>
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className='block mobile-nav-text px-3 py-2'
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                  <Link to={'/'} spy={true} smooth={true} className={"block px-3 py-2 mobile-nav-text"}>
                    Settings
                  </Link>
                  <Link onClick={logout} spy={true} smooth={true} className={"block px-3 py-2 mobile-nav-text"}>
                    Logout
                  </Link>
                </>: 
                <Link to={'/login'} spy={true} smooth={true} className={"block px-3 py-2 mobile-nav-text"}>
                  Login
                </Link>
              }
            </div>
          </Disclosure.Panel>
          
          {/* Mobile */}
        </>
      )}
    </Disclosure>
  )
}

