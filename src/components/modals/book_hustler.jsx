import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ClientImg from "../../assets/images/client_img.svg"
import { Popover } from '@headlessui/react'
import Badge from "../badge";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import MediaUpload from "../media";

export default function BookHustlerModal({handleClose, show, handleShowProposalModal}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [activeView, setActiveView] = useState(false)
  const [isApplied, setIsApplied] = useState(true)
  const [jobDescription, setJobDescription] = useState(true)
  const [selectedFile, setSelectedFile] = useState([]);

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
          <div className="flex flex-col">
            <div className="info-card !bg-[#F3E4C8] flex flex-row justify-between px-4 py-2">
              <div className="flex flex-col">
                <h1 className='modal-header-text'>Lash Extension Classic</h1>
                <h1 className="modal-header-text !text-[13px]">30 mins</h1>
              </div>
              <h1 className="modal-header-text">GHS 100.00</h1>
            </div>
            <div className="flex flex-col lg:flex-row md:flex-row mt-4 gap-2">
              <div className="flex flex-col">
                <label className="form-label">Preferred date</label>
                <div className="flex flex-row gap-2">
                  <input 
                    type="date" 
                    name="date_needed"
                    className="auth-input-box auth-input-box-date block" 
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <input 
                    type="date" 
                    name="date_needed"
                    className="auth-input-box auth-input-box-date block" 
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="form-label">Preferred time</h1>
                <div className="flex flex-row gap-2">
                  <input 
                    type="time" 
                    name="date_needed"
                    className="auth-input-box auth-input-box-date block" 
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <input 
                    type="time" 
                    name="date_needed"
                    className="auth-input-box auth-input-box-date block" 
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
            </div>

            <label className="form-label mt-4">Hustle description:</label>
            <Editor wrapperClassName="editor-wrapper" toolbar={{ options: ['inline','list', 'link', 'image'] }} />

            <h1 className="form-label mt-4">Upload supporting images</h1>
            <MediaUpload setOriginalSelectedFile={setSelectedFile}/>

            <div className="flex justify-center">
              <button className='flex view-more-button view-more-button-alt justify-center items-center'>
                <h1 className='view-more-button-text'>Book now</h1>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}