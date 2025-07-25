import { useState, useEffect} from "react"
import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import CategoryImg from "../../assets/images/cat.png"
import NoInfoImg from "../../assets/images/no_info_img.png"
import MyBookingModal from "../../components/modals/myBooking_modal"
import MyBookingDetailModal from "../../components/modals/myBooking_details"
import ActiveHustleDetailModal from "../../components/modals/active_hustle_modal"
import ConfirmHustleModal from "../../components/modals/confirm_hustle"
import RateHustlerModal from "../../components/modals/rate_modal"

import useHustleFunctions from "../../utils/hustles"
import Cookies from 'js-cookie'
import { ShowToast } from "../../components/showToast"
import Loader from "../../components/loader"
import NoInfoCard from "../../components/no_info_card"

export default function MyHustlesPage(){
  const [isLoading, setIsLoading] = useState(false)
  const [showMyBookingModal, setShowMyBookingModal] = useState(false)
  const [showMyBookingDetailModal, setShowMyBookingDetailModal] = useState(false)
  const [showActiveHustleModal, setShowActiveHustleModal] = useState(false)
  const [showConfirmHustleModal, setShowConfirmHustleModal] = useState(false)
  const [showRateModal, setShowRateModal] = useState(false)
  const [hustles, setHustles] = useState({})
  const [savedHustleItems, setSavedHustleItems] = useState([])
  const [selectedHustleBooking, setSelectedHustleBooking] = useState({})
  const [selectedHustle, setSelectedHustle] = useState({})

  const [activeMenu, setActiveMenu] = useState({applied: true, progress: false, pending: false, completed: false, saved_hustles: false, reviews: false})

  const { getAllHustlerStats, getSavedHustles, updateHustleStatus, updateHustlerRating } = useHustleFunctions()

  const getStats = async () => {
    setIsLoading(true)

    const [hustlerStatsResponse, savedHustlesResponse] = await Promise.all([
      getAllHustlerStats(Cookies.get('huid')),
      getSavedHustles()
    ]);

    const { response_code: statsResponseCode, stats } = hustlerStatsResponse;
    const { response_code: savedHustlesResponseCode, savedHustles } = savedHustlesResponse;

    if (savedHustlesResponseCode === 200){
      console.log(JSON.stringify(savedHustles))
      setSavedHustleItems(savedHustles)
    }

    if (statsResponseCode === 200){
      const transformed = Object.fromEntries(
        Object.entries(stats).map(([key, value]) => [
          key.replace(/-/g, '_'),
          value
        ])
      );

      const pending_hustles = [...transformed.pending, ...transformed.open]

      transformed.pending = pending_hustles

      console.log(JSON.stringify(transformed))
      setHustles(transformed)

      setIsLoading(false)
      return
    }

    setIsLoading(false)
    ShowToast("error", "Hustle retrieval failed. Try again!")
    return
  }

  const handleIdOptionChange = (key) => {
    setActiveMenu({
      ...activeMenu,
      applied: key === 'applied',
      progress: key === 'progress',
      pending: key === 'pending',
      completed: key === 'completed',
      saved_hustles: key === 'saved_hustles',
      reviews: key === 'reviews',
    });
  };

  const showHustleDetails = (hustle) => {
    setSelectedHustle(hustle)
    setShowActiveHustleModal(true)
  }

  useEffect(() => {
    getStats()
  },[])

  const handleUpdate = async () => {
    setIsLoading(true)

    const params = {
      "status": 'pending-creator-approval',
      "comment": "",
      "hustle_id": selectedHustle.hustle_uuid,
      "completed_document_url": null
    }

    const {response_code, msg} = await updateHustleStatus(params);
    if (response_code === 200){
      setIsLoading(false)
      getStats()
      setShowConfirmHustleModal(true)
      return
    }

    setIsLoading(false)
    ShowToast("error", msg)
    return
  };

  const handleHustleRatings = async (rating, comments) => {
    setIsLoading(true)
    const params = {
      "rating": Number(rating),
      "comment": comments
    }

    const {response_code, msg} = await updateHustlerRating(params, selectedHustle.id);
    if (response_code === 200){
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    ShowToast("error", msg)
    return
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F6F6]">
      <Sidebar />

      <main className="flex-1 bg-[#F5F5F5] overflow-y-auto">
        <Navbar />
        <div className="pl-5 pr-5 pt-2">
          { isLoading ? 
            <div className="flex justify-center items-center">
              <Loader/>
            </div>
            :
            <>
              <div className="flex flex-row justify-between items-center mb-1">
                <h1 className="text-xl font-regular">My Hustles</h1>
                <button onClick={() => setShowMyBookingModal(true)} className='flex my-booking-button justify-center items-center'>
                  <h1 className='view-more-button-text'>My booking ({hustles?.pending_hustler_approval?.length})</h1>
                </button>
              </div>
              <hr className="default"/>
              <div className="flex flex-row mt-[1rem] gap-4 overflow-x-auto whitespace-nowrap">
                <div onClick={() => handleIdOptionChange('applied')} className={`hustle-kind cursor-pointer ${ activeMenu.applied ? 'hustle-kind-selected' : '' }`}>
                  <h1 className={`hustle-kind-text ${ activeMenu.applied ? 'hustle-kind-text-selected' : ''}`}>
                    Applied ({Object.keys(hustles).length > 0 ? hustles?.pending.length : 0})
                  </h1>
                </div>
                <div onClick={() => handleIdOptionChange('progress')} className={`hustle-kind cursor-pointer ${ activeMenu.progress ? 'hustle-kind-selected' : '' }`}>
                  <h1 className={`hustle-kind-text ${ activeMenu.progress ? 'hustle-kind-text-selected' : ''}`}>
                    In-progress ({Object.keys(hustles).length > 0 ? hustles?.in_progress.length : 0})
                  </h1>
                </div>
                <div onClick={() => handleIdOptionChange('pending')} className={`hustle-kind cursor-pointer ${ activeMenu.pending ? 'hustle-kind-selected' : '' }`}>
                  <h1 className={`hustle-kind-text ${ activeMenu.pending ? 'hustle-kind-text-selected' : ''}`}>
                    Pending approval ({Object.keys(hustles).length > 0 ? hustles?.pending_creator_approval.length : 0})
                  </h1>
                </div>
                <div onClick={() => handleIdOptionChange('completed')} className={`hustle-kind cursor-pointer ${ activeMenu.completed ? 'hustle-kind-selected' : '' }`}>
                  <h1 className={`hustle-kind-text ${ activeMenu.completed ? 'hustle-kind-text-selected' : ''}`}>
                    Completed ({Object.keys(hustles).length > 0 ? hustles?.completed.length : 0})
                  </h1>
                </div>
                <div onClick={() => handleIdOptionChange('saved_hustles')} className={`hustle-kind cursor-pointer ${ activeMenu.saved_hustles ? 'hustle-kind-selected' : '' }`}>
                  <h1 className={`hustle-kind-text ${ activeMenu.saved_hustles ? 'hustle-kind-text-selected' : ''}`}>Saved hustles</h1>
                </div>
                <div onClick={() => handleIdOptionChange('reviews')} className={`hustle-kind cursor-pointer ${ activeMenu.reviews ? 'hustle-kind-selected' : '' }`}>
                  <h1 className={`hustle-kind-text ${ activeMenu.reviews ? 'hustle-kind-text-selected' : ''}`}>All reviews</h1>
                </div>
              </div>

              { activeMenu.applied ? 
                <>
                  {hustles?.pending?.length > 0 ? 
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12 mt-8">
                      { hustles.pending.map((item, index) => {
                        return <div className="info-card">
                        <div className="relative bg-cover bg-center min-h-[20vh] flex items-center justify-center info-card-border"
                          style={{ backgroundImage: `url(${item.image ? item.image : NoInfoImg})` }}
                        >
                          <svg className="absolute right-12 top-3" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="16" fill="#F9F9F9"/>
                            <g clip-path="url(#clip0_7616_61193)">
                            <path d="M22 20.08C21.24 20.08 20.56 20.38 20.04 20.85L12.91 16.7C12.96 16.47 13 16.24 13 16C13 15.76 12.96 15.53 12.91 15.3L19.96 11.19C20.5 11.69 21.21 12 22 12C23.66 12 25 10.66 25 9C25 7.34 23.66 6 22 6C20.34 6 19 7.34 19 9C19 9.24 19.04 9.47 19.09 9.7L12.04 13.81C11.5 13.31 10.79 13 10 13C8.34 13 7 14.34 7 16C7 17.66 8.34 19 10 19C10.79 19 11.5 18.69 12.04 18.19L19.16 22.35C19.11 22.56 19.08 22.78 19.08 23C19.08 24.61 20.39 25.92 22 25.92C23.61 25.92 24.92 24.61 24.92 23C24.92 21.39 23.61 20.08 22 20.08Z" fill="#575757"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_7616_61193">
                            <rect width="24" height="24" fill="white" transform="translate(4 4)"/>
                            </clipPath>
                            </defs>
                          </svg>
                          <svg className="absolute right-2 top-3" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="16" fill="#F9F9F9"/>
                            <g clip-path="url(#clip0_7616_61197)">
                            <path d="M21 7H11C9.9 7 9.01 7.9 9.01 9L9 25L16 22L23 25V9C23 7.9 22.1 7 21 7ZM21 22L16 19.82L11 22V9H21V22Z" fill="#575757"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_7616_61197">
                            <rect width="24" height="24" fill="white" transform="translate(4 4)"/>
                            </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div className="px-4 py-2">
                          <h1 className="info-card-header">Plumber needed for a bathroom fix</h1>
                          <h1 className="info-card-time">Posted 5 months ago</h1>
                          <h1 className="info-card-header mt-1">Descripton:</h1>
                          <h1 className="info-card-desc info-card-ellipsis">
                            Looking for a skilled plumber to fix a leaking bathroom sink and check the bathroom pipes for any blockages. Should be reliable, fast, and have basic tools. Estimated Duration should be 1–2 hours. I’m available on weekends
                          </h1>
                          <div className="grid grid-cols-3 mt-2">
                            <div>
                              <h1 className="info-card-time info-card-time-alt">Experience level:</h1>
                              <h1 className="info-card-text-color">Beginner</h1>
                            </div>
                            <div>
                              <h1 className="info-card-time info-card-time-alt">Hustle Duration:</h1>
                              <h1 className="info-card-text-color">3 weeks</h1>
                            </div>
                            <div>
                              <h1 className="info-card-time info-card-time-alt">Amount:</h1>
                              <h1 className="info-card-text-color">GHS 1200.00</h1>
                            </div>
                          </div>

                          <button onClick={() => setShowActiveHustleModal(true)} className='flex view-more-button justify-center items-center mt-4'>
                            <h1 className='view-more-button-text'>View more details</h1>
                          </button>
                        </div>
                        </div>
                      })}
                    </div>
                    :
                    <div className="flex justify-center items-center">
                      <NoInfoCard header={'No hustles available'} message={'All pending hustles will be displayed here.'}/>
                    </div>
                  }
                </>
                : null
              }

              { activeMenu.progress ? 
                <>
                  {hustles?.in_progress?.length > 0 ? 
                    <>
                      { hustles.in_progress.map((hustle, index) => {
                        return <div key={index} className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12 mt-8">
                          <div className="info-card">
                            <div className="relative bg-cover bg-center min-h-[20vh] flex items-center justify-center info-card-border"
                              style={{ backgroundImage: `url(${hustle.image ? hustle.image : NoInfoImg})` }}
                            >
                              <svg className="absolute right-12 top-3" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" rx="16" fill="#F9F9F9"/>
                                <g clip-path="url(#clip0_7616_61193)">
                                <path d="M22 20.08C21.24 20.08 20.56 20.38 20.04 20.85L12.91 16.7C12.96 16.47 13 16.24 13 16C13 15.76 12.96 15.53 12.91 15.3L19.96 11.19C20.5 11.69 21.21 12 22 12C23.66 12 25 10.66 25 9C25 7.34 23.66 6 22 6C20.34 6 19 7.34 19 9C19 9.24 19.04 9.47 19.09 9.7L12.04 13.81C11.5 13.31 10.79 13 10 13C8.34 13 7 14.34 7 16C7 17.66 8.34 19 10 19C10.79 19 11.5 18.69 12.04 18.19L19.16 22.35C19.11 22.56 19.08 22.78 19.08 23C19.08 24.61 20.39 25.92 22 25.92C23.61 25.92 24.92 24.61 24.92 23C24.92 21.39 23.61 20.08 22 20.08Z" fill="#575757"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_7616_61193">
                                <rect width="24" height="24" fill="white" transform="translate(4 4)"/>
                                </clipPath>
                                </defs>
                              </svg>
                              <svg className="absolute right-2 top-3" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" rx="16" fill="#F9F9F9"/>
                                <g clip-path="url(#clip0_7616_61197)">
                                <path d="M21 7H11C9.9 7 9.01 7.9 9.01 9L9 25L16 22L23 25V9C23 7.9 22.1 7 21 7ZM21 22L16 19.82L11 22V9H21V22Z" fill="#575757"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_7616_61197">
                                <rect width="24" height="24" fill="white" transform="translate(4 4)"/>
                                </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="px-4 py-2">
                              <h1 className="info-card-header">{hustle.title}</h1>
                              <h1 className="info-card-time">{hustle.posted_at}</h1>
                              <h1 className="info-card-header mt-1">Descripton:</h1>
                              <h1 className="info-card-desc info-card-ellipsis">
                                {hustle.description}
                              </h1>
                              <div className="grid grid-cols-3 mt-2">
                                <div>
                                  <h1 className="info-card-time info-card-time-alt">Experience level:</h1>
                                  <h1 className="info-card-text-color">{hustle.experience_level ? hustle.experience_level : 'Not specified'}</h1>
                                </div>
                                <div>
                                  <h1 className="info-card-time info-card-time-alt">Hustle Duration:</h1>
                                  <h1 className="info-card-text-color">3 weeks</h1>
                                </div>
                                <div>
                                  <h1 className="info-card-time info-card-time-alt">Amount:</h1>
                                  <h1 className="info-card-text-color">GHS {hustle.budget}</h1>
                                </div>
                              </div>

                              <button onClick={() => showHustleDetails(hustle)} className='flex view-more-button justify-center items-center mt-4'>
                                <h1 className='view-more-button-text'>View more details</h1>
                              </button>
                            </div>
                          </div>
                        </div>
                      })}  
                    </>
                    :
                    <div className="flex justify-center items-center">
                      <NoInfoCard header={'No hustles available'} message={'All pending hustles will be displayed here.'}/>
                    </div>
                  }
                </>
                : null
              }

              { activeMenu.pending ? 
                <>
                  {hustles?.pending_creator_approval?.length > 0 ? 
                    <>
                      { hustles.pending_creator_approval.map((hustle, index) => {
                        return <div key={index} className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12 mt-8">
                          <div className="info-card">
                            <div className="relative bg-cover bg-center min-h-[20vh] flex items-center justify-center info-card-border"
                              style={{ backgroundImage: `url(${hustle.image ? hustle.image : NoInfoImg})` }}
                            >
                              <svg className="absolute right-12 top-3" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" rx="16" fill="#F9F9F9"/>
                                <g clip-path="url(#clip0_7616_61193)">
                                <path d="M22 20.08C21.24 20.08 20.56 20.38 20.04 20.85L12.91 16.7C12.96 16.47 13 16.24 13 16C13 15.76 12.96 15.53 12.91 15.3L19.96 11.19C20.5 11.69 21.21 12 22 12C23.66 12 25 10.66 25 9C25 7.34 23.66 6 22 6C20.34 6 19 7.34 19 9C19 9.24 19.04 9.47 19.09 9.7L12.04 13.81C11.5 13.31 10.79 13 10 13C8.34 13 7 14.34 7 16C7 17.66 8.34 19 10 19C10.79 19 11.5 18.69 12.04 18.19L19.16 22.35C19.11 22.56 19.08 22.78 19.08 23C19.08 24.61 20.39 25.92 22 25.92C23.61 25.92 24.92 24.61 24.92 23C24.92 21.39 23.61 20.08 22 20.08Z" fill="#575757"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_7616_61193">
                                <rect width="24" height="24" fill="white" transform="translate(4 4)"/>
                                </clipPath>
                                </defs>
                              </svg>
                              <svg className="absolute right-2 top-3" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" rx="16" fill="#F9F9F9"/>
                                <g clip-path="url(#clip0_7616_61197)">
                                <path d="M21 7H11C9.9 7 9.01 7.9 9.01 9L9 25L16 22L23 25V9C23 7.9 22.1 7 21 7ZM21 22L16 19.82L11 22V9H21V22Z" fill="#575757"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_7616_61197">
                                <rect width="24" height="24" fill="white" transform="translate(4 4)"/>
                                </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="px-4 py-2">
                              <h1 className="info-card-header">{hustle.title}</h1>
                              <h1 className="info-card-time">{hustle.posted_at}</h1>
                              <h1 className="info-card-header mt-1">Descripton:</h1>
                              <h1 className="info-card-desc info-card-ellipsis">
                                {hustle.description}
                              </h1>
                              <div className="grid grid-cols-3 mt-2">
                                <div>
                                  <h1 className="info-card-time info-card-time-alt">Experience level:</h1>
                                  <h1 className="info-card-text-color">{hustle.experience_level ? hustle.experience_level : 'Not specified'}</h1>
                                </div>
                                <div>
                                  <h1 className="info-card-time info-card-time-alt">Hustle Duration:</h1>
                                  <h1 className="info-card-text-color">3 weeks</h1>
                                </div>
                                <div>
                                  <h1 className="info-card-time info-card-time-alt">Amount:</h1>
                                  <h1 className="info-card-text-color">GHS {hustle.budget}</h1>
                                </div>
                              </div>

                              <button onClick={() => showHustleDetails(hustle)} className='flex view-more-button justify-center items-center mt-4'>
                                <h1 className='view-more-button-text'>View more details</h1>
                              </button>
                            </div>
                          </div>
                        </div>
                      })}  
                    </>
                    :
                    <div className="flex justify-center items-center">
                      <NoInfoCard header={'No hustles available'} message={'All pending hustles will be displayed here.'}/>
                    </div>
                  }
                </>
                : null
              }

              { activeMenu.completed ? 
                <>
                  {hustles?.completed?.length > 0 ? 
                    <>
                     { hustles.completed.map((hustle, index) => {
                        return <div key={index} className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12 mt-8">
                          <div className="info-card">
                            <div className="relative bg-cover bg-center min-h-[20vh] flex items-center justify-center info-card-border"
                              style={{ backgroundImage: `url(${hustle.image ? hustle.image : NoInfoImg})` }}
                            >
                              <svg className="absolute right-12 top-3" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" rx="16" fill="#F9F9F9"/>
                                <g clip-path="url(#clip0_7616_61193)">
                                <path d="M22 20.08C21.24 20.08 20.56 20.38 20.04 20.85L12.91 16.7C12.96 16.47 13 16.24 13 16C13 15.76 12.96 15.53 12.91 15.3L19.96 11.19C20.5 11.69 21.21 12 22 12C23.66 12 25 10.66 25 9C25 7.34 23.66 6 22 6C20.34 6 19 7.34 19 9C19 9.24 19.04 9.47 19.09 9.7L12.04 13.81C11.5 13.31 10.79 13 10 13C8.34 13 7 14.34 7 16C7 17.66 8.34 19 10 19C10.79 19 11.5 18.69 12.04 18.19L19.16 22.35C19.11 22.56 19.08 22.78 19.08 23C19.08 24.61 20.39 25.92 22 25.92C23.61 25.92 24.92 24.61 24.92 23C24.92 21.39 23.61 20.08 22 20.08Z" fill="#575757"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_7616_61193">
                                <rect width="24" height="24" fill="white" transform="translate(4 4)"/>
                                </clipPath>
                                </defs>
                              </svg>
                              <svg className="absolute right-2 top-3" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" rx="16" fill="#F9F9F9"/>
                                <g clip-path="url(#clip0_7616_61197)">
                                <path d="M21 7H11C9.9 7 9.01 7.9 9.01 9L9 25L16 22L23 25V9C23 7.9 22.1 7 21 7ZM21 22L16 19.82L11 22V9H21V22Z" fill="#575757"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_7616_61197">
                                <rect width="24" height="24" fill="white" transform="translate(4 4)"/>
                                </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="px-4 py-2">
                              <h1 className="info-card-header">{hustle.title}</h1>
                              <h1 className="info-card-time">{hustle.posted_at}</h1>
                              <h1 className="info-card-header mt-1">Descripton:</h1>
                              <h1 className="info-card-desc info-card-ellipsis">
                                {hustle.description}
                              </h1>
                              <div className="grid grid-cols-3 mt-2">
                                <div>
                                  <h1 className="info-card-time info-card-time-alt">Experience level:</h1>
                                  <h1 className="info-card-text-color">{hustle.experience_level ? hustle.experience_level : 'Not specified'}</h1>
                                </div>
                                <div>
                                  <h1 className="info-card-time info-card-time-alt">Hustle Duration:</h1>
                                  <h1 className="info-card-text-color">3 weeks</h1>
                                </div>
                                <div>
                                  <h1 className="info-card-time info-card-time-alt">Amount:</h1>
                                  <h1 className="info-card-text-color">GHS {hustle.budget}</h1>
                                </div>
                              </div>

                              <button onClick={() => showHustleDetails(hustle)} className='flex view-more-button justify-center items-center mt-4'>
                                <h1 className='view-more-button-text'>View more details</h1>
                              </button>
                            </div>
                          </div>
                        </div>
                      })} 
                    </>
                    :
                    <div className="flex justify-center items-center">
                      <NoInfoCard header={'No hustles available'} message={'All pending hustles will be displayed here.'}/>
                    </div>
                  }
                </>
                : null
              }

              { activeMenu.saved_hustles ? 
                <>
                  {hustles?.completed?.length > 0 ? 
                    <>
                     { hustles.completed.map((hustle, index) => {
                        return <div key={index} className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12 mt-8">
                          <div className="info-card">
                            <div className="relative bg-cover bg-center min-h-[20vh] flex items-center justify-center info-card-border"
                              style={{ backgroundImage: `url(${hustle.image ? hustle.image : NoInfoImg})` }}
                            >
                              <svg className="absolute right-12 top-3" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" rx="16" fill="#F9F9F9"/>
                                <g clip-path="url(#clip0_7616_61193)">
                                <path d="M22 20.08C21.24 20.08 20.56 20.38 20.04 20.85L12.91 16.7C12.96 16.47 13 16.24 13 16C13 15.76 12.96 15.53 12.91 15.3L19.96 11.19C20.5 11.69 21.21 12 22 12C23.66 12 25 10.66 25 9C25 7.34 23.66 6 22 6C20.34 6 19 7.34 19 9C19 9.24 19.04 9.47 19.09 9.7L12.04 13.81C11.5 13.31 10.79 13 10 13C8.34 13 7 14.34 7 16C7 17.66 8.34 19 10 19C10.79 19 11.5 18.69 12.04 18.19L19.16 22.35C19.11 22.56 19.08 22.78 19.08 23C19.08 24.61 20.39 25.92 22 25.92C23.61 25.92 24.92 24.61 24.92 23C24.92 21.39 23.61 20.08 22 20.08Z" fill="#575757"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_7616_61193">
                                <rect width="24" height="24" fill="white" transform="translate(4 4)"/>
                                </clipPath>
                                </defs>
                              </svg>
                              <svg className="absolute right-2 top-3" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" rx="16" fill="#F9F9F9"/>
                                <g clip-path="url(#clip0_7616_61197)">
                                <path d="M21 7H11C9.9 7 9.01 7.9 9.01 9L9 25L16 22L23 25V9C23 7.9 22.1 7 21 7ZM21 22L16 19.82L11 22V9H21V22Z" fill="#575757"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_7616_61197">
                                <rect width="24" height="24" fill="white" transform="translate(4 4)"/>
                                </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="px-4 py-2">
                              <h1 className="info-card-header">{hustle.title}</h1>
                              <h1 className="info-card-time">{hustle.posted_at}</h1>
                              <h1 className="info-card-header mt-1">Descripton:</h1>
                              <h1 className="info-card-desc info-card-ellipsis">
                                {hustle.description}
                              </h1>
                              <div className="grid grid-cols-3 mt-2">
                                <div>
                                  <h1 className="info-card-time info-card-time-alt">Experience level:</h1>
                                  <h1 className="info-card-text-color">{hustle.experience_level ? hustle.experience_level : 'Not specified'}</h1>
                                </div>
                                <div>
                                  <h1 className="info-card-time info-card-time-alt">Hustle Duration:</h1>
                                  <h1 className="info-card-text-color">3 weeks</h1>
                                </div>
                                <div>
                                  <h1 className="info-card-time info-card-time-alt">Amount:</h1>
                                  <h1 className="info-card-text-color">GHS {hustle.budget}</h1>
                                </div>
                              </div>

                              <button onClick={() => showHustleDetails(hustle)} className='flex view-more-button justify-center items-center mt-4'>
                                <h1 className='view-more-button-text'>View more details</h1>
                              </button>
                            </div>
                          </div>
                        </div>
                      })} 
                    </>
                    :
                    <div className="flex justify-center items-center">
                      <NoInfoCard header={'No hustles available'} message={'All pending hustles will be displayed here.'}/>
                    </div>
                  }
                </>
                : null
              }
            </>
          }
        </div>

        {showMyBookingModal && (
          <MyBookingModal
            show={showMyBookingModal}
            handleClose={() => setShowMyBookingModal(false)}
            pendingBookings={hustles.pending_hustler_approval}
            acceptedBookings={hustles.accepted}
            handleOpenDetail={(selectedBooking) => {
              setSelectedHustleBooking(selectedBooking)
              setShowMyBookingModal(false);
              setShowMyBookingDetailModal(true)
            }}
          />
        )}

        { showMyBookingDetailModal && (
          <MyBookingDetailModal 
            show={showMyBookingDetailModal}
            showBookingInfo={selectedHustleBooking}
            handleClose={() => setShowMyBookingDetailModal(false)}
          />
        )}

        { showActiveHustleModal && (
          <ActiveHustleDetailModal 
            show={showActiveHustleModal}
            handleClose={() => setShowActiveHustleModal(false)}
            activeHustleDetails={selectedHustle}
            statusMessage={activeMenu}
            confirmHustle={() => handleUpdate()}
          />
        )}

        { showConfirmHustleModal && (
          <ConfirmHustleModal 
            show={showConfirmHustleModal}
            handleClose={() => {
              setShowConfirmHustleModal(false)
              setShowRateModal(true)
              // confirmHustleCompleted()
            }}
          />
        )}

        { showRateModal && (
          <RateHustlerModal 
            show={showRateModal}
            activeHustleDetails={selectedHustle}
            handleRating={(rating, comments) => handleHustleRatings(rating, comments)}
            handleClose={() => {
              setShowRateModal(false)
            }}
          />
        )}
      </main>
    </div>
  )
}