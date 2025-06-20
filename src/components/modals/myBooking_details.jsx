import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ClientImg from "../../assets/images/client_img.svg"
import { Popover } from '@headlessui/react'

export default function MyBookingDetailModal({handleClose, show}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [activeView, setActiveView] = useState(false)
  const [isApplied, setIsApplied] = useState(true)
  const [jobDescription, setJobDescription] = useState(true)

  useEffect(() => {
    if (show){
      setActiveView(false)
    }
  },[show])

  const hustle_url = "hello"
  const shareOnWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=Check out this job%20https://webb.staging.hustleapp.io${hustle_url}`, 'Share on WhatsApp', 'width=600,height=400');
  }

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=https://webb.staging.hustleapp.io${hustle_url}`, 'Share on Facebook', 'width=600,height=400');
  }

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?url=https://webb.staging.hustleapp.io${hustle_url}&title=Check out this job`, 'Share on LinkedIn', 'width=600,height=400');
  }

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=https://webb.staging.hustleapp.io${hustle_url}&text=Check out this job`, 'Share on Twitter', 'width=600,height=400');
  }

  const shareOnInstagram = () => {
    window.open(`https://www.instagram.com/?url=https://webb.staging.hustleapp.io${hustle_url}`, 'Share on Instagram', 'width=600,height=400');
  }

  const copyToClipboard = () => {
    const textToCopy = `https://webb.staging.hustleapp.io${hustle_url}`;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        const cpElement = document.getElementById('cp_id');
        cpElement.textContent = 'Copied!';
        setTimeout(() => {
          cpElement.textContent = 'Copy link';
        }, 3000);
      })
      .catch((err) => {
        console.error('Unable to copy text to clipboard:', err);
      });
  }

  const submitProposal = () => {
    console.log("SUB pro")
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
      <section className="modal-main">
        <div className="flex justify-between p-3">
          <h1 className="modal-header-text">Booking details</h1>
          <div className="flex flex-row gap-2 justify-between items-center">
            <button className='flex modal-more-button justify-center items-center'>
              <h1 className='modal-more-button-text'>Accept booking proposal</h1>
            </button>
            <button className='flex my-booking-button-alt-c justify-center items-center'>
              <h1 className='booking-card-button-text booking-card-button-text-alt'>Reject booking</h1>
            </button>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#E1E1E1"/>
              <path d="M10.9102 22.5455V10.9091C10.9102 10.5091 11.0526 10.1667 11.3374 9.88183C11.6223 9.59698 11.9647 9.45456 12.3647 9.45456H19.6374C20.0374 9.45456 20.3799 9.59698 20.6647 9.88183C20.9495 10.1667 21.092 10.5091 21.092 10.9091V22.5455L16.0011 20.3636L10.9102 22.5455ZM12.3647 20.3273L16.0011 18.7636L19.6374 20.3273V10.9091H12.3647V20.3273Z" fill="#575757"/>
            </svg>

            <Popover className="relative flex learn-display focus:outline-none">
              <Popover.Button className="learn-display">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#E1E1E1"/>
                  <path d="M16.0014 21.8182C15.6014 21.8182 15.259 21.6758 14.9741 21.3909C14.6893 21.1061 14.5469 20.7636 14.5469 20.3636C14.5469 19.9636 14.6893 19.6212 14.9741 19.3364C15.259 19.0515 15.6014 18.9091 16.0014 18.9091C16.4014 18.9091 16.7438 19.0515 17.0287 19.3364C17.3135 19.6212 17.456 19.9636 17.456 20.3636C17.456 20.7636 17.3135 21.1061 17.0287 21.3909C16.7438 21.6758 16.4014 21.8182 16.0014 21.8182ZM16.0014 17.4546C15.6014 17.4546 15.259 17.3121 14.9741 17.0273C14.6893 16.7424 14.5469 16.4 14.5469 16C14.5469 15.6 14.6893 15.2576 14.9741 14.9727C15.259 14.6879 15.6014 14.5455 16.0014 14.5455C16.4014 14.5455 16.7438 14.6879 17.0287 14.9727C17.3135 15.2576 17.456 15.6 17.456 16C17.456 16.4 17.3135 16.7424 17.0287 17.0273C16.7438 17.3121 16.4014 17.4546 16.0014 17.4546ZM16.0014 13.0909C15.6014 13.0909 15.259 12.9485 14.9741 12.6636C14.6893 12.3788 14.5469 12.0364 14.5469 11.6364C14.5469 11.2364 14.6893 10.8939 14.9741 10.6091C15.259 10.3242 15.6014 10.1818 16.0014 10.1818C16.4014 10.1818 16.7438 10.3242 17.0287 10.6091C17.3135 10.8939 17.456 11.2364 17.456 11.6364C17.456 12.0364 17.3135 12.3788 17.0287 12.6636C16.7438 12.9485 16.4014 13.0909 16.0014 13.0909Z" fill="#575757"/>
                </svg>
              </Popover.Button>

              <Popover.Panel className="absolute right-0 top-7 z-10 mt-8 dropdown-margin">
                <div className={ activeView ? 'flex flex-col menu-bar menu-bar-alt' : 'flex flex-col menu-bar'}>
                {activeView ? 
                  <>
                    <h1 className="view-more-header">Share</h1>
                    <hr className="default"/>
                    <div className="flex flex-col gap-4 mt-4">
                      <div onClick={shareOnWhatsApp} className="flex flex-row gap-4 items-center cursor-pointer">
                        <svg className="w-8 h-8" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9589 4.00809C17.8539 1.90063 15.0545 0.739517 12.0721 0.738281C5.92662 0.738281 0.925095 5.73967 0.922623 11.8868C0.921799 13.8518 1.43513 15.7701 2.41086 17.4608L0.829102 23.2383L6.73961 21.6878C8.36819 22.5762 10.2017 23.0444 12.0676 23.0449H12.0722C18.217 23.0449 23.2191 18.0431 23.2214 11.8957C23.2227 8.9165 22.064 6.1154 19.9589 4.00809ZM12.0721 21.162H12.0683C10.4055 21.1613 8.77469 20.7144 7.35168 19.8703L7.01344 19.6694L3.50606 20.5895L4.44223 17.1698L4.22182 16.8192C3.29416 15.3438 2.80431 13.6384 2.80513 11.8875C2.80705 6.77815 6.96428 2.62134 12.0758 2.62134C14.551 2.62216 16.8778 3.58731 18.6274 5.33894C20.3769 7.09058 21.3399 9.41885 21.3391 11.895C21.3369 17.0048 17.1799 21.162 12.0721 21.162ZM17.1552 14.2215C16.8767 14.082 15.507 13.4083 15.2515 13.3152C14.9964 13.2222 14.8104 13.1759 14.6249 13.4547C14.4391 13.7335 13.9053 14.3611 13.7427 14.5469C13.5801 14.7328 13.4178 14.7561 13.1391 14.6166C12.8605 14.4772 11.9629 14.1829 10.8988 13.2339C10.0707 12.4952 9.5116 11.5829 9.349 11.3041C9.18668 11.0251 9.34763 10.8888 9.47122 10.7356C9.7728 10.3611 10.0748 9.96844 10.1676 9.78264C10.2606 9.59669 10.214 9.43396 10.1443 9.29457C10.0748 9.15518 9.51764 7.78395 9.28555 7.22598C9.05923 6.68298 8.82976 6.75632 8.65865 6.7478C8.49632 6.7397 8.31052 6.73805 8.12471 6.73805C7.93904 6.73805 7.63719 6.80768 7.38176 7.08673C7.12646 7.36565 6.40686 8.03952 6.40686 9.41075C6.40686 10.782 7.40511 12.1067 7.54436 12.2926C7.68361 12.4785 9.50885 15.2924 12.3034 16.499C12.968 16.7863 13.4869 16.9575 13.8916 17.0859C14.559 17.298 15.1661 17.268 15.6462 17.1964C16.1815 17.1163 17.2943 16.5223 17.5267 15.8717C17.7588 15.2209 17.7588 14.6632 17.689 14.5469C17.6195 14.4307 17.4337 14.3611 17.1552 14.2215Z" fill="#1F1F1F"/>
                        </svg>
                        <h1 className="share-text"> Whatsapp</h1>
                      </div>
                      <div onClick={shareOnFacebook} className="flex flex-row gap-4 items-center cursor-pointer">
                        <svg className="w-8 h-8" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_4241_29929)">
                          <path d="M21.9963 0.738281H1.97919C1.29378 0.738693 0.738144 1.2946 0.738281 1.98029V21.9974C0.738693 22.6828 1.2946 23.2384 1.98029 23.2383H12.7573V14.5371H9.83496V11.1313H12.7573V8.62495C12.7573 5.71838 14.5318 4.13635 17.1245 4.13635C18.3664 4.13635 19.4336 4.22891 19.7446 4.27025V7.30811H17.9567C16.5461 7.30811 16.2729 7.97841 16.2729 8.96223V11.1313H19.6458L19.2063 14.5371H16.2729V23.2383H21.9963C22.6821 23.2384 23.2381 22.6826 23.2383 21.9968C23.2383 21.9967 23.2383 21.9966 23.2383 21.9963V1.97919C23.238 1.29378 22.682 0.738144 21.9963 0.738281Z" fill="#1F1F1F"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_4241_29929">
                          <rect width="24" height="24" fill="white"/>
                          </clipPath>
                          </defs>
                        </svg>
                        <h1 className="share-text"> Facebook</h1>
                      </div>
                      <div onClick={shareOnLinkedIn} className="flex flex-row gap-4 items-center cursor-pointer">
                        <svg className="w-8 h-8" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="www.w3.org/2000/svg">
                          <path d="M3.46687 1.21875C1.817 1.21875 0.738281 2.30214 0.738281 3.7261C0.738281 5.11862 1.78487 6.23291 3.40356 6.23291H3.43488C5.11702 6.23291 6.16388 5.11862 6.16388 3.7261C6.13243 2.30214 5.11702 1.21875 3.46687 1.21875Z" fill="#1F1F1F"/>
                          <path d="M1.02344 8.21411H5.84671V22.7251H1.02344V8.21411Z" fill="#1F1F1F"/>
                          <path d="M17.6858 7.87354C15.0838 7.87354 13.339 10.3185 13.339 10.3185V8.21411H8.51562V22.7251H13.3388V14.6216C13.3388 14.1878 13.3702 13.7547 13.4976 13.4444C13.8463 12.5782 14.6398 11.6807 15.9723 11.6807C17.7176 11.6807 18.4157 13.0114 18.4157 14.9622V22.7251H23.2385V14.4048C23.2385 9.94762 20.8589 7.87354 17.6858 7.87354Z" fill="#1F1F1F"/>
                        </svg>
                        <h1 className="share-text"> LinkedIn</h1>
                      </div>
                      <div onClick={shareOnTwitter} className="flex flex-row gap-4 items-center cursor-pointer">
                        <svg className="w-8 h-8" xmlns="www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                          <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                        </svg>
                        <h1 className="share-text"> X (twitter)</h1>
                      </div>
                      <div onClick={shareOnInstagram} className="flex flex-row gap-4 items-center cursor-pointer">
                        <svg className="w-8 h-8" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_4241_29943)">
                          <path d="M23.9773 7.05607C23.9211 5.78085 23.7149 4.90416 23.4195 4.14449C23.1147 3.33812 22.6459 2.61617 22.0316 2.01602C21.4315 1.40652 20.7048 0.932921 19.9078 0.632936C19.1437 0.337529 18.2716 0.131312 16.9964 0.0750879C15.7116 0.0141019 15.3038 0 12.0453 0C8.78686 0 8.37901 0.0141019 7.09903 0.0703262C5.82382 0.126551 4.94712 0.332951 4.18764 0.628174C3.38108 0.932922 2.65914 1.40176 2.05899 2.01602C1.44949 2.61617 0.976073 3.34288 0.675905 4.13991C0.380498 4.90416 0.174281 5.77609 0.118057 7.0513C0.0570706 8.33604 0.0429688 8.7439 0.0429688 12.0023C0.0429688 15.2608 0.0570706 15.6686 0.113295 16.9486C0.169519 18.2238 0.37592 19.1005 0.671326 19.8602C0.976073 20.6666 1.44949 21.3885 2.05899 21.9887C2.65914 22.5982 3.38585 23.0718 4.18288 23.3718C4.94712 23.6672 5.81906 23.8734 7.09446 23.9296C8.37425 23.986 8.78229 23.9999 12.0407 23.9999C15.2992 23.9999 15.707 23.986 16.987 23.9296C18.2622 23.8734 19.1389 23.6672 19.8984 23.3718C21.5113 22.7482 22.7865 21.4729 23.4101 19.8602C23.7054 19.096 23.9118 18.2238 23.968 16.9486C24.0242 15.6686 24.0383 15.2608 24.0383 12.0023C24.0383 8.7439 24.0336 8.33604 23.9773 7.05607ZM21.8161 16.8549C21.7644 18.027 21.5676 18.6599 21.4035 19.0819C21.0002 20.1274 20.1704 20.9572 19.1248 21.3605C18.7029 21.5246 18.0653 21.7215 16.8978 21.7729C15.632 21.8293 15.2523 21.8433 12.0501 21.8433C8.84785 21.8433 8.46344 21.8293 7.20214 21.7729C6.03004 21.7215 5.3971 21.5246 4.97515 21.3605C4.45484 21.1682 3.98124 20.8634 3.59682 20.4649C3.19831 20.0758 2.89356 19.6069 2.70126 19.0866C2.53717 18.6647 2.34029 18.027 2.28883 16.8596C2.23242 15.5937 2.2185 15.2139 2.2185 12.0117C2.2185 8.80946 2.23242 8.42505 2.28883 7.16394C2.34029 5.99183 2.53717 5.3589 2.70126 4.93694C2.89356 4.41645 3.19831 3.94303 3.60159 3.55843C3.99058 3.15992 4.45942 2.85517 4.97991 2.66306C5.40187 2.49896 6.03956 2.30209 7.2069 2.25044C8.47278 2.19422 8.85261 2.18011 12.0547 2.18011C15.2616 2.18011 15.6413 2.19422 16.9026 2.25044C18.0747 2.30209 18.7076 2.49896 19.1296 2.66306C19.6499 2.85517 20.1235 3.15992 20.5079 3.55843C20.9064 3.94761 21.2112 4.41645 21.4035 4.93694C21.5676 5.3589 21.7644 5.99641 21.8161 7.16394C21.8723 8.42981 21.8864 8.80946 21.8864 12.0117C21.8864 15.2139 21.8723 15.589 21.8161 16.8549Z" fill="#1F1F1F"/>
                          <path d="M12.0442 5.83716C8.64049 5.83716 5.87891 8.59856 5.87891 12.0024C5.87891 15.4063 8.64049 18.1677 12.0442 18.1677C15.448 18.1677 18.2094 15.4063 18.2094 12.0024C18.2094 8.59856 15.448 5.83716 12.0442 5.83716ZM12.0442 16.0017C9.83604 16.0017 8.04492 14.2107 8.04492 12.0024C8.04492 9.79411 9.83604 8.00317 12.0442 8.00317C14.2525 8.00317 16.0434 9.79411 16.0434 12.0024C16.0434 14.2107 14.2525 16.0017 12.0442 16.0017Z" fill="#1F1F1F"/>
                          <path d="M19.8925 5.59336C19.8925 6.38819 19.248 7.03267 18.453 7.03267C17.6581 7.03267 17.0137 6.38819 17.0137 5.59336C17.0137 4.79834 17.6581 4.15405 18.453 4.15405C19.248 4.15405 19.8925 4.79834 19.8925 5.59336Z" fill="#1F1F1F"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_4241_29943">
                          <rect width="24" height="24" fill="white"/>
                          </clipPath>
                          </defs>
                        </svg>
                        <h1 className="share-text"> Instagram</h1>
                      </div>
                    </div>
                    <div className='flex flex-row'>
                      <div className="flex flex-row justify-between items-center gap-4 share-copy-bg">
                        <h1 className="share-text flex flex-wrap break-words break-all"><span>https://webb.staging.hustleapp.io</span>{hustle_url}</h1>
                        <svg onClick={copyToClipboard} className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>

                      </div>
                    </div>
                  </>
                :
                  <>
                    <h1 className="view-more-header">More</h1>
                    <hr className="default"/>
                    <div onClick={() => setActiveView(true)} className="flex flex-row gap-2 items-center mt-4 cursor-pointer">
                      <svg className="w-7 h-7" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_7329_140836)">
                        <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="#323232"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_7329_140836">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <h1 className="info-card-desc info-card-desc-alt">Share hustle</h1>
                    </div>
                    <div className="flex flex-row gap-2 items-center mt-4 cursor-pointer">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_7329_140840)">
                        <path d="M14.4 6L14 4H5V21H7V14H12.6L13 16H20V6H14.4Z" fill="#CD0000"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_7329_140840">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <h1 className="info-card-desc info-card-desc-alt">Report this hustle</h1>
                    </div>
                  </> 
                }
                </div>
              </Popover.Panel>
            </Popover>
            <svg onClick={handleClose} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9987 10.5865L16.9485 5.63672L18.3627 7.05093L13.4129 12.0007L18.3627 16.9504L16.9485 18.3646L11.9987 13.4149L7.04899 18.3646L5.63477 16.9504L10.5845 12.0007L5.63477 7.05093L7.04899 5.63672L11.9987 10.5865Z" fill="#000F1F"/>
            </svg>
          </div>
        </div>
        <hr className='default'/>
        <div className="flex flex-col gap-2 p-3">
          <div className="flex flex-col">
            <h1 className="view-more-header">Plumber needed for a bathroom fix for quick gigs</h1>
            <h1 className='info-card-desc-mb info-card-desc w-fit'>Job description</h1>

            <h1 className='modal-header-text-alt mt-4'>Description:</h1>
            <h1 className="info-card-desc">
              Looking for a skilled plumber to fix a leaking bathroom sink and check the bathroom pipes for any blockages. Should be reliable, fast, and have basic tools. Estimated Duration should be 1–2 hours. I’m available on weekends
            </h1>

            <div className="flex flex-col mt-4">
              <h1 className="info-card-time info-card-time-alt">Location</h1>
              <h1 className="info-card-text-color">Accra</h1>
            </div>
            <div className="flex flex-row justify-between mt-4">
              <div className="flex flex-col">
                <h1 className="info-card-time info-card-time-alt">Experience level</h1>
                <h1 className="info-card-text-color">Beginner</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="info-card-time info-card-time-alt">Hustle duration</h1>
                <h1 className="info-card-text-color">8 days</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="info-card-time info-card-time-alt">Amount</h1>
                <h1 className="info-card-text-color">GHS 3000</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="info-card-time info-card-time-alt">Preferred time</h1>
                <h1 className="info-card-text-color">1:00pm - 3:00pm</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="info-card-time info-card-time-alt">Preferred date</h1>
                <h1 className="info-card-text-color">November 16, 2025 - December 24, 2025 </h1>
              </div>
            </div>

            <h1 className='modal-header-text-alt mt-8'>Skills & expertise</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="skill-bubble">
                <h1 className="skill-bubble-text">Youtube Editor</h1>
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
      </section>
    </div>
  )
}