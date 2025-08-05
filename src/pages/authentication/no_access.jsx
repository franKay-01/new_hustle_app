import NoAccessImg from "../../assets/images/access.png"
import Cookies from "js-cookie"

export default function NoAccess(){
  return (
    <>
    {/* <div className="flex h-screen overflow-hidden"> */}
        <div className="flex flex-col p-2 mt-24 justify-between items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="info-card-header !text-[48px]">
              You are not Authorized to access this page
            </div>
            
          </div>
          <div className="not_found_image">
            <img src={NoAccessImg}/>
          </div>
          <a href={Cookies.get('is_ct') === 'true' ? '/creator/home' : '/'} className="flex view-more-button view-more-button-alt justify-center items-center !w-[30%]">
            <h1 className="view-more-button-text">Go back to homepage</h1>
          </a>
        </div>
      {/* </div> */}
    </>
  )
}