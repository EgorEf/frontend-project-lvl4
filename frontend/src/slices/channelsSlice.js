import {
    createAsyncThunk,
    createSlice,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit';
import axios from 'axios';

import { getToken } from 'utils';
import { API_ROUTES } from '../routes';

export const fetchData = createAsyncThunk(
    'channels/fetchData',
    async () => {
        const response = await axios.get(API_ROUTES.data, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        return response.data;
    }
);

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
    currentChannelId: null,
    loadingStatus: 'idle',
    error: null
});

export const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        selectCurrentChannelId: (state, action) => {
            state.currentChannelId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loadingStatus = 'loading';
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                channelsAdapter.setAll(state, action.payload.channels);
                state.currentChannelId = action.payload.currentChannelId;
                state.loadingStatus = 'idle';
                state.error = null;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loadingStatus = 'failed';
                state.error = action.error;
            });
    }
});

const getChannelsState = (state) => state.channels;
const channelsSelectors = channelsAdapter.getSelectors(getChannelsState);

export const {
    selectAll,
    selectById
} = channelsSelectors;

export const getCurrentChannelId = createSelector(
    getChannelsState,
    (state) => state.currentChannelId
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

export const { selectCurrentChannelId } = channelsSlice.actions;

export default channelsSlice.reducer;
