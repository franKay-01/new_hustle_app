import { useState } from "react";
import { ShowToast } from "../showToast";
import './rate_modal.css'

export default function RateHustlerModal({handleClose, show, activeHustleDetails, handleRating}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [rate, setRate] = useState(0)
  const [review, setReview] = useState("")

  const handleTextAreaChange = (e) => {
    setReview(e.target.value)
  }

  const handleRateChange = (val) => {
    setRate(val)
  }

  const submitRatingValues = () => {
    if (review === "" || review === null){
      ShowToast("error", "Review message is required")
      return
    }

    if (rate === 0){
      ShowToast("error", "Review rating is required")
      return
    }

    handleRating(rate, review)
    handleClose()
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="flex justify-between p-3">
          <h1 className="view-more-header">Rate hustler</h1>
          <div className="flex flex-row gap-2 justify-between items-center">
            <svg onClick={handleClose} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9987 10.5865L16.9485 5.63672L18.3627 7.05093L13.4129 12.0007L18.3627 16.9504L16.9485 18.3646L11.9987 13.4149L7.04899 18.3646L5.63477 16.9504L10.5845 12.0007L5.63477 7.05093L7.04899 5.63672L11.9987 10.5865Z" fill="#000F1F"/>
            </svg>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2 p-3">
          <div className="flex flex-col gap-2">
            <div class="rating rating2">
              <a onClick={() => handleRateChange(5)} className={rate >= 5 ? 'active' : ''} href="#5" title="Give 5 stars">★</a>
              <a onClick={() => handleRateChange(4)} className={rate >= 4 ? 'active' : ''} href="#4" title="Give 4 stars">★</a>
              <a onClick={() => handleRateChange(3)} className={rate >= 3 ? 'active' : ''} href="#3" title="Give 3 stars">★</a>
              <a onClick={() => handleRateChange(2)} className={rate >= 2 ? 'active' : ''} href="#2" title="Give 2 stars">★</a>
              <a onClick={() => handleRateChange(1)} className={rate >= 1 ? 'active' : ''} href="#1" title="Give 1 star">★</a>
            </div>
            <label className="proposal-label">Leave a message</label>
            <textarea onChange={(e) => handleTextAreaChange(e)} className='textarea-box' name="description" id="" cols="10" rows="10">
            </textarea>
            <div className='flex flex-col justify-center items-center'>
              <button onClick={() => { submitRatingValues(); }} className="view-more-button !w-[50%] mt-8">
                <h1 className="view-more-button-text">Confirm ratings</h1>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}