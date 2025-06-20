import $ from 'jquery'; 
import { useState, Fragment } from 'react';
import { Listbox, Transition, Switch } from '@headlessui/react'

export default function ChangePasswordMiniPage() {
  const [confirm, setConfirm] = useState(true)

  return (
    <div className="flex flex-col p-2">
      <h1 className="text-xl font-regular mb-2">Change password</h1>
      <hr className='default'/>
      { confirm ?
        <div className='flex flex-col'>
          <label className="form-label mt-1">Current password</label>
          <input name="first_name" className="auth-input-box block" placeholder='current password' type="password"/>

          <label className="form-label mt-4">New password</label>
          <input name="first_name" className="auth-input-box block" placeholder='new password' type="password"/>

          <label className="form-label mt-4">Confirm password</label>
          <input name="first_name" className="auth-input-box block" placeholder='new password' type="password"/>

          <button onClick={() => setConfirm(false)} className='flex !w-[30%] view-more-button justify-center items-center mt-4'>
            <h1 className='view-more-button-text'>Change password</h1>
          </button>
        </div>
        :
        <div>
          <label className="form-label mt-1">Are you sure you want to change your password?</label>
          <button className='flex !w-[30%] view-more-button justify-center items-center mt-4'>
            <h1 className='view-more-button-text'>Yes, i want to change password</h1>
          </button>
        </div>
      }
     
    </div>
  )
}