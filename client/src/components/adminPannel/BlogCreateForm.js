'use client';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "@/redux/slices/blogSlice";
import { fetchDataByType } from "@/redux/slices/masterSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import RichTextEditor from "@/components/ui/RichTextEditor";

const CreateBlog = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { blogCategory, tag, loading } = useSelector((state) => state.master);
  const [formData, setFormData] = useState({
    authorname: "",
    title: "",
    description: "",
    category: "",
    tags: [],
    status: "Pending",
    images: null,
  });
  const [errors, setErrors] = useState({});
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    dispatch(fetchDataByType({ type: "blogCategory" }));
    dispatch(fetchDataByType({ type: "tag" }));
  }, [dispatch]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.authorname.trim()) newErrors.authorname = "Author name is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description cannot be empty";
    if (!formData.category) newErrors.category = "A category must be selected";
    if (!formData.tags.length) newErrors.tags = "At least one tag must be selected";
    if (!formData.images) newErrors.images = "An image is required";
    
    // Clear error when field is valid
    Object.keys(errors).forEach(key => {
      if (!newErrors[key]) {
        delete errors[key];
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({ ...prev, description: content }));
    setEditorContent(content);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, images: [file] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = new FormData();
      data.append("authorname", formData.authorname);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("status", formData.status);
  
      formData.tags.forEach(tag => data.append("tags", tag));
  
      if (formData.images) {
        formData.images.forEach(image => data.append("images", image));
      }
  
      try {
        await dispatch(createBlog(data)).unwrap();
        toast.success("Blog created successfully!");
        router.push("/blogs");
      } catch (error) {
        toast.error(error.message || "Failed to create blog");
      }
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handleTagsChange = (selectedOptions) => {
    setFormData({ ...formData, tags: selectedOptions.map(option => option.value) });
  };

  return (
    <div className="min-h-screen p-4">
      <Card className="w-full flex flex-col shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Header */}
          <div className="p-6 border-b bg-white rounded-t-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-semibold text-gray-800">Create New Blog</h2>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/blogs')}
                  className="flex-1 sm:flex-none text-sm"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 sm:flex-none bg-blue-600 text-white hover:bg-blue-700 text-sm" 
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Blog'}
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-6">
            {/* Title and Author Name in a row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Title</Label>
                <Input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange}
                  className="mt-1 border-gray-300"
                  placeholder="Enter blog title"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              {/* Author Name */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Author Name</Label>
                <Input 
                  type="text" 
                  name="authorname" 
                  value={formData.authorname} 
                  onChange={handleChange}
                  className="mt-1 border-gray-300"
                  placeholder="Enter author name"
                />
                {errors.authorname && <p className="text-red-500 text-xs mt-1">{errors.authorname}</p>}
              </div>
            </div>

            {/* Category and Tags in a grid on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Category</Label>
                <Select
                  name="category"
                  options={blogCategory.data?.map((cat) => ({ value: cat.name, label: cat.name }))}
                  value={formData.category ? { value: formData.category, label: formData.category } : null}
                  onChange={(option) => setFormData({ ...formData, category: option.value })}
                  className="mt-1"
                  placeholder="Select a category"
                  instanceId="category-select"
                  styles={{
                    menu: (base) => ({
                      ...base,
                      zIndex: 50,
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.375rem',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }),
                    control: (base) => ({
                      ...base,
                      backgroundColor: 'white',
                      borderColor: '#E5E7EB',
                      '&:hover': {
                        borderColor: '#D1D5DB'
                      }
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused ? '#F3F4F6' : 'white',
                      color: '#374151',
                      '&:active': {
                        backgroundColor: '#F3F4F6'
                      }
                    })
                  }}
                />
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>

              {/* Tags */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Tags</Label>
                <Select
                  isMulti
                  options={tag.data?.map((t) => ({ value: t.name, label: t.name }))}
                  value={formData.tags.map(tag => ({ value: tag, label: tag }))}
                  onChange={handleTagsChange}
                  className="mt-1"
                  placeholder="Select tags"
                  instanceId="tags-select"
                  styles={{
                    menu: (base) => ({
                      ...base,
                      zIndex: 50,
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.375rem',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }),
                    control: (base) => ({
                      ...base,
                      backgroundColor: 'white',
                      borderColor: '#E5E7EB',
                      '&:hover': {
                        borderColor: '#D1D5DB'
                      }
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused ? '#F3F4F6' : 'white',
                      color: '#374151',
                      '&:active': {
                        backgroundColor: '#F3F4F6'
                      }
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: '#F3F4F6',
                      borderRadius: '0.25rem'
                    })
                  }}
                />
                {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags}</p>}
              </div>
            </div>

            {/* Rich Text Editor */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2">Content</Label>
              <div className="min-h-[400px]">
                <RichTextEditor 
                  content={editorContent} 
                  onChange={handleEditorChange}
                />
              </div>
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Simple Image Upload */}
            <div className="p-6">
              <div className="flex flex-col gap-4">
                {formData.images ? (
                  <div className="flex items-center gap-3 bg-green-50 text-green-700 p-4 rounded-lg border border-green-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{formData.images[0].name}</span>
                    <button 
                      type="button"
                      onClick={() => setFormData({ ...formData, images: null })}
                      className="ml-auto text-green-600 hover:text-green-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-200 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-gray-600 font-medium">Choose File</p>
                    </div>
                    <Input 
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                )}
                {errors.images && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.images}
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateBlog;
