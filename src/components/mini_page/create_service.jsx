import $ from 'jquery'; 
import { useState, Fragment } from 'react';
import { Listbox, Transition, Switch } from '@headlessui/react'
import MediaUpload from '../media';

export default function CreateServiceMiniPage({handleCloseCreateService}) {
  const [idImg, setIdImg] = useState("")
  const [categorySelected, setCategorySelected] = useState("")
  const [selectedFile, setSelectedFile] = useState([]);

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

  const allCategories = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
  ]

  return (
    <div className="flex flex-col p-2">
      <div className='flex flex-row items-center gap-2'>
        <svg onClick={() => handleCloseCreateService()} width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.67 1.8701L9.9 0.100098L0 10.0001L9.9 19.9001L11.67 18.1301L3.54 10.0001L11.67 1.8701Z" fill="#323232"/>
        </svg>
        <h1 className="text-xl font-regular">Create service</h1>
      </div>
      
      {/* <div className="flex flex-row gap-4">
        <h1 onClick={() => setPendingOpt(true)} className={`${pendingOpt ? 'info-card-desc-mb info-card-desc' : 'info-card-desc'} cursor-pointer`}>Service</h1>
        <h1 onClick={() => setPendingOpt(false)} className={`${pendingOpt ? 'info-card-desc' : 'info-card-desc-mb info-card-desc'} cursor-pointer`}>Accepted</h1>
      </div> */}
      <div className='flex flex-col'>
        <label className="form-label mt-4">Service name</label>
        <input name="first_name" className="auth-input-box block" placeholder='eg. Gardening' type="text"/>

        <label className="form-label mt-4">Service type</label>
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
              <Listbox.Options className="mt-1 absolute max-h-60 w-1/2 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {allCategories?.map((option, optionIdx) => (
                  <Listbox.Option
                    key={optionIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 pr-4 ${
                        active ? 'bg-green-900 text-white' : 'text-gray-900'
                      }`
                    }
                    value={option.name}
                  >
                    {({ categorySelected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            categorySelected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {option.name}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        <div className="flex flex-col mt-4">
          <h1 className="form-label">Brief service description</h1>
        </div>
        <textarea className='textarea-box' name="bio" id="" cols="6" rows="6"></textarea>
        
        <>
          <h1 className="form-label mt-4 mb-1">What is the full amount you’d like to charge for this service?</h1>
          <h1 className="booking-card-header-sub">Total amount the client will see on your project</h1>
          <div class="relative">
            <input type="text" pattern="[0-9]*[.]?[0-9]+" name="amount" className="auth-input-box ps-10 block"/>
          </div>
        </> 
        <>
          <h1 className="form-label mt-4 mb-1">5% platform fee</h1>
          <div class="relative">
            <input type="text" pattern="[0-9]*[.]?[0-9]+" name="amount" className="auth-input-box ps-10 block"/>
          </div>
        </>  
        <>
          <h1 className="form-label mt-4 mb-1">You'll receive</h1>
          <h1 className="booking-card-header-sub">The estimated amount you’ll receive after service fee</h1>
          <div class="relative">
            <input type="text" pattern="[0-9]*[.]?[0-9]+" name="amount" className="auth-input-box ps-10 block"/>
          </div>
        </> 
        <>
          <h1 className="form-label mt-4 mb-1">Service duration</h1>
          <h1 className="booking-card-header-sub">Total number of hours it’ll take to complete this service</h1>
          <div class="relative">
            <input type="text" pattern="[0-9]*[.]?[0-9]+" name="amount" className="auth-input-box ps-10 block"/>
          </div>
        </> 
        <h1 className="form-label mt-4">Upload supporting images</h1>
        <MediaUpload setOriginalSelectedFile={setSelectedFile}/>

        <button className='flex !w-[55%] lg:!w-[30%] md:!w-[30%] view-more-button justify-center items-center mt-4'>
          <h1 className='view-more-button-text'>Save service</h1>
        </button>
        {/* <label className="proposal-label">{maxLength - text.length} characters left</label> */}
      </div>
    </div>
  )
}