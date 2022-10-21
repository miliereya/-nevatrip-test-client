import axios from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/response/AuthResponse";
import { VoyageResponse } from "../models/response/VoyageResponse";
import AuthService from "../services/AuthService";

export default class Store {
    user = {} as IUser
    isAuth = false
    isLoading = false
    regError = ''
    logError = ''
    language = 'ru'

    //SearchTickets
    searchResult: VoyageResponse = {voyagesData: [], date: '', quantity: ''}

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean){
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    setLoading(bool: boolean) {
        this.isLoading = bool
    }

    setRegError(message: string) {
        this.regError = message
    }

    setLogError(message: string) {
        this.logError = message
    }

    setSearchResult(result: VoyageResponse) {
        this.searchResult = result
    }

    setLanguage(language: string) {
        this.language = language
    }

    async login(email:string, password: string) {
        this.setLoading(true)
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e:any) {
            this.setLogError(e.response?.data?.message)
        } finally {
            (this.setLoading(false))
        }
    }

    async registration(email:string, password: string) {
        this.setLoading(true)
        try {
            const response = await AuthService.registration(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e:any) {
            this.setRegError(e.response?.data?.message)
        } finally {
            (this.setLoading(false))
        }
    }

    async logout() {
        this.setLoading(true)
        try {
            await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch(e:any) {
            console.log(e.response?.data?.message)
        } finally {
            (this.setLoading(false))
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/user/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e:any) {
            
        } finally {
            this.setLoading(false)
        } 
    }
}