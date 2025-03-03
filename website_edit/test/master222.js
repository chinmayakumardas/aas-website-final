// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchDataApi, fetchDataByTypeApi, createItemApi, updateItemApi, deleteItemApi } from '@/api/masterApi';

// // Fetch all master data
// export const getMasterData = createAsyncThunk('master/getMasterData', async (_, { rejectWithValue }) => {
//   try {
//     return await fetchDataApi();
//   } catch (error) {
//     return rejectWithValue(error.response?.data || error.message);
//   }
// });

// // Fetch data by type
// export const fetchDataByType = createAsyncThunk('master/getMasterDataByType', async ({ type }, { rejectWithValue }) => {
//   try {
//     const data = await fetchDataByTypeApi(type);
//     return { type, data }; // Ensure type is returned for correct state update
//   } catch (error) {
//     return rejectWithValue(error.response?.data || error.message);
//   }
// });

// // Create a new item
// export const addMasterItem = createAsyncThunk('master/addMasterItem', async ({ type, name }, { rejectWithValue }) => {
//   try {
//     const item = await createItemApi(type, name);
//     return item;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || error.message);
//   }
// });

// // Update an item
// export const editMasterItem = createAsyncThunk('master/editMasterItem', async ({ type, uniqueId, name }, { rejectWithValue }) => {
//   try {
//     const item = await updateItemApi(uniqueId, name);
//     return { type, item };
//   } catch (error) {
//     return rejectWithValue(error.response?.data || error.message);
//   }
// });

// // Remove an item
// export const removeMasterItem = createAsyncThunk('master/removeMasterItem', async ({ type, uniqueId }, { rejectWithValue }) => {
//   try {
//     await deleteItemApi(uniqueId);
//     return { type, uniqueId };
//   } catch (error) {
//     return rejectWithValue(error.response?.data || error.message);
//   }
// });

// // Redux Slice
// const masterSlice = createSlice({
//   name: 'master',
//   initialState: {
//     masterdata:[],
//     tag: [],
//     serviceCategory: [],
//     blogCategory: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getMasterData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getMasterData.fulfilled, (state, action) => {
//         state.loading = false;
       
//       })
//       .addCase(getMasterData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchDataByType.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchDataByType.fulfilled, (state, action) => {
//         state.loading = false;
//         state[action.payload.type] = action.payload.data;
//       })
//       .addCase(fetchDataByType.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(addMasterItem.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(addMasterItem.fulfilled, (state, action) => {
//         state.loading = false;
//         state[action.payload.type].push(action.payload.item);
//       })
//       .addCase(addMasterItem.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(editMasterItem.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(editMasterItem.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state[action.payload.type].findIndex((item) => item.uniqueId === action.payload.item.uniqueId);
//         if (index !== -1) {
//           state[action.payload.type][index] = action.payload.item;
//         }
//       })
//       .addCase(editMasterItem.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(removeMasterItem.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(removeMasterItem.fulfilled, (state, action) => {
//         state.loading = false;
//         state[action.payload.type] = state[action.payload.type].filter((item) => item.uniqueId !== action.payload.uniqueId);
//       })
//       .addCase(removeMasterItem.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default masterSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDataApi, fetchDataByTypeApi, createItemApi, updateItemApi, deleteItemApi } from '@/api/masterApi';

// Fetch all master data
export const getMasterData = createAsyncThunk('master/getMasterData', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchDataApi();
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Fetch data by type
export const fetchDataByType = createAsyncThunk('master/fetchDataByType', async ({ type }, { rejectWithValue }) => {
  try {
    const data = await fetchDataByTypeApi(type);
    
    return { type, data };
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Create a new item
export const addMasterItem = createAsyncThunk('master/addMasterItem', async ({ type, name }, { rejectWithValue }) => {
  try {
    const item = await createItemApi(type, name);
    return { type, item };
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Update an item
export const editMasterItem = createAsyncThunk('master/editMasterItem', async ({ type, uniqueId, name }, { rejectWithValue }) => {
  try {
    const item = await updateItemApi(uniqueId, name);
    return { type, item };
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Remove an item
export const removeMasterItem = createAsyncThunk('master/removeMasterItem', async ({ type, uniqueId }, { rejectWithValue }) => {
  try {
    await deleteItemApi(uniqueId);
    return { type, uniqueId };
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Redux Slice
const masterSlice = createSlice({
  name: 'master',
  initialState: {
    masterdata: [],
    tag: [],
    serviceCategory: [],
    blogCategory: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all master data
      .addCase(getMasterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMasterData.fulfilled, (state, action) => {
        state.loading = false;
        state.masterdata = action.payload; // Store full response in masterdata
      })
      .addCase(getMasterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch data by type
      .addCase(fetchDataByType.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDataByType.fulfilled, (state, action) => {
        state.loading = false;
        state[action.payload.type] = action.payload.data; // Store only specific type
      })
      .addCase(fetchDataByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add new item
      .addCase(addMasterItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMasterItem.fulfilled, (state, action) => {
        state.loading = false;
        state[action.payload.type].push(action.payload.item);
      })
      .addCase(addMasterItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit item
      .addCase(editMasterItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(editMasterItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state[action.payload.type].findIndex((item) => item.uniqueId === action.payload.item.uniqueId);
        if (index !== -1) {
          state[action.payload.type][index] = action.payload.item;
        }
      })
      .addCase(editMasterItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove item
      .addCase(removeMasterItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeMasterItem.fulfilled, (state, action) => {
        state.loading = false;
        state[action.payload.type] = state[action.payload.type].filter((item) => item.uniqueId !== action.payload.uniqueId);
      })
      .addCase(removeMasterItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default masterSlice.reducer;
