import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import API_BASE_URL from '~/base-client';

interface DataState {
    chartdata: any[];
    loadingChart: boolean;
    error: string | null;
}

const initialState: DataState = {
    chartdata: [],
    loadingChart: false,
    error: null,
};

export const fetchGraphData = createAsyncThunk("data/fetchData", async (params: {type: string;})=>{
    const response = await axios.get(
        `${API_BASE_URL}/api/analytics/analyticchart`,
        { params }
    );
    return response.data;
})

const dataSliceGraph = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGraphData.pending, (state) => {
                state.loadingChart = true;
                state.error = null;
            })
            .addCase(fetchGraphData.fulfilled, (state, action) => {
                state.loadingChart = false;
                state.chartdata = action.payload;
            })
            .addCase(fetchGraphData.rejected, (state, action) => {
                state.loadingChart = false;
                state.error = action.error.message ?? 'Error fetching data';
            });
    }, 
});

export default dataSliceGraph.reducer;