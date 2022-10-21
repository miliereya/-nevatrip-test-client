import $api from "../http"
import { AxiosResponse } from "axios"
import { TicketResponse } from "../models/response/TicketsResponse"

export default class TicketService {
    static getTickets(idArr: string[]): Promise<AxiosResponse<TicketResponse>> {
        return $api.post<TicketResponse>('/tickets/get', {idArr})
    }
}