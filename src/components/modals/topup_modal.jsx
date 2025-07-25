import { useState } from 'react';
import Select from 'react-select';
import useFunctions from '../../utils/functions';
import { ShowToast } from '../showToast';
import Loader from '../loader';

export default function TopupModal({handleClose, show}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [selectedOption, setSelectedOption] = useState(null);
  const [form, setForm] = useState({amount: '', phone_number: ''})
  const [isLoading, setIsLoading] = useState(false)

  const { topupWallet } = useFunctions()

  const options = [
    { value: 'MTN', label: 'MTN' },
    { value: 'VODAFONE', label: 'TELECEL' },
    { value: 'ARTLTIGO', label: 'AT' },
  ];

  const handleSelectedChange = (selected) => {
    setSelectedOption(selected);
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
	}

  const makeTopupRequest = async () => {
    setIsLoading(true)
    const params = {
      "amount": form.amount,
      "network": selectedOption.value,
      "phone_number": form.phone_number
    }

    const {response_code, msg} = await topupWallet(params, 'hustler/make-deposit')
    if (response_code === 200){
      ShowToast("success", msg)
      setIsLoading(false)
      handleClose()
      return
    }

    setIsLoading(false)
    ShowToast("error", msg)
    return
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-middle-main">
        { isLoading ? 
          <Loader/>
          :
          <div className="flex flex-col gap-2 p-2">
            <h1 className="modal-header-text">Topup account</h1>
            <h1 className="info-card-desc">Phone number</h1>
            <input onChange={handleChange} value={form.phone_number} name="phone_number" className="auth-input-box block" type="text"/>

            <h1 className="info-card-desc">Select network</h1>
            <Select
              className='select-no-outline'
              value={selectedOption}
              onChange={handleSelectedChange}
              options={options}
              placeholder="Select network name..."
            />

            <h1 className="info-card-desc">Amount</h1>
            <input onChange={handleChange} value={form.amount} name="amount" className="auth-input-box block" type="text"/>

            <div className='flex flex-row items-center gap-2 mt-4'>
              
              <button onClick={() => makeTopupRequest()} className='flex my-booking-button justify-center items-center'>
              <h1 className='booking-card-button-text'>Proceed</h1>
              </button>
              <button onClick={handleClose} className='flex my-booking-button-alt-c justify-center items-center'>
                <h1 className='booking-card-button-text booking-card-button-text-alt'>Cancel</h1>
              </button>
            </div>
            
          </div>
        }
      </section>
    </div>
  )
}