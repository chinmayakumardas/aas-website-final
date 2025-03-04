import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBlogApi,
  updateBlogApi,
  getAllBlogsApi,
  getBlogByIdApi,
  deleteBlogApi,
  getBlogsByStatusApi,
} from "@/api/blogApi";

// Async thunks
export const fetchBlogs = createAsyncThunk("blogs/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getAllBlogsApi();
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

export const fetchBlogById = createAsyncThunk("blogs/fetchById", async (blogId, { rejectWithValue }) => {
  try {
    return await getBlogByIdApi(blogId);
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

export const fetchBlogsByStatus = createAsyncThunk("blogs/fetchByStatus", async (blogId, { rejectWithValue }) => {
  try {
    return await getBlogsByStatusApi(blogId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Slice
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    blog: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        );
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.blog = action.payload;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload._id);
      })
      .addCase(fetchBlogsByStatus.fulfilled, (state, action) => {
        state.blogs = action.payload;
      });
  },
});

export default blogSlice.reducer;
