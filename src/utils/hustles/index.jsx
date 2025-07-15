import useAxios from '../../hooks/hook';
import Cookies from 'js-cookie';

const logout = () => {
  Cookies.remove('token');
  Cookies.remove('full_name');
  Cookies.remove('residence');
}

const useHustleFunctions = () => {
  const { executeReq, executeGet, executePut, executeDelete } = useAxios();

  const searchHuslterAround = async (params) => {
    try {
      const {data, status} = await executeReq(`hustler/search-hustlers`, params)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, hustlers: data.data }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Hustler details retrival failed. Please try again in a few minutes"}
    }
  }

  const createHustlerWorkingHours = async (params) => {
    try {
      const {data, status} = await executeReq(`hustler/availability`, params)

      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, hours: data.data }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Hustler working hour creation failed. Please try again in a few minutes"}
    }
  }

  const updateHustlerWorkingHours = async (params, day) => {
    try {
      const {data, status} = await executePut(`hustler/availability/${day}`, params)

      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, hours: data.data }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Hustler working hour creation failed. Please try again in a few minutes"}
    }
  }

  const searchHusltesAround = async (params) => {
    try {
      const {data, status} = await executeReq(`hustles/search-hustles`, params)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, hustles: data.data }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Hustler details retrival failed. Please try again in a few minutes"}
    }
  }

  const getAvailableTimes = async (hustler_uuid = "") => {
    try {
      const queryParam = hustler_uuid ? `?hustler_uuid=${hustler_uuid}` : "";
      const { data, status } = await executeGet(`hustler/availability${queryParam}`);
    
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, availableTimes: data.data }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Hustler details retrival failed. Please try again in a few minutes"}
    }
  }

  const getHustlerDetails = async (hustle_id) => {
    try {
      const {data, status} = await executeGet(`hustler/hustlers/${hustle_id}`)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, hustler: data.data }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Hustler details retrival failed. Please try again in a few minutes"}
    }
  }

  const updateHustlerRating = async (params, hustle_id) => {
    try {
      const {data, status} = await executeReq(`hustle/reviews/${hustle_id}`, params)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, msg: 'Hustle rating successfully done.' }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Hustle review update failed. Please try again in a few minutes"}
    }
  }

  const updateHustleStatus = async (params) => {
    try {
      const {data, status} = await executeReq('hustle/update-hustle-progress', params)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200 }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Hustle status update failed. Please try again in a few minutes"}
    }
  }

  const getWalletTransactions = async () => {
    try {
      const {data, status} = await executeGet(`hustler/transactions`)

      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, transactions: data.data }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Transaction retrieval failed. Please try again in a few minutes"}
    }
  }

  const updateHustlerAvailabilityStatus = async (params) => {
    try {
      const {data, status} = await executeReq('hustler/update-personal-availability', params)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200 }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Hustle availability status update failed. Please try again in a few minutes"}
    }
  }

  const getAllHustlerStats = async () => {
    try {
      const {data, status} = await executeGet(`myGroupedHustles`)

      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, stats: data.data }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Stats retrieval failed. Please try again in a few minutes"}
    }
  }

  const getHustlerProfile = async () => {
    try {
      const {data, status} = await executeGet('hustler/me')
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, profile: data.data }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Profile retrieval failed. Please try again in a few minutes"}
    }
  }

  const singleProject = async (params) => {
    try {
      const {data, status} = await executeGet(`hustler/portfolio-projects/${params}`)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, project: data.data }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Project creation failed. Please try again in a few minutes"}
    }
  }

  const removeProject = async (params, id) => {
    try {
      const {data, status} = await executeDelete(`hustler/portfolio-projects/${id}`, params)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200 }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Project creation failed. Please try again in a few minutes"}
    }
  }

  const updateProject = async (params, id) => {
    try {
      const {data, status} = await executePut(`hustler/portfolio-projects/${id}`, params)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200 }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Project creation failed. Please try again in a few minutes"}
    }
  }

  const submitBookedResponse = async (params) => {
    try {
      const {data, status} = await executeReq('hustle/update-booked-hustler', params)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200 }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Submitting booking response failed. Please try again in a few minutes"}
    }
  }

  const bookHustler = async (params) => {
    try {
      const {data, status} = await executeReq('hustle/book-hustler', params)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200 }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Booking of hustler failed. Please try again in a few minutes"}
    }
  }

  const createProposal = async (params, hustleId) => {
    try {
      const {data, status} = await executeReq(`jobs/${hustleId}/bid`, params)

      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (status === 400){
        return {response_code: 201, msg: data.message} 
      }

      if (data.status === true){
        return { response_code: 200 }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Proposal creation failed. Please try again in a few minutes"}
    }
  }

  const getAllHustlers = async () => {
    try {
      const {data, status} = await executeGet(`hustler/hustlers`)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, hustlers: data.data }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Hustle detail retrieval failed. Please try again in a few minutes"}
    }
  }

  const handleProposalStatus = async (hustleId, proposalUuid) => {
    try {
      const {data, status} = await executeReq(`jobs/${hustleId}/bid/${proposalUuid}/accept`)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200 }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Proposal status change failed. Please try again in a few minutes"}
    }
  }

  const getHustleProposalDetail = async (hustle_id) => {
    try {
      const {data, status} = await executeGet(`hustle/proposals/${hustle_id}`)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, hustle: data.data }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Hustle detail retrieval failed. Please try again in a few minutes"}
    }
  }

  const createHustle = async (params) => {
    try {
      const {data, status} = await executeReq('jobs', params)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200 }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Project creation failed. Please try again in a few minutes"}
    }
  }

  const createProject = async (params) => {
    try {
      const {data, status} = await executeReq('hustler/portfolio-projects', params)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200 }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Project creation failed. Please try again in a few minutes"}
    }
  }

  const retrieveAllProjects = async () => {
    try {
      const {data, status} = await executeGet('hustler/portfolio-projects')
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, projects: data.data }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Project retrieval failed. Please try again in a few minutes"}
    }
  }

  const retrieveAllHustles = async () => {
    try {
      const {data, status} = await executeGet('hustles')
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, hustles: data.data }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Hustle retrieval failed. Please try again in a few minutes"}
    }
  }

  const editCardDetails = async (params) => {
    try {
      const {data, status} = await executePut(`hustler/virtual-wallets/${params.id}`, params)

      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200 }
      }

      return {response_code: 201, msg: data.message} 
      
    }catch{
      return {response_code: 201, msg: "Virtual card update failed. Please try again in a few minutes"}
    }
  }

  const saveHustle = async (params) => {
    try {
      const {data, status} = await executeReq('hustle/save', params)
      
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, msg: data.message }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Hustle saving failed. Please try again in a few minutes"}
    }
  }

  const unSaveHustle = async (params) => {
    try {
      const {data, status} = await executeDelete('hustle/unsave', params)

      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, msg: data.message }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Hustle saving failed. Please try again in a few minutes"}
    }
  }

  const getSavedHustles = async () => {
    try {
      const {data, status} = await executeGet('myHustles/saved')

      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, savedHustles: data.data }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Hustle retrival failed. Please try again in a few minutes"}
    }
  }

  const createVirtualCard = async (params) => {
    try {
      const {data, status} = await executeReq('hustler/virtual-wallets', params)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200 }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Virtual card creation failed. Please try again in a few minutes"}
    }
  }

  const retrieveVirtualCardDetails = async () => {
    try {
      const {data, status} = await executeGet('hustler/virtual-wallets')
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, card: data.data }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Virtual card retrieval failed. Please try again in a few minutes"}
    }
  }

  const retrieveWalletDetails = async () => {
    try {
      const {data, status} = await executeGet('hustler/wallet')
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, wallet: data.data.balance }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Hustle retrieval failed. Please try again in a few minutes"}
    }
  }

  return { retrieveAllHustles, retrieveWalletDetails, retrieveAllProjects, getHustlerProfile,
    createProject, singleProject, updateProject, removeProject, createHustle, createProposal,
    getHustleProposalDetail, getAllHustlers, handleProposalStatus, getAllHustlerStats, 
    updateHustleStatus, updateHustlerAvailabilityStatus, bookHustler, submitBookedResponse,
    updateHustlerRating, getHustlerDetails, getWalletTransactions, retrieveVirtualCardDetails,
    createVirtualCard, editCardDetails, searchHuslterAround, searchHusltesAround, saveHustle,
    unSaveHustle, getSavedHustles, getAvailableTimes, createHustlerWorkingHours, updateHustlerWorkingHours}
}

export default useHustleFunctions