import { useEffect, useState } from "react"
import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import NoInfoCard from "../../components/no_info_card"
import useFunctions from "../../utils/functions"
import useHustleFunctions from "../../utils/hustles";
import { ShowToast } from "../../components/showToast";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import TopupModal from "../../components/modals/topup_modal";
import CreateVirtualCardModal from "../../components/modals/create_virtual_card_modal";
import WithdrawalModal from "../../components/modals/withdrawal_request_modal"
import Loader from "../../components/loader";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { valueFormatter, formatDateTime } from '../../utils/valueFormatter';
import TransactionModal from "../../components/modals/transactionModal"
import ConfirmTransactionModal from "../../components/modals/confirm_transaction"

export default function MyWalletPage(){
  const [isLoading, setIsLoading] = useState(false)
  const [showTopup, setShowTopup] = useState(false)
  const [showCreateVirtualWallet, setShowCreateVirtualWallet] = useState(false)
  const [showWithdrawalPopup, setShowWithdrawalPopup] = useState(false)
  const [showOpt, setShowOpt] = useState('in_progress')
  const [showHustleDetailsModal, setShowHustleDetailModal] = useState(false)
  const [hustlerWallet, setHustlerWallet] = useState(0.00)
  const [pendingWallet, setPendingWallet] = useState(0.00)
  const [hustles, setHustles] = useState({})
  const [hustlerVirtualCard, setHustlerVirtualCard] = useState([])
  const [allTransactions, setAllTransactions] = useState([])
  const [transactionItems, setTransactionItems] = useState([])
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [showWithdrawalDone, setShowWithdrawalDone] = useState(false)
  const [showWithdrawalDoneInfo, setShowWithdrawalDoneInfo] = useState('')
  const [orderedKeys, setOrderedKeys] = useState([])

  const history = useNavigate();
  const {retrieveWalletDetails, getAllHustlerStats, retrieveVirtualCardDetails, createVirtualCard, getWalletTransactions} = useHustleFunctions()
  const { withdrawalRequest } = useFunctions()

  const keyMappings = {
    bal_before: "Balance Before",
    bal_after: "Balance After",
    amount: "Amount",
    trans_type: "Transaction Type",
    description: "Description",
    status: "Status",
    created_at: "Date",
    transaction_request_id: "Transaction ID"
  };

  const getInitials = (name) => {
    if (name === "" || name === undefined){
      return
    }

    const words = name.split(" ");
    let initials = "";
    if (words.length > 0) {
        initials += words[0].charAt(0); 
    }
    if (words.length > 1) {
        initials += words[1].charAt(0);
    }

    return initials
  }

  const getAllTransactionDetails = async () => {
    setIsLoading(true)
    const {response_code, transactions} = await getWalletTransactions()
    if (response_code === 200){
      setIsLoading(false)
      setAllTransactions(transactions)

      let transItems = transactions.map((transaction) => {
        let status = transaction.status === "success" ?
          <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span aria-hidden class="absolute inset-0 opacity-50 rounded-full"></span>
            <span class="relative text-[#0A4F42] font-[500] capitalize">{transaction.status}</span>
          </span>
          :
          <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
            <span aria-hidden class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
            <span class="relative">{transaction.status}</span>
          </span>

          const getStatusBadge = (status) => {
            const baseClasses =
              "relative inline-block px-3 py-1 font-semibold leading-tight";
            const circleClasses =
              "absolute inset-0 opacity-50 rounded-full";

            switch (status.toLowerCase()) {
              case "success":
              case "accepted":
                return (
                  <span className={`${baseClasses} text-green-900`}>
                    <span aria-hidden className={`${circleClasses}`}></span>
                    <span className="relative text-[#0A4F42] font-[400] capitalize">
                      {status}
                    </span>
                  </span>
                );
              case "pending":
                return (
                  <span className={`${baseClasses} text-yellow-900`}>
                    <span aria-hidden className={`${circleClasses}`}></span>
                    <span className="relative text-[#FDBA40] font-[400] capitalize">{status}</span>
                  </span>
                );
              case "failed":
                return (
                  <span className={`${baseClasses} text-red-900`}>
                    <span aria-hidden className={`${circleClasses}`}></span>
                    <span className="relative text-[#CD0000] font-[400] capitalize">{status}</span>
                  </span>
                );
              default:
                return (
                  <span className={`${baseClasses} text-gray-900`}>
                    <span aria-hidden className={`${circleClasses}`}></span>
                    <span className="relative text-[#FDBA40] font-[400] capitalize">{status}</span>
                  </span>
                );
            }
          };

          return {
            trans_type: transaction.trans_type,
            transaction_request_id: transaction.transaction_request_id,
            amount: valueFormatter(transaction.amount, "¢"),
            date: formatDateTime(transaction.created_at),
            status: getStatusBadge(transaction.status),
            action: <button onClick={() => openModal(transaction)} type="button" class="my-booking-button justify-center items-center">
              <span className="info-card-desc !text-[18px] !text-[#fff] inline">View Details</span>
            </button>
        }
      })

      setTransactionItems(transItems)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    return
  }

  const openModal = (transaction_item) => {
    setSelectedTransaction(transaction_item)
    setIsOpen(true)
  }

  const orderItems = () => {
    const orderedKeyItems = Object.keys(selectedTransaction).filter(
      key => key !== 'id' && key !== 'created_at' && key !== 'description' && key !== 'updated_at' && key !== 'bal_before' && key !== 'bal_after' && key !== 'hustler_wallet_id'
    );
  
    setOrderedKeys(orderedKeyItems)
  }

  useEffect(() => {
    orderItems()
  },[selectedTransaction])

  const createVirtualCardDetails = async (params) => {
    setIsLoading(true)
  
    const { response_code, msg } = await createVirtualCard(params)
    if (response_code === 200){
      setIsLoading(false)
      ShowToast("success", msg)
      window.location.reload()
      return
    }

    setIsLoading(false)
    ShowToast("error", msg)
    return
  }

  const getAmountPending = (items) => {
    const fees = 0.05;

    if (items.length > 0){
      const totalAmount = items?.reduce((sum, item) => {
        const amount = parseFloat(item.my_bid?.amount || item.budget);
        return sum + amount;
      }, 0);

      const charges = totalAmount * fees
      const amountMinusFees = totalAmount - charges
      setPendingWallet(amountMinusFees.toFixed(2))
    }
  }

  const makeWithdrawalRequest = async (amount) => {
    setIsLoading(true)
    const params = {
      "amount": amount,
      "virtual_wallet_id": Cookies.get('virtual_card_id')
    }

    const {response_code, msg} = await withdrawalRequest(params, 'hustler/make-withdrawal')
    if (response_code === 200){

      setShowWithdrawalDoneInfo(msg)
      setShowWithdrawalDone(true)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    ShowToast("error", msg)
    return
  } 

  const getHustlerVirtualWalletDetails = async () => {
    setIsLoading(true)
    const { response_code, card} = await retrieveVirtualCardDetails()

    if (response_code === 200){
      if (card.length > 0){
        setIsLoading(false)
        setHustlerVirtualCard(card)
        Cookies.set('virtual_card_id', card[0].id, { expires: 7 }); // Expires in 7 days
        return
      }
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    ShowToast("error", "Virtual card info retrieval failed. Try again later!")
    return
  }

  const getHustlerWalletDetails = async () => {
    setIsLoading(true)
    const { response_code, wallet} = await retrieveWalletDetails()

    console.log("WALLET ", JSON.stringify(wallet))
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
          getStats(),
          getHustlerVirtualWalletDetails(),
          getAllTransactionDetails()
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
              <div className="flex flex-row gap-8 justify-between items-center mb-1 overflow-x-auto whitespace-nowrap">
                <div className="flex flex-row gap-4">
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

                </div>
                <div className="flex flex-row gap-4">

                  {hustlerVirtualCard.length > 0 ?
                    <div className="flex flex-col gap-1 wallet-card wallet-card-pink">
                      <div className="flex flex-row items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                        </svg>
                        <h1 className="info-card-header">Virtual Card</h1>
                      </div>
                      <h1 className="service-amount">{hustlerVirtualCard[0].network}</h1>
                    </div>
                    : null
                  }
                  {hustlerVirtualCard.length > 0 ?
                    <div onClick={() => setShowWithdrawalPopup(true)} className="flex flex-col gap-1 !px-4 wallet-card wallet-card-cyan items-center">
                      <div className="flex flex-col justify-center items-center gap-2">
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.50033 18.8327H12.5003C16.667 18.8327 18.3337 17.166 18.3337 12.9993V7.99935C18.3337 3.83268 16.667 2.16602 12.5003 2.16602H7.50033C3.33366 2.16602 1.66699 3.83268 1.66699 7.99935V12.9993C1.66699 17.166 3.33366 18.8327 7.50033 18.8327Z" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M8.8252 6.90039H12.3585V10.4421" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M12.3583 6.90039L7.6416 11.6171" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M5 14.2578C8.24167 15.3411 11.7583 15.3411 15 14.2578" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h1 className="info-card-header">Withdraw</h1>
                      </div>
                    </div>
                    :
                    <div onClick={() => setShowCreateVirtualWallet(true)} className="flex flex-col gap-1 !px-4 wallet-card wallet-card-cyan">
                      <div className="flex flex-col justify-center items-center gap-2">
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.50033 18.8327H12.5003C16.667 18.8327 18.3337 17.166 18.3337 12.9993V7.99935C18.3337 3.83268 16.667 2.16602 12.5003 2.16602H7.50033C3.33366 2.16602 1.66699 3.83268 1.66699 7.99935V12.9993C1.66699 17.166 3.33366 18.8327 7.50033 18.8327Z" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M8.8252 6.90039H12.3585V10.4421" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M12.3583 6.90039L7.6416 11.6171" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M5 14.2578C8.24167 15.3411 11.7583 15.3411 15 14.2578" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h1 className="info-card-header">Withdraw</h1>
                      </div>
                    </div>
                  }
                 
                  { Cookies.get('is_ct') === 'true' ?
                    <div onClick={() => setShowTopup(true)} className="flex flex-col gap-1 !px-4 wallet-card wallet-card-cyan">
                      <div className="flex flex-col justify-center items-center gap-2">
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.3844 13.3652H8.21777" stroke="#0A4F42" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M10.3018 11.332V15.4987" stroke="#0A4F42" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M11.0495 2.5978L11.0245 2.65613L8.60781 8.26446H6.23281C5.66615 8.26446 5.12448 8.38113 4.63281 8.58946L6.09115 5.10613L6.12448 5.0228L6.18281 4.88946C6.19948 4.83946 6.21615 4.78946 6.24115 4.7478C7.33281 2.2228 8.56615 1.6478 11.0495 2.5978Z" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M15.5417 8.43099C15.1667 8.31432 14.7667 8.26432 14.3667 8.26432H8.6084L11.0251 2.65599L11.0501 2.59766C11.1751 2.63932 11.2917 2.69766 11.4167 2.74766L13.2584 3.52266C14.2834 3.94766 15.0001 4.38932 15.4334 4.92266C15.5167 5.02266 15.5834 5.11432 15.6417 5.22266C15.7167 5.33932 15.7751 5.45599 15.8084 5.58099C15.8417 5.65599 15.8667 5.73099 15.8834 5.79766C16.1084 6.49766 15.9751 7.35599 15.5417 8.43099Z" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M18.4351 12.3323V13.9573C18.4351 14.124 18.4268 14.2906 18.4184 14.4573C18.2601 17.3656 16.6351 18.8323 13.5518 18.8323H7.05176C6.85176 18.8323 6.65176 18.8156 6.46009 18.7906C3.81009 18.6156 2.39342 17.199 2.21842 14.549C2.19342 14.3573 2.17676 14.1573 2.17676 13.9573V12.3323C2.17676 10.6573 3.19342 9.21563 4.64342 8.59063C5.14342 8.38229 5.67676 8.26562 6.24342 8.26562H14.3768C14.7851 8.26562 15.1851 8.32396 15.5518 8.43229C17.2101 8.94063 18.4351 10.4906 18.4351 12.3323Z" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6.09199 5.10547L4.63366 8.5888C3.18366 9.2138 2.16699 10.6555 2.16699 12.3305V9.8888C2.16699 7.52214 3.85033 5.54714 6.09199 5.10547Z" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M18.4322 9.89036V12.332C18.4322 10.4987 17.2155 8.94036 15.5488 8.44036C15.9822 7.35703 16.1072 6.50703 15.8988 5.7987C15.8822 5.7237 15.8572 5.6487 15.8238 5.58203C17.3738 6.38203 18.4322 8.0237 18.4322 9.89036Z" stroke="#0A4F42" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h1 className="info-card-header">Topup</h1>
                      </div>
                    </div>
                    :null
                  }
                </div>
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
                          <h1 className="service-amount">GHS {item.my_bid ? item.my_bid.amount : item.budget}</h1>
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
                <>
                  {allTransactions.length > 0 ?
                    <DataTable value={transactionItems} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                      <Column field="trans_type" header="Transaction Type" style={{ width: '25%' }}></Column>
                      <Column field="transaction_request_id" header="Transaction ID" style={{ width: '25%' }}></Column>
                      <Column field="amount" header="Amount" style={{ width: '25%' }}></Column>
                      <Column field="date" header="Date" style={{ width: '25%' }}></Column>
                      <Column field="status" header="Status" style={{ width: '25%' }}></Column>
                      <Column field="action" header="Action" style={{ width: '25%' }}></Column>
                    </DataTable>
                    :
                    <div className="flex justify-center items-center">
                      <NoInfoCard header={'No transactions available'} message={'All your transactions will be displayed here'}/>
                    </div>
                  }
                </>
                : null
              }
              
            </div>
          } 
        </div>

        {showCreateVirtualWallet && (
          <CreateVirtualCardModal 
            show={showCreateVirtualWallet} 
            handleClose={() => setShowCreateVirtualWallet(false)} 
            createVirtualCard={(info) => createVirtualCardDetails(info)}/>
        )}

        {showWithdrawalPopup && (
          <WithdrawalModal show={showWithdrawalPopup} handleClose={() => setShowWithdrawalPopup(false)}
            withdrawalReq={(withdrawalAmount) => makeWithdrawalRequest(withdrawalAmount)}/>
        )}

        { showTopup && (
          <TopupModal show={showTopup} handleClose={() => setShowTopup(false)}/>
        )}

        { showWithdrawalDone && (
          <ConfirmTransactionModal show={showWithdrawalDone} info={showWithdrawalDoneInfo} handleClose={() => setShowWithdrawalDone(false)}/>
        )}

        <TransactionModal setIsOpen={setIsOpen} isOpen={isOpen} title="Transaction Details">
          <div className="flex flex-col justify-center mt-8 items-center">
            <div className="bg-slate-200 rounded-full p-4">{getInitials(selectedTransaction?.trans_type)}</div>
          </div>
          <div className="flex flex-col justify-center mt-2 items-center">{selectedTransaction?.trans_type}</div>
          <div className="th-bg rounded-lg mt-4">
            {orderedKeys.map((key) => (
              <div key={key} className="flex flex-row justify-between mb-4">
                <span className="text-slate-500">{keyMappings[key] || key}</span>
                {key === 'amount' ? (
                  <span className="font-medium text-sm">{selectedTransaction[key] ? valueFormatter(selectedTransaction[key], "¢") : 'N/A'}</span>
                ) : (
                  <span className="font-medium text-sm">{selectedTransaction[key]  ? selectedTransaction[key]  : 'N/A'}</span>
                )}
              </div>
            ))}

            {['description', 'created_at', 'bal_before', 'bal_after'].map(key => (
              <div key={key} className="flex flex-row justify-between gap-8 mb-4">
                { key === 'created_at' ? (
                  <>
                    <span className="text-slate-500">{keyMappings[key]}</span>
                    <span className="font-medium text-sm">{selectedTransaction[key] ? formatDateTime(selectedTransaction[key]) : 'N/A'}</span>
                  </>
                ) : key === 'bal_before' || key === 'bal_after' ?
                (
                  <>
                    <span className="text-slate-500">{keyMappings[key]}</span>
                    <span className="font-medium text-sm">{selectedTransaction[key] ? valueFormatter(selectedTransaction[key], "¢") : 'N/A'}</span>
                  </>
                ) : (
                  <>
                    <span className="text-slate-500">{keyMappings[key]}</span>
                    <span className="font-medium text-sm">{selectedTransaction[key] ? selectedTransaction[key] : 'N/A'}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </TransactionModal>
      </main>
    </div>
  )
}