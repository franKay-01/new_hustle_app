import { useState } from 'react';

export default function WithdrawalModal({handleClose, show, withdrawalReq}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [form, setForm] = useState({amount: ''})

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
	}

  const makeWithdrawalRequest = () => {
    withdrawalReq(form.amount)
    handleClose()
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-middle-main">
        <div className="flex flex-col gap-2 p-2">
          <h1 className="modal-header-text">Withdrawal form</h1>

          <h1 className="info-card-desc">Amount</h1>
          <input onChange={handleChange} value={form.amount} name="amount" className="auth-input-box block" type="text"/>

          <div className='flex flex-row items-center gap-2 mt-4'>
            
            <button onClick={() => makeWithdrawalRequest()} className='flex my-booking-button justify-center items-center'>
            <h1 className='booking-card-button-text'>Withdraw</h1>
            </button>
            <button onClick={handleClose} className='flex my-booking-button-alt-c justify-center items-center'>
              <h1 className='booking-card-button-text booking-card-button-text-alt'>Cancel</h1>
            </button>
          </div>
          
        </div>
      </section>
    </div>
  )
}