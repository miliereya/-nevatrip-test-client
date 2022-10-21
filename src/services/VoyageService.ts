import $api from "../http"
import { AxiosResponse } from "axios"
import { VoyageResponse } from "../models/response/VoyageResponse"
import { GetVoyagesRequest } from "../models/request/VoyageRequest"

export default class VoyageService {
    static getVoyages(from = '', to = '', date = '', quantity = ''): Promise<AxiosResponse<VoyageResponse>> {
        return $api.get<VoyageResponse>(`/voyages/get?from=${from}&to=${to}&date=${date}&quantity=${quantity}`)
    }
}