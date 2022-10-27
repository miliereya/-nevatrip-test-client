import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { SERVER_API } from '../config'
import { ICity } from '../models/ICity'

export const cityAPI = createApi({
    reducerPath: 'cityAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_API}/api/cities/` }),
    endpoints: (build) => ({
        fetchAllCities: build.query<ICity[], string>({
            query: (title = '') => ({
                url: 'get',
                params: {
                    title: title
                }
            })
        })
    })
})