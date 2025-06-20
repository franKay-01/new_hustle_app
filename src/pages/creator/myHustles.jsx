import { useState } from "react"
import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import CategoryImg from "../../assets/images/cat.png"
import MyBookingModal from "../../components/modals/myBooking_modal"
import MyBookingDetailModal from "../../components/modals/myBooking_details"
import ActiveHustleDetailModal from "../../components/modals/active_hustle_modal"
import ConfirmHustleModal from "../../components/modals/confirm_hustle"
import NoInfoCard from "../../components/no_info_card"
import CreateHustleModal from "../../components/modals/create_hustle_modal"
import CreatorViewHustleDetailModal from "../../components/modals/creator_view_hustle"
import ApplicantDetailsModal from "../../components/modals/applicant_details_modal"
import CreatorHustleAppovalModal from "../../components/modals/creator_hustle_approval_modal"

export default function MyCreatorHustlesPage(){
  const [showMyBookingModal, setShowMyBookingModal] = useState(false)
  const [showApplicantDetailsModal, setShowApplicantDetailsModal] = useState(false)
  const [showCreateHustleModal, setShowCreateHustleModal] = useState(false)
  const [showCreatorViewHustleModal, setShowCreatorViewHustleModal] = useState(false)
  const [showMyBookingDetailModal, setShowMyBookingDetailModal] = useState(false)
  const [showActiveHustleModal, setShowActiveHustleModal] = useState(false)
  const [showConfirmHustleModal, setShowConfirmHustleModal] = useState(false)
  const [showApproval, setShowApproval] = useState(false)

  const [activeMenu, setActiveMenu] = useState({applied: true, progress: false, pending: false, completed: false, saved_hustles: false, reviews: false})
  const [hustleChargeAmount, setHustleChargeAmount] = useState(0)

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

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F6F6]">
      <Sidebar />

      <main className="flex-1 bg-[#F5F5F5] overflow-y-auto">
        <Navbar />
        <div className="pl-5 pr-5 pt-2">
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
              <h1 className={`hustle-kind-text ${ activeMenu.applied ? 'hustle-kind-text-selected' : ''}`}>Applied (0)</h1>
            </div>
            <div onClick={() => handleIdOptionChange('progress')} className={`hustle-kind cursor-pointer ${ activeMenu.progress ? 'hustle-kind-selected' : '' }`}>
              <h1 className={`hustle-kind-text ${ activeMenu.progress ? 'hustle-kind-text-selected' : ''}`}>In-progress (1)</h1>
            </div>
            <div onClick={() => handleIdOptionChange('pending')} className={`hustle-kind cursor-pointer ${ activeMenu.pending ? 'hustle-kind-selected' : '' }`}>
              <h1 className={`hustle-kind-text ${ activeMenu.pending ? 'hustle-kind-text-selected' : ''}`}>Pending approval</h1>
            </div>
            <div onClick={() => handleIdOptionChange('completed')} className={`hustle-kind cursor-pointer ${ activeMenu.completed ? 'hustle-kind-selected' : '' }`}>
              <h1 className={`hustle-kind-text ${ activeMenu.completed ? 'hustle-kind-text-selected' : ''}`}>Completed</h1>
            </div>
            <div onClick={() => handleIdOptionChange('saved_hustles')} className={`hustle-kind cursor-pointer ${ activeMenu.saved_hustles ? 'hustle-kind-selected' : '' }`}>
              <h1 className={`hustle-kind-text ${ activeMenu.saved_hustles ? 'hustle-kind-text-selected' : ''}`}>Saved hustles</h1>
            </div>
            <div onClick={() => handleIdOptionChange('reviews')} className={`hustle-kind cursor-pointer ${ activeMenu.reviews ? 'hustle-kind-selected' : '' }`}>
              <h1 className={`hustle-kind-text ${ activeMenu.reviews ? 'hustle-kind-text-selected' : ''}`}>All reviews</h1>
            </div>
          </div>
          { activeMenu.applied ? 
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
            : null
          }

          { activeMenu.progress ? 
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12 mt-8">
              <div className="info-card p-3">
                <div className="grid grid-cols-3">
                  <h1 className="view-more-header !text-[16px] col-span-2">Plumber needed for a bathroom fix for quick gigs</h1>
                  <div className="flex flex-row justify-end">
                    <h1 className="info-card-desc !text-[#0542D4] !text-[14.5px]">4 applicants</h1>
                  </div>
                </div>
                <div className="p-1 flex flex-col">
                  <img src={CategoryImg} className="h-28 rounded-md mt-2"/>
                  <h1 className='modal-header-text-alt mt-2'>Description:</h1>
                  <h1 className="info-card-desc line-clamp-2">
                    Looking for a skilled plumber to fix a leaking bathroom sink and check the bathroom pipes for any blockages. Should be reliable, fast, and have basic tools. Estimated Duration should be 1–2 hours. I’m available on weekends
                  </h1>
                </div>
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
                <button onClick={() => setShowCreatorViewHustleModal(true)} className='flex view-more-button view-more-button-alt justify-center items-center mt-4'>
                  <h1 className='view-more-button-text'>View more details</h1>
                </button>
              </div>
            </div>
            : null
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
            handleCheckApplicant={() => {
              setShowCreatorViewHustleModal(false)
              setShowApplicantDetailsModal(true)
            }}
          />
        )}

        { showApplicantDetailsModal && (
          <ApplicantDetailsModal 
            show={showApplicantDetailsModal}
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
            handleClose={() => setShowApproval(false)}
          />
        )}

        { showActiveHustleModal && (
          <ActiveHustleDetailModal 
            show={showActiveHustleModal}
            handleClose={() => setShowActiveHustleModal(false)}
            statusMessage={activeMenu}
            confirmHustle={() => setShowConfirmHustleModal(true)}
          />
        )}

        { showConfirmHustleModal && (
          <ConfirmHustleModal 
            show={showConfirmHustleModal}
            handleClose={() => setShowConfirmHustleModal(false)}
          />
        )}
      </main>
    </div>
  )
}