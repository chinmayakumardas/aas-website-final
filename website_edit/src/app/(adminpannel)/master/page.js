'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMasterData, addMasterItem, editMasterItem, removeMasterItem } from '@/redux/slices/masterSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'react-toastify';

const MasterPage = () => {
  const dispatch = useDispatch();
  const { tags, serviceCategories, blogCategories, loading } = useSelector((state) => state.master);
  
  const [activeTab, setActiveTab] = useState('tags');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '' });

  useEffect(() => {
    dispatch(getMasterData(activeTab));
  }, [dispatch, activeTab]);

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

    dispatch(editMasterItem({ type: activeTab, id: selectedItem.id, data: selectedItem }));
    toast.success('Updated successfully!');
    setEditMode(false);
    setIsViewDialogOpen(false);
  };

  const handleDelete = () => {
    dispatch(removeMasterItem({ type: activeTab, id: selectedItem.id }));
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
    dispatch(addMasterItem({ type: activeTab, data: { name: formData.name } }));
    toast.success('Created successfully!');
    setFormData({ name: '' });
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-6">Master Table</h2>

      <div className="flex gap-4 mb-4">
        {['tags', 'serviceCategories', 'blogCategories'].map((tab) => (
          <Button key={tab} variant={activeTab === tab ? 'default' : 'outline'} onClick={() => setActiveTab(tab)}>
            {tab.replace(/([A-Z])/g, ' $1').trim()}
          </Button>
        ))}
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="flex flex-wrap gap-4">
          {({ tags, serviceCategories, blogCategories }[activeTab] || []).map((item) => (
            <div key={item.id} className="border px-4 py-1 rounded-2xl shadow cursor-pointer" onClick={() => handleOpenViewModal(item)}>
              <p className="text-lg font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editMode ? 'Edit' : 'View'} {activeTab.replace(/([A-Z])/g, ' $1').trim()}</DialogTitle>
          </DialogHeader>
          <Input value={selectedItem?.name || ''} onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} />
          <div className="flex justify-end gap-2 mt-4">
            {editMode ? (
              <>
                <Button onClick={() => setEditMode(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </>
            ) : (
              <>
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={() => setIsDeleteDialogOpen(true)}>Delete</Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MasterPage;
