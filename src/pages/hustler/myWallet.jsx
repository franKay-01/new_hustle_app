import { useState } from "react"
import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import NoInfoCard from "../../components/no_info_card"
import HustleDetailModal from "../../components/modals/detail_modal";

export default function MyWalletPage(){
  const [showOpt, setShowOpt] = useState('in_progress')
  const [showHustleDetailsModal, setShowHustleDetailModal] = useState(false)

  return(
    <div className="flex h-screen overflow-hidden bg-[#F6F6F6]">
      <Sidebar />

      <main className="flex-1 bg-[#F5F5F5] overflow-y-auto">
        <Navbar />
        <div className="pl-5 pr-5 pt-2">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-xl font-[500]">My wallet</h1>
          </div>
          <div className="w-[100%] booking-card !px-4 !py-4 mt-4">
            <div className="flex flex-row gap-8 items-center mb-1 overflow-x-auto whitespace-nowrap">
              <div className="flex flex-col gap-1 wallet-card wallet-card-green">
                <div className="flex flex-row items-center gap-2">
                  <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="36" rx="6" fill="#6FC83E" fill-opacity="0.2"/>
                    <path d="M20 28C14.4771 28 10 23.5228 10 18C10 12.4771 14.4771 8 20 8C25.5228 8 30 12.4771 30 18C30 23.5228 25.5228 28 20 28ZM20 26C24.4183 26 28 22.4183 28 18C28 13.5817 24.4183 10 20 10C15.5817 10 12 13.5817 12 18C12 22.4183 15.5817 26 20 26ZM21 16.5V21H22V23H18V21H19V18.5H18V16.5H21ZM21.5 14C21.5 14.8284 20.8284 15.5 20 15.5C19.1716 15.5 18.5 14.8284 18.5 14C18.5 13.1716 19.1716 12.5 20 12.5C20.8284 12.5 21.5 13.1716 21.5 14Z" fill="#51C71B"/>
                  </svg>
                  <h1 className="info-card-header">Available to withdraw</h1>
                </div>
                <h1 className="service-amount">GHS 1200.00</h1>
              </div>
              <div className="flex flex-col gap-1 wallet-card wallet-card-blue">
                <div className="flex flex-row items-center gap-2">
                  <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="36" rx="6" fill="#3380FF" fill-opacity="0.2"/>
                    <path d="M20 28C14.4771 28 10 23.5228 10 18C10 12.4771 14.4771 8 20 8C25.5228 8 30 12.4771 30 18C30 23.5228 25.5228 28 20 28ZM20 26C24.4183 26 28 22.4183 28 18C28 13.5817 24.4183 10 20 10C15.5817 10 12 13.5817 12 18C12 22.4183 15.5817 26 20 26ZM21 16.5V21H22V23H18V21H19V18.5H18V16.5H21ZM21.5 14C21.5 14.8284 20.8284 15.5 20 15.5C19.1716 15.5 18.5 14.8284 18.5 14C18.5 13.1716 19.1716 12.5 20 12.5C20.8284 12.5 21.5 13.1716 21.5 14Z" fill="#3380FF"/>
                  </svg>
                  <h1 className="info-card-header">Available to withdraw</h1>
                </div>
                <h1 className="service-amount">GHS 1200.00</h1>
              </div>
              <div className="flex flex-col gap-1 wallet-card wallet-card-pink">
                <div className="flex flex-row items-center gap-2">
                  <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="36" rx="6" fill="#E278FD" fill-opacity="0.2"/>
                    <path d="M20 28C14.4771 28 10 23.5228 10 18C10 12.4771 14.4771 8 20 8C25.5228 8 30 12.4771 30 18C30 23.5228 25.5228 28 20 28ZM20 26C24.4183 26 28 22.4183 28 18C28 13.5817 24.4183 10 20 10C15.5817 10 12 13.5817 12 18C12 22.4183 15.5817 26 20 26ZM21 16.5V21H22V23H18V21H19V18.5H18V16.5H21ZM21.5 14C21.5 14.8284 20.8284 15.5 20 15.5C19.1716 15.5 18.5 14.8284 18.5 14C18.5 13.1716 19.1716 12.5 20 12.5C20.8284 12.5 21.5 13.1716 21.5 14Z" fill="#E07BE9"/>
                  </svg>
                  <h1 className="info-card-header">Available to withdraw</h1>
                </div>
                <h1 className="service-amount">GHS 1200.00</h1>
              </div>
              <div className="flex flex-col gap-1 !px-4 !py-1 wallet-card wallet-card-cyan">
                <div className="flex flex-row items-center gap-2">
                  <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="44" height="44" rx="22" fill="#C2D5D4" fill-opacity="0.2"/>
                    <path d="M19.4993 30.8327H24.4993C28.666 30.8327 30.3327 29.166 30.3327 24.9993V19.9993C30.3327 15.8327 28.666 14.166 24.4993 14.166H19.4993C15.3327 14.166 13.666 15.8327 13.666 19.9993V24.9993C13.666 29.166 15.3327 30.8327 19.4993 30.8327Z" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.8242 18.9004H24.3576V22.4421" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M24.3573 18.9004L19.6406 23.6171" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17 26.2578C20.2417 27.3411 23.7583 27.3411 27 26.2578" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <h1 className="info-card-header">Withdraw</h1>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 mt-4 mb-4">
              <h1 onClick={() => setShowOpt('in_progress')} className={`${showOpt === 'in_progress' ? 'info-card-desc-mb' : ''} info-card-desc cursor-pointer`}>Work in-progress balance</h1>
              <h1 onClick={() => setShowOpt('in_review')} className={`${showOpt === 'in_review' ? 'info-card-desc-mb' : ''} info-card-desc cursor-pointer`}>Work in-review balance</h1>
              <h1 onClick={() => setShowOpt('withdrawal')} className={`${showOpt === 'withdrawal' ? 'info-card-desc-mb' : ''} info-card-desc cursor-pointer`}>Withdrawal</h1>
            </div>
            { showOpt === 'in_progress' ?
              <NoInfoCard header={'No hustle is in progress'} message={'All your work in progress balance will be displayed here'}/>
              : null
            }
            
            { showOpt === 'in_review' ?
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <div onClick={() => setShowHustleDetailModal(true)} className="wallet-hustle-card flex flex-row justify-between cursor-pointer">
                  <div className="flex flex-col gap-4">
                    <h1 className="modal-header-text">Booking details</h1>
                    <div className="flex flex-row gap-2">
                      <h1 className="modal-header-text !text-[#0542D4]">Go to hustle</h1>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.01 13H4L4 11H16.01V8L20 12L16.01 16V13Z" fill="#0542D4"/>
                      </svg>
                    </div>
                  </div>
                  <h1 className="service-amount">GHS 1200.00</h1>
                </div>
                <div className="wallet-hustle-card flex flex-row justify-between">
                  <div className="flex flex-col gap-4">
                    <h1 className="modal-header-text">Booking details</h1>
                    <div className="flex flex-row gap-2">
                      <h1 className="modal-header-text !text-[#0542D4]">Go to hustle</h1>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.01 13H4L4 11H16.01V8L20 12L16.01 16V13Z" fill="#0542D4"/>
                      </svg>
                    </div>
                  </div>
                  <h1 className="service-amount">GHS 1200.00</h1>
                </div>
                <div className="wallet-hustle-card flex flex-row justify-between">
                  <div className="flex flex-col gap-4">
                    <h1 className="modal-header-text">Booking details</h1>
                    <div className="flex flex-row gap-2">
                      <h1 className="modal-header-text !text-[#0542D4]">Go to hustle</h1>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.01 13H4L4 11H16.01V8L20 12L16.01 16V13Z" fill="#0542D4"/>
                      </svg>
                    </div>
                  </div>
                  <h1 className="service-amount">GHS 1200.00</h1>
                </div>
              </div>
              : null
            }
            
            { showOpt === 'withdrawal' ?
              <div></div>
              : null
            }
            
          </div>
        </div>
      </main>
    </div>
  )
}