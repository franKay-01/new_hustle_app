import { useState } from 'react';
import Select from 'react-select';
import Loader from '../loader';
import Cookies from 'js-cookie'

export default function CreateVirtualCardModal({handleClose, show, createVirtualCard}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [selectedOption, setSelectedOption] = useState(null);
  const [form, setForm] = useState({phone_number: ''})

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

  const makeCreateCardRequest = () => {
    const params = {
      "pan": form.phone_number,
      "network": selectedOption.value,
      "payment_mode": 'MOMO',
      "expiry_month": '',
      "expiry_year": '',
      "hustler_id": Cookies.get('hid')
    }

    createVirtualCard(params)
    handleClose()
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-middle-main">
        <div className="flex flex-col gap-2 p-2">
          <h1 className="modal-header-text">Create virtual card</h1>
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

          <div className='flex flex-row items-center gap-2 mt-4'>
            <button onClick={() => makeCreateCardRequest()} className='flex my-booking-button justify-center items-center'>
            <h1 className='booking-card-button-text'>Proceed</h1>
            </button>
            <button onClick={() => handleClose()} className='flex my-booking-button-alt-c justify-center items-center'>
              <h1 className='booking-card-button-text booking-card-button-text-alt'>Cancel</h1>
            </button>
          </div>
          
        </div>
      </section>
    </div>
  )
}