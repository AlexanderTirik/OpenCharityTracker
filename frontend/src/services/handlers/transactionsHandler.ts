import { Dispatch } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { Events } from "../../enums/Events";
import { addTransaction, loadTransaction } from "../../slices/projectSlice";

const onTransactionInitiated =
  (dispatch: Dispatch) =>
  ({ amount, id }: { amount: string; id: string }) => {
    dispatch(addTransaction({ amount, id, isLoading: true }));
  };

const onTransactionFinalized =
  (dispatch: Dispatch) =>
  ({ id }: { id: string }) => {
    dispatch(loadTransaction({ id }));
  };

export const transactionHandler = (socket: Socket, dispatch: Dispatch) => {
  socket.on(Events.TransactionInitiated, onTransactionInitiated(dispatch));
  socket.on(Events.TransactionFinalized, onTransactionFinalized(dispatch));
};

export const transactionHandlerDisconnect = (socket: Socket) => {
  socket.off(Events.TransactionInitiated);
  socket.off(Events.TransactionFinalized);
};
