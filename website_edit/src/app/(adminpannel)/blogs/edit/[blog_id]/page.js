'use client'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "@/redux/slices/blogSlice";
import { fetchDataByType } from "@/redux/slices/masterSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Select from "react-select";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const { blogCategory, tag, loading } = useSelector((state) => state.master);
  const [formData, setFormData] = useState({
    authorname: "",
    title: "",
    description: "",
    categories: "",
    tags: [],
    images: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchDataByType({ type: "blogCategory" }));
    dispatch(fetchDataByType({ type: "tag" }));
  }, [dispatch]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.authorname) newErrors.authorname = "Author name is required";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description cannot be empty";
    if (!formData.categories) newErrors.categories = "A category must be selected";
    if (!formData.tags.length) newErrors.tags = "At least one tag must be selected";
    if (!formData.images) newErrors.images = "An image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (selectedTags) => {
    setFormData({ ...formData, tags: selectedTags.map(tag => tag.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(createBlog(formData));
    }
  };

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Create Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Author Name:</Label>
            <Input type="text" name="authorname" value={formData.authorname} onChange={handleChange} />
            {errors.authorname && <p className="text-red-500 text-sm">{errors.authorname}</p>}
          </div>
          <div>
            <Label>Title:</Label>
            <Input type="text" name="title" value={formData.title} onChange={handleChange} />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>
          <div>
            <Label>Description:</Label>
            <Input type="text" name="description" value={formData.description} onChange={handleChange} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          <div>
            <Label>Categories:</Label>
            <Select name="categories" onValueChange={(value) => setFormData({ ...formData, categories: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {blogCategory.data?.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categories && <p className="text-red-500 text-sm">{errors.categories}</p>}
          </div>
          <div>
            <Label>Tags:</Label>
            <Select
              isMulti
              options={tag.data?.map((t) => ({ value: t.name, label: t.name }))}
              value={formData.tags.map(tag => ({ value: tag, label: tag }))}
              onChange={handleTagsChange}
            />
            {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
          </div>
          <div>
            <Label>Upload Image:</Label>
            <Input type="file" name="images" onChange={(e) => setFormData({ ...formData, images: e.target.files[0] })} />
            {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Blog"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateBlog;