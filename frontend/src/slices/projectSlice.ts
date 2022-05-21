import { createSlice } from "@reduxjs/toolkit";
import { IRequisites } from "../models/IRequisites";
import { ITransaction } from "../models/ITransaction";

interface ProjectState {
  transactions: ITransaction[];
  requisites: IRequisites;
  name: string;
  description: string;
  amount: number;
  goal: number;
}

const initialState: ProjectState = {
  transactions: [{id: '1', amount:'500', isLoading: true}, {id: '1', amount:'300'},{id: '1', amount:'200'},{id: '1', amount:'100'}, {id: '1', amount:'400'}],
  requisites: { mono: "" },
  name: "",
  description: "",
  amount: 0,
  goal: 0,
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
