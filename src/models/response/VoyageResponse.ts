import { IVoyage } from "../IVoyage";

export interface VoyageResponse {
    voyagesData: IVoyage[]
    date: string
    quantity: string
}