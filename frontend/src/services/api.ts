import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '../config/env'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: env.api }),
  endpoints: (builder) => ({
    create: builder.query({
      query: () => `/create`,
    }),
    send: builder.query({
      query: () => `/send`,
    }),
  }),
})

export const { useLazySendQuery, useLazyCreateQuery } = api