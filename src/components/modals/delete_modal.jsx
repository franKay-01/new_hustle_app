import { useState } from "react";

export default function DeleteAccountModal({handleClose, show}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={showHideClassName}>
      <section className="modal-middle-main !w-[90%] lg:!w-[50%] md:!w-[50%]">
        <div className="flex flex-col justify-center items-center gap-2 p-3">
          <h1 className="text-xl font-semibold text-[#CD0000]">Delete account</h1>
          <svg width="82" height="83" viewBox="0 0 82 83" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle opacity="0.1" cx="41" cy="41.5" r="41" fill="#D98484"/>
            <circle opacity="0.1" cx="41.2088" cy="41.7088" r="35.3807" fill="#D98484"/>
            <circle opacity="0.1" cx="41.2086" cy="41.7086" r="27.8883" fill="#D98484"/>
            <path d="M59.9893 29.1593C53.0588 28.4828 46.0867 28.1343 39.1355 28.1343C35.0147 28.1343 30.8938 28.3393 26.773 28.7493L22.5273 29.1593" stroke="#D61D1D" stroke-width="3.075" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M33.9766 27.089L34.4344 24.4035C34.7674 22.456 35.0172 21.0005 38.5344 21.0005H43.9872C47.5045 21.0005 47.775 22.538 48.0872 24.424L48.5451 27.089" stroke="#D61D1D" stroke-width="3.075" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M55.5166 35.6377L54.1638 56.2812C53.9349 59.4997 53.7476 62.0007 47.941 62.0007H34.5795C28.7729 62.0007 28.5856 59.4997 28.3567 56.2812L27.0039 35.6377" stroke="#D61D1D" stroke-width="3.075" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M37.7852 50.7256H44.7156" stroke="#D61D1D" stroke-width="3.075" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M36.0547 42.5254H46.4608" stroke="#D61D1D" stroke-width="3.075" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div className="flex flex-row gap-4 items-center">
            <input className="w-8 h-8 accent-[#0A4F42]" type="checkbox" name="delete" onChange={() => setShowPassword(!showPassword)}/>
            <h1 className="form-label">I hereby confirm that If I do not log back in within 14 days, all data associated with my account will be permanently deleted and cannot be recovered</h1>
          </div>
          { showPassword ? 
            <>
              <label className="form-label mt-4">Enter Password to Confirm</label>
              <input name="first_name" className="auth-input-box block" placeholder='new password' type="password"/>
            </>
            : null
          }
         
          <button onClick={handleClose} className='flex view-more-button !bg-[#CD0000] view-more-button-alt justify-center items-center mt-4'>
            <h1 className='view-more-button-text'>Delete account</h1>
          </button>
        </div>
      </section>
    </div>
  )
}