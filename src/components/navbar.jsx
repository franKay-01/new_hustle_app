import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Logo from '../assets/images/logo_alt.png'
import {Link} from 'react-router-dom'
import { Popover } from '@headlessui/react'
import { useEffect } from 'react'
import Cookies from 'js-cookie';
import { ShowToast } from './showToast'
import { useState } from 'react'

export default function Navbar() {
  const [active, setActive] = useState(false)
  const [navigation, setNavigation] = useState([])

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
        { name: 'My Feed', href: '/requester/home', current: false },
        { name: 'My Hustles', href: '/requester/hustles', current: false },
        { name: 'Create Hustle', href: '/requester/add/hustle', current: false },
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
              <h1 className="text-xl font-semibold">Welcome Obed! 👋</h1>
              </div>

              <div className="flex-1 flex items-center sm:items-stretch z-1 nav-items-margin">
                <div className="hidden sm:block">
                  <input
                    type="text"
                    placeholder="Search for available hustles"
                    className="px-4 py-2 rounded border"
                  />
                </div>
              </div>

              <div className="hidden lg:block lg:w-auto">
                { active ? 
                  <div className='flex flex-row space-x-2 justify-center items-center'>
                    <Popover className="relative px-3 py-2 rounded-md float-right font-normal text-lg text-default-blue learn-display focus:outline-none">
                      <Popover.Button className="learn-display">
                        { Cookies.get('avatar') === 'null' ? 
                          <span className='user-icon'></span>
                          :
                          <img src={Cookies.get('avatar')} alt="user image" className='user-avatar-icon'/>
                        }
                      </Popover.Button>

                      <Popover.Panel className="absolute z-10 mt-4 dropdown-margin">
                        <div className="flex flex-col menu-bar">
                          <div className='flex flex-row space-x-4 mb-8'>
                            { Cookies.get('avatar') === 'null' ? 
                              <span className='user-icon'></span>
                              :
                              <img src={Cookies.get('avatar')} alt="user image" className='user-avatar-icon'/>
                            }
                            <div className='flex flex-col gap-2'>
                              <h1 className="bold-text-2">{Cookies.get("full_name")}</h1>
                              <div className='flex flex-row gap-1 justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.16667 5.16602C5.52333 5.16602 5 5.68935 5 6.33335C5 6.97668 5.52333 7.49935 6.16667 7.49935C6.81 7.49935 7.33333 6.97668 7.33333 6.33335C7.33333 5.68935 6.81 5.16602 6.16667 5.16602M6.16667 8.49935C4.972 8.49935 4 7.52802 4 6.33335C4 5.13802 4.972 4.16602 6.16667 4.16602C7.36133 4.16602 8.33333 5.13802 8.33333 6.33335C8.33333 7.52802 7.36133 8.49935 6.16667 8.49935" fill="#575757"/>
                                  <mask id="mask0_4555_4014" style={{ maskType:"luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="14">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.666016 0.832031H11.6657V13.832H0.666016V0.832031Z" fill="white"/>
                                  </mask>
                                  <g mask="url(#mask0_4555_4014)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.16504 1.83203C3.68371 1.83203 1.66504 3.87003 1.66504 6.37403C1.66504 9.56003 5.41437 12.664 6.16504 12.8294C6.91571 12.6634 10.665 9.55936 10.665 6.37403C10.665 3.87003 8.64637 1.83203 6.16504 1.83203V1.83203ZM6.16504 13.832C4.96904 13.832 0.665039 10.1307 0.665039 6.37403C0.665039 3.31803 3.13237 0.832031 6.16504 0.832031C9.19771 0.832031 11.665 3.31803 11.665 6.37403C11.665 10.1307 7.36104 13.832 6.16504 13.832V13.832Z" fill="#575757"/>
                                  </g>
                                </svg>
                                <h1 className="card-exp-heading card-heading">{Cookies.get("residence")}</h1>
                              </div>
                            </div>
                          </div>
                          {/* <Link to={'/account/verification'} spy={true} smooth={true} className="mb-4 flex flex-row justify-between items-center gap-4">
                            <div className='flex flex-row gap-1 justify-center items-center'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18 18.8597H17.24C16.44 18.8597 15.68 19.1697 15.12 19.7297L13.41 21.4197C12.63 22.1897 11.36 22.1897 10.58 21.4197L8.87 19.7297C8.31 19.1697 7.54 18.8597 6.75 18.8597H6C4.34 18.8597 3 17.5298 3 15.8898V4.97974C3 3.33974 4.34 2.00977 6 2.00977H18C19.66 2.00977 21 3.33974 21 4.97974V15.8898C21 17.5198 19.66 18.8597 18 18.8597Z" stroke="#8F8F8F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.9999 9.99982C13.2868 9.99982 14.33 8.95662 14.33 7.6698C14.33 6.38298 13.2868 5.33984 11.9999 5.33984C10.7131 5.33984 9.66992 6.38298 9.66992 7.6698C9.66992 8.95662 10.7131 9.99982 11.9999 9.99982Z" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16 15.6603C16 13.8603 14.21 12.4004 12 12.4004C9.79 12.4004 8 13.8603 8 15.6603" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              <h1 className="text-lg text-default-blue cursor-pointer">Account Verification Information</h1>
                            </div>
                            
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                              <path d="M0.96967 15.5303C0.703403 15.2641 0.679197 14.8474 0.897052 14.5538L0.96967 14.4697L7.439 8L0.96967 1.53033C0.703403 1.26406 0.679197 0.8474 0.897052 0.553788L0.96967 0.46967C1.23594 0.203403 1.6526 0.179197 1.94621 0.397052L2.03033 0.46967L9.03033 7.46967C9.2966 7.73594 9.3208 8.1526 9.10295 8.44621L9.03033 8.53033L2.03033 15.5303C1.73744 15.8232 1.26256 15.8232 0.96967 15.5303Z" fill="#A7A7A7"/>
                            </svg>
                          </Link> */}
                          <Link to={'/account/info'} spy={true} smooth={true} className="mb-4 flex flex-row justify-between items-center gap-4">
                            <div className='flex flex-row gap-1 justify-center items-center'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M19.2101 15.741L15.67 19.281C15.53 19.421 15.4 19.681 15.37 19.871L15.18 21.221C15.11 21.711 15.45 22.051 15.94 21.981L17.29 21.791C17.48 21.761 17.75 21.631 17.88 21.491L21.42 17.951C22.03 17.341 22.32 16.631 21.42 15.731C20.53 14.841 19.8201 15.131 19.2101 15.741Z" stroke="#8F8F8F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18.7002 16.25C19.0002 17.33 19.8402 18.17 20.9202 18.47" stroke="#8F8F8F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3.41016 22C3.41016 18.13 7.26018 15 12.0002 15C13.0402 15 14.0402 15.15 14.9702 15.43" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              <h1 className="text-lg text-default-blue cursor-pointer">Business Details</h1>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                              <path d="M0.96967 15.5303C0.703403 15.2641 0.679197 14.8474 0.897052 14.5538L0.96967 14.4697L7.439 8L0.96967 1.53033C0.703403 1.26406 0.679197 0.8474 0.897052 0.553788L0.96967 0.46967C1.23594 0.203403 1.6526 0.179197 1.94621 0.397052L2.03033 0.46967L9.03033 7.46967C9.2966 7.73594 9.3208 8.1526 9.10295 8.44621L9.03033 8.53033L2.03033 15.5303C1.73744 15.8232 1.26256 15.8232 0.96967 15.5303Z" fill="#A7A7A7"/>
                            </svg>
                          </Link>
                          <Link to={'/account'} spy={true} smooth={true} className="mb-4 flex flex-row justify-between items-center gap-4">
                            <div className='flex flex-row gap-1 justify-center items-center'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.5703 18.4996V14.5996" stroke="#8F8F8F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.5703 7.45V5.5" stroke="#8F8F8F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.5697 12.6492C17.0057 12.6492 18.1697 11.4852 18.1697 10.0492C18.1697 8.61328 17.0057 7.44922 15.5697 7.44922C14.1338 7.44922 12.9697 8.61328 12.9697 10.0492C12.9697 11.4852 14.1338 12.6492 15.5697 12.6492Z" stroke="#8F8F8F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.42969 18.5008V16.5508" stroke="#8F8F8F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.42969 9.4V5.5" stroke="#8F8F8F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.43008 16.5496C9.86602 16.5496 11.0301 15.3855 11.0301 13.9496C11.0301 12.5137 9.86602 11.3496 8.43008 11.3496C6.99414 11.3496 5.83008 12.5137 5.83008 13.9496C5.83008 15.3855 6.99414 16.5496 8.43008 16.5496Z" stroke="#8F8F8F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              <h1 className="text-lg text-default-blue cursor-pointer">Account Management</h1>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                              <path d="M0.96967 15.5303C0.703403 15.2641 0.679197 14.8474 0.897052 14.5538L0.96967 14.4697L7.439 8L0.96967 1.53033C0.703403 1.26406 0.679197 0.8474 0.897052 0.553788L0.96967 0.46967C1.23594 0.203403 1.6526 0.179197 1.94621 0.397052L2.03033 0.46967L9.03033 7.46967C9.2966 7.73594 9.3208 8.1526 9.10295 8.44621L9.03033 8.53033L2.03033 15.5303C1.73744 15.8232 1.26256 15.8232 0.96967 15.5303Z" fill="#A7A7A7"/>
                            </svg>
                          </Link>
                          <Link to={'/subscription/packages'} spy={true} smooth={true} className="mb-4 flex flex-row justify-between items-center gap-4">
                            <div className='flex flex-row gap-1 justify-center items-center'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99512 15.4257C9.58112 15.4257 9.24512 15.0897 9.24512 14.6757V12.1387C9.24512 11.7247 9.58112 11.3887 9.99512 11.3887C10.4091 11.3887 10.7451 11.7247 10.7451 12.1387V14.6757C10.7451 15.0897 10.4091 15.4257 9.99512 15.4257Z" fill="#8F8F8F"/>
                                <mask id="mask0_4555_248" style={{ maskType:'luminance' }} maskUnits="userSpaceOnUse" x="0" y="2" width="20" height="11">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2.58008H19.9898V12.8911H0V2.58008Z" fill="white"/>
                                </mask>
                                <g mask="url(#mask0_4555_248)">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 9.39308C3.876 10.6841 6.872 11.3911 9.99 11.3911C13.114 11.3911 16.113 10.6841 18.49 9.39308V6.39108C18.49 5.11608 17.459 4.08008 16.19 4.08008H3.81C2.536 4.08008 1.5 5.11208 1.5 6.38108V9.39308ZM9.99 12.8911C6.445 12.8911 3.028 12.0331 0.371 10.4771C0.141 10.3431 0 10.0971 0 9.83008V6.38108C0 4.28508 1.709 2.58008 3.81 2.58008H16.19C18.286 2.58008 19.99 4.28908 19.99 6.39108V9.83008C19.99 10.0971 19.848 10.3431 19.619 10.4771C16.962 12.0331 13.542 12.8911 9.99 12.8911Z" fill="#8F8F8F"/>
                                </g>
                                <mask id="mask1_4555_248" style={{ maskType:'luminance' }} maskUnits="userSpaceOnUse" x="5" y="0" width="10" height="5">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.74512 0H14.2451V4.0759H5.74512V0Z" fill="white"/>
                                </mask>
                                <g mask="url(#mask1_4555_248)">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4951 4.076C13.0811 4.076 12.7451 3.74 12.7451 3.326V2.96C12.7451 2.155 12.0901 1.5 11.2851 1.5H8.70512C7.90012 1.5 7.24512 2.155 7.24512 2.96V3.326C7.24512 3.74 6.90912 4.076 6.49512 4.076C6.08112 4.076 5.74512 3.74 5.74512 3.326V2.96C5.74512 1.328 7.07312 0 8.70512 0H11.2851C12.9171 0 14.2451 1.328 14.2451 2.96V3.326C14.2451 3.74 13.9091 4.076 13.4951 4.076Z" fill="#8F8F8F"/>
                                </g>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7946 19.74H4.19457C2.11957 19.74 0.372574 18.119 0.215574 16.049L0.025574 13.54C-0.00542596 13.127 0.304574 12.766 0.717574 12.735C1.13257 12.72 1.49057 13.013 1.52257 13.427L1.71157 15.935C1.80957 17.227 2.89957 18.24 4.19457 18.24H15.7946C17.0896 18.24 18.1806 17.227 18.2776 15.935L18.4676 13.427C18.4996 13.013 18.8666 12.719 19.2726 12.735C19.6856 12.766 19.9946 13.127 19.9636 13.54L19.7736 16.049C19.6166 18.119 17.8696 19.74 15.7946 19.74Z" fill="#8F8F8F"/>
                              </svg>
                              <h1 className="text-lg text-default-blue cursor-pointer ml-1">My Subscriptions</h1>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                              <path d="M0.96967 15.5303C0.703403 15.2641 0.679197 14.8474 0.897052 14.5538L0.96967 14.4697L7.439 8L0.96967 1.53033C0.703403 1.26406 0.679197 0.8474 0.897052 0.553788L0.96967 0.46967C1.23594 0.203403 1.6526 0.179197 1.94621 0.397052L2.03033 0.46967L9.03033 7.46967C9.2966 7.73594 9.3208 8.1526 9.10295 8.44621L9.03033 8.53033L2.03033 15.5303C1.73744 15.8232 1.26256 15.8232 0.96967 15.5303Z" fill="#A7A7A7"/>
                            </svg>
                          </Link>
                          <Link to={'/faqs'} spy={true} smooth={true} className="mb-4 flex flex-row justify-between items-center gap-4">
                            <div className='flex flex-row gap-1 justify-center items-center'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M2 22H22" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 6C7.03 6 3 10.03 3 15V22H21V15C21 10.03 16.97 6 12 6Z" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 2V3" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 4L5 5" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M20 4L19 5" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              <h1 className="text-lg text-default-blue cursor-pointer">Contact support</h1>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                              <path d="M0.96967 15.5303C0.703403 15.2641 0.679197 14.8474 0.897052 14.5538L0.96967 14.4697L7.439 8L0.96967 1.53033C0.703403 1.26406 0.679197 0.8474 0.897052 0.553788L0.96967 0.46967C1.23594 0.203403 1.6526 0.179197 1.94621 0.397052L2.03033 0.46967L9.03033 7.46967C9.2966 7.73594 9.3208 8.1526 9.10295 8.44621L9.03033 8.53033L2.03033 15.5303C1.73744 15.8232 1.26256 15.8232 0.96967 15.5303Z" fill="#A7A7A7"/>
                            </svg>
                          </Link>
                          <Link onClick={logout} spy={true} smooth={true} className="mb-4 flex flex-row justify-between items-center gap-4">
                            <div className='flex flex-row gap-1 justify-center items-center'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.681 20H16.567C19.011 20 21 18.011 21 15.565V4.436C21 1.99 19.011 0 16.567 0H11.692C9.246 0 7.256 1.99 7.256 4.436V5.368C7.256 5.782 7.592 6.118 8.006 6.118C8.42 6.118 8.756 5.782 8.756 5.368V4.436C8.756 2.816 10.073 1.5 11.692 1.5H16.567C18.184 1.5 19.5 2.816 19.5 4.436V15.565C19.5 17.184 18.184 18.5 16.567 18.5H11.681C10.069 18.5 8.756 17.188 8.756 15.576V14.633C8.756 14.219 8.42 13.883 8.006 13.883C7.592 13.883 7.256 14.219 7.256 14.633V15.576C7.256 18.016 9.242 20 11.681 20Z" fill="#8F8F8F"/>
                                <mask id="mask0_4555_307" style={{ maskType:'luminance' }} maskUnits="userSpaceOnUse" x="0" y="9" width="15" height="2">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0039 9.25H0.463006V10.75H14.0039V9.25Z" fill="white"/>
                                </mask>
                                <g mask="url(#mask0_4555_307)">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.21291 10.75H13.2539C13.6679 10.75 14.0039 10.414 14.0039 10C14.0039 9.586 13.6679 9.25 13.2539 9.25H1.21291C0.798906 9.25 0.462906 9.586 0.462906 10C0.462906 10.414 0.798906 10.75 1.21291 10.75Z" fill="#8F8F8F"/>
                                </g>
                                <mask id="mask1_4555_307" style={{ maskType:'luminance' }} maskUnits="userSpaceOnUse" x="0" y="6" width="5" height="8">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.89062 6.33594H0.463273V13.6667H4.89062V6.33594Z" fill="white"/>
                                </mask>
                                <g mask="url(#mask1_4555_307)">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.14087 13.6667C4.33287 13.6667 4.52587 13.5937 4.67187 13.4457C4.96387 13.1517 4.96287 12.6777 4.66987 12.3857L2.27587 10.0007L4.66987 7.61669C4.96287 7.32469 4.96487 6.85069 4.67187 6.55669C4.37987 6.26269 3.90587 6.26269 3.61187 6.55469L0.683872 9.46969C0.541872 9.60969 0.462873 9.80169 0.462873 10.0007C0.462873 10.1997 0.541872 10.3917 0.683872 10.5317L3.61187 13.4477C3.75787 13.5937 3.94987 13.6667 4.14087 13.6667Z" fill="#8F8F8F"/>
                                </g>
                              </svg>
                              <h1 className="text-lg text-default-blue cursor-pointer ml-1">Log out</h1>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                              <path d="M0.96967 15.5303C0.703403 15.2641 0.679197 14.8474 0.897052 14.5538L0.96967 14.4697L7.439 8L0.96967 1.53033C0.703403 1.26406 0.679197 0.8474 0.897052 0.553788L0.96967 0.46967C1.23594 0.203403 1.6526 0.179197 1.94621 0.397052L2.03033 0.46967L9.03033 7.46967C9.2966 7.73594 9.3208 8.1526 9.10295 8.44621L9.03033 8.53033L2.03033 15.5303C1.73744 15.8232 1.26256 15.8232 0.96967 15.5303Z" fill="#A7A7A7"/>
                            </svg>
                          </Link>
                        </div>
                      </Popover.Panel>
                    </Popover>
                    <div className="accepted-badge">
                      { Cookies.get('is_ct') === 'false' ? 
                        <div className='flex flex-row space-x-1'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 32 32" fill="none">
                            <g clip-path="url(#clip0_4212_45987)">
                              <path d="M0.171333 0.653199C0.321724 0.489624 0.545601 0.414429 0.764353 0.45398L5.07173 1.2345L10.2529 2.17347C10.2544 2.17371 10.2558 2.17444 10.2573 2.17469C10.2834 2.17957 10.3088 2.18616 10.3339 2.19422C10.3403 2.19617 10.3462 2.19861 10.3523 2.20081C10.3715 2.20764 10.3906 2.21521 10.4091 2.22376C10.416 2.22693 10.4228 2.23011 10.4297 2.23352C10.4528 2.24524 10.4755 2.25794 10.4973 2.27234C10.4978 2.27259 10.4983 2.27307 10.4987 2.27332C10.5197 2.28748 10.5398 2.30335 10.5593 2.31995C10.5651 2.32508 10.5705 2.3302 10.5759 2.33509C10.5825 2.34119 10.5896 2.34681 10.5959 2.35315L16.5085 8.266L18.0259 6.76796C18.0432 6.74476 18.0617 6.72206 18.0827 6.70082C18.1076 6.67543 18.1345 6.65345 18.1621 6.63343L24.4377 0.437134C24.6904 0.187622 25.0967 0.187622 25.3494 0.437134L30.7529 5.77259C31.4443 6.45521 31.825 7.3661 31.825 8.33754C31.825 9.30898 31.4443 10.2199 30.7529 10.9022L24.9121 16.6693L29.574 21.3312L30.3364 22.0939C31.4092 23.1667 32 24.5927 32 26.1098C32 27.6269 31.4092 29.0529 30.3364 30.1257C29.2295 31.2326 27.7751 31.7863 26.3208 31.7863C24.8664 31.7863 23.4121 31.2328 22.3049 30.1257L16.8293 24.6501L11.83 29.5859C11.132 30.2751 10.2148 30.6198 9.29781 30.6198C8.38058 30.6198 7.46358 30.2751 6.76534 29.5859L1.30805 24.1977C1.18452 24.0756 1.11518 23.9093 1.11518 23.736C1.11518 23.5624 1.18452 23.3962 1.30805 23.2743L8.42574 16.2465L2.56416 10.3849C2.5456 10.3664 2.529 10.3471 2.51338 10.3268C2.50923 10.3217 2.50557 10.3163 2.50142 10.3109C2.48945 10.2948 2.47847 10.2782 2.46797 10.2611C2.46479 10.2555 2.46138 10.2501 2.45796 10.2443C2.44624 10.2233 2.43525 10.2018 2.42598 10.1798C2.42524 10.1781 2.42451 10.1767 2.42378 10.1749C2.41352 10.1503 2.40498 10.1251 2.3979 10.0995C2.39741 10.0978 2.39668 10.0963 2.39619 10.0946L1.10005 5.27088L0.0221634 1.26087C-0.0354538 1.04602 0.0206985 0.816773 0.171333 0.653199ZM1.54121 1.91345L2.06172 3.84998L3.34224 2.56922L3.62129 2.29041L1.54121 1.91345ZM5.17476 2.5719L2.45039 5.29627L3.35811 8.67348L8.80221 3.22938L5.17476 2.5719ZM29.8413 9.9789C30.2839 9.54213 30.5276 8.95912 30.5276 8.33754C30.5276 7.71571 30.2839 7.1327 29.8413 6.69593L24.8935 1.81043L22.2473 4.42322L23.5334 5.69325C23.7886 5.94496 23.791 6.3556 23.5393 6.61073C23.4123 6.73915 23.2451 6.8036 23.0776 6.8036C22.9131 6.8036 22.7483 6.74134 22.6218 6.61659L21.324 5.33485L19.4734 7.162L20.7441 8.41664C20.999 8.66859 21.0017 9.07924 20.75 9.33437C20.623 9.46278 20.4558 9.52724 20.2883 9.52724C20.1238 9.52724 19.959 9.46498 19.8325 9.33998L18.55 8.07387L17.4262 9.18349L23.9946 15.7519L29.8413 9.9789ZM23.5303 17.1227C23.5303 17.1225 23.53 17.1225 23.53 17.1225C23.53 17.1222 23.5298 17.1222 23.5298 17.122L10.1372 3.72938L8.92989 4.93641L11.5954 7.60194C11.8486 7.85536 11.8486 8.266 11.5954 8.51942C11.4687 8.64613 11.3027 8.70961 11.1367 8.70961C10.9707 8.70961 10.8047 8.64613 10.6779 8.51942L8.01241 5.85414L6.21846 7.64833L24.2788 25.7089L26.073 23.9147L14.1299 11.9713C13.8764 11.7182 13.8764 11.3073 14.1299 11.0539C14.383 10.8007 14.7939 10.8007 15.0473 11.0539L26.9905 22.9972L28.1977 21.79L23.5303 17.1227ZM23.2224 29.2082C24.9309 30.9164 27.7107 30.9164 29.4192 29.2082C30.2468 28.3805 30.7024 27.2802 30.7024 26.1098C30.7024 24.9394 30.2468 23.839 29.4192 23.0114L29.1152 22.7074L28.7612 23.0614L27.4495 24.3735H27.4492V24.3737L22.9184 28.9042L23.2224 29.2082ZM7.77242 18.715L9.07638 20.0024C9.33126 20.2543 9.33395 20.665 9.08224 20.9201C8.95528 21.0485 8.78805 21.1129 8.62057 21.1129C8.45577 21.1129 8.29122 21.0507 8.16475 20.9257L6.84908 19.6266L4.8022 21.6479L6.12276 22.9518C6.37764 23.2035 6.38033 23.6142 6.12862 23.8693C6.00167 23.9977 5.83443 24.0622 5.66695 24.0622C5.50215 24.0622 5.3376 23.9999 5.21114 23.8752L3.87886 22.5597L2.68745 23.736L7.67696 28.6625C8.57076 29.5451 10.0249 29.5451 10.9187 28.6625L15.9118 23.7326L9.34347 17.164L7.77242 18.715ZM9.80783 15.7934V15.7936C9.80783 15.7936 9.80807 15.7936 9.80807 15.7938L17.2937 23.2792C17.2937 23.2795 17.2939 23.2795 17.2939 23.2795V23.2797L22.001 27.9867L23.3613 26.6264L5.30074 8.56581L3.94038 9.92616L9.80783 15.7934Z" fill="black"/>
                              <path d="M28.1838 6.94544C28.603 7.35925 28.834 7.91028 28.834 8.49695C28.834 9.08362 28.603 9.63465 28.1838 10.0487C27.7539 10.4733 27.189 10.6854 26.624 10.6854C26.0593 10.6854 25.4944 10.4733 25.0644 10.0487C24.645 9.63465 24.4141 9.08362 24.4143 8.49695C24.4143 7.91028 24.6453 7.35925 25.0644 6.94544C25.9243 6.09631 27.3237 6.09631 28.1838 6.94544ZM25.9761 9.12537C26.3332 9.47816 26.9148 9.47816 27.2722 9.12537C27.4426 8.95691 27.5366 8.73377 27.5366 8.49695C27.5366 8.26014 27.4426 8.03699 27.2722 7.86853C27.0935 7.69226 26.8586 7.60388 26.624 7.60388C26.3894 7.60388 26.1548 7.69226 25.9761 7.86853C25.8057 8.03699 25.7117 8.26014 25.7117 8.49695C25.7117 8.73377 25.8057 8.95691 25.9761 9.12537Z" fill="black"/>
                              <path d="M13.1725 10.3333L13.1251 10.3626C13.0189 10.4282 12.901 10.4595 12.7846 10.4595C12.5673 10.4595 12.3549 10.3503 12.2321 10.1521C12.0436 9.84742 12.1378 9.44776 12.4425 9.25904L12.4896 9.22998C12.7943 9.04151 13.1942 9.1355 13.3827 9.44019C13.5714 9.74488 13.4772 10.1448 13.1725 10.3333Z" fill="black"/>
                              <path d="M12.9902 23.3363L13.0376 23.307C13.3423 23.1187 13.7419 23.2127 13.9307 23.5174C14.1191 23.8221 14.0251 24.2218 13.7205 24.4105L13.6731 24.4395C13.5666 24.5054 13.449 24.5367 13.3323 24.5367C13.115 24.5367 12.9028 24.4276 12.78 24.2293C12.5915 23.9246 12.6858 23.5247 12.9902 23.3363Z" fill="black"/>
                              <path d="M11.0477 25.3781C11.3011 25.1246 11.7118 25.1246 11.9652 25.3781C12.2186 25.6312 12.2186 26.0421 11.9652 26.2955L10.1879 28.0729C10.0614 28.1993 9.89538 28.2628 9.72937 28.2628C9.56335 28.2628 9.39709 28.1993 9.27063 28.0729L7.44689 26.2491C7.19347 25.9957 7.19347 25.5851 7.44689 25.3317C7.70031 25.0782 8.11096 25.0782 8.36437 25.3317L9.72937 26.6964L11.0477 25.3781Z" fill="black"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_4212_45987">
                                <rect width="32" height="32" fill="white" transform="matrix(-1 0 0 1 32 0)"/>
                              </clipPath>
                            </defs>
                          </svg>
                          <h1 className="accepted-text-alt">Hustler</h1>
                        </div>
                        :
                        <div className='flex flex-row space-x-1'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 35 35" fill="none">
                            <g clip-path="url(#clip0_4212_45996)">
                              <path d="M17.0965 15.9531C17.3634 15.6862 17.3634 15.2534 17.0965 14.9863C16.8295 14.7194 16.3968 14.7194 16.1297 14.9863C15.9054 15.2107 15.5402 15.2107 15.3159 14.9863C15.0489 14.7194 14.6162 14.7194 14.3491 14.9863C14.0822 15.2533 14.0822 15.6861 14.3491 15.9531C14.7278 16.3319 15.2253 16.5212 15.7228 16.5212C16.2203 16.5212 16.7178 16.3319 17.0965 15.9531Z" fill="black"/>
                              <path d="M13.1981 27.0997C13.071 26.9726 12.8946 26.8994 12.7148 26.8994C12.5351 26.8994 12.3587 26.9726 12.2315 27.0997C12.1044 27.2269 12.0312 27.4032 12.0312 27.583C12.0312 27.7628 12.1043 27.9392 12.2315 28.0663C12.3588 28.1935 12.5351 28.2666 12.7148 28.2666C12.8946 28.2666 13.071 28.1935 13.1981 28.0663C13.3252 27.9392 13.3984 27.7628 13.3984 27.583C13.3984 27.4032 13.3253 27.2269 13.1981 27.0997Z" fill="black"/>
                              <path d="M32.1096 20.2821H29.9656V19.8955C29.9656 18.4502 28.7898 17.2743 27.3445 17.2743H25.7024C24.2571 17.2743 23.0813 18.4502 23.0813 19.8955V20.2821H20.9374C20.3786 20.2821 19.8568 20.442 19.4141 20.7176V18.8541C21.3832 17.6204 22.6954 15.4314 22.6954 12.9414V9.57652C22.7447 9.52928 22.7929 9.48074 22.8397 9.43071C23.5689 8.65127 23.9312 7.6332 23.8598 6.56392C23.7978 5.63341 23.4022 4.76244 22.746 4.11146C22.0904 3.46109 21.2167 3.07185 20.2858 3.01545C19.8224 2.98756 19.365 3.04314 18.9297 3.17815C18.6791 2.26822 18.1349 1.45802 17.3636 0.874162C15.7677 -0.333816 13.5724 -0.285486 12.0249 0.992082C11.3618 1.53944 10.8792 2.26924 10.6341 3.08354C8.79915 3.44297 7.45616 5.11593 7.55973 7.03471C7.61469 8.05265 8.06798 8.97249 8.75 9.62779V12.9414C8.75 15.4314 10.0622 17.6204 12.0312 18.854V20.1661H7.62207C3.41927 20.1661 0 23.5853 0 27.7881V34.3165C0 34.694 0.306113 35 0.683594 35H32.1096C33.7034 35 35 33.7034 35 32.1096V25.7649V24.9373V23.1726C35 21.5788 33.7034 20.2821 32.1096 20.2821ZM24.4485 19.8954C24.4485 19.204 25.0111 18.6414 25.7024 18.6414H27.3445C28.0359 18.6414 28.5984 19.204 28.5984 19.8954V20.2821H24.4485V19.8954ZM8.92493 6.96102C8.85233 5.61673 9.88552 4.46057 11.228 4.3836C11.5449 4.36541 11.8076 4.13149 11.8623 3.81874C11.9851 3.11573 12.3422 2.50289 12.8952 2.04639C13.9517 1.17412 15.4499 1.14035 16.5383 1.96422C17.2574 2.50857 17.6752 3.30201 17.7149 4.19855C17.7257 4.44136 17.8645 4.66018 18.0797 4.77331C18.2947 4.88645 18.5538 4.87688 18.7599 4.74809C19.1948 4.47656 19.6934 4.34914 20.203 4.38011C21.4486 4.45551 22.4126 5.4122 22.4956 6.65484C22.5414 7.34239 22.309 7.99646 21.8412 8.49657C21.3729 8.99717 20.7376 9.27286 20.0526 9.27286C19.278 9.27286 18.5658 8.91712 18.0989 8.29697C17.5684 7.59232 16.7098 7.18496 15.8178 7.18496C15.6436 7.18496 15.4679 7.20055 15.2934 7.2324C14.4842 7.37459 13.7544 7.79008 13.2383 8.40244C12.762 8.96778 12.0463 9.26651 11.1686 9.26651C10.0001 9.26664 8.99356 8.23237 8.92493 6.96102ZM10.1172 12.9414V10.4618C10.4519 10.5731 10.8052 10.6338 11.1686 10.6338C12.4439 10.6338 13.5503 10.1543 14.2839 9.2836C14.5936 8.9161 15.0362 8.66583 15.5346 8.57826C16.1033 8.47429 16.681 8.68675 17.0067 9.1194C17.7343 10.0859 18.8446 10.6402 20.0527 10.6402C20.4905 10.6402 20.9217 10.5628 21.3281 10.4183V12.9414C21.3281 16.0323 18.8135 18.5469 15.7227 18.5469C12.6318 18.5469 10.1172 16.0322 10.1172 12.9414ZM18.0469 19.5152V20.8497C18.0469 22.1313 17.0043 23.1739 15.7227 23.1739C14.4411 23.1739 13.3984 22.1313 13.3984 20.8497V19.5152C14.1258 19.7731 14.908 19.914 15.7227 19.914C16.5373 19.914 17.3195 19.7731 18.0469 19.5152ZM1.36719 33.6329V27.7881C1.36719 24.549 3.84214 21.8772 7.00027 21.5641V24.5752C7.00027 24.8235 7.13487 25.0523 7.35191 25.1728L8.54588 25.8361L7.11737 27.9525C6.99966 28.1269 6.96883 28.3456 7.03356 28.5456L8.6813 33.6329H1.36719ZM13.3984 33.6329V30.6592C13.3984 30.2817 13.0923 29.9756 12.7148 29.9756C12.3374 29.9756 12.0312 30.2817 12.0312 30.6592V33.6329H10.1185L8.43691 28.4413L10.0961 25.9831C10.2033 25.8243 10.239 25.6278 10.1944 25.4415C10.1498 25.2551 10.0291 25.0961 9.86159 25.003L8.36753 24.173V21.5333H12.0312V24.5069C12.0312 24.8844 12.3374 25.1905 12.7148 25.1905C13.0923 25.1905 13.3984 24.8844 13.3984 24.5069V23.7147C14.0335 24.2309 14.8425 24.5411 15.7227 24.5411C16.6029 24.5411 17.4118 24.2309 18.0469 23.7147V32.1095C18.0469 32.6683 18.2067 33.1902 18.4823 33.6328H13.3984V33.6329ZM33.6328 32.1096C33.6328 32.9495 32.9495 33.6329 32.1096 33.6329H20.9373C20.0974 33.6329 19.4141 32.9495 19.4141 32.1096V28.0622C19.785 28.2644 20.2101 28.3794 20.6615 28.3794H22.426V29.2131C22.426 29.5906 22.7322 29.8967 23.1096 29.8967C23.4871 29.8967 23.7932 29.5906 23.7932 29.2131V28.3794H29.2536V29.2131C29.2536 29.5906 29.5597 29.8967 29.9372 29.8967C30.3146 29.8967 30.6208 29.5906 30.6208 29.2131V28.3794H32.3853C32.8368 28.3794 33.2618 28.2644 33.6327 28.0622V32.1096H33.6328ZM33.6328 24.9373V25.7649C33.6328 26.4527 33.0732 27.0123 32.3854 27.0123H30.6208V26.1787C30.6208 25.8011 30.3147 25.4951 29.9372 25.4951C29.5598 25.4951 29.2536 25.8011 29.2536 26.1787V27.0123C29.2536 27.0123 23.8164 27.0123 23.7933 27.0123V26.1787C23.7933 25.8011 23.4872 25.4951 23.1097 25.4951C22.7322 25.4951 22.4261 25.8011 22.4261 26.1787V27.0123H20.6616C19.9737 27.0123 19.4141 26.4527 19.4141 25.7649V23.1726C19.4141 22.3326 20.0975 21.6493 20.9374 21.6493H32.1096C32.9496 21.6493 33.6329 22.3326 33.6329 23.1726V24.9373H33.6328Z" fill="black"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_4212_45996">
                                <rect width="35" height="35" fill="white"/>
                              </clipPath>
                            </defs>
                          </svg>
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
              
              <Link to={'/'} spy={true} smooth={true}
                  className={"block px-3 py-2 mobile-nav-text"}
                >
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

