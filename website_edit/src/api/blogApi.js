import axiosInstance from "@/utils/axiosInstance";

// Create a new blog
export const createBlogApi = async (blogData) => {
  try {
    const response = await axiosInstance.post("/blogs", blogData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to create blog");
  }
};

// Update a blog
export const updateBlogApi = async (blogId, blogData) => {
  try {
    const response = await axiosInstance.put(`/blogs/${blogId}`, blogData);
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
    const response = await axiosInstance.put(`/blogs/delete/${blogId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to delete blog");
  }
};

// Get blogs by status
export const getBlogsByStatusApi = async (status) => {
  try {
    const response = await axiosInstance.get(`/blogs/status?status=${status}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to fetch blogs by status");
  }
};




