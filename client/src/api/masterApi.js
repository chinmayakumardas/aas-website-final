import axiosInstance from '@/utils/axiosInstance';

export const fetchDataApi = async () => {
  const response = await axiosInstance.get(`/masterAll`);
  return response.data;
};

export const fetchDataByTypeApi = async (type) => {
  const response = await axiosInstance.get(`/masterByType/${type}`);
  return response.data;
};

export const createItemApi = async (type,name) => {
  const response = await axiosInstance.post(`/masterCreate`, { type, name });
  return response.data;
};

export const updateItemApi = async (uniqueId,  name ) => {
  const response = await axiosInstance.put(`/masterUpdate/${uniqueId}`, { name });
  return response.data;
};

export const deleteItemApi = async (uniqueId) => {
  await axiosInstance.delete(`/masterDelete/${uniqueId}`);
};








