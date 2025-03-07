import axiosInstance from "@/utils/axiosInstance";

// Create a new blog
export const createBlogApi = async (blogData) => {
  try {
    const response = await axiosInstance.post("/create", blogData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to create blog");
  }
};

// Update a blog
export const updateBlogApi = async (blogId, blogData) => {
 
  try {
    const response = await axiosInstance.put(`/update-blog/${blogId}`, blogData);
    return response.data;
  } catch (error) {

    throw new Error(error.response ? error.response.data.message : "Failed to update blog");
  }
};

// Get all blogs
export const getAllBlogsApi = async () => {
  try {
    const response = await axiosInstance.get("/getallblogs");
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to fetch blogs");
  }
};

// Get a single blog by ID
export const getBlogByIdApi = async (blogId) => {
  try {
    const response = await axiosInstance.get(`/blogs/${blogId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to fetch blog");
  }
};

// Delete a blog (soft delete)
export const deleteBlogApi = async (blogId) => {
  try {
    const response = await axiosInstance.delete(`/deleteblog/${blogId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to delete blog");
  }
};

// Get blogs by status
export const getBlogsByStatusApi = async (blogId) => {
  try {
    const response = await axiosInstance.patch(`/statusupdate/${blogId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to fetch blogs by status");
  }
};
// Get blogs by status
export const imageApi = async (blogId,index) => {
  try {
    const response = await axiosInstance.get(`/blogs/${blogId}/download-image/${index}`, {
      responseType: 'blob',
    });
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
    
    
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to fetch blogs by status");
  }
};
