export default function CreatorHustleAppovalModal({handleClose, show, message}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-middle-main">
        <div className="flex flex-col justify-center items-center gap-2 p-3">
          <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_7266_182057)">
            <path d="M19.9999 3.8335C10.7999 3.8335 3.33325 11.3002 3.33325 20.5002C3.33325 29.7002 10.7999 37.1668 19.9999 37.1668C29.1999 37.1668 36.6666 29.7002 36.6666 20.5002C36.6666 11.3002 29.1999 3.8335 19.9999 3.8335ZM21.6666 28.8335H18.3333V18.8335H21.6666V28.8335ZM21.6666 15.5002H18.3333V12.1668H21.6666V15.5002Z" fill="#0542D4"/>
            </g>
            <defs>
            <clipPath id="clip0_7266_182057">
            <rect width="40" height="40" fill="white" transform="translate(0 0.5)"/>
            </clipPath>
            </defs>
          </svg>
          <h1 className="view-more-header !leading-6 !text-[18px] !font-[400] text-left">{message}</h1>
          
          <div className="flex flex-col lg:flex-row md:flex-row gap-2 lg:gap-4 md:gap-4 mt-8">
            <button onClick={handleClose} className='flex my-booking-button-alt-c justify-center items-center'>
              <h1 className='booking-card-button-text booking-card-button-text-alt'>Cancel</h1>
            </button>
            <button className='flex my-booking-button justify-center items-center'>
              <h1 className='booking-card-button-text'>Proceed</h1>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}