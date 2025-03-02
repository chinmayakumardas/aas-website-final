import axiosInstance from '@/utils/axiosInstance';

export const fetchData = async (type) => {
  const response = await axiosInstance.get(`/${type}`);
  return response.data;
};

export const createItem = async (type, data) => {
  const response = await axiosInstance.post(`/${type}`, data);
  return response.data;
};

export const updateItem = async (type, id, data) => {
  const response = await axiosInstance.put(`/${type}/${id}`, data);
  return response.data;
};

export const deleteItem = async (type, id) => {
  await axiosInstance.delete(`/${type}/${id}`);
};
