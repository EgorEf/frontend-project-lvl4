/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import fetchChatData from './thunks';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  loadingStatus: 'idle',
  error: null,
});

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    selectCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addNewChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.upsertOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchChatData.fulfilled, (state, action) => {
        channelsAdapter.setAll(state, action.payload.channels);
        state.currentChannelId = action.payload.currentChannelId;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchChatData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

const getChannelsState = (state) => state.channels;
const channelsSelectors = channelsAdapter.getSelectors(getChannelsState);

export const {
  selectAll,
  selectById,
} = channelsSelectors;

export const getCurrentChannelId = createSelector(
  getChannelsState,
  (state) => state.currentChannelId,
);

// export const getCurrentChannel = (id) => createSelector(
//     getChannelsState,
//     (state) => {
//         console.log(state);
//         console.log(id);
//         if (!id) {
//             return {};
//         }

//         return selectById(state, id);
//     }
// );

export const {
  selectCurrentChannelId,
  addNewChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
