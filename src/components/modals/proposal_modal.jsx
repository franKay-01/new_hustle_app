import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ClientImg from "../../assets/images/client_img.svg"
import { Popover } from '@headlessui/react'
import Select from 'react-select';
import { ShowToast } from "../showToast";

export default function ProposalModal({handleClose, show, handleCloseAfterProposal, hustlePreferredDate}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [activeView, setActiveView] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null);
  const [form, setForm] = useState({amount: '', hour_amount: '', platform_fees: '', receivable_amount: '', duration: '',
    proposed_date: '', start_time: '', end_time: ''})

  const getDuration = () => {
    const [startH, startM] = form.start_time.split(":").map(Number);
    const [endH, endM] = form.end_time.split(":").map(Number);
  
    if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) {
      return "Invalid time";
    }
  
    const today = new Date().toISOString().split("T")[0]; // e.g. "2025-07-26"
    const startDate = new Date(`${today}T${form.start_time}:00`);
    const endDate = new Date(`${today}T${form.end_time}:00`);
  
    let diffMs = endDate.getTime() - startDate.getTime();
  
    // Handle overnight times (e.g., 22:00 to 01:00)
    if (diffMs < 0) {
      diffMs += 24 * 60 * 60 * 1000; // add 24 hours
    }
  
    const totalMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(totalMins / 60);
    const minutes = totalMins % 60;
  
    return `${hours}h ${minutes}m`;
  };
    

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

  const handleFormChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
	}

  const handleChargeTypeSelection = (selected) => {
    setSelectedOption(selected);
  }

  const submitProposalForm = () => {
    if (selectedOption === null){
      ShowToast("error", "You must select charge type")
      return
    }

    let formInfo = {
      amount: form.amount,
      proposal: '',
      proposed_date: form.proposed_date,
      proposed_start_time: form.start_time.split(":").slice(0, 2).join(":"),
      proposed_end_time: form.end_time.split(":").slice(0, 2).join(":")
    }

    handleCloseAfterProposal(formInfo)
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

  const calculate_values = (e) => {

    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    const companyFees = 0.05;
  

    if (selectedOption?.value === 'per_service'){
      
      const amount = parseFloat(updatedForm.amount || 0);
      const receivableAmount = amount - (amount * companyFees);
      const companyRevenue = amount - receivableAmount;
  
      setForm({
        ...updatedForm,
        platform_fees: companyRevenue.toFixed(2),
        receivable_amount: receivableAmount.toFixed(2),
      });
  
    }else{
      const startTime = updatedForm.start_time;
      const endTime = updatedForm.end_time;
      const hourAmount = parseFloat(updatedForm.hour_amount || 0);

      // Only calculate if both times are set
      if (startTime && endTime && hourAmount) {
        const start = new Date(`1970-01-01T${startTime}:00Z`);
        const end = new Date(`1970-01-01T${endTime}:00Z`);
        const diffMs = end - start;
        const durationInHours = diffMs / (1000 * 60 * 60);
        const total_amount = hourAmount * durationInHours;
        const receivableAmount = total_amount - (total_amount * companyFees);
        const companyRevenue = total_amount - receivableAmount;

        setForm({
          ...updatedForm,
          amount: total_amount,
          duration: durationInHours.toFixed(2),
          platform_fees: companyRevenue.toFixed(2),
          receivable_amount: receivableAmount.toFixed(2),
        });
      }
    }
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main overflow-y-auto">
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
          { selectedOption === null ?
            null:
            <>
              { selectedOption?.value === "per_service" ?
              <>
                <div className="flex flex-col relative">
                  <label className="form-label mt-1">What is the amount you’d like to bid for this hustle?</label>
                  <input name="amount" value={form.amount}  onChange={(e) => calculate_values(e)} className="auth-input-box auth-input-box-alt block" type="text"/>
                  <h1 className="absolute text-[#000] top-[55%] left-2 proposal-placeholder-text">GHS</h1>
                </div>
                <div className="flex flex-col relative">
                  <label className="form-label mt-1">5% platform service fee</label>
                  <input name="platform_fees" value={form.platform_fees} className="auth-input-box auth-input-box-alt block" type="text"/>
                  <h1 className="absolute text-[#000] top-[54%] left-2 proposal-placeholder-text">GHS</h1>
                </div>
                <div className="flex flex-col relative">
                  <label className="form-label mt-1">You’ll receive</label>
                  <h1 className="info-card-time">The estimated amount you’ll receive after service fee</h1>
                  <input name="receivable_amount" value={form.receivable_amount} className="auth-input-box auth-input-box-alt block" type="text"/>
                  <h1 className="absolute text-[#000] top-[62%] left-2 proposal-placeholder-text">GHS</h1>
                </div>
                <div className="flex flex-col relative">
                  <label className="form-label mt-1">How long will this service take?</label>
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-col">
                      <h1 className="form-label-alt">Choose delivery time</h1>
                      <div className="flex flex-row gap-2">
                        <input 
                          type="time" 
                          name="start_time"
                          value={form.start_time}
                          onChange={handleFormChange}
                          className="auth-input-box auth-input-box-date block" 
                          min={new Date().toISOString().split("T")[0]}
                        />
                        <input 
                          type="time" 
                          name="end_time"
                          value={form.end_time}
                          onChange={handleFormChange}
                          className="auth-input-box auth-input-box-date block" 
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="form-label-alt">Choose delivery date</h1>
                      <div className="flex flex-row gap-2">
                        <input 
                          type="date" 
                          value={form.proposed_date}
                          onChange={handleFormChange}
                          name="proposed_date"
                          className="auth-input-box auth-input-box-date block" 
                          // min={new Date().toISOString().split("T")[0]}
                          min={
                            hustlePreferredDate
                              ? new Date(new Date(hustlePreferredDate).setDate(new Date(hustlePreferredDate).getDate()))
                                  .toISOString()
                                  .split("T")[0]
                              : new Date().toISOString().split("T")[0]
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col relative">
                  <label className="form-label mt-1">Duration</label>
                  <input name="duration" value={getDuration()} className="auth-input-box  block" type="text" disabled/>
                </div>
              </>
              :
              <>
                <div className="flex flex-col relative">
                  <label className="form-label mt-1">Choose delivery time</label>
                  <div className="flex flex-row gap-2">
                    <input 
                      type="time" 
                      name="start_time"
                      value={form.start_time}
                      onChange={handleFormChange}
                      className="auth-input-box auth-input-box-date block" 
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <input 
                      type="time" 
                      name="end_time"
                      value={form.end_time}
                      onChange={handleFormChange}
                      className="auth-input-box auth-input-box-date block" 
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label mt-1">How long will this service take?</label>
                  <div className="flex flex-col">
                    <h1 className="form-label-alt">Choose delivery date</h1>
                    <div className="flex flex-row gap-2">
                      <input 
                        type="date" 
                        name="proposed_date"
                        value={form.proposed_date}
                        onChange={handleFormChange}
                        className="auth-input-box auth-input-box-alt-sub block" 
                        min={
                          hustlePreferredDate
                            ? new Date(new Date(hustlePreferredDate).setDate(new Date(hustlePreferredDate).getDate()))
                                .toISOString()
                                .split("T")[0]
                            : new Date().toISOString().split("T")[0]
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col relative">
                  <label className="form-label mt-1">How much are you charging per hour for this hustle?</label>
                  <input name="hour_amount" value={form.hour_amount} onChange={(e) => calculate_values(e)} className="auth-input-box auth-input-box-alt block" type="text"/>
                  <h1 className="absolute text-[#000] top-[54%] left-2 proposal-placeholder-text">GHS</h1>
                </div>
                <div className="flex flex-col relative">
                  <label className="form-label mt-1">5% platform service fee</label>
                  <input name="platform_fees" value={form.platform_fees} className="auth-input-box auth-input-box-alt block" type="text"/>
                  <h1 className="absolute text-[#000] top-[54%] left-2 proposal-placeholder-text">GHS</h1>
                </div>
                <div className="flex flex-col relative">
                  <label className="form-label mt-1">You’ll receive</label>
                  <h1 className="info-card-time">The estimated amount you’ll receive after service fee</h1>
                  <input name="receivable_amount" value={form.receivable_amount} className="auth-input-box auth-input-box-alt block" type="text"/>
                  <h1 className="absolute text-[#000] top-[62%] left-2 proposal-placeholder-text">GHS</h1>
                </div>
              </>
              }
              <div className="flex justify-center mt-4">
                <button onClick={() => submitProposalForm()} className='flex auth-card-button  justify-center items-center'>
                  <h1 className='auth-card-h1'>Submit a proposal</h1>
                </button>
              </div>
            </>
          }

          
        </div>
      </section>
    </div>
  )
}