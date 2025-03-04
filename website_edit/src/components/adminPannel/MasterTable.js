



'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'react-toastify';
import {
  fetchDataByType,
  addMasterItem,
  editMasterItem,
  removeMasterItem,
} from '@/redux/slices/masterSlice';
import Spinner from '@/components/ui/spinner';

const Master = () => {
  const dispatch = useDispatch();
  const { tag, serviceCategory, blogCategory, loading, error } = useSelector((state) => state.master);

  const [activeTab, setActiveTab] = useState('tag');
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogs, setDialogs] = useState({ view: false, delete: false, create: false });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '' });

  useEffect(() => {
    dispatch(fetchDataByType({ type: activeTab }));
  }, [dispatch, activeTab]);

  const activeData = { tag, serviceCategory, blogCategory }[activeTab]?.data || [];
  // console.log(activeData);
  
  const openDialog = (type, item = null) => {
    setDialogs((prev) => ({ ...prev, [type]: true }));
    if (item) setSelectedItem({ ...item });
  };

  const closeDialog = (type) => {
    setDialogs((prev) => ({ ...prev, [type]: false }));
    setEditMode(false);
    setSelectedItem(null);
    setFormData({ name: '' });
  };

  const handleSave = async () => {
    if (!selectedItem?.name?.trim()) return toast.error('Please enter a name');
  
    try {
      await dispatch(editMasterItem({ type: activeTab, uniqueId: selectedItem.uniqueId, name: selectedItem.name })).unwrap();
      toast.success('Updated successfully!');
      closeDialog('view');
      
      // Fetch updated data
      dispatch(fetchDataByType({ type: activeTab }));  
    } catch (error) {
      toast.error('Update failed!');
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(removeMasterItem({ type: activeTab, uniqueId: selectedItem.uniqueId })).unwrap();
      toast.success('Deleted successfully!');
      setDialogs(false)
      closeDialog('delete');
      
      // Fetch updated data
      dispatch(fetchDataByType({ type: activeTab }));  
    } catch (error) {
      toast.error('Delete failed!');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error('Please enter a name');
    
    try {
      await dispatch(addMasterItem({ type: activeTab, name: formData.name })).unwrap();
      toast.success('Created successfully!');
      closeDialog('create');
      
      // Fetch updated data
      dispatch(fetchDataByType({ type: activeTab }));  
    } catch (error) {
      toast.error('Create failed!');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Master Table</h2>
        <Button onClick={() => openDialog('create')}>Create New</Button>
      </div>
      
      <div className="flex gap-4 mb-4">
        {['tag', 'serviceCategory', 'blogCategory'].map((tab) => (
          <Button key={tab} variant={activeTab === tab ? 'default' : 'outline'} onClick={() => setActiveTab(tab)} disabled={loading}>
            {tab.replace(/([A-Z])/g, ' $1').trim()}
          </Button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      )  : (
        <div className="flex flex-wrap gap-4">
          {activeData.length > 0 ? (
            activeData.map((item) => (
              <div key={item.uniqueId} className="border px-4 py-1 rounded-2xl shadow cursor-pointer inline-block" onClick={() => openDialog('view', item)}>
                <p className="text-lg font-medium text-center">{item.name}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No data found.</p>
          )}
        </div>
      )}

      {/* View/Edit Dialog */}
      <Dialog open={dialogs.view} onOpenChange={() => closeDialog('view')}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editMode ? 'Edit' : 'View'} {activeTab.replace(/([A-Z])/g, ' $1').trim()}</DialogTitle>
          </DialogHeader>
          {editMode ? (
            <>
              <Input value={selectedItem?.name || ''} onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} />
              <div className="flex justify-end gap-2 mt-4">
                <Button onClick={() => setEditMode(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-lg font-medium">{selectedItem?.name}</p>
              <div className="flex justify-end gap-2 mt-4">
                <Button onClick={() => setEditMode(true)}>Edit</Button>
                <Button variant="destructive" onClick={() => openDialog('delete', selectedItem)}>Delete</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogs.delete} onOpenChange={() => closeDialog('delete')}>
        <DialogContent>
          <DialogHeader><DialogTitle>Confirm Deletion</DialogTitle></DialogHeader>
          <p>Are you sure you want to delete this item?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => closeDialog('delete')}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={dialogs.create} onOpenChange={() => closeDialog('create')}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create {activeTab.replace(/([A-Z])/g, ' $1').trim()}</DialogTitle></DialogHeader>
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

export default Master;
