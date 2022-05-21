import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
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
  transactions: [],
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
    initProject: (state, { payload }) => {
      const { name, cards, description, goal, amount } = payload
      const mono = cards[0].number;
      return { ...state, name, description, goal, amount, requisites: { mono } };
    },
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
export const selectProject = (state: RootState) => state.project
export const { addTransaction, loadTransaction, initProject } = projectSlice.actions;
