/* eslint-disable no-param-reassign */
import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { removeChannel } from './channelsSlice';

import fetchChatData from './thunks';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState({
  loadingStatus: 'idle',
  error: null,
});

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const channelId = action.payload;
        const restEntities = Object.values(state.entities).filter((e) => e.channelId !== channelId);
        messagesAdapter.setAll(state, restEntities);
      })
      .addCase(fetchChatData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchChatData.fulfilled, (state, action) => {
        messagesAdapter.setAll(state, action.payload.messages);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchChatData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

const getMessagesState = (state) => state.messages;
const messagesSelectors = messagesAdapter.getSelectors(getMessagesState);

export const {
  selectEntities,
  selectAll,
  selectById,
} = messagesSelectors;

export const getMessagesByChannelId = (currentChannelId) => createSelector(
  (state) => selectAll(state),
  (state) => state.filter(({ channelId }) => channelId === currentChannelId),
);

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
