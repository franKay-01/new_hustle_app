import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ClientImg from "../../assets/images/client_img.svg"
import useHustleFunctions from "../../utils/hustles";
import { ShowToast } from "../showToast";
import Loader from "../loader";

export default function MyBookingDetailModal({handleClose, show, showBookingInfo}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [activeView, setActiveView] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { submitBookedResponse } = useHustleFunctions()

  useEffect(() => {
    if (show){
      setActiveView(false)
    }
  },[show])

  const submitBookingResponse = async (status) => {
    setIsLoading(true)

    const params = {
      "proposal_id": showBookingInfo.my_bid.id,
      "status": status
    }

    const {response_code, msg} = await submitBookedResponse(params)
    if (response_code === 200){
      setIsLoading(false)
      window.location.reload()
      return
    }

    setIsLoading(false)
    ShowToast("error", msg)
    handleClose()
    return
  }

  function formatTime24To12(time24) {
    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? " pm" : " am";
    hour = hour % 12 || 12; // Convert 0 to 12
    return `${hour}:${minute}${ampm}`;
  }
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

  return (
    <div className={showHideClassName}>
      <section className="modal-main overflow-y-auto">
        { isLoading ? 
          <div className="flex justify-center items-center">
            <Loader/>
          </div>
         :
         <>
          <div className="flex justify-between p-3">
            <h1 className="modal-header-text">Booking details</h1>
            <div className="flex flex-row gap-2 justify-between items-center">
              <button onClick={() => submitBookingResponse('accepted')} className='flex modal-more-button justify-center items-center'>
                <h1 className='modal-more-button-text'>Accept booking proposal</h1>
              </button>
              <button onClick={() => { submitBookingResponse('rejected') }} className='flex my-booking-button-alt-c justify-center items-center'>
                <h1 className='booking-card-button-text booking-card-button-text-alt'>Reject booking</h1>
              </button>

              <svg onClick={handleClose} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9987 10.5865L16.9485 5.63672L18.3627 7.05093L13.4129 12.0007L18.3627 16.9504L16.9485 18.3646L11.9987 13.4149L7.04899 18.3646L5.63477 16.9504L10.5845 12.0007L5.63477 7.05093L7.04899 5.63672L11.9987 10.5865Z" fill="#000F1F"/>
              </svg>
            </div>
          </div>
          <hr className='default'/>
          <div className="flex flex-col gap-2 p-3">
            <div className="flex flex-col">
              <h1 className="view-more-header">{showBookingInfo.title}</h1>
              <h1 className='info-card-desc-mb info-card-desc w-fit'>Job description</h1>

              <h1 className='modal-header-text-alt mt-4'>Description:</h1>
              <h1 className="info-card-desc">
                {showBookingInfo.description}
              </h1>

              <div className="flex flex-col mt-4">
                <h1 className="info-card-time info-card-time-alt">Location</h1>
                <h1 className="info-card-text-color">Accra</h1>
              </div>
              <div className="flex flex-row justify-row gap-8 mt-4">
                {/* <div className="flex flex-col">
                  <h1 className="info-card-time info-card-time-alt">Experience level</h1>
                  <h1 className="info-card-text-color">Beginner</h1>
                </div>
                <div className="flex flex-col">
                  <h1 className="info-card-time info-card-time-alt">Hustle duration</h1>
                  <h1 className="info-card-text-color">8 days</h1>
                </div> */}
                <div className="flex flex-col">
                  <h1 className="info-card-time info-card-time-alt">Amount</h1>
                  <h1 className="info-card-text-color">GHS {showBookingInfo.budget}</h1>
                </div>
                <div className="flex flex-col">
                  <h1 className="info-card-time info-card-time-alt">Preferred time</h1>
                  <h1 className="info-card-text-color">
                    {formatTime24To12(showBookingInfo.preferred_start_time)} - {formatTime24To12(showBookingInfo.preferred_end_time)}
                  </h1>
                </div>
                <div className="flex flex-col">
                  <h1 className="info-card-time info-card-time-alt">Preferred date</h1>
                  <h1 className="info-card-text-color">{showBookingInfo.preferred_date}</h1>
                </div>
              </div>

              <div className="hustle-card hustle-card-alt flex flex-col">
                <h1 className="view-more-header view-more-header-sub mt-4 mb-2">About the client</h1>
                <div className="flex flex-row gap-4 items-start">
                  <img src={ClientImg} alt="Client Image"/>
                  <div className="flex flex-col">
                    <h1 className="view-more-header view-more-header-alt">Fred Amoah</h1>
                    <div className="flex flex-row gap-2">
                      <div className="flex flex-row justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                          <path d="M9.77064 1.77441L12.1577 6.61041L17.4959 7.39065L13.6332 11.1528L14.5448 16.4678L9.77064 13.9571L4.99645 16.4678L5.90802 11.1528L2.04541 7.39065L7.38354 6.61041L9.77064 1.77441Z" fill="#0A4F42"/>
                        </svg>
                        <p>4.6</p>
                      </div>
                      <p>(10 Hustles created)</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.66716 5.16699C5.02382 5.16699 4.50049 5.69033 4.50049 6.33433C4.50049 6.97766 5.02382 7.50033 5.66716 7.50033C6.31049 7.50033 6.83382 6.97766 6.83382 6.33433C6.83382 5.69033 6.31049 5.16699 5.66716 5.16699M5.66716 8.50033C4.47249 8.50033 3.50049 7.52899 3.50049 6.33433C3.50049 5.13899 4.47249 4.16699 5.66716 4.16699C6.86182 4.16699 7.83382 5.13899 7.83382 6.33433C7.83382 7.52899 6.86182 8.50033 5.66716 8.50033" fill="#575757"/>
                        <mask id="mask0_4444_3375" style={{ maskType:"luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="14">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.166992 0.833984H11.1667V13.834H0.166992V0.833984Z" fill="white"/>
                        </mask>
                        <g mask="url(#mask0_4444_3375)">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.6665 1.83398C3.18517 1.83398 1.1665 3.87198 1.1665 6.37598C1.1665 9.56198 4.91584 12.666 5.6665 12.8313C6.41717 12.6653 10.1665 9.56132 10.1665 6.37598C10.1665 3.87198 8.14784 1.83398 5.6665 1.83398V1.83398ZM5.6665 13.834C4.4705 13.834 0.166504 10.1327 0.166504 6.37598C0.166504 3.31998 2.63384 0.833984 5.6665 0.833984C8.69917 0.833984 11.1665 3.31998 11.1665 6.37598C11.1665 10.1327 6.8625 13.834 5.6665 13.834V13.834Z" fill="#575757"/>
                        </g>
                      </svg>
                      <p>Ghana</p>
                    </div>
                    <div className="flex flex-row gap-1 ml-1 cursor-pointer underline">
                      <p className="review-text">Reviews:</p>
                      <p className="review-text">10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         </>
        }
        
      </section>
    </div>
  )
}