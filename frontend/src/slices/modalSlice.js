/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  show: false,
  extra: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.type = payload.type;
      state.show = true;
      state.extra = payload.extra ?? null;
    },
    closeModal: () => initialState,
  },
});

export const { showModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
