import { ITicket } from "../ITicket";
import { IVoyage } from "../IVoyage";

export interface TicketResponse {
    voyagesData: IVoyage[]
    resData: ITicket[]
}