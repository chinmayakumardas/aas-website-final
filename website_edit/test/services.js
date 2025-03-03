
"use client";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  updateService,
  deleteService,
  createService,
  downloadServiceImage,
  fetchCategories,
} from "@/redux/slices/serviceSlice";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



const ServicesList = () => {
  const dispatch = useDispatch();
  const { services, status, error, imageUrls, categories, categoriesStatus, categoriesError } = useSelector((state) => state.service);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [formData, setFormData] = useState({
    serviceId: null,
    name: "",
    title: "",
    category: "",
    description: "",
    images: null,
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchServices())
          .then(() => {
              dispatch(fetchServices()); // Dispatch it again, if intentional
          });
   }
    if (categoriesStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status, categoriesStatus]);

  useEffect(() => {
    if (status === "succeeded" && services.length > 0) {
      // console.log("Services:", services);
      services.forEach((service) => {
        const imageKey = `${service.serviceId}-0`;
        if (service.images && service.images.length > 0 && !imageUrls[imageKey]) {
          dispatch(downloadServiceImage({ serviceId: service.serviceId, imageIndex: 0 }));
        }
      });
    }
  }, [dispatch, services, status, imageUrls]);

  useEffect(() => {
    if (status === "succeeded" && services.length > 0) {
      const serviceIds = services.map((s) => s.serviceId);
      const uniqueIds = new Set(serviceIds);
      if (serviceIds.length !== uniqueIds.size) {
        //console.error("Duplicate serviceIds detected:", serviceIds);
      } else {
        //console.log("All serviceIds are unique:", serviceIds);
      }
    }
    if (categoriesStatus === "succeeded") {
     // console.log("Categories loaded:", categories);
    }
  }, [services, status, categories, categoriesStatus]);

  const openModal = (service = null) => {
    if (service) {
      setFormData({ ...service, images: null });
    } else {
      setFormData({ serviceId: null, name: "", title: "", category: "", description: "", images: null });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ serviceId: null, name: "", title: "", category: "", description: "", images: null });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setFormData({ ...formData, images: file });
    } else {
      alert("Only image files (JPG, JPEG, PNG) are allowed.");
      e.target.value = "";
    }
  };

  const handleSubmit = async () => {
    if (formData.name && formData.title && formData.category && formData.description) {
      const serviceData = { ...formData };
      try {
        let newServiceId;
        if (formData.serviceId) {
          const action = await dispatch(updateService({ serviceId: formData.serviceId, updatedData: serviceData })).unwrap();
          //console.log("Update action payload:", action);
          newServiceId = formData.serviceId;
          dispatch(fetchServices());
          toast.success('Service updated!'); // Success message on update
        } else {
          const action = await dispatch(createService(serviceData)).unwrap();
        
          //console.log("Create action payload:", action);
          newServiceId = action.serviceId; // Ensure your API returns this
          dispatch(fetchServices());
          toast.success('New service Added!'); // Success message on create
        }

        // Attempt to fetch the image, but don't fail the submission if it errors
        if (serviceData.images && newServiceId) {
          try {
            await dispatch(downloadServiceImage({ serviceId: newServiceId, imageIndex: 0 })).unwrap();
            //console.log("Image fetch successful for serviceId:", newServiceId);
          } catch (imageError) {
            //console.warn("Failed to fetch image after submission, it may not be ready yet:", imageError);
       
          }
        }
        closeModal();
      } catch (err) {
        //console.error("Error submitting service:", err);
        toast.error(`Failed`); // Error message on failure
      }
    } else {
      toast.error("All fields are required!");
    }
  };

  const handleDeleteClick = (serviceId) => {
    setServiceToDelete(serviceId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (serviceToDelete) {
      dispatch(deleteService(serviceToDelete));
      toast.success("Service Deleted!")
      setServiceToDelete(null);
      setDeleteConfirmOpen(false);
    }
  };

  const cancelDelete = () => {
    setServiceToDelete(null);
    setDeleteConfirmOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <Button variant="createBtn" onClick={() => openModal()}>+ New Service</Button>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
        {services.map((service, index) => {
          const imageKey = `${service.serviceId}-0`;
          const imageUrl = imageUrls[imageKey];
          const uniqueKey = service.serviceId !== undefined && service.serviceId !== null
            ? `${typeof service.serviceId === 'string' ? service.serviceId : String(service.serviceId)}`
            : `service-${index}`;

          return (
            <Card key={uniqueKey}>
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
              <p><strong>Title:</strong> {service.title}</p>
                <p><strong>Category:</strong> {service.category}</p>
                {/* <p><strong>Description:</strong> {service.description}</p> */}
                <p><strong>Description:</strong> {service.description.length > 200 ? service.description.substring(0, 200) + "..." : service.description}</p>


                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={service.name}
                    className="mt-2 w-full h-32 object-cover rounded"
                    onError={(e) => {
                      e.target.src = "/fallback-image.jpg";
                      console.error(`Failed to load image for service ${service.serviceId}: ${imageUrl}`, e);
                    }}
                  />
                ) : (
                  <p className="mt-2 text-gray-500">Loading image...</p>
                )}

                <div className="flex mt-4 space-x-2">
                  <Button variant="createBtn" size="sm" onClick={() => openModal(service)}>
                    Edit
                  </Button>
                  <Button variant="deleteBtn" size="sm" onClick={() => handleDeleteClick(service.serviceId)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formData.serviceId ? "Edit Service" : "Add New Service"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Service Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Service Name"
              />
            </div>

            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Service Title"
              />
            </div>

            <div>
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categoriesStatus === "succeeded" && categories.length > 0 ? (
                    categories.map((category) => (
                      <SelectItem key={category.categoryId} value={category.category}>
                        {category.category}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="" disabled>
                      Loading categories...
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Service Description"
              />
            </div>

            <div>
              <Label>Upload Image</Label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {formData.images && (
                <img
                  src={URL.createObjectURL(formData.images)}
                  alt="Preview"
                  className="mt-2 w-full h-32 object-cover rounded"
                />
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
              <Button variant="createBtn" onClick={handleSubmit}>
                {formData.serviceId ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this service?</p>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>Cancel</Button>
            <Button variant="deleteBtn" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesList;





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


import axiosInstance from '@/utils/axiosInstance';

// Get all services
export const getAllServicesApi = async () => {
  try {
    const response = await axiosInstance.get('/getallservices');
    
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'No data found');
  }
};

// Get a service by ID
export const getServiceByIdApi = async (serviceId) => {
  try {
    const response = await axiosInstance.get(`/getservicesbyid/${serviceId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'No data found');
  }
};

// Create a new service
export const createServiceApi = async (formData) => {
  try {
    const response = await axiosInstance.post('/createService', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
   
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Failed to create service');
  }
};

// Update a service
export const updateServiceApi = async (serviceId, formData) => {
  try {
    const response = await axiosInstance.put(`/updateservice/${serviceId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Failed to update service');
  }
};

// Delete (soft delete) a service
export const deleteServiceApi = async (serviceId) => {
  try {
    const response = await axiosInstance.delete(`/deleteservices/${serviceId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Failed to delete service');
  }
};

// Update service image
export const updateServiceImageApi = async (serviceId, imageIndex, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axiosInstance.put(`/${serviceId}/updateimage/${imageIndex}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Failed to update image');
  }
};

export const downloadServiceImageApi = async (serviceId, imageIndex) => {
  try {
    const response = await axiosInstance.get(`/services/${serviceId}/download-image/${imageIndex}`, {
      responseType: 'blob',
    });
    return response.data; 
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Failed to download image');
  }
};




export const getAllCategoriesApi = async () => {
  try {
    const response = await axiosInstance.get('/getallcategories'); 

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Failed to fetch categories');
  }
};












