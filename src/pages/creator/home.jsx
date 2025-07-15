import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar";
import CreatorHomeImg from "../../assets/images/creator_home.png"
import CategoryImg from "../../assets/images/cat.png"
import NoImgIcon from "../../assets/images/client_img.svg"
import CreatorImg from "../../assets/images/creator_image.png"
import HustlerDetailModal from "../../components/modals/hustler_detail_modal";
import ServiceDetailsModal from "../../components/modals/service_details_modal";
import BookHustlerModal from "../../components/modals/book_hustler";
import NoInfoCard from "../../components/no_info_card";
import Loader from "../../components/loader";
import useFunctions from "../../utils/functions";
import { ShowToast } from "../../components/showToast";
import useHustleFunctions from "../../utils/hustles";
import { useNavigate } from "react-router-dom"

export default function CreatorHomePage(){
  const [showHustlerDetailsModal, setShowHustlerDetailModal] = useState(false)
  const [showServiceDetailsModal, setShowServiceDetailModal] = useState(false)
  const [showBookHustlerModal, setShowBookHustlerModal] = useState(false)
  const [allCategories, setAllCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [allHustlers, setAllHustlers] = useState([])
  const [selectedHustler, setSelectedHustler] = useState('')
  const [selectedService, setSelectedService] = useState({})

  const history = useNavigate();

  const { getAllCategories } = useFunctions()
  const { getAllHustlers } = useHustleFunctions()

  const getCategories = async () => {
    const {response_code, categories} = await getAllCategories()
    if (response_code === 200){
      setAllCategories(categories)
      return
    }

    ShowToast("error", "Category details not loaded. Check internet connection and try again")
    return
  }

  const getAllHustlersAround = async () => {
    const { response_code, hustlers, msg} = await getAllHustlers()
    if (response_code === 200) {
      setAllHustlers(hustlers)
      return
    }

    if (response_code === 401){
      ShowToast("error", "Session expired. Sign in to continue!")
      return history('/requester/home')
    }

    ShowToast("error", msg)
    return history('/requester/home')
  }

  const selectHustler = () => {
    setShowHustlerDetailModal(true)
  }

  useEffect(()=>{
    window.scrollTo(0, 0);

    const fetchData = async () => {
      setIsLoading(true); // start loading
  
      try {
        await Promise.all([
          getAllHustlersAround(),
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

  return(
    <>
      <div className="flex h-screen overflow-hidden bg-[#F6F6F6]">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 bg-[#F5F5F5] overflow-y-auto">
          <Navbar />
          <div className="p-6">
          { isLoading ?
            <Loader/>
            :
            <>
              <div className="text-2xl font-bold mb-4 linear-bg-alt relative flex flex-col gap-4">
                <h1 className="banner-header">Find your dream job on Hustle.io</h1>
                <p className="banner-p">We know you want to make so much money with your hustle, that’s why we gave you hustle.io</p>
                <svg className="hidden lg:flex md:flex lg:absolute md:absolute right-2 top-1" width="450" height="148" viewBox="0 0 450 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M337.5 -23H297V-248H292.5V-23H274.5V-248H270V-23H252V-248H247.5V-23H229.5V-248H225V-23H0V-18.5H225V-0.5H0V4H225V22H0V26.5H225V44.5H0V49H225V89.5C225 151.632 275.368 202 337.5 202C399.632 202 450 151.632 450 89.5C450 27.368 399.632 -23 337.5 -23ZM247.5 -0.5H229.5V-18.5H247.5V-0.5ZM252 -0.5H270V-18.5H252V-0.5ZM274.5 -0.5H292.5V-18.5H274.5V-0.5ZM297 -0.5V-18.5H337.5C397.147 -18.5 445.5 29.8532 445.5 89.5C445.5 149.147 397.147 197.5 337.5 197.5C277.853 197.5 229.5 149.147 229.5 89.5V49H247.5V89.5C247.5 139.206 287.794 179.5 337.5 179.5C387.206 179.5 427.5 139.206 427.5 89.5C427.5 39.7944 387.206 -0.5 337.5 -0.5H297ZM247.5 44.5H229.5V26.5H247.5V44.5ZM252 49V89.5C252 136.72 290.28 175 337.5 175C384.72 175 423 136.72 423 89.5C423 42.2797 384.72 4 337.5 4H297V22H337.5C374.779 22 405 52.2208 405 89.5C405 126.779 374.779 157 337.5 157C300.221 157 270 126.779 270 89.5V49H252ZM274.5 22H292.5V4H274.5V22ZM270 4V22H252V4H270ZM270 26.5V44.5H252V26.5H270ZM274.5 89.5V49H292.5V89.5C292.5 114.353 312.647 134.5 337.5 134.5C362.353 134.5 382.5 114.353 382.5 89.5C382.5 64.6472 362.353 44.5 337.5 44.5H297V26.5H337.5C372.294 26.5 400.5 54.7061 400.5 89.5C400.5 124.294 372.294 152.5 337.5 152.5C302.706 152.5 274.5 124.294 274.5 89.5ZM297 89.5C297 111.868 315.132 130 337.5 130C359.868 130 378 111.868 378 89.5C378 67.1325 359.868 49 337.5 49H297V89.5ZM292.5 44.5V26.5H274.5V44.5H292.5ZM247.5 22H229.5V4H247.5V22Z" fill="url(#paint0_linear_7464_35226)"/>
                  <defs>
                  <linearGradient id="paint0_linear_7464_35226" x1="409.5" y1="177.25" x2="1.86843e-05" y2="-257" gradientUnits="userSpaceOnUse">
                  <stop stop-color="white"/>
                  <stop offset="1" stop-color="white" stop-opacity="0"/>
                  </linearGradient>
                  </defs>
                </svg>
                <img src={CreatorHomeImg} className="hidden lg:flex md:flex lg:absolute md:absolute right-4 top-1"/>
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
                  { allHustlers.length > 0 ? 
                    <div className="span-col-2 flex flex-col gap-4 items-center justify-center mt-8">
                      { allHustlers.map((item, index) => {
                        return <div key={index} className="info-card info-card-alt p-3">
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-row justify-between gap-2">
                              <img src={item.contact_info.avatar === null ? NoImgIcon : item.contact_info.avatar} className="icon-img w-12 h-12"/>
                              <div className="flex flex-col">
                                <h1 className="info-card-header">{item.full_name}</h1>
                                <div className="flex flex-row items-center">
                                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.46382 6.56649C8.71833 6.56649 8.1119 7.17292 8.1119 7.91918C8.1119 8.66466 8.71833 9.27032 9.46382 9.27032C10.2093 9.27032 10.8157 8.66466 10.8157 7.91918C10.8157 7.17292 10.2093 6.56649 9.46382 6.56649ZM9.46382 10.4291C8.07946 10.4291 6.95312 9.30355 6.95312 7.91919C6.95312 6.53405 8.07946 5.40771 9.46382 5.40771C10.8482 5.40771 11.9745 6.53405 11.9745 7.91919C11.9745 9.30355 10.8482 10.4291 9.46382 10.4291Z" fill="#575757"/>
                                    <mask id="mask0_7776_31131" style={{ maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="3" y="1" width="13" height="16">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.08984 1.54492H15.8361V16.6091H3.08984V1.54492Z" fill="white"/>
                                    </mask>
                                    <g mask="url(#mask0_7776_31131)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.46318 2.7037C6.58785 2.7037 4.24866 5.0653 4.24866 7.9669C4.24866 11.6588 8.59332 15.2556 9.46318 15.4472C10.333 15.2549 14.6777 11.658 14.6777 7.9669C14.6777 5.0653 12.3385 2.7037 9.46318 2.7037ZM9.46315 16.6091C8.07725 16.6091 3.08984 12.3201 3.08984 7.9669C3.08984 4.42566 5.94895 1.54492 9.46315 1.54492C12.9774 1.54492 15.8365 4.42566 15.8365 7.9669C15.8365 12.3201 10.8491 16.6091 9.46315 16.6091Z" fill="#575757"/>
                                    </g>
                                  </svg>
                                  <h1 className="info-card-desc">{item.contact_info.country}</h1>
                                  
                                </div>
                                <h1 className="info-card-desc info-card-ellipsis w-[13rem]">
                                  Makeup Artist | NailTech | Lash Tech | And anything beauty
                                </h1>
                              </div>
                            </div>
                            <div className="flex flex-row items-start">
                              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.72913 1.54492L12.1162 6.38091L17.4544 7.16116L13.5917 10.9233L14.5033 16.2383L9.72913 13.7276L4.95494 16.2383L5.86652 10.9233L2.00391 7.16116L7.34204 6.38091L9.72913 1.54492Z" fill="#EBA100"/>
                              </svg>
                              <h1 className="info-card-desc !text-[13.5px]">{item.hustler_stats.average_rating} ({item.hustler_stats.completed_hustles_no})</h1>
                            </div>
                          </div>
                          <div className="p-1 flex flex-col gap-2 mt-4">
                            <h1 className="view-more-header info-card-ellipsis !text-[16px]">{item.projects[0]?.project_desc}</h1>
                            <img src={CreatorImg} className="h-28 rounded-md mt-2"/>
                            <h1 className="info-card-desc line-clamp-2">
                              {item.contact_info.bio ? item.contact_info.bio : "The bio is currently blank — maybe they like to keep things mysterious."}
                            </h1>
                          </div>
                          <button 
                            onClick={() => {
                              setSelectedHustler(item.id)
                              selectHustler()
                            }} className='flex view-more-button view-more-button-alt justify-center items-center mt-4'>
                              <h1 className='view-more-button-text'>Book now</h1>
                          </button>
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

          {showHustlerDetailsModal && (
            <HustlerDetailModal
              show={showHustlerDetailsModal}
              handleClose={() => setShowHustlerDetailModal(false)}
              hustler_uuid_info={selectedHustler}
              handleShowServiceDetailsModal={(service) => {
                setSelectedService(service)
                setShowHustlerDetailModal(false)
                setShowServiceDetailModal(true)
              }}
            />
          )}

          {showServiceDetailsModal && (
            <ServiceDetailsModal
              show={showServiceDetailsModal}
              service={selectedService}
              handleClose={() => setShowServiceDetailModal(false)}
              handleShowHustleDetailModal={() => {
                setShowServiceDetailModal(false)
                setShowBookHustlerModal(true)
              }}
            />
          )}

          {showBookHustlerModal && (
            <BookHustlerModal
              show={showBookHustlerModal}
              service={selectedService}
              handleClose={() => setShowBookHustlerModal(false)}
            />
          )}

        </main>
      </div>
    </>
  )
}