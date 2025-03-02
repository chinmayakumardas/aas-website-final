import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBlogApi,
  updateBlogApi,
  getAllBlogsApi,
  getBlogByIdApi,
  deleteBlogApi,
  getBlogsByStatusApi,
 
} from "@/api/blogApi"; // Ensure this path matches your API file location

// Async Thunks
export const fetchAllBlogs = createAsyncThunk("blogs/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getAllBlogsApi();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchBlogById = createAsyncThunk("blogs/fetchById", async (blogId, { rejectWithValue }) => {
  try {
    return await getBlogByIdApi(blogId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchBlogsByStatus = createAsyncThunk("blogs/fetchByStatus", async (status, { rejectWithValue }) => {
  try {
    return await getBlogsByStatusApi(status);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createBlog = createAsyncThunk("blogs/create", async (blogData, { rejectWithValue }) => {
  try {
    return await createBlogApi(blogData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateBlog = createAsyncThunk("blogs/update", async ({ blogId, blogData }, { rejectWithValue }) => {
  try {
    return await updateBlogApi(blogId, blogData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteBlog = createAsyncThunk("blogs/delete", async (blogId, { rejectWithValue }) => {
  try {
    return await deleteBlogApi(blogId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});



export const updateBlogStatus = createAsyncThunk("blogs/updateStatus", async ({ blogId, status }, { rejectWithValue }) => {
  try {
    return await updateBlogStatusApi(blogId, status);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Slice
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    singleBlog: null,
    status: "idle",
    error: null,
  },
  reducers: {}, // No extra reducers needed here
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.singleBlog = action.payload;
      })
      .addCase(fetchBlogsByStatus.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.map((blog) => (blog.blog_id === action.payload.blog_id ? action.payload : blog));
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog.blog_id !== action.meta.arg);
      })
    
      .addCase(updateBlogStatus.fulfilled, (state, action) => {
        const blog = state.blogs.find((b) => b.blog_id === action.meta.arg.blogId);
        if (blog) blog.status = action.meta.arg.status;
      });
  },
});

export default blogSlice.reducer;
