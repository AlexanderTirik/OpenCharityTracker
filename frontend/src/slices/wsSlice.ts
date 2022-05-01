import { createSlice } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { env } from "../config/env";

interface WsState {
  socket: Socket;
}
const socket = io(`${env.api}?projectId=f3e4c107-225e-42f6-a20c-8db51c1213ae`);

const initialState: WsState = {
  socket,
};

export const wsSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {},
});

export default wsSlice.reducer;
