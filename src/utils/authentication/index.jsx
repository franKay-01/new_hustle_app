import useAxios from '../../hooks/hook';
import Cookies from 'js-cookie';

const logout = () => {
  Cookies.remove('token');
  Cookies.remove('full_name');
  Cookies.remove('residence');
}

const useAuthFunctions = () => {
  const { executeReq, executeGet, executePut, executeDelete } = useAxios();

  const updateContactInfo = async (params) => {
    try {
      const {data, status} = await executeReq('hustler/update-contact-infos', params)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200 }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Report retrieval failed. Please try again in a few minutes"}
    }
  }

  const getAllCountries = async () => {
    try {
      const {data, status} = await executeGet('hustler/countries')
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, countries: data.data }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Country retrieval failed. Please try again in a few minutes"}
    }
  }

  const hustleSocialLogin = async (params) => {
    try {
      const {data, status} = await executeReq('hustler/social-login', params)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, account: data.data }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Login failed. Please try again in a few minutes"}
    }
  }

  const hustleSocialRegister = async (params) => {
    try {
      const {data, status} = await executeReq('hustler/social-register', params)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, account: data.data }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Login failed. Please try again in a few minutes"}
    }
  }

  const hustleNormalRegister = async (params) => {
    try {
      const {data, status} = await executeReq('hustler/register', params)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, account: data.data }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Account creation failed. Please try again in a few minutes"}
    }
  }

  const resendVerificationEmail = async () => {
    try {
      const {data, status} = await executeReq('email/verification-notification')

      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200 }
      }

      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Account creation failed. Please try again in a few minutes"}
    }
  }

  const hustleNormalLogin = async (params) => {
    try {
      const {data, status} = await executeReq('hustler/login', params)
      if (status === 403 || status === 401){
        logout()   
        return {response_code: 401} 
      }

      if (data.status === true){
        return { response_code: 200, account: data.data }
      }
      
      return {response_code: 201, msg: data.message} 
    }catch{
      return {response_code: 201, msg: "Login failed. Please try again in a few minutes"}
    }
  }

  return { hustleSocialRegister, hustleNormalRegister, hustleNormalLogin, resendVerificationEmail,
  getAllCountries, updateContactInfo, hustleSocialLogin}
}

export default useAuthFunctions