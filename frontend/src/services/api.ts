import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '../config/env'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: env.api }),
  endpoints: (builder) => ({
    getInfo: builder.query({
      query: () => `/project-info`,
    }),
  }),
})

export const { useGetInfoQuery } = api