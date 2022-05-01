import { createSlice } from "@reduxjs/toolkit";
import { ITransaction } from "../models/ITransaction";

interface ICards {
  mono: string;
}

interface ProjectState {
  transactions: ITransaction[];
  cards: ICards;
  name: string;
  description: string;
  amount: number;
}

const initialState: ProjectState = {
  transactions: [],
  cards: { mono: "" },
  name: "",
  description: "",
  amount: 0,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addTransaction: (state, { payload }) => {
      const isTransactionExist = state.transactions.find(
        (tsn) => tsn.id === payload.id
      );
      if (!isTransactionExist) {
        state.transactions.push(payload);
      } else {
        const transactions = state.transactions.map((tsn) =>
          tsn.id === payload.id ? payload : tsn
        );
        return { ...state, transactions };
      }
    },
    loadTransaction: (state, { payload }) => {
      const transactions = state.transactions.map((tsn) => {
        return tsn.id === payload.id ? { ...tsn, isLoading: false } : tsn;
      });
      return { ...state, transactions };
    },
  },
});

export default projectSlice.reducer;
export const { addTransaction, loadTransaction } = projectSlice.actions;
