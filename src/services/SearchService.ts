import axios, { AxiosResponse } from 'axios'
import { SERVER_API } from '../config'
import { VoyageResponse } from '../models/response/VoyageResponse'

export default class searchAPI {
    static getVoyages(from = '', to = '', date = '', quantity = ''): Promise<AxiosResponse<VoyageResponse>> {
        return axios.get<VoyageResponse>(`${SERVER_API}/api/voyages/get?from=${from}&to=${to}&date=${date}&quantity=${quantity}`)
    }
}