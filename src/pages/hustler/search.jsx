import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import Cookies from 'js-cookie'
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';
import useFunctions from "../../utils/functions";
import Loader from "../../components/loader";
import { ShowToast } from "../../components/showToast";
import { Link, useLocation } from "react-router-dom";

export default function SearchHustlesPage(){
  const [isLoading, setIsLoading] = useState(true);
  const [enabled, setEnabled] = useState(false)
  const [categorySelected, setCategorySelected] = useState("")
  const [allCategories, setAllCategories] = useState([])
  const [selectedMenu, setSelectedMenu] = useState('contact_details');
  const [coords, setCoords] = useState(null);
  const [form, setForm] = useState({sort_by: '', experience_level: '', 
    location: '', rating: '', verified: '', end_date: '', start_date: '',
    min_amount: '', max_amount: '', category: ''
  })

  const location = useLocation();
  const { hustleInfo } = location.state || {};

  console.log("INFO ", JSON.stringify(hustleInfo))
  
  const { getAllCategories } = useFunctions()

  const getCategories = async () => {
    setIsLoading(true)

    const {response_code, categories} = await getAllCategories()
    if (response_code === 200){
      setIsLoading(false)
      setAllCategories(categories)
      return
    }

    setIsLoading(false)
    ShowToast("error", "Country details not loaded. Check internet connection and try again")
    return
  }

  useEffect(() => {
    getCategories()
  }, [])

  const navigation = [
    { name: 'My Hustles', href: '/myHustles', current: true },
    { name: 'Settings', href: '/settings', current: false },
  ]

  const handleOpenCreateService = () => {
    setSelectedMenu('create_service')
  }

  const handleCloseCreateService = () => {
    setSelectedMenu('my_services')
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
	}

  const handleRadio = (field, val) => {
    setForm({...form, [field]: val})
  } 

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F6F6]">
      <Sidebar/>
      <main className="flex-1 bg-[#F5F5F5] overflow-y-auto">
        <Navbar />
        <div className="pl-2 pr-2 pt-2 lg:pl-5 md:pr-5">
          <div className="flex flex-row gap-2">
            <Link to={Cookies.get('is_ct') === 'true' ? '/creator/home' : '/'} >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_7547_22464)">
                <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#1F1F1F"/>
                </g>
                <defs>
                <clipPath id="clip0_7547_22464">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            </Link>
            <h1 className="text-xl font-regular">Results found</h1>
          </div>
          { isLoading ?
            <div className='flex justify-center items-center'>
              <Loader/>
            </div>
            :
            <div className="flex flex-row gap-4 mt-1">
              <div className="flex flex-col w-[100%] lg:w-[30%] md:w-[30%] gap-2 h-fit overflow-y-auto">
                <div className="booking-card booking-card-alt !p-0 flex flex-col ">
                  <div className="h-fit w-full px-2 py-2">
                    <div className="flex flex-col gap-6 mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
                      <div className='flex flex-col'>
                        <label className="form-label !font-[500]">Sort by:</label>
                        <div className="flex flex-col gap-[2px] ml-2">
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('sort_by', 'all')} className='w-4 h-4' type="radio" id="test1" name="sort_by"/>
                            <label for="test1" className='form-label'>All</label>
                          </p>
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('sort_by', 'nearest')} className='w-4 h-4' type="radio" id="test1" name="sort_by"/>
                            <label for="test1" className='form-label'>Nearest</label>
                          </p>
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('sort_by', 'newly_posted')} className='w-4 h-4' type="radio" id="test2" name="sort_by"/>
                            <label for="test2" className='form-label'>Newly Posted</label>
                          </p>
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('sort_by', 'available')} className='w-4 h-4' type="radio" id="test3" name="sort_by"/>
                            <label for="test3" className='form-label'>Available now</label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="booking-card booking-card-alt !p-0 flex flex-col ">
                  <div className="h-fit w-full px-2 py-2">
                    <div className="flex flex-col gap-6 mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
                      <div className='flex flex-col'>
                        <label className="form-label !font-[500]">Experience level:</label>
                        <div className="flex flex-col gap-[2px] ml-2">
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('experience_level', 'all')} className='w-4 h-4' type="radio" id="test1" name="experience_level"/>
                            <label for="test1" className='form-label'>All</label>
                          </p>
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('experience_level', 'beginner')} className='w-4 h-4' type="radio" id="test1" name="experience_level"/>
                            <label for="test1" className='form-label'>Beginner</label>
                          </p>
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('experience_level', 'intermediate')} className='w-4 h-4' type="radio" id="test2" name="experience_level"/>
                            <label for="test2" className='form-label'>Intermediate</label>
                          </p>
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('experience_level', 'expert')} className='w-4 h-4' type="radio" id="test3" name="experience_level"/>
                            <label for="test3" className='form-label'>Expert</label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="booking-card booking-card-alt !p-0 flex flex-col ">
                  <div className="h-fit w-full px-2 py-2">
                    <div className="flex flex-col gap-6 mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
                      <div className='flex flex-col'>
                        <label className="form-label !font-[500]">Location:</label>
                        <GooglePlacesAutocomplete
                          apiKey={process.env.REACT_APP_GOOGLE_PLACES_KEY}
                          selectProps={{
                            styles: {
                              className: 'auth-input-box focus:outline-none'
                            },
                            onChange: async (place) => {
                              if (!place?.value?.place_id) return;

                              try {
                                const results = await geocodeByPlaceId(place.value.place_id);
                                const { lat, lng } = results[0].geometry.location;
                                setCoords({ lat: lat(), lng: lng() });
                              } catch (err) {
                                console.error('Error getting coordinates:', err);
                              }
                            },
                            placeholder: 'Search for a location',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="booking-card booking-card-alt !p-0 flex flex-col">
                  <div className="h-fit w-full px-2 py-2">
                    <div className="flex flex-col gap-6 mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
                      <div className='flex flex-col'>
                        <label className="form-label !font-[500]">Categories:</label>
                        { allCategories.length > 0 ?
                          <div className="flex flex-col gap-[2px] ml-2 h-[10rem]  overflow-y-auto">
                            { allCategories.map((category, index) => {
                              return <p key={index} className='flex flex-row items-center gap-2'>
                                <input onClick={() => handleRadio('category', `${category.category_name}`)} className='w-4 h-4' type="radio" id="test1" name="category"/>
                                <label for="test1" className='form-label'>{category.category_name}</label>
                              </p>
                            })}
                          </div>
                        :
                        <>
                          <h1 className="form-label">No categories available</h1>
                        </> 
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="booking-card booking-card-alt !p-0 flex flex-col ">
                  <div className="h-fit w-full px-2 py-2">
                    <div className="flex flex-col gap-6 mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
                      <div className='flex flex-col'>
                        <label className="form-label !font-[500]">Amount:</label>
                        <div className="flex flex-row gap-2">
                          <div>
                            <label className="form-label !text-[12px]">Min</label>
                            <input onChange={handleChange} value={form.min_amount} name="min_amount" 
                            className="auth-input-box auth-input-search-box block" type="number"/>
                          </div>
                          <div>
                            <label className="form-label !text-[12px]">Max</label>
                            <input onChange={handleChange} value={form.max_amount} name="max_amount" 
                            className="auth-input-box auth-input-search-box block" type="number"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="booking-card booking-card-alt !p-0 flex flex-col ">
                  <div className="h-fit w-full px-2 py-2">
                    <div className="flex flex-col gap-6 mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
                      <div className='flex flex-col'>
                        <label className="form-label !font-[500]">Rating:</label>
                        <div className="flex flex-col gap-[2px] ml-2">
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('rating', 'all')} className='w-4 h-4' type="radio" id="test1" name="rating"/>
                            <label for="test1" className='form-label'>All</label>
                          </p>
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('rating', '5')} className='w-4 h-4' type="radio" id="test1" name="rating"/>
                            <div className="flex flex-row gap-1 items-center">
                              <h1 className="info-card-desc ml-1 !text-[14.5px]">5</h1>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735Z" fill="#EBA100"/>
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735Z" fill="#EBA100"/>
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735Z" fill="#EBA100"/>
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735Z" fill="#EBA100"/>
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735Z" fill="#EBA100"/>
                              </svg>
                            </div>
                          </p>
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('rating', '4')} className='w-4 h-4' type="radio" id="test1" name="rating"/>
                            <div className="flex flex-row gap-1 items-center">
                              <h1 className="info-card-desc ml-1 !text-[14.5px]">4</h1>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735Z" fill="#EBA100"/>
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735Z" fill="#EBA100"/>
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735Z" fill="#EBA100"/>
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735Z" fill="#EBA100"/>
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735ZM8.00105 10.6455L10.8322 12.2302L10.1999 9.04796L12.5819 6.8451L9.35998 6.46306L8.00105 3.51684L6.64208 6.46306L3.42012 6.8451L5.80219 9.04796L5.16987 12.2302L8.00105 10.6455Z"
                                  fill="#D8D8D8"
                                />
                              </svg>
                            </div>
                          </p>
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('rating', '3')} className='w-4 h-4' type="radio" id="test1" name="rating"/>
                            <div className="flex flex-row gap-1 items-center">
                              <h1 className="info-card-desc ml-1 !text-[14.5px]">3</h1>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735Z" fill="#EBA100"/>
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735Z" fill="#EBA100"/>
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735Z" fill="#EBA100"/>
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735ZM8.00105 10.6455L10.8322 12.2302L10.1999 9.04796L12.5819 6.8451L9.35998 6.46306L8.00105 3.51684L6.64208 6.46306L3.42012 6.8451L5.80219 9.04796L5.16987 12.2302L8.00105 10.6455Z"
                                  fill="#D8D8D8"
                                />
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735ZM8.00105 10.6455L10.8322 12.2302L10.1999 9.04796L12.5819 6.8451L9.35998 6.46306L8.00105 3.51684L6.64208 6.46306L3.42012 6.8451L5.80219 9.04796L5.16987 12.2302L8.00105 10.6455Z"
                                  fill="#D8D8D8"
                                />
                              </svg>
                            </div>
                          </p>
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('rating', '2')} className='w-4 h-4' type="radio" id="test1" name="rating"/>
                            <div className="flex flex-row gap-1 items-center">
                              <h1 className="info-card-desc ml-1 !text-[14.5px]">2</h1>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735Z" fill="#EBA100"/>
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735Z" fill="#EBA100"/>
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735ZM8.00105 10.6455L10.8322 12.2302L10.1999 9.04796L12.5819 6.8451L9.35998 6.46306L8.00105 3.51684L6.64208 6.46306L3.42012 6.8451L5.80219 9.04796L5.16987 12.2302L8.00105 10.6455Z"
                                  fill="#D8D8D8"
                                />
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735ZM8.00105 10.6455L10.8322 12.2302L10.1999 9.04796L12.5819 6.8451L9.35998 6.46306L8.00105 3.51684L6.64208 6.46306L3.42012 6.8451L5.80219 9.04796L5.16987 12.2302L8.00105 10.6455Z"
                                  fill="#D8D8D8"
                                />
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735ZM8.00105 10.6455L10.8322 12.2302L10.1999 9.04796L12.5819 6.8451L9.35998 6.46306L8.00105 3.51684L6.64208 6.46306L3.42012 6.8451L5.80219 9.04796L5.16987 12.2302L8.00105 10.6455Z"
                                  fill="#D8D8D8"
                                />
                              </svg>
                            </div>
                          </p>
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('rating', '1')} className='w-4 h-4' type="radio" id="test1" name="rating"/>
                            <div className="flex flex-row gap-1 items-center">
                              <h1 className="info-card-desc ml-1 !text-[14.5px]">1</h1>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735Z" fill="#EBA100"/>
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735ZM8.00105 10.6455L10.8322 12.2302L10.1999 9.04796L12.5819 6.8451L9.35998 6.46306L8.00105 3.51684L6.64208 6.46306L3.42012 6.8451L5.80219 9.04796L5.16987 12.2302L8.00105 10.6455Z"
                                  fill="#D8D8D8"
                                />
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735ZM8.00105 10.6455L10.8322 12.2302L10.1999 9.04796L12.5819 6.8451L9.35998 6.46306L8.00105 3.51684L6.64208 6.46306L3.42012 6.8451L5.80219 9.04796L5.16987 12.2302L8.00105 10.6455Z"
                                  fill="#D8D8D8"
                                />
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735ZM8.00105 10.6455L10.8322 12.2302L10.1999 9.04796L12.5819 6.8451L9.35998 6.46306L8.00105 3.51684L6.64208 6.46306L3.42012 6.8451L5.80219 9.04796L5.16987 12.2302L8.00105 10.6455Z"
                                  fill="#D8D8D8"
                                />
                              </svg>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735ZM8.00105 10.6455L10.8322 12.2302L10.1999 9.04796L12.5819 6.8451L9.35998 6.46306L8.00105 3.51684L6.64208 6.46306L3.42012 6.8451L5.80219 9.04796L5.16987 12.2302L8.00105 10.6455Z"
                                  fill="#D8D8D8"
                                />
                              </svg>
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="booking-card booking-card-alt !p-0 flex flex-col ">
                  <div className="h-fit w-full px-2 py-2">
                    <div className="flex flex-col gap-6 mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
                      <div className='flex flex-col'>
                        <label className="form-label !font-[500]">{Cookies.get('is_ct') === 'true' ? 'Verified Hustlers' : 'Verified Hustlers Creators'}</label>
                        <div className="flex flex-col gap-[2px] ml-2">
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('sort_by', 'all')} className='w-4 h-4' type="radio" id="test1" name="sort_by"/>
                            <label for="test1" className='form-label'>All</label>
                          </p>
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('sort_by', 'nearest')} className='w-4 h-4' type="radio" id="test1" name="sort_by"/>
                            <label for="test1" className='form-label'>Nearest</label>
                          </p>
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('sort_by', 'newly_posted')} className='w-4 h-4' type="radio" id="test2" name="sort_by"/>
                            <label for="test2" className='form-label'>Newly Posted</label>
                          </p>
                          <p className='flex flex-row items-center gap-2'>
                            <input onClick={() => handleRadio('sort_by', 'available')} className='w-4 h-4' type="radio" id="test3" name="sort_by"/>
                            <label for="test3" className='form-label'>Available now</label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center mb-4">
                  <button className='flex view-more-button view-more-button-alt !rounded-md justify-center items-center'>
                    <h1 className='view-more-button-text'>Apply</h1>
                  </button>
                </div>
              </div>
              
              <div className="w-[100%]">
                <div className="flex flex-wrap justify-between gap-8">
                  43
                </div>
              </div>
            </div>
          }

        </div>
      </main>
    </div>
  )
}