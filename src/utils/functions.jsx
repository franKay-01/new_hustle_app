import useAxios from "../hooks/hook";
import Cookies from 'js-cookie';

const logout = () => {
  Cookies.remove('token');
  Cookies.remove('full_name');
  Cookies.remove('residence');
}

const useFunctions = () => {
  const { executeReq, executeGet, executePut, executeDelete } = useAxios();


  const createCookies = (token, full_name, country_of_residence, has_verified_email, 
    has_verified_id_details, has_verified_business_details, is_ct, pid, hustler_uuid, avatar, email) => {
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    Cookies.set("token", token, { expires: new Date(Date.now() + oneWeek)})
    Cookies.set("email", email)
    Cookies.set('hid', pid)
    Cookies.set("full_name", full_name)
    Cookies.set("residence", country_of_residence ? country_of_residence : '----')
    Cookies.set("email_verified", has_verified_email)
    Cookies.set("has_verified_id_details", has_verified_id_details)
    Cookies.set("has_verified_business_details", has_verified_business_details)
    Cookies.set("is_ct", is_ct)
    Cookies.set("huid", hustler_uuid)
    Cookies.set("avatar", avatar)
    return
  }

  const getCSRF = async () => {
    try {
      const {data, status} = await executeGet(`sanctum/csrf-cookie`)
       if (status === 403){
        logout()
        return {response_code: 201} 
      }

      if (data.status === true){
        return { response_code: 200, sanctum: data.data }
      }

      return {response_code: 201} 
    }catch (err) {
      return {response_code: 201}
    }
  }

  const getAllStockExpenses = async () => {
    try {
      const {data, status} = await executeGet(`expenses`)
       if (status === 403){
        logout()
        return {response_code: 201} 
      }

      if (data.status === true){
        return { response_code: 200, expenses: data.data }
      }

      return {response_code: 201} 
    }catch{
      return {response_code: 201}
    }
  }

  const getHustleDetail = async (params) => {
    try{
      const {data, status} = await executeGet(`hustle/${params}`)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, hustle: data.data }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Hustle retrieval failed. Please try again in a few minutes"}
    }
  }

  const changePhone = async (params) => {
    try {
      const {data, status} = await executeReq('hustler/change-phone-number', params)
      if (status === 403){
        logout()   
        return {phone_response_code: 201} 
      }

      if (data.status === true){
        return { phone_response_code: 200, phone_msg: data.message }
      }

      return {phone_response_code: 201, phone_msg: data.message} 
    }catch{
      return {phone_response_code: 201, phone_msg: "Phone number change failed. Please try again in a few minutes"}
    }
  }

  const changeEmail = async (params) => {
    try {
      const {data, status} = await executeReq('hustler/change-email', params)
      if (status === 403){
        logout()   
        return {email_response_code: 201} 
      }

      if (data.status === true){
        return { email_response_code: 200, email_msg: data.message }
      }

      return {email_response_code: 201, email_msg: data.message} 
    }catch{
      return {email_response_code: 201, email_msg: "Email change failed. Please try again in a few minutes"}
    }
  }

  const changePassword = async (params) => {
    try {
      const {data, status} = await executeReq('hustler/change-password', params)
      if (status === 403){
        logout()   
        return {response_code: 201} 
      }

      if (data.status === true){
        return { response_code: 200, msg: data.message }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Password change failed. Please try again in a few minutes"}
    }
  }

  const hustleSocialRegister = async (params) => {
    try {
      const {data, status} = await executeReq('hustler/social-register', params)
      if (status === 403){
        logout()   
        return {response_code: 201} 
      }

      if (data.status === true){
        return { response_code: 200, account: data.data }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Report retrieval failed. Please try again in a few minutes"}
    }
  }

  const getAllCategories = async (params) => {
    try {
      const {data, status} = await executeGet(`hustler/categories`)

      if (status === 403){
        logout()  
        return {response_code: 201} 
      }

      if (data.status === true){
        return { response_code: 200, categories: data.data }
      }

      return {response_code: 201} 
    }catch{
      return {response_code: 201}
    }
  }

  const editCategory = async (params, category_id) => {
    try {
      const {data, status} = await executePut(`categories/${category_id}`, params)

      if (status === 403){
        logout()   
        return {response_code: 201}     
      }
      
      if (data.status === true){
        return { response_code: 200, msg: "Category was editted successfully" }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Category update failed. Please try again in a few minutes"}
    }
  }

  const withdrawalRequest = async (params, endpoint) => {
    try {
      const {data, status} = await executeReq(endpoint, params)
      if (status === 403){
        logout()   
        return {response_code: 201} 
      }

      if (data.status === true){
        return { response_code: 200, msg: data.message }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Withdrawal request failed. Please try again in a few minutes"}
    }
  } 

  const topupWallet = async (params, endpoint) => {
    try {
      const {data, status} = await executeReq(endpoint, params)
      if (status === 403){
        logout()   
        return {response_code: 201} 
      }

      if (data.status === true){
        return { response_code: 200, msg: data.message }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Wallet topup failed. Please try again in a few minutes"}
    }
  }

  return { getAllCategories, editCategory, hustleSocialRegister, getAllStockExpenses, getHustleDetail,
    changePassword, getCSRF, changeEmail, changePhone, topupWallet, withdrawalRequest, createCookies}
}

export default useFunctions