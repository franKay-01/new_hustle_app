import { useState } from 'react';
import useFunctions from '../../utils/functions';
import { ShowToast } from '../showToast';

export default function ChangeEmailMiniPage() {
  const [confirm, setConfirm] = useState(true)
  const [form, setForm] = useState({old_email: '', confirm_email: '', new_email: ''})

  const { changeEmail } = useFunctions()

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const changeEmailRequest = async () => {
    if (form.new_password !== form.new_password_confirmation){
      ShowToast("error","Emails must match")
      return
    }

    const email_params = {
      "old_email": form.old_email,
      "new_email": form.email,
    }

    const {email_response_code, email_msg} = await changeEmail(email_params)
    
    if (email_response_code === 200){
      ShowToast("success", "Email change successful")
      window.location.reload()
    }else{
      ShowToast("error", email_msg) 
      return
    }
  }

  return (
    <div className="flex flex-col p-2">
      <h1 className="text-xl font-regular mb-2">Change email</h1>
      <hr className='default'/>
      { confirm ?
        <div className='flex flex-col'>
          <label className="form-label mt-1">Current email</label>
          <input name="old_email" onChange={handleChange} className="auth-input-box block" placeholder='current email' type="email"/>

          <label className="form-label mt-4">New email</label>
          <input name="new_email" onChange={handleChange} className="auth-input-box block" placeholder='new email' type="email"/>

          <label className="form-label mt-4">Confirm email</label>
          <input name="confirm_email" onChange={handleChange} className="auth-input-box block" placeholder='confirm new email' type="email"/>

          <button onClick={() => setConfirm(false)} className='flex !w-[40%] lg:!w-[20%] md:!w-[20%] view-more-button justify-center items-center mt-4'>
            <h1 className='view-more-button-text'>Change email</h1>
          </button>
        </div>
        :
        <div>
          <label className="form-label mt-1">Are you sure you want to change your email?</label>
          <button onClick={() => changeEmailRequest()} className='flex !w-[75%] lg:!w-[20%] md:!w-[20%] view-more-button justify-center items-center mt-4'>
            <h1 className='view-more-button-text'>Yes, i want to change email</h1>
          </button>
        </div>
      }
     
    </div>
  )
}