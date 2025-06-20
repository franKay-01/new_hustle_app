export default function ConfirmHustleModal({handleClose, show}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-middle-main">
        <div className="flex flex-col justify-center items-center gap-2 p-3">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_7453_61221" style={{ maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">
            <path d="M120 0H0V120H120V0Z" fill="white"/>
            </mask>
            <g mask="url(#mask0_7453_61221)">
            <path d="M37.0362 20.2264C37.0358 20.2258 37.0355 20.2253 37.0352 20.2246" stroke="#7ED321" stroke-width="4.61538" stroke-linecap="round"/>
            <path d="M20.2245 37.0362C20.2238 37.0358 20.2233 37.0355 20.2227 37.0352" stroke="#7ED321" stroke-width="4.61538" stroke-linecap="round"/>
            <path d="M14.0724 60C14.0717 60 14.0711 60 14.0703 60" stroke="#7ED321" stroke-width="4.61538" stroke-linecap="round"/>
            <path d="M20.2245 82.9638C20.2238 82.9642 20.2233 82.9645 20.2227 82.9648" stroke="#7ED321" stroke-width="4.61538" stroke-linecap="round"/>
            <path d="M37.0362 99.7736C37.0358 99.7742 37.0355 99.7747 37.0352 99.7754" stroke="#7ED321" stroke-width="4.61538" stroke-linecap="round"/>
            <path d="M60 105.927C60 105.927 60 105.928 60 105.929" stroke="#7ED321" stroke-width="4.61538" stroke-linecap="round"/>
            <path d="M82.9618 99.7736C82.9622 99.7742 82.9625 99.7747 82.9629 99.7754" stroke="#7ED321" stroke-width="4.61538" stroke-linecap="round"/>
            <path d="M99.7736 82.9638C99.7742 82.9642 99.7747 82.9645 99.7754 82.9648" stroke="#7ED321" stroke-width="4.61538" stroke-linecap="round"/>
            <path d="M105.926 60C105.926 60 105.927 60 105.928 60" stroke="#7ED321" stroke-width="4.61538" stroke-linecap="round"/>
            <path d="M99.7736 37.0362C99.7742 37.0358 99.7747 37.0355 99.7754 37.0352" stroke="#7ED321" stroke-width="4.61538" stroke-linecap="round"/>
            <path d="M82.9618 20.2264C82.9622 20.2258 82.9625 20.2253 82.9629 20.2246" stroke="#7ED321" stroke-width="4.61538" stroke-linecap="round"/>
            <path d="M60 14.0734C60 14.0726 60 14.0721 60 14.0713" stroke="#7ED321" stroke-width="4.61538" stroke-linecap="round"/>
            <mask id="mask1_7453_61221" style={{ maskType: 'luminance'}}maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">
            <path d="M0 0H120V120H0V0Z" fill="white"/>
            </mask>
            <g mask="url(#mask1_7453_61221)">
            <path d="M60.0004 25.7695C78.8923 25.7695 94.2312 41.1084 94.2312 60.0004C94.2312 78.8923 78.8923 94.2312 60.0004 94.2312C41.1084 94.2312 25.7695 78.8923 25.7695 60.0004C25.7695 41.1084 41.1084 25.7695 60.0004 25.7695Z" fill="#7ED321"/>
            <path d="M49.3477 59.493L57.8607 67.0411L72.8442 52.9434" stroke="#FFFEFF" stroke-width="4.61538" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            </g>
          </svg>
          <h1 className="view-more-header text-center">Hustle completed</h1>
          <h1 className="info-card-desc">
            You have successfully marked this hustle as completed. We would like you to take some time to rate the hustle creator.
          </h1>
          <button onClick={handleClose} className='flex view-more-button view-more-button-alt justify-center items-center mt-4'>
            <h1 className='view-more-button-text'>Got it</h1>
          </button>
        </div>
      </section>
    </div>
  )
}