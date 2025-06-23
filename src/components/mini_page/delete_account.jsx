import { useState, Fragment } from 'react';

export default function DeleteAccountMiniPage({ showDeleteModal }) {

  return (
    <div className="flex flex-col p-2">
      <h1 className="text-xl font-regular mb-2">Delete account</h1>
      <hr className='default'/>

      <div className='flex flex-col'>
        <h1 className="text-xl font-semibold">Are you sure you want to delete your account?</h1>

        <p className="form-label mt-4">
          You’ve requested to delete your account.<br/>
          Please note: Your account is now scheduled for deletion.<br/>
          If you do not log back in within 14 days, your profile, bookings, history, and all associated data will be permanently deleted and cannot be recovered.
          <br/><br/>
          Changed your mind? Simply log in again before the 14-day period ends to cancel the deletion.
          <br/><br/>
          Need help? Contact Customer Support before proceeding.
        </p>
        
        <button onClick={() => showDeleteModal()} className='flex !w-[55%] lg:!w-[30%] md:!w-[30%] !bg-[#CD0000] view-more-button justify-center items-center mt-4'>
          <h1 className='view-more-button-text'>Delete account</h1>
        </button>
      </div>
    </div>
  )
}