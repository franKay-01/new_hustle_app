
import { useState, Fragment } from 'react';
import useFunctions from '../../utils/functions';
import { ShowToast } from '../showToast';

export default function ChangePasswordMiniPage() {
  const [confirm, setConfirm] = useState(true)
  const [form, setForm] = useState({new_password: '', new_password_confirmation: '', current_password: ''})

  const { changePassword } = useFunctions()

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const changePasswordRequest = async () => {
    if (form.new_password !== form.new_password_confirmation){
      ShowToast("error","Passwords must match")
      return
    }

    const params = {
      "old_password": form.current_password,
      "new_password": form.new_password,
      "new_password_confirmation": form.new_password_confirmation
    }

    const {response_code, msg} = await changePassword(params)
    if (response_code === 200){
      ShowToast("success", "Password change successful")
      window.location.reload()
    }else{
      ShowToast("error", msg) 
      return
    }
  }
  return (
    <div className="flex flex-col p-2">
      <h1 className="text-xl font-regular mb-2">Change password</h1>
      <hr className='default'/>
      { confirm ?
        <div className='flex flex-col'>
          <label className="form-label mt-1">Current password</label>
          <input name="current_password" onChange={handleChange} className="auth-input-box block" placeholder='current password' type="password"/>

          <label className="form-label mt-4">New password</label>
          <input name="new_password" onChange={handleChange} className="auth-input-box block" placeholder='new password' type="password"/>

          <label className="form-label mt-4">Confirm password</label>
          <input name="new_password_confirmation" onChange={handleChange} className="auth-input-box block" placeholder='new password' type="password"/>

          <button onClick={() => setConfirm(false)} className='flex !w-[55%] lg:!w-[20%] md:!w-[20%] view-more-button justify-center items-center mt-4'>
            <h1 className='view-more-button-text'>Change password</h1>
          </button>
        </div>
        :
        <div>
          <label className="form-label mt-1">Are you sure you want to change your password?</label>
          <button onClick={() => changePasswordRequest()} className='flex !w-[80%] lg:!w-[20%] md:!w-[20%] view-more-button justify-center items-center mt-4'>
            <h1 className='view-more-button-text'>Yes, i want to change password</h1>
          </button>
        </div>
      }
     
    </div>
  )
}