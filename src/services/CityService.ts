import $api from "../http"
import { AxiosResponse } from "axios"
import { ICity } from "../models/ICity"

export default class CityService {
    static getCities(city: string): Promise<AxiosResponse<ICity[]>> {
        return $api.get<ICity[]>(`/cities/get?title=${city}`)
    }
}