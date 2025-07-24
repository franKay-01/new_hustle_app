import { useState, useEffect} from 'react'
import serviceImage from '../../assets/images/cat.png'
import useHustleFunctions from '../../utils/hustles'
import Loader from '../loader'
import NoInfoCard from '../no_info_card'
import { ShowToast } from '../showToast'

export default function ServicesMiniPage({handleOpenCreateService}) {
  const [allServices, setAllServices] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const { retrieveAllProjects } = useHustleFunctions()

  const getAllServices = async () => {
    setIsLoading(true)

    const { response_code, services } = await retrieveAllProjects()

    if (response_code === 200){
      setIsLoading(false)
      setAllServices(services)
      return
    }

    setIsLoading(false)
    ShowToast("error", "Services retrieval failed. Try again!")
    return
  }

  useEffect(() => {
    getAllServices()
  }, [])

  return(
    <>
      <div className="flex flex-col p-2">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl font-regular">My services</h1>
          <button onClick={() => handleOpenCreateService()} className="flex !w-[40%] lg:!w-[30%] md:!w-[30%] view-more-button justify-center items-center mt-4">
            <h1 className='view-more-button-text'>Add service</h1>
          </button>
        </div>
        { isLoading ?
          <div className='flex justify-center items-center'>
            <Loader/>
          </div>
        :
        <>
          { allServices.length > 0 ? 
            <div className="flex flex-wrap gap-6 items-center mt-8">
              { allServices.map((item, index) => {
                return <div className="flex flex-col border-2 w-[100%] lg:w-[48%] md:w-[48%] border-gray-300 rounded-lg p-2">
                  <div className="flex flex-row justify-between items-center gap-4">
                    <h1 className="text-xl font-semibold">{item.project_name}</h1>
                    <h1 className="service-amount">GHS {item.proposed_amount.toFixed(2)}</h1>
                  </div>
                  <img src={item.media.length > 0 ? item.media[0].media_url : serviceImage} alt="" className='object-cover rounded-lg h-[10rem] w-full mt-2' />
                  <h1 className='flex flex-wrap font-regular text-[#535B65] mt-2'>
                    {item.project_desc}
                  </h1>
                  <button className="flex !bg-[#387D70] !w-[40%] view-more-button justify-center items-center mt-4">
                    <h1 className='view-more-button-text !text-[14px]'>View service</h1>
                  </button>
                </div>
              })}
            </div>
            :
            <NoInfoCard header={'No services available'} message={'You have not added any services yet'}/>
          }
        </>
        }
      </div>
    </>
  )
}