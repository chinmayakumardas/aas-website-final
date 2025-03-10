'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'react-toastify';
import {
  fetchDataByType,
  addMasterItem,
  editMasterItem,
  removeMasterItem,
} from '@/redux/slices/masterSlice';
import Spinner from '@/components/ui/spinner';
import { FiPlus, FiEdit2, FiTrash2, FiTag, FiGrid, FiBookOpen, FiX, FiSave, FiAlertCircle, FiPackage } from 'react-icons/fi';
import { GrTechnology } from "react-icons/gr";

const Master = () => {
  const dispatch = useDispatch();
  const { tag, serviceCategory, blogCategory,serviceTechnology, loading, error } = useSelector((state) => state.master);

  const [activeTab, setActiveTab] = useState('tag');
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogs, setDialogs] = useState({ view: false, delete: false, create: false });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const tabIcons = {
    tag: <FiTag className="w-4 h-4 sm:mr-2" />,
    serviceCategory: <FiGrid className="w-4 h-4 sm:mr-2" />,
    blogCategory: <FiBookOpen className="w-4 h-4 sm:mr-2" />,
    serviceTechnology: <GrTechnology className="w-4 h-4 sm:mr-2" />
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchDataByType({ type: activeTab }))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [dispatch, activeTab]);

  const activeData = { tag, serviceCategory, blogCategory,serviceTechnology }[activeTab]?.data || [];
  
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
      dispatch(fetchDataByType({ type: activeTab }));  
    } catch (error) {
      toast.error('Update failed!');
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(removeMasterItem({ type: activeTab, uniqueId: selectedItem.uniqueId })).unwrap();
      toast.success('Deleted successfully!');
      setDialogs(false);
      closeDialog('delete');
      dispatch(fetchDataByType({ type: activeTab }));  
    } catch (error) {
      toast.error('Delete failed!');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error('Please enter a name!');
    
    try {
      await dispatch(addMasterItem({ type: activeTab, name: formData.name })).unwrap();
      toast.success('Created successfully!');
      closeDialog('create');
      dispatch(fetchDataByType({ type: activeTab }));  
    } catch (error) {
      toast.error('Create failed!');
    }
  };

  return (
    <div className={` p-4  min-h-screen transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-center justify-around mb-4 bg-white rounded-lg shadow p-3 ">
        <div className="flex items-center  flex-1">
          {['tag', 'serviceCategory', 'blogCategory','serviceTechnology'].map((tab, index) => (
            <Button 
              key={tab} 
              variant={activeTab === tab ? 'Btn' : 'outline'} 
              onClick={() => setActiveTab(tab)} 
              disabled={loading}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
              className={`
                flex items-center justify-center rounded-lg h-10
                transition-all duration-300 transform
                ${activeTab === tab 
                  ? 'bg-blue-500 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50'} 
                text-sm px-4
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
              `}
            >
              {tabIcons[tab]}
              <span className="hidden md:inline ">{tab.replace(/([A-Z])/g, ' $1').trim()}</span>
            </Button>
          ))}
        </div>
        <Button 
          onClick={() => openDialog('create')}
          variant="Btn"
          className="
            bg-blue-500 hover:bg-blue-600
            text-white flex items-center justify-center gap-2 
            rounded-lg h-10 px-4 shadow-sm
            transition-all duration-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          "
        >
          <FiPlus className="w-5 h-5" />
          <span className="hidden sm:inline">Create</span>
        </Button>
      </div>

      <div className={` rounded-lg shadow p-4 transition-all duration-300 h-[calc(100vh-120px)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          activeData.length > 0 ? (
            <div className="flex flex-wrap gap-2 p-2">
              {activeData.map((item, index) => (
                <div 
                  key={item.uniqueId}
                  style={{
                    transitionDelay: `${index * 50}ms`
                  }}
                  className={`
                    inline-flex items-center gap-2 
                    bg-white border border-gray-200 rounded-full
                    py-1.5 px-3
                    shadow-sm hover:shadow
                    transition-all duration-300 transform cursor-pointer
                    hover:border-blue-200 hover:scale-[1.02]
                    group
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}
                  onClick={() => openDialog('view', item)}
                >
                  <p className="text-sm font-medium text-gray-800">{item.name}</p>
                  <FiEdit2 className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-full">
              <div className="flex flex-col items-center">
                <FiPackage className="w-16 h-16 text-gray-300" />
                <p className="text-sm font-medium mt-4">No items found</p>
                <p className="text-xs text-gray-400 mt-1">Click 'Create' to add your first item</p>
              </div>
            </div>
          )
        )}
      </div>

      {/* View/Edit Dialog */}
      <Dialog open={dialogs.view} onOpenChange={() => closeDialog('view')}>
        <DialogContent className="sm:max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              {editMode ? <FiEdit2 className="mr-2" /> : tabIcons[activeTab]}
              {editMode ? 'Edit' : 'View'} {activeTab.replace(/([A-Z])/g, ' $1').trim()}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {editMode ? 'Edit the details below' : 'View the details of the selected item'}
            </DialogDescription>
          </DialogHeader>
          {editMode ? (
            <>
              <Input 
                value={selectedItem?.name || ''} 
                onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                className="mt-2 rounded-lg"
              />
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setEditMode(false)}
                  className="rounded-lg flex items-center gap-2"
                >
                  <FiX /> Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  className="rounded-lg flex items-center gap-2 bg-blue-500 text-white"
                >
                  <FiSave /> Save
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm font-medium mt-2 px-4 py-2 bg-gray-50 rounded-lg">{selectedItem?.name}</p>
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  onClick={() => setEditMode(true)}
                  className="rounded-lg flex items-center gap-2"
                >
                  <FiEdit2 /> Edit
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => openDialog('delete', selectedItem)}
                  className="rounded-lg flex items-center gap-2"
                >
                  <FiTrash2 /> Delete
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogs.delete} onOpenChange={() => closeDialog('delete')}>
        <DialogContent className="sm:max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600 text-xl">
              <FiAlertCircle className="mr-2" /> Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Please confirm if you want to delete this item permanently
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-red-50 rounded-lg">
            <p className="text-gray-700">Are you sure you want to delete this item?</p>
            <p className="text-xs text-gray-500 mt-1">This action cannot be undone.</p>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => closeDialog('delete')}
              className="rounded-lg flex items-center gap-2"
            >
              <FiX /> Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              className="rounded-lg flex items-center gap-2"
            >
              <FiTrash2 /> Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={dialogs.create} onOpenChange={() => closeDialog('create')}>
        <DialogContent className="sm:max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <FiPlus className="mr-2" /> Create {activeTab.replace(/([A-Z])/g, ' $1').trim()}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Enter the details below to create a new {activeTab.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate} className="mt-4">
            <Label>Name</Label>
            <Input 
              name="name" 
              value={formData.name} 
              onChange={(e) => setFormData({ name: e.target.value })} 
              required 
              className="mt-1 rounded-lg"
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button 
                type="submit"
                className="rounded-lg flex items-center gap-2 bg-blue-500 text-white"
              >
                <FiPlus /> Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Master;
