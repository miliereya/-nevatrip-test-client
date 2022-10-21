import $api from "../http"
import { AxiosResponse } from "axios"

export default class CartService {
    static addToCart(email = '', voyage = '', quantity = '', date = '' ): Promise<AxiosResponse> {
        return $api.post('/user/cart/add', {email, voyage, quantity, date})
    }
    static deleteFromCart(email = '', ticket = ''): Promise<AxiosResponse> {
        return $api.post('/user/cart/delete', {email, ticket})
    }
}