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
import Cookies from 'js-cookie'
import NoInfoImg from "../../assets/images/no_info_img.png"
import NoHustleCardImg from "../../assets/images/no_info_img.png"

export default function CreatorHomePage(){
  const [showHustlerDetailsModal, setShowHustlerDetailModal] = useState(false)
  const [showServiceDetailsModal, setShowServiceDetailModal] = useState(false)
  const [showBookHustlerModal, setShowBookHustlerModal] = useState(false)
  const [allCategories, setAllCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [allHustlers, setAllHustlers] = useState([])
  const [allTopHustlers, setAllTopHustlers] = useState([])
  const [selectedHustler, setSelectedHustler] = useState('')
  const [selectedHustlerUuid, setSelectedHustlerUuid] = useState('')
  const [selectedService, setSelectedService] = useState({})
  const [allServices, setAllServices] = useState([])

  const history = useNavigate();

  const { getAllCategories } = useFunctions()
  const { getAllHustlers, getTopHustlers, retrieveAllServices} = useHustleFunctions()

  const getAllServices = async () => {
    const {response_code, services} = await retrieveAllServices()
    if (response_code === 200){
      setAllServices(services)
      return
    }

    ShowToast("error", "Services details not loaded. Check internet connection and try again")
    return
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

  const getAllTopHustlersAround = async () => {
    const { response_code, top_hustlers, msg} = await getTopHustlers()
    if (response_code === 200) {
      setAllTopHustlers(top_hustlers)
      return
    }

    if (response_code === 401){
      ShowToast("error", "Session expired. Sign in to continue!")
      return history('/auth')
    }

    ShowToast("error", msg)
    return history('/creator/home')
  }

  const getAllHustlersAround = async () => {
    const { response_code, hustlers, msg} = await getAllHustlers()

    if (response_code === 200) {
      setAllHustlers(hustlers)
      return
    }

    if (response_code === 401){
      ShowToast("error", "Session expired. Sign in to continue!")
      return history('/auth')
    }

    ShowToast("error", msg)
    return history('/creator/home')
  }

  const selectHustler = () => {
    if (Cookies.get('token')){
      setShowHustlerDetailModal(true)
    }else{
      ShowToast("error", "Please login to continue")
      return history('/auth')
    }
  }

  useEffect(()=>{
    window.scrollTo(0, 0);

    const fetchData = async () => {
      setIsLoading(true); // start loading
  
      try {
        await Promise.all([
          getAllHustlersAround(),
          getAllTopHustlersAround(),
          getCategories(),
          getAllServices()
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
              <div className="flex flex-col lg:grid lg:grid-cols-4 md:grid md:grid-cols-4 gap-4">
                <div>
                  <h1 className="main-header mb-2">Categories</h1>
                  { allCategories.length > 0 ?
                    <div className="flex flex-row overflow-x-auto lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 gap-2">
                      { allCategories.map((item, index) => {
                        return <div key={index} className="flex flex-col w-[8rem] text-center cursor-pointer">
                          <img className="w-[8rem] h-[5rem] rounded-xl" src={item.image_file}/>
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
                                  {item.hustler_info.job_title ? JSON.parse(item.hustler_info.job_title).join(" | ") : "No job title"}
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
                            <img src={ item.projects?.[0]?.media?.[0]?.media_url || NoInfoImg} className="h-28 rounded-md object-cover mt-2"/>
                            <h1 className="info-card-desc line-clamp-2">
                              {item.contact_info.bio ? item.contact_info.bio : "The bio is currently blank — maybe they like to keep things mysterious."}
                            </h1>
                          </div>
                          <button 
                            onClick={() => {
                              setSelectedHustler(item.id)
                              setSelectedHustlerUuid(item.hustler_uuid)
                              selectHustler()
                            }} className='flex view-more-button view-more-button-alt justify-center items-center mt-4'>
                              <h1 className='view-more-button-text'>Book now</h1>
                          </button>
                        </div>
                      })}
                      { allServices.map((item, index) => {
                        return <div key={index} className="info-card info-card-alt">
                          <div className="relative bg-cover bg-center min-h-[20vh] flex items-center justify-center info-card-border"
                            style={{ backgroundImage: `url(${ item.media[0]?.media_url === null ? NoHustleCardImg : item.media[0]?.media_url})` }}
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
                            <h1 className="info-card-header">{item.project_name}</h1>
                            {/* <h1 className="info-card-time">{item.posted_at}</h1> */}
                            <h1 className="info-card-header mt-1">Descripton:</h1>
                            <h1 className="info-card-desc info-card-ellipsis">
                              {item.project_desc}
                            </h1>
                            <div className="grid grid-cols-2 mt-2">
                              <div>
                                <h1 className="info-card-time info-card-time-alt">Hustler:</h1>
                                <h1 className="info-card-text-color">{item.hustler.full_name}</h1>
                              </div>
                              <div>
                                <h1 className="info-card-time info-card-time-alt">Amount:</h1>
                                <h1 className="info-card-text-color">GHS {item.proposed_amount}</h1>
                              </div>
                            </div>

                            <button onClick={() => {
                              setSelectedHustler(item.hustler.id)
                              setSelectedHustlerUuid(item.hustler.hustler_uuid)
                              selectHustler()
                            }} className='flex view-more-button justify-center items-center mt-4'>
                              <h1 className='view-more-button-text'>View more details</h1>
                            </button>
                          </div>
                        </div>
                      })}
                    </div>
                    : 
                    <div className="flex justify-center">
                      <NoInfoCard header={'No hustlers available'} message={'All available hustles will be displayed here'}/>
                    </div>
                  }
                </div>
                <div>
                  <h1 className="main-header mb-2 mt-4">Top Hustlers</h1>
                  <div className="flex flex-row overflow-x-auto lg:flex-col gap-4 lg:overflow-y-auto md:flex-col gap-4 md:overflow-y-auto whitespace-nowrap">
                    {allTopHustlers.length > 0 ? 
                      <>
                        {allTopHustlers.map((item, index) => {
                          return  <div onClick={() =>{
                            setSelectedHustler(item.id)
                            setSelectedHustlerUuid(item.hustler_uuid)
                            selectHustler()
                          }} key={index} className="info-card cursor-pointer flex flex-col justify-center items-center px-12 py-4">
                            <img src={item.avatar ? item.avatar : NoImgIcon} className="icon-img w-12 h-12"/>
                            <h1 className="info-card-header">{item.full_name}</h1>
                            <h1 className="info-card-desc">Memeber since: {item.member_since}</h1>
                            <h1 className="info-card-desc">({item.stats.completed_hustles} hustles completed)</h1>
                          </div>
                        })}
                      </>
                      :
                      <div className="flex justify-center">
                        <NoInfoCard header={'Top hustlers not available'} message={'All available hustlers will be displayed here'}/>
                      </div>
                    }
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
              hustler_id_info={selectedHustlerUuid}
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
              hustler_id_info={selectedHustlerUuid}
              handleClose={() => setShowBookHustlerModal(false)}
            />
          )}

        </main>
      </div>
    </>
  )
}