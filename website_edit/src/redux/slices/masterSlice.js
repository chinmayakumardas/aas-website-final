import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, createItem, updateItem, deleteItem } from '@/api/masterApi'

// Async thunks for fetching, adding, updating, and deleting
export const getMasterData = createAsyncThunk('master/getMasterData', async (type, { rejectWithValue }) => {
  try {
    return { type, data: await fetchData(type) };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addMasterItem = createAsyncThunk('master/addMasterItem', async ({ type, data }, { rejectWithValue }) => {
  try {
    return { type, item: await createItem(type, data) };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const editMasterItem = createAsyncThunk('master/editMasterItem', async ({ type, id, data }, { rejectWithValue }) => {
  try {
    return { type, item: await updateItem(type, id, data) };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const removeMasterItem = createAsyncThunk('master/removeMasterItem', async ({ type, id }, { rejectWithValue }) => {
  try {
    await deleteItem(type, id);
    return { type, id };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Slice
const masterSlice = createSlice({
  name: 'master',
  initialState: {
    tags: [],
    serviceCategories: [],
    blogCategories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMasterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMasterData.fulfilled, (state, action) => {
        state.loading = false;
        state[action.payload.type] = action.payload.data;
      })
      .addCase(getMasterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addMasterItem.fulfilled, (state, action) => {
        state[action.payload.type].push(action.payload.item);
      })
      .addCase(editMasterItem.fulfilled, (state, action) => {
        const index = state[action.payload.type].findIndex((item) => item.id === action.payload.item.id);
        if (index !== -1) {
          state[action.payload.type][index] = action.payload.item;
        }
      })
      .addCase(removeMasterItem.fulfilled, (state, action) => {
        state[action.payload.type] = state[action.payload.type].filter((item) => item.id !== action.payload.id);
      });
  },
});

export default masterSlice.reducer;
