import axios from "axios";

export const http = axios.create({
  baseURL: 'https://eschool.api.e-doctor.dev',
  timeout: 30000
})

export const ACCESS_TOKEN = 'accessToken'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjFjNGIxMjVkMzAxYTQyY2MyNTJjZWYiLCJjcmVhdGVBdCI6IjIwMjItMDItMjhUMDg6NDA6MTUuNTIwWiIsImlhdCI6MTY0NjAzNzYxNSwiZXhwIjoxNjQ5NjM3NjE1fQ.qGUYq45Po7EWmfhBQo97X7peA0OEYO3orqE2rWxRkYE';

http.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    // 'Token': token,
    // 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    'Authorization': 'Bearer ' + token
  }
  return config
}, (errors) => {
  return Promise.reject(errors)
})

