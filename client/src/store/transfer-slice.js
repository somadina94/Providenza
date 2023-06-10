import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    transactions: null,
    showIntConfirm: false,
    showLocConfirm: false,
    showPrint: false,
};

const transferSlice = createSlice({
    name: 'Transfer',
    initialState,
    reducers: {
        transfer(state, action) {
            state.transactions = action.payload.transactions;
        },
        showLocConfirmForm(state, action) {
            state.showLocConfirm = true;
        },
        hideLocConfirmForm(state) {
            state.showLocConfirm = false;
        },
        showIntConfirmForm(state) {
            state.showIntConfirm = true;
        },
        hideIntConfirmForm(state) {
            state.showIntConfirm = false;
        },
        showPrintPage(state) {
            state.showPrint = true;
        },
        hidePrintPage(state) {
            state.showPrint = false;
        },
    },
});

export const transferActions = transferSlice.actions;

export default transferSlice;
