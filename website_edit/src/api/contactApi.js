import axiosInstance from "@/utils/axiosInstance";

// API request to create a contact
export const createContactApi = async (contactData) => {
  try {
    const response = await axiosInstance.post('/contacts', contactData);
    return response.data.contact;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error creating contact');
  }
};

// API request to get all contacts
export const getContactsApi = async () => {
  try {
    const response = await axiosInstance.get('/contacts');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error fetching contacts');
  }
};
