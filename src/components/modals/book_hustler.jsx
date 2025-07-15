import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientImg from "../../assets/images/client_img.svg"
import { Popover } from '@headlessui/react'
import Badge from "../badge";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import MediaUpload from "../media";
import Cookies from 'js-cookie';
import useHustleFunctions from "../../utils/hustles";
import Loader from "../loader";
import { ShowToast } from "../showToast";

export default function BookHustlerModal({handleClose, show, service}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [activeView, setActiveView] = useState(false)
  const [isApplied, setIsApplied] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [savedWorkingHours, setSavedWorkingHours] = useState([])
  const [form, setForm] = useState({date_needed: '', opening_time: '8:00'})
  const [hustlerWallet, setHustlerWallet] = useState(0)

  const [jobDescription, setJobDescription] = useState(true)

  const history = useNavigate();

  const { getAvailableTimes, retrieveWalletDetails, bookHustler} = useHustleFunctions()

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleTimeChange = (value) => {
    setForm({...form, opening_time: value})
  };

  const handleChange = (e) => {
    const selected_day = new Date(e.target.value)
    const dayOfWeek = daysOfWeek[selected_day.getDay()];
    
    const result = savedWorkingHours.some((item) => item.toLowerCase() === dayOfWeek.toLowerCase());

    if (result){
      setForm({...form, [e.target.name]: e.target.value})
    }else{
      ShowToast("error", `${dayOfWeek} is not a working day for this hustler.`)
      e.target.value = "";
    }
	}

  const getHustlerAvailableTimes = async () => {
    setIsLoading(true)
    const {response_code, availableTimes} = await getAvailableTimes(Cookies.get('huid'))

    if (response_code === 200){
      console.log("HOURS ",JSON.stringify(availableTimes))
      if (availableTimes.length > 0){
        const days = availableTimes.map(item => item.day);

        setSavedWorkingHours(days)
        return
      }

      return
    }

    if (response_code === 401){
      ShowToast("error", "Session expired. Sign in to continue!")
      return history('/')
    }

    ShowToast("error", "Hustler availability details not set.")
    return
  }

  const getHustlerWalletDetails = async () => {
    const { response_code, wallet} = await retrieveWalletDetails()

    if (response_code === 200){
      setHustlerWallet(parseFloat(wallet))
      return
    }

    if (response_code === 401){
      ShowToast("error", "Session expired. Sign in to continue!")
      return history('/')
    }

    ShowToast("error", "Wallet info retrieval failed. Try again later!")
    return
  }

  const submitProjectDetails = async () => {
    setIsLoading(true)

    if (hustlerWallet === 0){
      setIsLoading(false)
      ShowToast("error", "Please top up your wallet to continue")
      return
    }

    // if (Cookies.get("latitude") === undefined || Cookies.get("longitude") === undefined) {
    //   setIsLoading(false)
    //   ShowToast("error", "Please allow the app access your location to continue. Reload the page after allowing access")
    //   return
    // }

    const params = {
      "portfolio_project_id": service.id,
      "latitude": "5.1922",
      "longitude": "0.110",
      "preferred_date": form.date_needed,
      "preferred_start_time": form.opening_time,
      "hustler_id": service.hustler_id,
      "src": "WEB",
    }

    const {response_code, msg} = await bookHustler(params)
    if (response_code === 200){
      setIsLoading(false)
      ShowToast("success", "Booking request has been submitted")
      history('/creator/hustles')
      return
    }

    ShowToast("error", msg)
    setIsLoading(false)
    return
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // start loading
  
      try {
        await Promise.all([
          getHustlerWalletDetails(),
          getHustlerAvailableTimes()
        ]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false); // end loading
      }
    };

    fetchData()
  },[show])
  return (
    <div className={showHideClassName}>
      <section className="modal-main overflow-y-auto">
        <div className="flex justify-between p-3">
          <h1 className="modal-header-text">Booking hustler</h1>
          <div className="flex flex-row gap-2 justify-between items-center">
            <svg onClick={() => handleClose()} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9987 10.5865L16.9485 5.63672L18.3627 7.05093L13.4129 12.0007L18.3627 16.9504L16.9485 18.3646L11.9987 13.4149L7.04899 18.3646L5.63477 16.9504L10.5845 12.0007L5.63477 7.05093L7.04899 5.63672L11.9987 10.5865Z" fill="#000F1F"/>
            </svg>
          </div>
        </div>
        <hr className='default'/>
        <div className="flex flex-col gap-2 p-3">
          { isLoading ? 
            <Loader />
            :
            <div className="flex flex-col">
              <div className="info-card !bg-[#F3E4C8] flex flex-row justify-between px-4 py-2">
                <div className="flex flex-col">
                  <h1 className='modal-header-text'>{service.project_name}</h1>
                  <h1 className="modal-header-text !text-[13px]">{service.proposed_duration} hrs</h1>
                </div>
                <h1 className="modal-header-text">GHS {service.proposed_amount.toFixed(2)}</h1>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 mt-4 gap-2">
                <div className="flex flex-col">
                  <label className="form-label">Preferred date</label>
                  <div className="flex flex-row gap-2">
                    <input 
                      type="date" 
                      name="date_needed"
                      onChange={handleChange}
                      className="auth-input-box auth-input-box-date-alt block" 
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {/* <input 
                      type="date" 
                      name="date_needed"
                      className="auth-input-box auth-input-box-date block" 
                      min={new Date().toISOString().split("T")[0]}
                    /> */}
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="form-label">Preferred time</h1>
                  <div className="flex flex-row gap-2">
                    <input 
                      type="time" 
                      name="time_needed"
                      onChange={(e) => handleTimeChange(e.target.value)}
                      className="auth-input-box auth-input-box-date-alt block" 
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {/* <input 
                      type="time" 
                      name="date_needed"
                      className="auth-input-box auth-input-box-date block" 
                      min={new Date().toISOString().split("T")[0]}
                    /> */}
                  </div>
                </div>
              </div>
  
              <label className="form-label mt-4">Hustle description:</label>
              <h1 className="form-label">
                {service.project_desc}
              </h1>
  
              {/* <h1 className="form-label mt-4">Upload supporting images</h1>
              <MediaUpload setOriginalSelectedFile={setSelectedFile}/> */}
  
              <div className="flex justify-center mt-12">
                <button className='flex view-more-button view-more-button-alt justify-center items-center'>
                  <h1 className='view-more-button-text'>Book this hustle</h1>
                </button>
              </div>
            </div>
          }
        </div>
      </section>
    </div>
  )
}