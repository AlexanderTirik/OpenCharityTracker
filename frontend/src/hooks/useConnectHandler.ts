import { Dispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "./redux";

export const useConnectHandler = (
  handler: (socket: Socket, dispatch: Dispatch) => void,
  disconnectHandler?: (socket: Socket) => void
) => {
  const dispatch = useAppDispatch();
  const socket = useAppSelector((state) => state.ws.socket);
  useEffect(() => {
    handler(socket, dispatch);
    if (disconnectHandler) {
      return () => disconnectHandler(socket);
    }
  }, [dispatch, socket, handler, disconnectHandler]);
};
