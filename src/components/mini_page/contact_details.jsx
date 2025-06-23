import $ from 'jquery'; 
import { useState, Fragment } from 'react';
import { Listbox, Transition, Switch } from '@headlessui/react'

export default function ContantDetailsMiniPage() {
  const [idImg, setIdImg] = useState("")
  const [categorySelected, setCategorySelected] = useState("")

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
      <h1 className="text-xl font-regular">Contact details</h1>
      <div className="flex flex-col justify-center items-center">
        <div className="img-container">
          <div className="avatar-upload avatar-upload-alt flex items-center justify-center">
            <div className="avatar-edit">
              <input type='file' name='userImage' id="userImage" onChange={()=> readURL()} accept=".png, .jpg, .jpeg" />
              <label for="userImage"></label>
            </div>
            <div className="avatar-preview avatar-preview-alt flex items-center justify-center">
              <div id="userPreviewImage" className='background-pattern object-contain'>
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

        <label className="form-label mt-4">Profile Headline</label>
        <input name="first_name" className="auth-input-box block" placeholder='e.g hair sytlist or barber' type="text"/>

        
        
        <label className="form-label mt-4">Email</label>
        <input name="first_name" className="auth-input-box block" placeholder='e.g hair sytlist or barber' type="text"/>

        <label className="form-label mt-4">Phone number</label>
        <input name="first_name" className="auth-input-box block" placeholder='+234 812 345 6789' type="text"/>

        <div className="flex flex-col mt-4">
          <h1 className="form-label">Hustle Bio</h1>
          <label className="setting-heading-sub">Write a short introduction about your business</label>
        </div>
        <textarea className='textarea-box' name="bio" id="" cols="6" rows="6"></textarea>
        
        <button className='flex !w-[40%] lg:!w-[30%] md:!w-[30%] view-more-button justify-center items-center mt-4'>
          <h1 className='view-more-button-text'>Save update</h1>
        </button>
        {/* <label className="proposal-label">{maxLength - text.length} characters left</label> */}
      </div>
    </div>
  )
}