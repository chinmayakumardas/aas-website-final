'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'react-toastify';
import { addCategory, getCategories, updateCategory, deleteCategory } from '@/redux/slices/masterSlice';

const MasterPage = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.master);
  
  const [formData, setFormData] = useState({ name: '', type: 'tag' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Please enter a name');
      return;
    }

    if (editId) {
      dispatch(updateCategory({ id: editId, data: formData })).then(() => {
        toast.success('Category updated successfully!');
        setEditId(null);
      });
    } else {
      dispatch(addCategory(formData)).then(() => {
        toast.success('Category added successfully!');
      });
    }

    setFormData({ name: '', type: 'tag' });
    setIsDialogOpen(false);
  };

  const handleEdit = (category) => {
    setEditId(category.id);
    setFormData({ name: category.name, type: category.type });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id)).then(() => {
      toast.success('Category deleted successfully!');
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Manage Tags, Service Categories & Blog Categories</h2>
        <Button onClick={() => setIsDialogOpen(true)}>Add New</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="border p-4 rounded-md shadow">
            <p><strong>Name:</strong> {category.name}</p>
            <p><strong>Type:</strong> {category.type}</p>
            <div className="flex justify-between mt-2">
              <Button size="sm" onClick={() => handleEdit(category)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(category.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editId ? 'Edit Category' : 'Add Category'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="mt-4">
            <Label>Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} required />
            
            <Label>Type</Label>
            <select name="type" value={formData.type} onChange={handleChange} className="border p-2 w-full mt-2">
              <option value="tag">Tag</option>
              <option value="service">Service Category</option>
              <option value="blog">Blog Category</option>
            </select>
            
            <Button type="submit" className="mt-4 w-full">{editId ? 'Update' : 'Create'}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MasterPage;
