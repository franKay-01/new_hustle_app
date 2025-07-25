import { useEffect, useState } from "react";
import NoInfoCard from "../no_info_card";
import useHustleFunctions from "../../utils/hustles";
import { ShowToast } from "../showToast";
import Loader from "../loader";

export default function MyBookingModal({handleClose, show, handleOpenDetail, pendingBookings, acceptedBookings}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [pendingOpt, setPendingOpt] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const { submitBookedResponse } = useHustleFunctions()

  const submitBookingResponse = async (status, id) => {
    setIsLoading(true)

    const params = {
      "proposal_id": id,
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
              <h1 className="modal-header-text">My bookings</h1>
                
              <svg onClick={handleClose} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9987 10.5865L16.9485 5.63672L18.3627 7.05093L13.4129 12.0007L18.3627 16.9504L16.9485 18.3646L11.9987 13.4149L7.04899 18.3646L5.63477 16.9504L10.5845 12.0007L5.63477 7.05093L7.04899 5.63672L11.9987 10.5865Z" fill="#000F1F"/>
              </svg>
            </div>
            <hr className='default'/>
            <div className="flex flex-col gap-2 p-5">
              <div className="flex flex-row gap-4">
                <h1 onClick={() => setPendingOpt(true)} className={`${pendingOpt ? 'info-card-desc-mb info-card-desc' : 'info-card-desc'} cursor-pointer`}>Pending bookings</h1>
                <h1 onClick={() => setPendingOpt(false)} className={`${pendingOpt ? 'info-card-desc' : 'info-card-desc-mb info-card-desc'} cursor-pointer`}>Accepted bookings</h1>
              </div>

              { pendingOpt ? 
                <div className="flex flex-col gap-2">
                  { pendingBookings.length > 0 ?
                    <>
                    { pendingBookings.map((booking, index) => {
                      return <div key={index} className="flex flex-col lg:flex-row md:flex-row gap-2 justify-between booking-card">
                        <div className="flex flex-row gap-2">
                          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="19" cy="19" r="19" fill="#D9D9D9"/>
                            <path d="M12 25H26V18.0314C26 14.1481 22.866 11 19 11C15.134 11 12 14.1481 12 18.0314V25ZM19 9C23.9706 9 28 13.0435 28 18.0314V27H10V18.0314C10 13.0435 14.0294 9 19 9ZM16.5 28H21.5C21.5 29.3807 20.3807 30.5 19 30.5C17.6193 30.5 16.5 29.3807 16.5 28Z" fill="#1F1F1F"/>
                          </svg>
                          <div className="flex flex-col gap-2">
                            <h1 onClick={() => handleOpenDetail(booking)} 
                            className="booking-card-header underline font-[500] cursor-pointer">
                              {booking.title}
                            </h1>
                            <h1 onClick={() => handleOpenDetail(booking)} className="flex flex-wrap booking-card-header-sub cursor-pointer">
                              {booking.description}
                            </h1>
                            <div className="flex flex-col lg:flex-row md:flex-row gap-2 lg:gap-4 md:gap-4">
                              <button onClick={() => submitBookingResponse('accepted', booking.my_bid.id)}  className='flex my-booking-button justify-center items-center'>
                                <h1 className='booking-card-button-text'>Accept booking</h1>
                              </button>
                              <button onClick={() => submitBookingResponse('rejected', booking.my_bid.id)}  className='flex my-booking-button-alt-c justify-center items-center'>
                                <h1 className='booking-card-button-text booking-card-button-text-alt'>Reject booking</h1>
                              </button>
                            </div>
                          </div>
                        </div>
                        <h1 className="booking-card-header-sub">{booking.posted_at}</h1>
                      </div>
                    })}
                    </>
                    :
                    <NoInfoCard header={'No bookings available'} message={'All bookings will be displayed here.'}/>
                  }
                </div>
                :
                <div className="flex flex-col gap-2">
                  { acceptedBookings.length > 0 ?
                    <>
                      { acceptedBookings.map((booking, index) => {
                        return <div key={index} className="flex flex-row justify-between booking-card">
                          <div className="flex flex-col">
                            <h1 className="info-card-header">{booking.title}</h1>
                            <h1 className="booking-card-header-sub">Sem software company</h1>
                            <h1 className="info-card-header mt-2">Descripton:</h1>
                            <h1 className="booking-card-header-sub">
                            {booking.description}
                            </h1>
                            <div className="grid grid-cols-3 mt-2">
                              <div>
                                <h1 className="info-card-time info-card-time-alt">Amount:</h1>
                                <h1 className="info-card-text-color">GHS {booking.budget}</h1>
                              </div>
                            </div>
                            <div className="flex flex-row mt-4">
                              <button onClick={() => handleOpenDetail(booking)} className='flex my-booking-button justify-center items-center'>
                                <h1 className='booking-card-button-text'>View more details</h1>
                              </button>
                            </div>
                          </div>
                        </div>
                      })}
                    </>
                    :
                    <NoInfoCard header={'No bookings available'} message={'All bookings will be displayed here.'}/>
                  }
                  
                </div>
              }
            </div>
          </>
        }
      </section>
    </div>
  )
}