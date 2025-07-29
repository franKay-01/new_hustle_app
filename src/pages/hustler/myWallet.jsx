import { useEffect, useState } from "react"
import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import NoInfoCard from "../../components/no_info_card"
import HustleDetailModal from "../../components/modals/detail_modal";
import useHustleFunctions from "../../utils/hustles";
import { ShowToast } from "../../components/showToast";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import TopupModal from "../../components/modals/topup_modal";
import Loader from "../../components/loader";

export default function MyWalletPage(){
  const [isLoading, setIsLoading] = useState(false)
  const [showTopup, setShowTopup] = useState(false)
  const [showOpt, setShowOpt] = useState('in_progress')
  const [showHustleDetailsModal, setShowHustleDetailModal] = useState(false)
  const [hustlerWallet, setHustlerWallet] = useState(0.00)
  const [pendingWallet, setPendingWallet] = useState(0.00)
  const [hustles, setHustles] = useState({})

  const history = useNavigate();
  const {retrieveWalletDetails, getAllHustlerStats} = useHustleFunctions()

  const getAmountPending = (items) => {
    const fees = 0.05;

    if (items.length > 0){
      const totalAmount = items?.reduce((sum, item) => {
        const amount = parseFloat(item.my_bid?.amount || 0);
        return sum + amount;
      }, 0);

      const charges = totalAmount * fees
      const amountMinusFees = totalAmount - charges
      setPendingWallet(amountMinusFees.toFixed(2))
    }
  }

  const getHustlerWalletDetails = async () => {
    setIsLoading(true)
    const { response_code, wallet} = await retrieveWalletDetails()

    if (response_code === 200){
      setIsLoading(false)
      setHustlerWallet(parseFloat(wallet))
      return
    }

    if (response_code === 401){
      ShowToast("error", "Session expired. Sign in to continue!")
      return history('/')
    }

    setIsLoading(false)
    ShowToast("error", "Wallet info retrieval failed. Try again later!")
    return
  }

  const getStats = async () => {
    setIsLoading(true)

    const { response_code, stats } = await getAllHustlerStats(Cookies.get('huid'));

    if (response_code === 200){
      const transformed = Object.fromEntries(
        Object.entries(stats).map(([key, value]) => [
          key.replace(/-/g, '_'),
          value
        ])
      );

      const pendingPaymentItems = [...transformed.pending_creator_approval, ...transformed.in_progress]
      getAmountPending(pendingPaymentItems)
      setHustles(transformed)

      setIsLoading(false)
      return
    }

    setIsLoading(false)
    ShowToast("error", "Hustle retrieval failed. Try again!")
    return
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // start loading
  
      try {
        await Promise.all([
          getHustlerWalletDetails(),
          getStats()
        ]);
      } catch (error) {
        ShowToast("error", "Error retrieving information")
      } finally {
        setIsLoading(false); // end loading
      }
    };

    fetchData()
  },[])
  
  // useEffect(() => {
  //   getHustlerWalletDetails()
  //   getStats()
  // },[])

  return(
    <div className="flex h-screen overflow-hidden bg-[#F6F6F6]">
      <Sidebar />

      <main className="flex-1 bg-[#F5F5F5] overflow-y-auto">
        <Navbar />
        <div className="pl-5 pr-5 pt-2">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-xl font-[500]">My wallet</h1>
          </div>
          { isLoading ? 
            <div className="flex justify-center items-center">
              <Loader />
            </div>
            :
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
                  <h1 className="service-amount">GHS {hustlerWallet.toFixed(2)}</h1>
                </div>
                <div className="flex flex-col gap-1 wallet-card wallet-card-blue">
                  <div className="flex flex-row items-center gap-2">
                    <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="36" rx="6" fill="#3380FF" fill-opacity="0.2"/>
                      <path d="M20 28C14.4771 28 10 23.5228 10 18C10 12.4771 14.4771 8 20 8C25.5228 8 30 12.4771 30 18C30 23.5228 25.5228 28 20 28ZM20 26C24.4183 26 28 22.4183 28 18C28 13.5817 24.4183 10 20 10C15.5817 10 12 13.5817 12 18C12 22.4183 15.5817 26 20 26ZM21 16.5V21H22V23H18V21H19V18.5H18V16.5H21ZM21.5 14C21.5 14.8284 20.8284 15.5 20 15.5C19.1716 15.5 18.5 14.8284 18.5 14C18.5 13.1716 19.1716 12.5 20 12.5C20.8284 12.5 21.5 13.1716 21.5 14Z" fill="#3380FF"/>
                    </svg>
                    <h1 className="info-card-header">Pending payment</h1>
                  </div>
                  <h1 className="service-amount">GHS {pendingWallet}</h1>
                </div>
                <div className="flex flex-col gap-1 wallet-card wallet-card-pink">
                  <div className="flex flex-row items-center gap-2">
                    <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="36" rx="6" fill="#E278FD" fill-opacity="0.2"/>
                      <path d="M20 28C14.4771 28 10 23.5228 10 18C10 12.4771 14.4771 8 20 8C25.5228 8 30 12.4771 30 18C30 23.5228 25.5228 28 20 28ZM20 26C24.4183 26 28 22.4183 28 18C28 13.5817 24.4183 10 20 10C15.5817 10 12 13.5817 12 18C12 22.4183 15.5817 26 20 26ZM21 16.5V21H22V23H18V21H19V18.5H18V16.5H21ZM21.5 14C21.5 14.8284 20.8284 15.5 20 15.5C19.1716 15.5 18.5 14.8284 18.5 14C18.5 13.1716 19.1716 12.5 20 12.5C20.8284 12.5 21.5 13.1716 21.5 14Z" fill="#E07BE9"/>
                    </svg>
                    <h1 className="info-card-header">Total earning this year</h1>
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
                { Cookies.get('is_ct') === 'true' ?
                  <div onClick={() => setShowTopup(true)} className="flex flex-col gap-1 !px-4 !py-1 wallet-card wallet-card-cyan">
                    <div className="flex flex-row items-center gap-2">
                      <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="0.5" width="44" height="44" rx="22" fill="#C2D5D4" fill-opacity="0.2"/>
                        <path d="M19.4993 30.8327H24.4993C28.666 30.8327 30.3327 29.166 30.3327 24.9993V19.9993C30.3327 15.8327 28.666 14.166 24.4993 14.166H19.4993C15.3327 14.166 13.666 15.8327 13.666 19.9993V24.9993C13.666 29.166 15.3327 30.8327 19.4993 30.8327Z" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M20.8242 18.9004H24.3576V22.4421" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M24.3573 18.9004L19.6406 23.6171" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17 26.2578C20.2417 27.3411 23.7583 27.3411 27 26.2578" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <h1 className="info-card-header">Topup</h1>
                    </div>
                  </div>
                  :null
                }
                
              </div>
              <div className="flex flex-row gap-4 mt-4 mb-4">
                <h1 onClick={() => setShowOpt('in_progress')} className={`${showOpt === 'in_progress' ? 'info-card-desc-mb' : ''} info-card-desc cursor-pointer`}>Work in-progress balance</h1>
                <h1 onClick={() => setShowOpt('in_review')} className={`${showOpt === 'in_review' ? 'info-card-desc-mb' : ''} info-card-desc cursor-pointer`}>Work in-review balance</h1>
                <h1 onClick={() => setShowOpt('withdrawal')} className={`${showOpt === 'withdrawal' ? 'info-card-desc-mb' : ''} info-card-desc cursor-pointer`}>Withdrawal</h1>
              </div>
              { showOpt === 'in_progress' ?
                <>
                  { hustles.in_progress?.length > 0 ? 
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                      { hustles.in_progress?.map((item, index) => {
                        return <div key={index} onClick={() => setShowHustleDetailModal(true)} className="wallet-hustle-card flex flex-row justify-between cursor-pointer gap-4">
                          <div className="flex flex-col gap-4">
                            <h1 className="modal-header-text">{item.title}</h1>
                            <div className="flex flex-col">
                              <h1 className="modal-header-text">Description:</h1>
                              <h1 className="info-card-desc">{item.description}</h1>
                            </div>
                          </div>
                          <h1 className="service-amount">GHS {item.my_bid.amount}</h1>
                        </div>
                      })}
                    </div>
                    :
                    <div className="flex justify-center items-center">
                      <NoInfoCard header={'No hustle is in review'} message={'All your work in review balance will be displayed here'}/>
                    </div>
                  }
                </>
                : null
              }
              
              { showOpt === 'in_review' ?
                <>
                  { hustles.pending_creator_approval?.length > 0 ? 
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                      { hustles.pending_creator_approval?.map((item, index) => {
                        return <div key={index} onClick={() => setShowHustleDetailModal(true)} className="wallet-hustle-card flex flex-row justify-between cursor-pointer gap-4">
                          <div className="flex flex-col gap-4">
                            <h1 className="modal-header-text">{item.title}</h1>
                            <h1 className="info-card-desc">{item.description}</h1>
                          </div>
                          <h1 className="service-amount">GHS {item.my_bid.amount}</h1>
                        </div>
                      })}
                      
                    </div>
                    :
                    <div className="flex justify-center items-center">
                      <NoInfoCard header={'No hustle is in review'} message={'All your work in review balance will be displayed here'}/>
                    </div>
                  }
                </>
                : null
              }
              
              { showOpt === 'withdrawal' ?
                <div></div>
                : null
              }
              
            </div>
          } 
        </div>

        { showTopup && (
          <TopupModal show={showTopup} handleClose={() => setShowTopup(false)}/>
        )}
      </main>
    </div>
  )
}