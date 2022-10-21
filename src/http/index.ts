import axios from 'axios'
import { SERVER_API } from '../config'
import { AuthResponse } from '../models/response/AuthResponse'



export const API_URL = `${SERVER_API}/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config: any)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config: any) => {
    return config
}, async (error: any) => {
    const originalRequest = error.config
    if(error.response.status === 401 && error.config && !error.config.isRetry !== true){
        error.config.isRetry = false
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/user/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('No authorized')
        }
    }
    throw error
})


export default $api