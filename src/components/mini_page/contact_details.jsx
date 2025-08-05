import $ from 'jquery'; 
import { useState, Fragment, useEffect } from 'react';
import { Listbox, Transition, Switch } from '@headlessui/react'
import TagInput from 'react-materialui-tag-input'
import useFunctions from '../../utils/functions';
import useUploadFunction from '../../utils/imageFileUpload';  
import useAuthFunctions from '../../utils/authentication';
import { ShowToast } from '../showToast';
import Select from 'react-select';
import useHustleFunctions from '../../utils/hustles';
import { useNavigate } from 'react-router-dom';

import Loader from '../loader';

export default function ContantDetailsMiniPage() {
  const [idImg, setIdImg] = useState("")
  const [categorySelected, setCategorySelected] = useState("")
  const [allCategories, setAllCategories] = useState([])
  const [inputTags, setInputTags] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [countries, setCountries] = useState([])
  const [originalCountries, setOriginalCountries] = useState([])
  const [selectedOption, setSelectedOption] = useState(null);
  const [userProfile, setUserProfile] = useState({})
  
  const [form, setForm] = useState({email: '', phone: '', bio: '', minimum_rate: 0, time_zone: '', job_title: ''})

  const history = useNavigate();

  const { getAllCategories } = useFunctions()

  const { getHustlerProfile } = useHustleFunctions()

  const { handleImageUploads } = useUploadFunction()

  const { getAllCountries, updateContactInfo } = useAuthFunctions()

  const filterCountriesByName = (value) =>{
    return originalCountries.filter(country => country.name.toLowerCase().includes(value.toLowerCase()));
  }

  const handleCountrySelection = (selected) => {
    let timezoneitem = filterCountriesByName(selected.value);
    let time_zone = timezoneitem[0].time_zone
    if (timezoneitem.length > 0) {
      setForm((prevForm) => {
        const updatedForm = { ...prevForm, time_zone: time_zone.toString() };
        return updatedForm;
      });
    }
    setSelectedOption(selected);
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
	}

  const getProfileDetails = async () => {
    const {response_code, profile} = await getHustlerProfile()
    if (response_code === 200){
      return profile
    }

    if (response_code === 401){
      ShowToast("error", "Session expired. Sign in to continue!")
      return history('/')
    }

    ShowToast("error", "Profile details not loaded. Check internet connection and try again")
    return
  }

  const getCountries = async () => {
    const {response_code, countries} = await getAllCountries()
    if (response_code === 200){
      setOriginalCountries(countries)
      const convertedCountries = countries.map(country => ({
        label: country.name,
        value: country.name
      })).sort((a, b) => a.label.localeCompare(b.label));

      return convertedCountries
    }

    ShowToast("error", "Country details not loaded successfully. Check internet connection and try again")
    return
  }

  const getCategories = async () => {
    const {response_code, categories} = await getAllCategories()
    if (response_code === 200){
      return categories
    }

    ShowToast("error", "Country details not loaded. Check internet connection and try again")
    return
  }

  const handleImageUpload = async () => {
    let mediaUrl = ""

    let input = document.getElementById('userImage')

    if (input.files && input.files[0]) {
      mediaUrl = await handleImageUploads(input.files[0]);
    }

    return mediaUrl
  };

  const readURL = () => {
    let input = document.getElementById('userImage')

    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        setIdImg(reader.result.split(',')[1])
        $('#userPreviewImage').css('background-image', 'url('+e.target.result +')');
        $('#userPreviewImage').hide();
        $('#userPreviewImage').fadeIn(650);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  const findCategoryByName = (category_name) => {
    const foundCategory = allCategories.find(category => category.category_name === category_name);
    return foundCategory ? foundCategory.id : null;
  };

  const submitContactChanges = async () => {
    setIsLoading(true)

    if (categorySelected === "" || form.email === "" || form.phone === "" || form.minimum_rate === ""){
      ShowToast("error", "Ensure category, email, minimum rate, bio and phone are entered")
      return
    }

    const bannerImageUrl = await handleImageUpload()
    console.log("AVATAR ", JSON.stringify(bannerImageUrl))

    const params = {
      "avatar": bannerImageUrl === "" ? userProfile.contact_info.avatar : bannerImageUrl,
      "category_id": findCategoryByName(categorySelected),
      "email": form.email,
      "phone_number": form.phone,
      "bio": form.bio,
      "job_title": inputTags,
      "time_zone": form.time_zone,
      "country": selectedOption === null ? userProfile.country : selectedOption.value,
      "rate": form.minimum_rate
    }

    const {response_code} = await updateContactInfo(params)
    if (response_code === 200){
      setIsLoading(false)
      ShowToast("success", "Account details updated successfully.")
      window.location.reload()
      return
    }

    if (response_code === 401){
      ShowToast("error", "Session expired. Sign in to continue!")
      return history('/')
    }

    setIsLoading(false)
    ShowToast("error", "Account Info update failed. Try again!")
    return
  }

  const customStyles = {
    control: (base, state) => ({
      ...base,
      fontSize: '20px',
      borderRadius: '8px',
      border: '1px solid #bab6b6',
      color: '#8F8F8F',
      marginTop: '5px',
      boxShadow: 'none',
      width: '100%',
      borderColor: state.isFocused ? '#bab6b6' : base.borderColor,
      '&:hover': {
        borderColor: '#bab6b6',
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
      ? '#0A4F42'    // Selected option background
      : state.isFocused
      ? '#e0e0e0'    // Hover background
      : '#fff',
      color: state.isSelected ? 'white' : '#000',
      padding: 10,
      cursor: 'pointer',
    }),
    placeholder: (base) => ({
      ...base,
      color: '#8F8F8F',
      fontSize: '20px',
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: '20px',
      color: '#8F8F8F',
    }),
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // start loading
  
      try {
        const [fetchedCategories, fetchedCountries, fetchedProfile] = await Promise.all([
          getCategories(),
          getCountries(),
          getProfileDetails()
        ]);

        setAllCategories(fetchedCategories);
        setCountries(fetchedCountries);
        setUserProfile(fetchedProfile);

        const userCountry = fetchedProfile?.contact_info?.country;

        setForm(prevForm => ({
          ...prevForm,
          avatar: fetchedProfile.contact_info?.avatar,
          email: fetchedProfile.email,
          hustle_category: fetchedProfile.category?.category_name,
          bio: fetchedProfile.contact_info?.bio,
          country: fetchedProfile.contact_info?.country,
          time_zone: fetchedProfile.contact_info?.time_zone,
          minimum_rate: fetchedProfile.contact_info?.rate,
          job_title: fetchedProfile.hustler_info?.job_title
        }));

        if (fetchedProfile.hustler_info.job_title) {
          const parsed = Array.isArray(fetchedProfile.hustler_info.job_title)
          ? fetchedProfile.hustler_info.job_title
          : JSON.parse(fetchedProfile.hustler_info.job_title);
          
          setInputTags(parsed);
        }
          
        if (userCountry && fetchedCountries.length > 0) {
          const match = fetchedCountries.find(
            (c) => c.value === userCountry
          );
  
          setSelectedOption(match || null);
        }
  
        if (
          fetchedProfile?.contact_info?.category_id &&
          fetchedCategories.length > 0
        ) {
          const matchedCategory = fetchedCategories.find(
            (cat) => cat.id === fetchedProfile.contact_info.category_id
          );
        
          if (matchedCategory) {
            setCategorySelected(matchedCategory.category_name);
          }
        }
    
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false); // end loading
      }
    };
  
    fetchData();
  }, [])

  return (
    <div className="flex flex-col p-2">
      { isLoading ?
        <div>
          <Loader />
        </div>
        :
        <>
          <h1 className="text-xl font-regular">Contact details</h1>
          <div className="flex flex-col justify-center items-center">
            <div className="img-container">
              <div className="avatar-upload avatar-upload-alt flex items-center justify-center">
                <div className="avatar-edit">
                  <input type='file' name='userImage' id="userImage" onChange={()=> readURL()} accept=".png, .jpg, .jpeg" />
                  <label for="userImage"></label>
                </div>
                <div className="avatar-preview avatar-preview-alt flex items-center justify-center">
                  <div 
                    id="userPreviewImage" 
                    className='background-pattern object-contain'
                    style={{
                      backgroundImage: form.avatar ? `url(${form.avatar})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                  </div>
                </div>
              </div>
            </div>
            <label className="setting-heading mt-2">This photo will be displayed on your profile.</label>
          </div>
          <div className='flex flex-col'>
            <label className="form-label mt-1">Hustle category</label>
            <Listbox value={categorySelected} onChange={setCategorySelected}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full h-[3.3rem] hc-border cursor-default rounded-lg bg-white py-4 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{categorySelected}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="mt-1 z-10 absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {allCategories?.map((option, optionIdx) => (
                      <Listbox.Option
                        key={optionIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-4 pr-4 ${
                            active ? 'bg-green-900 text-white' : 'text-gray-900'
                          }`
                        }
                        value={option.category_name}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {option.category_name}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>

            <label className="form-label mt-4">Profile Headline</label>
            <label className="setting-heading-sub">You can only add 5 maximum</label>            
            <TagInput 
              tags={inputTags} 
              setTags={setInputTags}
              allowBackspace />
            <label className="setting-heading-sub">Click enter to add skill</label>
            
            <label className="form-label mt-4">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="auth-input-box block" placeholder='account@gmail.com' type="email"/>

            <label className="form-label mt-4">Phone number</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="auth-input-box block" placeholder='+234 812 345 6789' type="text"/>

            <label className="form-label mt-4">Minimum rate</label>
            <input name="minimum_rate" value={form.minimum_rate} onChange={handleChange} className="auth-input-box block" placeholder='50' type="number"/>

            <div className='mt-4'>
              <label className="form-label mb-2">Country of residence</label>
              <Select
                styles={customStyles}
                name="country_of_residence"
                value={selectedOption}
                onChange={handleCountrySelection}
                options={countries}
                placeholder="Select your country"
              />
            </div>
            
            <div className="flex flex-col mt-4">
              <h1 className="form-label">Hustle Bio</h1>
              <label className="setting-heading-sub">Write a short introduction about your business</label>
            </div>
            <textarea onChange={handleChange} value={form.bio} className='textarea-box' name="bio" id="" cols="6" rows="6"></textarea>
            
            <button onClick={() => submitContactChanges()} className='flex !w-[40%] lg:!w-[30%] md:!w-[30%] view-more-button justify-center items-center mt-4'>
              <h1 className='view-more-button-text'>Save update</h1>
            </button>
          </div>
        </>

      }
     
    </div>
  )
}