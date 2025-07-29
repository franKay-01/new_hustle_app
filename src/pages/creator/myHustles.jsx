import { useEffect, useState } from "react"
import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import NoInfoImg from "../../assets/images/no_info_img.png"
import MyBookingModal from "../../components/modals/myBooking_modal"
import MyBookingDetailModal from "../../components/modals/myBooking_details"
import ActiveHustleDetailModal from "../../components/modals/active_hustle_modal"
import ConfirmHustleModal from "../../components/modals/confirm_hustle"
import NoInfoCard from "../../components/no_info_card"
import CreateHustleModal from "../../components/modals/create_hustle_modal"
import CreatorViewHustleDetailModal from "../../components/modals/creator_view_hustle"
import ApplicantDetailsModal from "../../components/modals/applicant_details_modal"
import CreatorHustleAppovalModal from "../../components/modals/creator_hustle_approval_modal"
import useHustleFunctions from "../../utils/hustles"
import { ShowToast } from "../../components/showToast"
import Loader from "../../components/loader"
import Cookies from 'js-cookie'
import RateHustlerModal from "../../components/modals/rate_modal"
import { useNavigate } from "react-router-dom"

export default function MyCreatorHustlesPage(){
  const [showMyBookingModal, setShowMyBookingModal] = useState(false)
  const [showApplicantDetailsModal, setShowApplicantDetailsModal] = useState(false)
  const [showCreateHustleModal, setShowCreateHustleModal] = useState(false)
  const [showCreatorViewHustleModal, setShowCreatorViewHustleModal] = useState(false)
  const [showMyBookingDetailModal, setShowMyBookingDetailModal] = useState(false)
  const [showConfirmHustleModal, setShowConfirmHustleModal] = useState(false)
  const [showApproval, setShowApproval] = useState(false)
  const [hustles, setHustles] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [selectedHustle, setSelectedHustle] = useState({})
  const [showRateModal, setShowRateModal] = useState(false)
  const [bidderInfo, setBidder] = useState({})
  
  const [activeMenu, setActiveMenu] = useState({applied: true, progress: false, pending: false, 
    completed: false, saved_hustles: false, reviews: false, pending_hustler: false})
  const [hustleChargeAmount, setHustleChargeAmount] = useState(0)

  const { getAllHustlerStats, updateHustlerRating, updateHustleStatus, handleProposalStatus } = useHustleFunctions()
  const history = useNavigate()

  const getStats = async () => {
    setIsLoading(true)

    const {response_code, stats} = await getAllHustlerStats(Cookies.get('huid'))

    if (response_code === 200){

      const transformed = Object.fromEntries(
        Object.entries(stats).map(([key, value]) => [
          key.replace(/-/g, '_'),
          value
        ])
      );

      const pending_hustles = [...transformed.pending, ...transformed.open]

      transformed.pending = pending_hustles

      setHustles(transformed)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    ShowToast("error", "Hustle retrieval failed. Try again!")
    return
  }

  const getDuration = (start_time, end_time) => {
    const [startH, startM, startS] = start_time.split(":").map(Number);
    const [endH, endM, endS] = end_time.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startH, startM, startS);

    const endDate = new Date();
    endDate.setHours(endH, endM, endS);

    // Calculate the difference in milliseconds
    const diffMs = endDate.getTime() - startDate.getTime();

    // Convert to hours and minutes
    const diffMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;

    return `${hours}h ${minutes}m`
  }

  const showHustleDetails = (hustle) => {
    setSelectedHustle(hustle)
    setShowCreatorViewHustleModal(true)
  }

  const handleIdOptionChange = (key) => {
    setActiveMenu({
      ...activeMenu,
      applied: key === 'applied',
      progress: key === 'progress',
      pending: key === 'pending',
      pending_hustler: key === 'pending_hustler',
      completed: key === 'completed',
      saved_hustles: key === 'saved_hustles',
      reviews: key === 'reviews',
    });
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
      window.location.reload()
      return
    }

    setIsLoading(false)
    ShowToast("error", msg)
    return
  }

  const confirmHustleCompleted = async () => {
    setIsLoading(true)

    const params = {
      "status": 'completed',
      "comment": '',
      "hustle_id": selectedHustle.hustle_uuid
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
  }

  const submitProposalStatusChange = async () => {
    setIsLoading(true)

    const {response_code, msg} = await handleProposalStatus(selectedHustle.hustle_uuid, bidderInfo.id);
    if (response_code === 200){
      setIsLoading(false)
      ShowToast("success", "Propsal accepted")
      window.location.reload();
      return
    }

    if (response_code === 401){
      ShowToast("error", "Session expired. Sign in to continue!")
      return history('/creator/home')
    }

    setIsLoading(false)
    ShowToast("error", msg)
  }

  useEffect(() => {
    getStats()
  }, [])

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
                <button onClick={() => setShowCreateHustleModal(true)} className='flex flex-row gap-2 my-booking-button justify-center items-center'>
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_7833_13326)">
                    <path d="M12.5 2C6.98 2 2.5 6.48 2.5 12C2.5 17.52 6.98 22 12.5 22C18.02 22 22.5 17.52 22.5 12C22.5 6.48 18.02 2 12.5 2ZM17.5 13H13.5V17H11.5V13H7.5V11H11.5V7H13.5V11H17.5V13Z" fill="#FBFBFB"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_7833_13326">
                    <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
                    </clipPath>
                    </defs>
                  </svg>
                  <h1 className='view-more-button-text'>Create a hustle</h1>
                </button>
              </div>
              <hr className="default"/>
              <div className="flex flex-row mt-[1rem] gap-4 overflow-x-auto whitespace-nowrap">
                <div onClick={() => handleIdOptionChange('applied')} className={`hustle-kind cursor-pointer ${ activeMenu.applied ? 'hustle-kind-selected' : '' }`}>
                  <h1 className={`hustle-kind-text ${ activeMenu.applied ? 'hustle-kind-text-selected' : ''}`}>
                    Created ({Object.keys(hustles).length > 0 ? hustles?.pending.length : 0})
                  </h1>
                </div>
                <div onClick={() => handleIdOptionChange('pending_hustler')} className={`hustle-kind cursor-pointer ${ activeMenu.pending_hustler ? 'hustle-kind-selected' : '' }`}>
                  <h1 className={`hustle-kind-text ${ activeMenu.pending_hustler ? 'hustle-kind-text-selected' : ''}`}>
                    Bookings ({Object.keys(hustles).length > 0 ? hustles?.pending_hustler_approval.length : 0})
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
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12 mt-8">
                        { hustles.pending.map((hustle, index) => {
                          return <div key={index} className="info-card p-3">
                            <div className="grid grid-cols-3">
                              <h1 className="view-more-header !text-[16px] col-span-2">{hustle.title}</h1>
                            </div>
                            <div className="p-1 flex flex-col">
                              <img src={hustle.image ? hustle.image : NoInfoImg} className="h-28 rounded-md mt-2"/>
                              <h1 className='modal-header-text-alt mt-2'>Description:</h1>
                              <h1 className="info-card-desc line-clamp-2">
                                {hustle.description}
                              </h1>
                            </div>
                            <div className="grid grid-cols-3 mt-2">
                                <div>
                                  <h1 className="info-card-time info-card-time-alt">Experience level:</h1>
                                  <h1 className="info-card-text-color">{hustle.experience_level ? hustle.experience_level : "Not specified"}</h1>
                                </div>
                                <div>
                                  <h1 className="info-card-time info-card-time-alt">Hustle Duration:</h1>
                                  <h1 className="info-card-text-color">{getDuration(hustle.preferred_start_time, hustle.preferred_end_time)}</h1>
                                </div>
                                <div>
                                  <h1 className="info-card-time info-card-time-alt">Amount:</h1>
                                  <h1 className="info-card-text-color">GHS {hustle.budget}</h1>
                                </div>
                              </div>
                            <button onClick={() => showHustleDetails(hustle)} className='flex view-more-button view-more-button-alt justify-center items-center mt-4'>
                              <h1 className='view-more-button-text'>View more details</h1>
                            </button>
                          </div>
                        })}
                      </div>
                    </>
                    :
                    <div className="flex flex-col items-center justify-center">
                      <NoInfoCard header={'No created hustle'} message={'All hustles created will be displayed here'}/>
                      <button onClick={() => setShowCreateHustleModal(true)} className='flex flex-row gap-2 my-booking-button justify-center items-center'>
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_7833_13326)">
                          <path d="M12.5 2C6.98 2 2.5 6.48 2.5 12C2.5 17.52 6.98 22 12.5 22C18.02 22 22.5 17.52 22.5 12C22.5 6.48 18.02 2 12.5 2ZM17.5 13H13.5V17H11.5V13H7.5V11H11.5V7H13.5V11H17.5V13Z" fill="#FBFBFB"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_7833_13326">
                          <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
                          </clipPath>
                          </defs>
                        </svg>
                        <h1 className='view-more-button-text'>Create a hustle</h1>
                      </button>
                    </div>
                  }
                  </>
                : null
              }

              { activeMenu.pending_hustler ? 
                <>
                  {hustles?.pending_hustler_approval?.length > 0 ? 
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12 mt-8">
                    { hustles.pending_hustler_approval.map((hustle, index) => {
                      return <div key={index} className="info-card p-3">
                        <div className="grid grid-cols-3">
                          <h1 className="view-more-header !text-[16px] col-span-2">{hustle.title}</h1>
                        </div>
                        <div className="p-1 flex flex-col">
                          <img src={hustle.image ? hustle.image : NoInfoImg} className="h-28 rounded-md mt-2"/>
                          <h1 className='modal-header-text-alt mt-2'>Description:</h1>
                          <h1 className="info-card-desc line-clamp-2">
                            {hustle.description}
                          </h1>
                        </div>
                        <div className="grid grid-cols-3 mt-2">
                          <div>
                            <h1 className="info-card-time info-card-time-alt">Experience level:</h1>
                            <h1 className="info-card-text-color">{hustle.experience_level ? hustle.experience_level : "Not specified"}</h1>
                          </div>
                          <div>
                            <h1 className="info-card-time info-card-time-alt">Hustle Duration:</h1>
                            <h1 className="info-card-text-color">{getDuration(hustle.preferred_start_time, hustle.preferred_end_time)}</h1>
                          </div>
                          <div>
                            <h1 className="info-card-time info-card-time-alt">Amount:</h1>
                            <h1 className="info-card-text-color">GHS {hustle.budget}</h1>
                          </div>
                        </div>
                        <button onClick={() => showHustleDetails(hustle)} className='flex view-more-button view-more-button-alt justify-center items-center mt-4'>
                          <h1 className='view-more-button-text'>View more details</h1>
                        </button>
                      </div>
                    })}
                  </div>
                  : 
                  <div className="flex justify-center items-center">
                    <NoInfoCard header={'No hustles available'} message={'All pending hustles will be displayed here.'}/>
                  </div>
                  }
                </>:null
              }

              { activeMenu.progress ? 
                <>
                  {hustles?.in_progress?.length > 0 ? 
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12 mt-8">
                    { hustles.in_progress.map((hustle, index) => {
                      return <div key={index} className="info-card p-3">
                        <div className="grid grid-cols-3">
                          <h1 className="view-more-header !text-[16px] col-span-2">{hustle.title}</h1>
                        </div>
                        <div className="p-1 flex flex-col">
                          <img src={hustle.image ? hustle.image : NoInfoImg} className="h-28 rounded-md mt-2"/>
                          <h1 className='modal-header-text-alt mt-2'>Description:</h1>
                          <h1 className="info-card-desc line-clamp-2">
                            {hustle.description}
                          </h1>
                        </div>
                        <div className="grid grid-cols-3 mt-2">
                            <div>
                              <h1 className="info-card-time info-card-time-alt">Experience level:</h1>
                              <h1 className="info-card-text-color">{hustle.experience_level ? hustle.experience_level : "Not specified"}</h1>
                            </div>
                            <div>
                              <h1 className="info-card-time info-card-time-alt">Hustle Duration:</h1>
                              <h1 className="info-card-text-color">{getDuration(hustle.preferred_start_time, hustle.preferred_end_time)}</h1>
                            </div>
                            <div>
                              <h1 className="info-card-time info-card-time-alt">Amount:</h1>
                              <h1 className="info-card-text-color">GHS {hustle.budget}</h1>
                            </div>
                          </div>
                        <button onClick={() => showHustleDetails(hustle)} className='flex view-more-button view-more-button-alt justify-center items-center mt-4'>
                          <h1 className='view-more-button-text'>View more details</h1>
                        </button>
                      </div>
                    })}
                  </div>
                  : 
                  <div className="flex justify-center items-center">
                    <NoInfoCard header={'No hustles available'} message={'All pending hustles will be displayed here.'}/>
                  </div>
                  }
                </>:null
              }

              { activeMenu.pending ? 
                <>
                  {hustles?.pending_creator_approval?.length > 0 ? 
                    <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12 mt-8">
                      { hustles.pending_creator_approval.map((hustle, index) => {
                        return <div key={index} className="info-card p-3">
                        <div className="grid grid-cols-3">
                          <h1 className="view-more-header !text-[16px] col-span-2">{hustle.title}</h1>
                        </div>
                        <div className="p-1 flex flex-col">
                          <img src={hustle.image ? hustle.image : NoInfoImg} className="h-28 rounded-md mt-2"/>
                          <h1 className='modal-header-text-alt mt-2'>Description:</h1>
                          <h1 className="info-card-desc line-clamp-2">
                            {hustle.description}
                          </h1>
                        </div>
                        <div className="grid grid-cols-3 mt-2">
                            <div>
                              <h1 className="info-card-time info-card-time-alt">Experience level:</h1>
                              <h1 className="info-card-text-color">{hustle.experience_level ? hustle.experience_level : "Not specified"}</h1>
                            </div>
                            <div>
                              <h1 className="info-card-time info-card-time-alt">Hustle Duration:</h1>
                              <h1 className="info-card-text-color">{getDuration(hustle.preferred_start_time, hustle.preferred_end_time)}</h1>
                            </div>
                            <div>
                              <h1 className="info-card-time info-card-time-alt">Amount:</h1>
                              <h1 className="info-card-text-color">GHS {hustle.budget}</h1>
                            </div>
                          </div>
                        <button onClick={() => showHustleDetails(hustle)} className='flex view-more-button view-more-button-alt justify-center items-center mt-4'>
                          <h1 className='view-more-button-text'>View more details</h1>
                        </button>
                      </div>
                      })} 
                      </div> 
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
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12 mt-8">
                      { hustles.completed.map((hustle, index) => {
                        return <div key={index} className="info-card p-3">
                        <div className="grid grid-cols-3">
                          <h1 className="view-more-header !text-[16px] col-span-2">{hustle.title}</h1>
                        </div>
                        <div className="p-1 flex flex-col">
                          <img src={hustle.image ? hustle.image : NoInfoImg} className="h-28 rounded-md mt-2"/>
                          <h1 className='modal-header-text-alt mt-2'>Description:</h1>
                          <h1 className="info-card-desc line-clamp-2">
                            {hustle.description}
                          </h1>
                        </div>
                        <div className="grid grid-cols-3 mt-2">
                            <div>
                              <h1 className="info-card-time info-card-time-alt">Experience level:</h1>
                              <h1 className="info-card-text-color">{hustle.experience_level ? hustle.experience_level : "Not specified"}</h1>
                            </div>
                            <div>
                              <h1 className="info-card-time info-card-time-alt">Hustle Duration:</h1>
                              <h1 className="info-card-text-color">{getDuration(hustle.preferred_start_time, hustle.preferred_end_time)}</h1>
                            </div>
                            <div>
                              <h1 className="info-card-time info-card-time-alt">Amount:</h1>
                              <h1 className="info-card-text-color">GHS {hustle.budget}</h1>
                            </div>
                          </div>
                        <button onClick={() => showHustleDetails(hustle)} className='flex view-more-button view-more-button-alt justify-center items-center mt-4'>
                          <h1 className='view-more-button-text'>View more details</h1>
                        </button>
                      </div>
                      })} 
                      </div> 
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
            handleOpenDetail={() => {
              setShowMyBookingModal(false);
              setShowMyBookingDetailModal(true)
            }}
          />
        )}

        { showCreateHustleModal && (
          <CreateHustleModal 
            show={showCreateHustleModal}
            handleClose={() => setShowCreateHustleModal(false)}
          />
        )}

        { showCreatorViewHustleModal && (
          <CreatorViewHustleDetailModal 
            show={showCreatorViewHustleModal}
            handleClose={() => setShowCreatorViewHustleModal(false)}
            activeHustleDetails={selectedHustle}
            statusMessage={activeMenu}
            handleComplete={() => {
              confirmHustleCompleted()
              setShowCreatorViewHustleModal(false)
            }}
            handleCheckApplicant={(bidder) => {
              setBidder(bidder)
              setShowCreatorViewHustleModal(false)
              setShowApplicantDetailsModal(true)
            }}
          />
        )}

        { showApplicantDetailsModal && (
          <ApplicantDetailsModal 
            show={showApplicantDetailsModal}
            bidderInfoDetails={bidderInfo}
            handleClose={() => {
              setShowCreatorViewHustleModal(true)
              setShowApplicantDetailsModal(false)
            }}
            setHustleAmount={(amount) => setHustleChargeAmount(amount)}
            showModalForApproval = {() => setShowApproval(true)}
          />
        )}

        { showApproval && (
          <CreatorHustleAppovalModal 
            show={showApproval}
            message={`You are about to be debited GHS ${hustleChargeAmount} from your wallet, the money will only be released when the hustler complete their hustle`}
            handleClose={() => {
              setShowApproval(false)
            }}
            handleBidAcceptance={() => {
              setShowApproval(false)
              submitProposalStatusChange()
            }}
          />
        )}

        { showConfirmHustleModal && (
          <ConfirmHustleModal 
            show={showConfirmHustleModal}
            handleClose={() => {
              setShowConfirmHustleModal(false)
              setShowRateModal(true)
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
              window.location.reload()
            }}
          />
        )}
      </main>
    </div>
  )
}