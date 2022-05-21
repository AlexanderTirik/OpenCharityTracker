import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '../config/env'
import { initProject } from '../slices/projectSlice';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: env.api }),
  endpoints: (builder) => ({
    getInfo: builder.query({
      query: (id) => `project/${id}`,
      async onQueryStarted(_req, { dispatch, queryFulfilled }) {
        let { data } = await queryFulfilled;
        dispatch(initProject(data));
      },
    }),
  }),
})

export const { useGetInfoQuery, useLazyGetInfoQuery } = api