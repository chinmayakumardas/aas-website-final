'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'react-toastify';

const sampleTags = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'AI & Machine Learning' },
    { id: 3, name: 'Blockchain' },
    { id: 4, name: 'Cybersecurity' },
    { id: 5, name: 'Cloud Computing' },
    { id: 6, name: 'Software Development' },
    { id: 7, name: 'Data Science' },
    { id: 8, name: 'IoT' },
    { id: 9, name: 'AR/VR' },
    { id: 10, name: 'Mobile Development' },
    { id: 11, name: 'Networking' },
    { id: 12, name: 'Big Data' },
    { id: 13, name: 'Quantum Computing' },
    { id: 14, name: 'UI/UX Design' },
    { id: 15, name: 'SEO & Digital Marketing' },
    { id: 16, name: 'Game Development' },
    { id: 17, name: 'E-commerce' },
    { id: 18, name: 'DevOps' },
    { id: 19, name: 'Automation' },
    { id: 20, name: 'Cryptocurrency' },
    { id: 21, name: 'SaaS & Startups' },
  ];
  
  const sampleServiceCategories = [
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Mobile App Development' },
    { id: 3, name: 'UI/UX Design' },
    { id: 4, name: 'SEO Optimization' },
    { id: 5, name: 'Digital Marketing' },
    { id: 6, name: 'Content Writing' },
    { id: 7, name: 'Cloud Services' },
    { id: 8, name: 'Cybersecurity Solutions' },
    { id: 9, name: 'Blockchain Development' },
    { id: 10, name: 'AI & Machine Learning Services' },
    { id: 11, name: 'E-commerce Solutions' },
    { id: 12, name: 'Game Development' },
    { id: 13, name: 'AR/VR Development' },
    { id: 14, name: 'Networking & IT Support' },
    { id: 15, name: 'SaaS Development' },
    { id: 16, name: 'IoT Development' },
    { id: 17, name: 'Business Automation' },
    { id: 18, name: 'DevOps Consulting' },
    { id: 19, name: 'Data Science & Analytics' },
    { id: 20, name: 'Video Production' },
    { id: 21, name: 'Cloud Migration' },
  ];
  
  const sampleBlogCategories = [
    { id: 1, name: 'Health & Wellness' },
    { id: 2, name: 'Technology' },
    { id: 3, name: 'Business & Finance' },
    { id: 4, name: 'Personal Development' },
    { id: 5, name: 'Lifestyle' },
    { id: 6, name: 'Education' },
    { id: 7, name: 'Travel' },
    { id: 8, name: 'Food & Nutrition' },
    { id: 9, name: 'Fitness' },
    { id: 10, name: 'Parenting' },
    { id: 11, name: 'Mental Health' },
    { id: 12, name: 'Sustainability' },
    { id: 13, name: 'Self-Improvement' },
    { id: 14, name: 'Relationships' },
    { id: 15, name: 'Finance & Investing' },
    { id: 16, name: 'Entertainment' },
    { id: 17, name: 'Career & Job Advice' },
    { id: 18, name: 'Home & Garden' },
    { id: 19, name: 'Science & Space' },
    { id: 20, name: 'Mindfulness & Meditation' },
    { id: 21, name: 'Pets & Animals' },
  ];
  

const MasterPage = () => {
  const [activeTab, setActiveTab] = useState('tags');
  const [data, setData] = useState({
    tags: JSON.parse(localStorage.getItem('tags')) || sampleTags,
    serviceCategories: JSON.parse(localStorage.getItem('serviceCategories')) || sampleServiceCategories,
    blogCategories: JSON.parse(localStorage.getItem('blogCategories')) || sampleBlogCategories,
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '' });

  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(data.tags));
    localStorage.setItem('serviceCategories', JSON.stringify(data.serviceCategories));
    localStorage.setItem('blogCategories', JSON.stringify(data.blogCategories));
  }, [data]);

  const handleOpenViewModal = (item) => {
    setSelectedItem(item);
    setEditMode(false);
    setIsViewDialogOpen(true);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    if (!selectedItem.name) {
      toast.error('Please enter a name');
      return;
    }

    setData((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((item) => (item.id === selectedItem.id ? selectedItem : item)),
    }));

    toast.success('Updated successfully!');
    setEditMode(false);
    setIsViewDialogOpen(false);
  };

  const handleDelete = () => {
    setData((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((item) => item.id !== selectedItem.id),
    }));
    toast.success('Deleted successfully!');
    setIsDeleteDialogOpen(false);
    setIsViewDialogOpen(false);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Please enter a name');
      return;
    }
    const newItem = { id: Date.now(), name: formData.name };
    setData((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newItem],
    }));
    toast.success('Created successfully!');
    setFormData({ name: '' });
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Master Table</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>Create New</Button>
      </div>

      <div className="flex gap-4 mb-4">
        {['tags', 'serviceCategories', 'blogCategories'].map((tab) => (
          <Button key={tab} variant={activeTab === tab ? 'default' : 'outline'} onClick={() => setActiveTab(tab)}>
            {tab.replace(/([A-Z])/g, ' $1').trim()}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {data[activeTab].map((item) => (
          <div key={item.id} className="border px-4 py-1 rounded-2xl shadow cursor-pointer inline-block" onClick={() => handleOpenViewModal(item)}>
            <p className="text-lg font-medium text-center">{item.name}</p>
          </div>
        ))}
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editMode ? 'Edit' : 'View'} {activeTab.replace(/([A-Z])/g, ' $1').trim()}</DialogTitle>
          </DialogHeader>
          {editMode ? (
            <div>
              
              <Input
                value={selectedItem?.name || ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
              />
              <div className="flex justify-end gap-2 mt-4">
                <Button onClick={() => setEditMode(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-lg font-medium">{selectedItem?.name}</p>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="editBtn" onClick={handleEdit}>Edit</Button>
                <Button variant="deleteBtn" onClick={() => setIsDeleteDialogOpen(true)}>Delete</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this item?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create {activeTab.replace(/([A-Z])/g, ' $1').trim()}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate}>
            <Label>Name</Label>
            <Input name="name" value={formData.name} onChange={(e) => setFormData({ name: e.target.value })} required />
            <div className="flex justify-end gap-2 mt-4">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MasterPage;
