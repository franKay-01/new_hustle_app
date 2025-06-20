import { useState } from 'react'
import Cookies from 'js-cookie';
import axios from "axios"

axios.defaults.withCredentials = true;

const useAxios = () => {
  const BASE_URL = "https://api.staging.hustleapp.io/v1"

  const token = Cookies.get("token")
  const executeGet = async (route) => {
    try {
      const res = await axios.get(`${BASE_URL}/${route}`, { headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }})
      return res
    }
    catch (err) {
      return {data: err, status: err.response.status}
    }
  }

  // const executeReq = async (route, body) => {
  //   try {
  //     const res = await axios.post(`${BASE_URL}/${route}`, body, { headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //       'Authorization': `Bearer ${token}`,
  //     }})
  //     return res
  //   }
  //   catch (err) {
  //     return {data: err, status: err.response.status}
  //   }
  // }
  const executeReq = (route, body) => {
    return axios(`${BASE_URL}/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
         "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE"
      },
      data: body,
    })
      .then(response => ({ data: response.data, status: response.status }))
      .catch(error => ({ data: error.message, status: error.response?.status || 500 }));
  };

  const executeDelete = async (route, body) => {
    try {
      const res = await axios.delete(`${BASE_URL}/${route}`, { 
        data: body,
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }})
      return res
    }
    catch (err) {
      return {data: err, status: err.response.status}
    }
  }

  const executePut = async (route, body) => {
    try {
      const res = await axios.put(`${BASE_URL}/${route}`, body, { headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }})
      return res
    }
    catch (err) {
      return {data: err, status: err.response.status}
    }
  }
  /*
  Execute Req
  */

  return { executeReq, executeGet, executePut, executeDelete }
}

export default useAxios