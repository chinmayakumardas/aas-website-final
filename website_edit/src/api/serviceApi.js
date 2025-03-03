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