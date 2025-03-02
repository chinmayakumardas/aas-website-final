// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   getAllServicesApi,
//   getServiceByIdApi,
//   createServiceApi,
//   updateServiceApi,
//   deleteServiceApi,
//   updateServiceImageApi,downloadServiceImageApi
// } from '@/api/serviceApi';

// // Async thunks
// export const fetchServices = createAsyncThunk('services/fetchAll', async (_, { rejectWithValue }) => {
//   try {
//     return await getAllServicesApi();
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// export const fetchServiceById = createAsyncThunk('services/fetchById', async (serviceId, { rejectWithValue }) => {
//   try {
//     return await getServiceByIdApi(serviceId);
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// export const createService = createAsyncThunk('services/create', async (serviceData, { rejectWithValue }) => {
//   try {
//     return await createServiceApi(serviceData);
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// export const updateService = createAsyncThunk('services/update', async ({ serviceId, updatedData }, { rejectWithValue }) => {
//   try {
//     return await updateServiceApi(serviceId, updatedData);
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// export const deleteService = createAsyncThunk('services/delete', async (serviceId, { rejectWithValue }) => {
//   try {
//     return await deleteServiceApi(serviceId);
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// export const updateServiceImage = createAsyncThunk('services/updateImage', async ({ serviceId, imageIndex, imageFile }, { rejectWithValue }) => {
//   try {
//     return await updateServiceImageApi(serviceId, imageIndex, imageFile);
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });
// // Async thunk to download the image
// export const downloadServiceImage = createAsyncThunk(
//   'services/downloadImage',
//   async ({ serviceId, imageIndex }, { rejectWithValue }) => {
//     try {
//       const imageData = await downloadServiceImageApi(serviceId, imageIndex);
//       return imageData; // Return the image data (could be used to trigger the download)
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );


// // Slice
// const serviceSlice = createSlice({
//   name: 'service',
//   initialState: {
//     services: [],
//     selectedService: null,
//     status: 'idle',
//     error: null,
//     downloadedImage: null, // Store the downloaded image here if needed

//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchServices.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchServices.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.services = action.payload;
//       })
//       .addCase(fetchServices.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(fetchServiceById.fulfilled, (state, action) => {
//         state.selectedService = action.payload;
//       })
//       .addCase(createService.fulfilled, (state, action) => {
//         state.services.push(action.payload);
//       })
//       .addCase(updateService.fulfilled, (state, action) => {
//         state.services = state.services.map(service =>
//           service.serviceId === action.payload.serviceId ? action.payload : service
//         );
//       })
//       .addCase(deleteService.fulfilled, (state, action) => {
//         state.services = state.services.filter(service => service.serviceId !== action.meta.arg);
//       })
//       .addCase(updateServiceImage.fulfilled, (state, action) => {
//         const index = state.services.findIndex(service => service.serviceId === action.payload.serviceId);
//         if (index !== -1) {
//           state.services[index].images = action.payload.images;
//         }
//       })
//       // Other cases...
//     .addCase(downloadServiceImage.pending, (state) => {
//       state.status = 'loading'; // Set loading state
//     })
//     .addCase(downloadServiceImage.fulfilled, (state, action) => {
//       state.status = 'succeeded';
//       // Optionally, store the downloaded image data in the state if needed
//       // state.downloadedImage = action.payload;
//     })
//     .addCase(downloadServiceImage.rejected, (state, action) => {
//       state.status = 'failed';
//       state.error = action.payload;
//     });
//   }
// });

// export default serviceSlice.reducer;












import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllServicesApi,
  getServiceByIdApi,
  createServiceApi,
  updateServiceApi,
  deleteServiceApi,
  updateServiceImageApi,
  downloadServiceImageApi,
  getAllCategoriesApi,
} from '@/api/serviceApi';

// Async thunks
export const fetchServices = createAsyncThunk('services/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const services = await getAllServicesApi();
    return services;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchServiceById = createAsyncThunk('services/fetchById', async (serviceId, { rejectWithValue }) => {
  try {
    return await getServiceByIdApi(serviceId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createService = createAsyncThunk('services/create', async (serviceData, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append('name', serviceData.name);
    formData.append('title', serviceData.title);
    formData.append('category', serviceData.category);
    formData.append('description', serviceData.description);
    if (serviceData.images) {
      formData.append('images', serviceData.images);
    }
    return await createServiceApi(formData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateService = createAsyncThunk('services/update', async ({ serviceId, updatedData }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append('name', updatedData.name);
    formData.append('title', updatedData.title);
    formData.append('category', updatedData.category);
    formData.append('description', updatedData.description);
    if (updatedData.images) {
      formData.append('images', updatedData.images);
    }
    return await updateServiceApi(serviceId, formData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteService = createAsyncThunk('services/delete', async (serviceId, { rejectWithValue }) => {
  try {
    return await deleteServiceApi(serviceId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateServiceImage = createAsyncThunk('services/updateImage', async ({ serviceId, imageIndex, imageFile }, { rejectWithValue }) => {
  try {
    return await updateServiceImageApi(serviceId, imageIndex, imageFile);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const downloadServiceImage = createAsyncThunk(
  'services/downloadImage',
  async ({ serviceId, imageIndex }, { rejectWithValue }) => {
    try {
      const imageData = await downloadServiceImageApi(serviceId, imageIndex);
      if (!imageData) {
        throw new Error('No image data returned from server');
      }
      // Ensure imageData is a valid Blob or ArrayBuffer
      const blob = imageData instanceof Blob ? imageData : new Blob([imageData], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);
      return { serviceId, imageIndex, imageUrl };
    } catch (error) {
      console.error("Image download error details:", error);
      return rejectWithValue(error.message || 'Failed to download image');
    }
  }
);

export const fetchCategories = createAsyncThunk('services/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const categories = await getAllCategoriesApi();
    return categories;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Slice
const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    services: [],
    selectedService: null,
    status: 'idle',
    error: null,
    imageUrls: {},
    categories: [],
    categoriesStatus: 'idle',
    categoriesError: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const uniqueServices = Array.from(
          new Map(
            action.payload
              .map((service, index) => ({
                ...service,
                serviceId: service.serviceId || `temp-${index}`,
              }))
              .map((service) => [service.serviceId, service])
          ).values()
        );
        state.services = uniqueServices;
        //console.log("Filtered unique services:", uniqueServices);
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.selectedService = action.payload;
      })
      .addCase(createService.fulfilled, (state, action) => {
        const newService = action.payload;
        if (!newService.serviceId) {
          //console.warn("New service created without serviceId, assigning temporary ID");
          newService.serviceId = `temp-${state.services.length + 1}`;
        }
        state.services.push(newService);
        //console.log("New service added:", newService);
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.services = state.services.map((service) =>
          service.serviceId === action.payload.serviceId ? action.payload : service
        );
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter((service) => service.serviceId !== action.meta.arg);
      })
      .addCase(updateServiceImage.fulfilled, (state, action) => {
        const index = state.services.findIndex((service) => service.serviceId === action.payload.serviceId);
        if (index !== -1) {
          state.services[index].images = action.payload.images;
        }
      })
      .addCase(downloadServiceImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(downloadServiceImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { serviceId, imageIndex, imageUrl } = action.payload;
        state.imageUrls[`${serviceId}-${imageIndex}`] = imageUrl;
        //console.log("Image URL added to state:", { serviceId, imageIndex, imageUrl });
      })
      .addCase(downloadServiceImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        //console.warn("Image download failed, but operation continues:", action.payload);
      })
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = 'succeeded';
        state.categories = action.payload;
        //console.log("Categories fetched:", action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesStatus = 'failed';
        state.categoriesError = action.payload;
      });
  },
});
export default serviceSlice.reducer;