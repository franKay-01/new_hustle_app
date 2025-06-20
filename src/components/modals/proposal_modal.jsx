import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ClientImg from "../../assets/images/client_img.svg"
import { Popover } from '@headlessui/react'
import Select from 'react-select';

export default function ProposalModal({handleClose, show, handleCloseAfterProposal}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [activeView, setActiveView] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null);

//   const history = useNavigate();

//   const handleChange = (e) => {
//     setForm({...form, [e.target.name]: e.target.value})
// 	}

//   const handleSearch = () => {
//     const data = [
//       { place: form.location, title: form.title}
//     ]
//     history('/request/search', { state: { data } });
//   };

  const charge_types = [
    {
      label: 'Per hour',
      value: 'per_hour'
    },
    {
      label: 'Per service / full service',
      value: 'per_service'
    }
  ]

  const handleChargeTypeSelection = (selected) => {
    setSelectedOption(selected);
  }

  const customStyles = {
    control: (base, state) => ({
      ...base,
      fontSize: '20px',
      borderRadius: '8px',
      border: '1px solid #bab6b6',
      color: '#000',
      marginTop: '5px',
      boxShadow: 'none',
      width: '100%',
      borderColor: state.isFocused ? '#bab6b6' : base.borderColor,
      '&:hover': {
        borderColor: '#bab6b6',
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
      ? '#fff'
      : state.isFocused
      ? '#fff'
      : '#fff',
      color: state.isSelected ? '#000' : '#000',
      padding: 10,
      cursor: 'pointer',
    }),
    placeholder: (base) => ({
      ...base,
      color: '#000',
      fontSize: '18px',
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: '18px',
      color: '#000',
    }),
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="flex justify-between p-3">
          <h1 className="modal-header-text">Proposal details</h1>
          <svg onClick={handleClose} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9987 10.5865L16.9485 5.63672L18.3627 7.05093L13.4129 12.0007L18.3627 16.9504L16.9485 18.3646L11.9987 13.4149L7.04899 18.3646L5.63477 16.9504L10.5845 12.0007L5.63477 7.05093L7.04899 5.63672L11.9987 10.5865Z" fill="#000F1F"/>
          </svg>
        </div>
        <hr className='default'/>
        <div className="flex flex-col gap-2 p-3">
          <div className="flex flex-col">
            <h1 className="view-more-header">Your general profile will be submitted with this offer. <span className="text-[#0A4F42] underline">Click here to update</span></h1>
            <div className="flex flex-col mt-4">
              <label className="form-label mt-1">How would you want to charge for this hustle?</label>
              <Select
                styles={customStyles}
                name="charge_type"
                value={selectedOption}
                onChange={handleChargeTypeSelection}
                options={charge_types}
                placeholder="Select"
              />
            </div>
          </div>
          { selectedOption?.value === "per_service" ?
            <>
              <div className="flex flex-col relative">
                <label className="form-label mt-1">What is the amount you’d like to bid for this hustle?</label>
                <input name="first_name" className="auth-input-box auth-input-box-alt block" type="text"/>
                <h1 className="absolute text-[#000] top-[55%] left-2 proposal-placeholder-text">GHS</h1>
              </div>
              <div className="flex flex-col relative">
                <label className="form-label mt-1">5% platform service fee</label>
                <input name="first_name" className="auth-input-box auth-input-box-alt block" type="text"/>
                <h1 className="absolute text-[#000] top-[54%] left-2 proposal-placeholder-text">GHS</h1>
              </div>
              <div className="flex flex-col relative">
                <label className="form-label mt-1">You’ll receive</label>
                <h1 className="info-card-time">The estimated amount you’ll receive after service fee</h1>
                <input name="first_name" className="auth-input-box auth-input-box-alt block" type="text"/>
                <h1 className="absolute text-[#000] top-[62%] left-2 proposal-placeholder-text">GHS</h1>
              </div>
              <div className="flex flex-col relative">
                <label className="form-label mt-1">How long will this service take?</label>
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col">
                    <h1 className="form-label-alt">Choose delivery date</h1>
                    <div className="flex flex-row gap-2">
                      <input 
                        type="date" 
                        name="date_needed"
                        className="auth-input-box auth-input-box-date block" 
                        min={new Date().toISOString().split("T")[0]}
                      />
                      <input 
                        type="date" 
                        name="date_needed"
                        className="auth-input-box auth-input-box-date block" 
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="form-label-alt">Choose delivery time</h1>
                    <div className="flex flex-row gap-2">
                      <input 
                        type="time" 
                        name="date_needed"
                        className="auth-input-box auth-input-box-date block" 
                        min={new Date().toISOString().split("T")[0]}
                      />
                      <input 
                        type="time" 
                        name="date_needed"
                        className="auth-input-box auth-input-box-date block" 
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col relative">
                <label className="form-label mt-1">Duration</label>
                <input name="first_name" className="auth-input-box auth-input-box-alt block" type="text"/>
              </div>
            </>
            :
            <>
              <div className="flex flex-col relative">
                <label className="form-label mt-1">How many hours will this take you to complete?</label>
                <input name="first_name" className="auth-input-box auth-input-box-alt block" type="text"/>
              </div>
              <div>
                <label className="form-label mt-1">How long will this service take?</label>
                  <div className="flex flex-col">
                    <h1 className="form-label-alt">Choose delivery date</h1>
                    <div className="flex flex-row gap-2">
                      <input 
                        type="date" 
                        name="date_needed"
                        className="auth-input-box auth-input-box-alt-sub block" 
                        min={new Date().toISOString().split("T")[0]}
                      />
                      <input 
                        type="date" 
                        name="date_needed"
                        className="auth-input-box auth-input-box-alt-sub block" 
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                </div>
              </div>
              <div className="flex flex-col relative">
                <label className="form-label mt-1">How much are you charging per hour for this hustle?</label>
                <input name="first_name" className="auth-input-box auth-input-box-alt block" type="text"/>
              </div>
              <div className="flex flex-col relative">
                <label className="form-label mt-1">5% platform service fee</label>
                <input name="first_name" className="auth-input-box auth-input-box-alt block" type="text"/>
                <h1 className="absolute text-[#000] top-[54%] left-2 proposal-placeholder-text">GHS</h1>
              </div>
              <div className="flex flex-col relative">
                <label className="form-label mt-1">You’ll receive</label>
                <h1 className="info-card-time">The estimated amount you’ll receive after service fee</h1>
                <input name="first_name" className="auth-input-box auth-input-box-alt block" type="text"/>
                <h1 className="absolute text-[#000] top-[62%] left-2 proposal-placeholder-text">GHS</h1>
              </div>
            </>
          }

          <div className="flex justify-center">
            <button onClick={handleCloseAfterProposal} className='flex auth-card-button submit-proposal-button-sign-alt justify-center items-center'>
              <h1 className='auth-card-h1'>Submit a proposal</h1>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}