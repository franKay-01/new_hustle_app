import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar";
import NoteImg from "../../assets/images/notes.png"
import CoinImg from "../../assets/images/coin.png"
import CategoryImg from "../../assets/images/cat.png"
import HustleDetailModal from "../../components/modals/detail_modal";
import ProposalModal from "../../components/modals/proposal_modal";
import SuccessModal from "../../components/modals/success_modal";
import useHustleFunctions from "../../utils/hustles"
import useFunctions from "../../utils/functions";
import { ShowToast } from "../../components/showToast";
import NoInfoCard from "../../components/no_info_card";
import Loader from "../../components/loader";

export default function HomePage(){
  const [showHustleDetailsModal, setShowHustleDetailModal] = useState(false)
  const [showProposalModal, setShowProposalModal] = useState(false)
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [allHustles, setAllHustles] = useState([])
  const [allCategories, setAllCategories] = useState([])

  const { getAllCategories } = useFunctions()
  const { retrieveAllHustles } = useHustleFunctions()

  const handleShowProposal = () => {

  }

  const handleAfterProposal = () => {
    setShowProposalModal(false)
    setShowCompleteModal(true)
  }

  const getCategories = async () => {
    const {response_code, categories} = await getAllCategories()
    if (response_code === 200){
      setAllCategories(categories)
      return
    }

    ShowToast("error", "Category details not loaded. Check internet connection and try again")
    return
  }


  const getAllHustles = async () => {

    const {response_code, hustles} = await retrieveAllHustles()
    if (response_code === 200){
      setAllHustles(hustles)
      return
    }

    ShowToast("error", "Hustle retrieval failed. Try again!")
    return
  }

  useEffect(()=>{
    window.scrollTo(0, 0);

    const fetchData = async () => {
      setIsLoading(true); // start loading
  
      try {
        await Promise.all([
          getAllHustles(),
          getCategories()
        ]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false); // end loading
      }
    };
  
    fetchData();
  },[])

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F6F6]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 bg-[#F5F5F5] overflow-y-auto">
        <Navbar />
        
        {/* Page content */}
        <div className="p-6">
          {/* Add your categories, jobs, etc. here */}
          { isLoading ?
            <Loader/>
            :
            <>
              <div className="text-2xl font-bold mb-4 linear-bg relative flex flex-col gap-4">
                <svg className="absolute left-3 top-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_7478_45957)">
                  <path d="M7.07627 11.8637L7.66133 10.5236C8.18207 9.33107 9.11927 8.38174 10.2883 7.86281L11.8988 7.14794C12.4108 6.92067 12.4108 6.17579 11.8988 5.94852L10.3386 5.25597C9.13947 4.72369 8.18547 3.73921 7.67367 2.50597L7.081 1.07783C6.86107 0.547849 6.12879 0.54785 5.90887 1.07783L5.31618 2.50595C4.80438 3.73921 3.85035 4.72369 2.65123 5.25597L1.09105 5.94852C0.579024 6.17579 0.579024 6.92067 1.09105 7.14794L2.70153 7.86281C3.87059 8.38174 4.80781 9.33107 5.3285 10.5236L5.9136 11.8637C6.13851 12.3788 6.85133 12.3788 7.07627 11.8637ZM12.9343 15.1266L13.0988 14.7495C13.3921 14.0771 13.9205 13.5417 14.5797 13.2488L15.0866 13.0235C15.3608 12.9017 15.3608 12.5033 15.0866 12.3815L14.6081 12.1688C13.9319 11.8684 13.3941 11.3132 13.1057 10.6179L12.9368 10.2104C12.819 9.92641 12.4263 9.92641 12.3085 10.2104L12.1396 10.6179C11.8513 11.3132 11.3135 11.8684 10.6373 12.1688L10.1587 12.3815C9.8846 12.5033 9.8846 12.9017 10.1587 13.0235L10.6657 13.2488C11.3249 13.5417 11.8532 14.0771 12.1465 14.7495L12.3111 15.1266C12.4315 15.4027 12.8138 15.4027 12.9343 15.1266Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_7478_45957">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
                <h1 className="banner-header">Find your dream job on Hustle.io</h1>
                <p className="banner-p">We know you want to make so much money with your hustle, that’s why we gave you hustle.io</p>
                <img src={NoteImg} className="hidden lg:flex md:flex lg:absolute md:absolute right-20 top-5"/>
                <img src={CoinImg} className="hidden lg:flex md:flex lg:absolute md:absolute right-4 top-1"/>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <h1 className="main-header mb-2">Categories</h1>
                  { allCategories.length > 0 ?
                    <div className="grid grid-cols-2 gap-2">
                      { allCategories.map((item, index) => {
                        return <div key={index} className="flex flex-col w-[8rem] text-center cursor-pointer">
                          <img className="w-[8rem] h-[5rem] rounded-xl" src={CategoryImg}/>
                          <h1 className="category-desc leading-snug break-normal whitespace-normal">{item.category_name}</h1>
                        </div>
                      })}
                    </div>
                    : 
                    <>
                      <h1 className="modal-header-text !text-[24px] text-center !text-[#0A4F42] font-bold mt-4">No categories</h1>
                    </>
                  }
                </div>
                <div className="col-span-2">

                  {/* Grid for hustles */}
                  { allHustles.length > 0 ? 
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-12 md:gap-12 mt-8">
                      { allHustles.map((item, index) => {
                        return <div className="info-card">
                          <div className="relative bg-cover bg-center min-h-[20vh] flex items-center justify-center info-card-border"
                            style={{ backgroundImage: `url(${CategoryImg})` }}
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

                            <button onClick={() => setShowHustleDetailModal(true)} className='flex view-more-button justify-center items-center mt-4'>
                              <h1 className='view-more-button-text'>View more details</h1>
                            </button>
                          </div>
                        </div>
                      })}
                    </div>
                    :
                    <div className="flex justify-center">
                      <NoInfoCard header={'No hustles available'} message={'All available hustles will be displayed here'}/>
                    </div>
                  } 
                </div>
                <div>
                  <h1 className="main-header mb-2 mt-4">Top Hustlers</h1>
                  <div className="flex flex-col gap-4 overflow-y-auto whitespace-nowrap">
                    <div className="info-card flex flex-col justify-center items-center px-12 py-4">
                      <img src={CategoryImg} className="icon-img w-12 h-12"/>
                      <h1 className="info-card-header">William Howard Taft</h1>
                      <div className="flex flex-row items-center gap-1">
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.1325 12.7343H4.86582C4.58582 12.7343 4.27249 12.5143 4.17916 12.2476L1.41916 4.52763C1.02582 3.42096 1.48582 3.08096 2.43249 3.76096L5.03249 5.62096C5.46582 5.92096 5.95916 5.76763 6.14582 5.28096L7.31916 2.1543C7.69249 1.1543 8.31249 1.1543 8.68582 2.1543L9.85916 5.28096C10.0458 5.76763 10.5392 5.92096 10.9658 5.62096L13.4058 3.88096C14.4458 3.1343 14.9458 3.5143 14.5192 4.72096L11.8258 12.261C11.7258 12.5143 11.4125 12.7343 11.1325 12.7343Z" fill="#FDBA40"/>
                          <path d="M4.33301 14.7476H11.6663" stroke="#FDBA40" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6.33301 9.41455H9.66634" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h1 className="info-card-desc">Accra</h1>
                      </div>
                      <h1 className="info-card-desc">Lash tech</h1>
                      <h1 className="info-card-desc">(10 hustles completed)</h1>
                    </div>
                    <div className="info-card flex flex-col justify-center items-center px-12 py-4">
                      <img src={CategoryImg} className="icon-img w-12 h-12"/>
                      <h1 className="info-card-header">William Howard Taft</h1>
                      <div className="flex flex-row items-center gap-1">
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.1325 12.7343H4.86582C4.58582 12.7343 4.27249 12.5143 4.17916 12.2476L1.41916 4.52763C1.02582 3.42096 1.48582 3.08096 2.43249 3.76096L5.03249 5.62096C5.46582 5.92096 5.95916 5.76763 6.14582 5.28096L7.31916 2.1543C7.69249 1.1543 8.31249 1.1543 8.68582 2.1543L9.85916 5.28096C10.0458 5.76763 10.5392 5.92096 10.9658 5.62096L13.4058 3.88096C14.4458 3.1343 14.9458 3.5143 14.5192 4.72096L11.8258 12.261C11.7258 12.5143 11.4125 12.7343 11.1325 12.7343Z" fill="#FDBA40"/>
                          <path d="M4.33301 14.7476H11.6663" stroke="#FDBA40" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6.33301 9.41455H9.66634" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h1 className="info-card-desc">Accra</h1>
                      </div>
                      <h1 className="info-card-desc">Lash tech</h1>
                      <h1 className="info-card-desc">(10 hustles completed)</h1>
                    </div>
                    <div className="info-card flex flex-col justify-center items-center px-12 py-4">
                      <img src={CategoryImg} className="icon-img w-12 h-12"/>
                      <h1 className="info-card-header">William Howard Taft</h1>
                      <div className="flex flex-row items-center gap-1">
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.1325 12.7343H4.86582C4.58582 12.7343 4.27249 12.5143 4.17916 12.2476L1.41916 4.52763C1.02582 3.42096 1.48582 3.08096 2.43249 3.76096L5.03249 5.62096C5.46582 5.92096 5.95916 5.76763 6.14582 5.28096L7.31916 2.1543C7.69249 1.1543 8.31249 1.1543 8.68582 2.1543L9.85916 5.28096C10.0458 5.76763 10.5392 5.92096 10.9658 5.62096L13.4058 3.88096C14.4458 3.1343 14.9458 3.5143 14.5192 4.72096L11.8258 12.261C11.7258 12.5143 11.4125 12.7343 11.1325 12.7343Z" fill="#FDBA40"/>
                          <path d="M4.33301 14.7476H11.6663" stroke="#FDBA40" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6.33301 9.41455H9.66634" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h1 className="info-card-desc">Accra</h1>
                      </div>
                      <h1 className="info-card-desc">Lash tech</h1>
                      <h1 className="info-card-desc">(10 hustles completed)</h1>
                    </div>
                    <div className="info-card flex flex-col justify-center items-center px-12 py-4">
                      <img src={CategoryImg} className="icon-img w-12 h-12"/>
                      <h1 className="info-card-header">William Howard Taft</h1>
                      <div className="flex flex-row items-center gap-1">
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.1325 12.7343H4.86582C4.58582 12.7343 4.27249 12.5143 4.17916 12.2476L1.41916 4.52763C1.02582 3.42096 1.48582 3.08096 2.43249 3.76096L5.03249 5.62096C5.46582 5.92096 5.95916 5.76763 6.14582 5.28096L7.31916 2.1543C7.69249 1.1543 8.31249 1.1543 8.68582 2.1543L9.85916 5.28096C10.0458 5.76763 10.5392 5.92096 10.9658 5.62096L13.4058 3.88096C14.4458 3.1343 14.9458 3.5143 14.5192 4.72096L11.8258 12.261C11.7258 12.5143 11.4125 12.7343 11.1325 12.7343Z" fill="#FDBA40"/>
                          <path d="M4.33301 14.7476H11.6663" stroke="#FDBA40" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6.33301 9.41455H9.66634" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h1 className="info-card-desc">Accra</h1>
                      </div>
                      <h1 className="info-card-desc">Lash tech</h1>
                      <h1 className="info-card-desc">(10 hustles completed)</h1>
                    </div>
                  </div>
                </div>
              </div>
              
 
            </>
          }
                 
        </div>
        
        {showHustleDetailsModal && (
          <HustleDetailModal
            show={showHustleDetailsModal}
            handleClose={() => setShowHustleDetailModal(false)}
            handleShowProposalModal={() => {
              setShowHustleDetailModal(false)
              setShowProposalModal(true)
            }}
          />
        )}

        {showProposalModal && (
          <ProposalModal
            show={showProposalModal}
            handleClose={() => setShowProposalModal(false)}
            handleCloseAfterProposal={() => handleAfterProposal()}
          />
        )}

        {showCompleteModal && (
          <SuccessModal
            show={showProposalModal}
            handleClose={() => setShowCompleteModal(false)}
            message={'Your proposal has been successfully submitted and is being reviewed'}
          />
        )}
      </main>
    </div>
  );
};
