import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { SERVER_API } from '../config'
import { AddTicketRequest } from '../models/request/AddTicketRequest'
import { DeleteFromCartRequest } from '../models/request/DeleteFromCartRequest'
import { SignRequest } from '../models/request/SignRequest'
import { AuthResponse } from '../models/response/AuthResponse'
import { TicketResponse } from '../models/response/TicketsResponse'
import { isLoadingSlice } from '../store/reducers/IsLoadingSlice'
import { userSlice } from '../store/reducers/UserSlice'

const { setAuth, setUser, setCart } = userSlice.actions
const { setLoading, setCheckAuthLoading, setCartLoading } = isLoadingSlice.actions

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_API}/api/user` }),
    endpoints: (build) => ({
        login: build.mutation<AuthResponse, SignRequest>({
            query: (SignRequest) => ({
                url: 'login',
                method: 'POST',
                body: {
                    ...SignRequest
                },
                credentials: 'include'
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLoading(true))
                    const { data } = await queryFulfilled
                    localStorage.setItem('token', data.accessToken)
                    dispatch(setAuth(true))
                    dispatch(setUser(data.user))
                } catch (error) { }
                finally {
                    dispatch(setLoading(false))
                }
            },
        }),
        register: build.mutation<AuthResponse, SignRequest>({
            query: (SignRequest) => ({
                url: 'registration',
                method: 'POST',
                body: {
                    ...SignRequest
                },
                credentials: 'include'
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLoading(true))
                    const { data } = await queryFulfilled
                    localStorage.setItem('token', data.accessToken)
                    dispatch(setAuth(true))
                    dispatch(setUser(data.user))
                } catch (error) { }
                finally {
                    dispatch(setLoading(false))
                }
            },
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: 'logout',
                method: 'POST',
                credentials: 'include'
            })
        }),
        refresh: build.mutation<AuthResponse, void>({
            query: () => ({
                url: 'refresh',
                method: 'POST',
                credentials: 'include'
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setCheckAuthLoading(true))
                    const { data } = await queryFulfilled
                    localStorage.setItem('token', data.accessToken)
                    dispatch(setAuth(true))
                    dispatch(setUser(data.user))
                } catch (error) { }
                finally {
                    dispatch(setCheckAuthLoading(false))
                }
            },
        }),
        addToCart: build.mutation<string[], AddTicketRequest>({
            query: (AddTicketRequest) => ({
                url: 'cart/add',
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: {
                    ...AddTicketRequest
                }
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setCheckAuthLoading(true))
                    const res = await queryFulfilled
                    dispatch(setCart(res.data))

                } catch (error) { }
                finally {
                    dispatch(setCheckAuthLoading(false))
                }
            },
        }),
        getCart: build.mutation<TicketResponse, string[]>({
            query: (idArr) => ({
                url: 'cart/get',
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: {
                    idArr: idArr
                }
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setCheckAuthLoading(true))
                    await queryFulfilled
                } catch (error) { }
                finally {
                    dispatch(setCheckAuthLoading(false))
                }
            },
        }),
        deleteFromCart: build.mutation<string[], DeleteFromCartRequest>({
            query: (DeleteFromCartRequest) => ({
                url: 'cart/delete',
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: {
                    ...DeleteFromCartRequest
                }
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setCartLoading(true))
                    const res = await queryFulfilled
                    dispatch(setCart(res.data))
                } catch (error) { }
                finally {
                    dispatch(setCartLoading(false))
                }
            },
        }),
    })
})