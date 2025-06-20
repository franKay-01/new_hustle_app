import { useEffect, useState } from "react";

export default function MyBookingModal({handleClose, show, handleOpenDetail}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [pendingOpt, setPendingOpt] = useState(true)

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
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
              <div className="flex flex-col lg:flex-row md:flex-row gap-2 justify-between booking-card">
                <div className="flex flex-row gap-2">
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19" cy="19" r="19" fill="#D9D9D9"/>
                    <path d="M12 25H26V18.0314C26 14.1481 22.866 11 19 11C15.134 11 12 14.1481 12 18.0314V25ZM19 9C23.9706 9 28 13.0435 28 18.0314V27H10V18.0314C10 13.0435 14.0294 9 19 9ZM16.5 28H21.5C21.5 29.3807 20.3807 30.5 19 30.5C17.6193 30.5 16.5 29.3807 16.5 28Z" fill="#1F1F1F"/>
                  </svg>
                  <div className="flex flex-col gap-2">
                    <h1 onClick={() => handleOpenDetail()} className="booking-card-header underline font-[500] cursor-pointer">You’re wanted for a quick bathroom fix!</h1>
                    <h1 onClick={() => handleOpenDetail()} className="flex flex-wrap booking-card-header-sub cursor-pointer">Sem software company wants to book you, click to view more details about this hustle</h1>
                    <div className="flex flex-col lg:flex-row md:flex-row gap-2 lg:gap-4 md:gap-4">
                      <button className='flex my-booking-button justify-center items-center'>
                        <h1 className='booking-card-button-text'>Accept booking</h1>
                      </button>
                      <button className='flex my-booking-button-alt-c justify-center items-center'>
                        <h1 className='booking-card-button-text booking-card-button-text-alt'>Reject booking</h1>
                      </button>
                    </div>
                  </div>
                </div>
                <h1 className="booking-card-header-sub">1 hour ago</h1>
              </div>
              <div className="flex flex-col lg:flex-row md:flex-row gap-2 justify-between booking-card">
                <div className="flex flex-row gap-2">
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19" cy="19" r="19" fill="#D9D9D9"/>
                    <path d="M12 25H26V18.0314C26 14.1481 22.866 11 19 11C15.134 11 12 14.1481 12 18.0314V25ZM19 9C23.9706 9 28 13.0435 28 18.0314V27H10V18.0314C10 13.0435 14.0294 9 19 9ZM16.5 28H21.5C21.5 29.3807 20.3807 30.5 19 30.5C17.6193 30.5 16.5 29.3807 16.5 28Z" fill="#1F1F1F"/>
                  </svg>
                  <div className="flex flex-col gap-2">
                    <h1 className="booking-card-header underline font-[500]">You’re wanted for a quick bathroom fix!</h1>
                    <h1 className="booking-card-header-sub">Sem software company wants to book you, click to view more details about this hustle</h1>
                    <div className="flex flex-col lg:flex-row md:flex-row gap-2 lg:gap-4 md:gap-4">
                      <button className='flex my-booking-button justify-center items-center'>
                        <h1 className='booking-card-button-text'>Accept booking</h1>
                      </button>
                      <button className='flex my-booking-button-alt-c justify-center items-center'>
                        <h1 className='booking-card-button-text booking-card-button-text-alt'>Reject booking</h1>
                      </button>
                    </div>
                  </div>
                </div>
                <h1 className="booking-card-header-sub">1 hour ago</h1>
              </div>
            </div>
            :
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between booking-card">
                <div className="flex flex-col">
                  <h1 className="info-card-header">Plumber needed for a bathroom fix</h1>
                  <h1 className="booking-card-header-sub">Sem software company</h1>
                  <h1 className="info-card-header mt-2">Descripton:</h1>
                  <h1 className="booking-card-header-sub">
                    Looking for a skilled plumber to fix a leaking bathroom sink and check the bathroom pipes for any blockages. Should be reliable, fast, and have basic tools. Estimated Duration should be 1–2 hours. I’m available on weekends
                  </h1>
                  <div className="grid grid-cols-3 mt-2">
                    <div>
                      <h1 className="info-card-time info-card-time-alt">Experience level:</h1>
                      <h1 className="info-card-text-color">Beginner</h1>
                    </div>
                    <div>
                      <h1 className="info-card-time info-card-time-alt">Hustle Duration:</h1>
                      <h1 className="info-card-text-color">3 weeks</h1>
                    </div>
                    <div>
                      <h1 className="info-card-time info-card-time-alt">Amount:</h1>
                      <h1 className="info-card-text-color">GHS 1200.00</h1>
                    </div>
                  </div>
                  <div className="flex flex-row mt-4">
                    <button onClick={() => handleOpenDetail()} className='flex my-booking-button justify-center items-center'>
                      <h1 className='booking-card-button-text'>View more details</h1>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between booking-card">
                <div className="flex flex-col">
                  <h1 className="info-card-header">Plumber needed for a bathroom fix</h1>
                  <h1 className="booking-card-header-sub">Sem software company</h1>
                  <h1 className="info-card-header mt-2">Descripton:</h1>
                  <h1 className="booking-card-header-sub">
                    Looking for a skilled plumber to fix a leaking bathroom sink and check the bathroom pipes for any blockages. Should be reliable, fast, and have basic tools. Estimated Duration should be 1–2 hours. I’m available on weekends
                  </h1>
                  <div className="grid grid-cols-3 mt-2">
                    <div>
                      <h1 className="info-card-time info-card-time-alt">Experience level:</h1>
                      <h1 className="info-card-text-color">Beginner</h1>
                    </div>
                    <div>
                      <h1 className="info-card-time info-card-time-alt">Hustle Duration:</h1>
                      <h1 className="info-card-text-color">3 weeks</h1>
                    </div>
                    <div>
                      <h1 className="info-card-time info-card-time-alt">Amount:</h1>
                      <h1 className="info-card-text-color">GHS 1200.00</h1>
                    </div>
                  </div>
                  <div className="flex flex-row mt-4">
                    <button className='flex my-booking-button justify-center items-center'>
                      <h1 className='booking-card-button-text'>View more details</h1>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </section>
    </div>
  )
}