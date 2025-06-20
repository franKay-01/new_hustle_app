import serviceImage from '../../assets/images/cat.png'

export default function ServicesMiniPage({handleOpenCreateService}) {
  return(
    <>
      <div className="flex flex-col p-2">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl font-regular">My services</h1>
          <button onClick={() => handleOpenCreateService()} className="flex !w-[20%] view-more-button justify-center items-center mt-4">
            <h1 className='view-more-button-text'>Add service</h1>
          </button>
        </div>
        <div className="flex flex-wrap gap-6 items-center mt-8">
          <div className="flex flex-col border-2 w-[48%] border-gray-300 rounded-lg p-2">
            <div className="flex flex-row justify-between items-center gap-4">
              <h1 className="text-xl font-semibold">Lash extension</h1>
              <h1 className="service-amount">GHS 1200.00</h1>
            </div>
            <img src={serviceImage} alt="" className='object-cover rounded-lg h-[10rem] w-full mt-2' />
            <h1 className='flex flex-wrap font-regular text-[#535B65] mt-2'>
            Looking for were you will do your lashes be it hybris, volume or classic, we are here for you
            </h1>
            <button className="flex !bg-[#387D70] !w-[40%] view-more-button justify-center items-center mt-4">
              <h1 className='view-more-button-text !text-[14px]'>View service</h1>
            </button>
          </div>
          <div className="flex flex-col border-2 w-[48%] border-gray-300 rounded-lg p-2">
            <div className="flex flex-row justify-between items-center gap-4">
              <h1 className="text-xl font-semibold">Lash extension</h1>
              <h1 className="service-amount">GHS 1200.00</h1>
            </div>
            <img src={serviceImage} alt="" className='object-cover rounded-lg h-[10rem] w-full mt-2' />
            <h1 className='flex flex-wrap font-regular text-[#535B65] mt-2'>
            Looking for were you will do your lashes be it hybris, volume or classic, we are here for you
            </h1>
            <button className="flex !bg-[#387D70] !w-[40%] view-more-button justify-center items-center mt-4">
              <h1 className='view-more-button-text !text-[14px]'>View service</h1>
            </button>
          </div>
          <div className="flex flex-col border-2 w-[48%] border-gray-300 rounded-lg p-2">
            <div className="flex flex-row justify-between items-center gap-4">
              <h1 className="text-xl font-semibold">Lash extension</h1>
              <h1 className="service-amount">GHS 1200.00</h1>
            </div>
            <img src={serviceImage} alt="" className='object-cover rounded-lg h-[10rem] w-full mt-2' />
            <h1 className='flex flex-wrap font-regular text-[#535B65] mt-2'>
            Looking for were you will do your lashes be it hybris, volume or classic, we are here for you
            </h1>
            <button className="flex !bg-[#387D70] !w-[40%] view-more-button justify-center items-center mt-4">
              <h1 className='view-more-button-text !text-[14px]'>View service</h1>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}