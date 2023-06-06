import { createAsyncThunk } from '@reduxjs/toolkit';

import API from 'api';

const fetchChatData = createAsyncThunk(
    'fetchChatData',
    API.getData
);

export default fetchChatData;
