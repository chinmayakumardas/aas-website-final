
"use client";
import { toast } from 'react-toastify';
import { useEffect, useRef,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  updateService,
  deleteService,
  createService,
  downloadServiceImage,
} from "@/redux/slices/serviceSlice";
import {
  fetchDataByType
} from '@/redux/slices/masterSlice';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import Spinner from '@/components/ui/spinner';
import gsap from 'gsap';
const ServicesList = () => {
  const dispatch = useDispatch();
  const { services, status, error, imageUrls } = useSelector((state) => state.service);
  const {serviceCategory}=useSelector((state)=>state.master);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  
  const contentRef = useRef(null);const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    serviceId: null,
    name: "",
    title: "",
    category: "",
    description: "",
    images: null,
  });
  useEffect(() => {
    dispatch(fetchDataByType({ type: 'serviceCategory' }));
  }, [dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchServices()).finally(() => setLoading(false));;
    }
  }, [dispatch, status]);
  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [loading]);
  
  useEffect(() => {
    if (status === "succeeded" && services.length > 0) {
      services.forEach((service) => {
        const imageKey = `${service.serviceId}-0`;
        if (service.images && service.images.length > 0 && !imageUrls[imageKey]) {
          dispatch(downloadServiceImage({ serviceId: service.serviceId, imageIndex: 0 }));
        }
      });
    }
  }, [dispatch, services, status, imageUrls]);

  const openModal = (service = null) => {
    if (service) {
      setFormData({ ...service, images: null });
    } else {
      setFormData({ serviceId: null, name: "", title: "",category: "", description: "", images: null });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ serviceId: null, name: "", title: "",category: "", description: "", images: null });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setFormData({ ...formData, images: file });
    } else {
      alert("Only image files (JPG, JPEG, PNG) are allowed.");
      e.target.value = "";
    }
  };

  const handleSubmit = async () => {
  
    if (formData.name && formData.title && formData.description && formData.category) {
      const serviceData = { ...formData };
      try {
        let newServiceId;
        if (formData.serviceId) {
          const action = await dispatch(updateService({ serviceId: formData.serviceId, updatedData: serviceData })).unwrap();
          newServiceId = formData.serviceId;
          dispatch(fetchServices());
         
          toast.success('Service updated!');
        } else {
          const action = await dispatch(createService(serviceData)).unwrap();
          
          newServiceId = action.serviceId; // Ensure your API returns this
          dispatch(fetchServices());
          toast.success('New service added!');
        }

        //dispatch(fetchServices());

        if (serviceData.images && action.serviceId) {
          try {
            await dispatch(downloadServiceImage({ serviceId: action.serviceId, imageIndex: 0 })).unwrap();
            //console.log("Image fetch successful for serviceId:", action.serviceId);
          } catch (imageError) {
           // console.warn("Failed to fetch image after submission:", imageError);
          }
        }
        closeModal();
      } catch (err) {
        //console.error("Error submitting service:", err);
        toast.error("Failed to save.");
      }
    } else {
      toast.error("All fields are required!");
    }
  };

  const handleDeleteClick = (serviceId) => {
    setServiceToDelete(serviceId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {

    if (serviceToDelete) 
    {
      dispatch(deleteService(serviceToDelete));
      toast.success("Service Deleted!")
      setServiceToDelete(null);
      setDeleteConfirmOpen(false);
    }
  };

  const cancelDelete = () => {
    setServiceToDelete(null);
    setDeleteConfirmOpen(false);
  };

  // <Spinner/>
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <Button variant="createBtn" onClick={() => openModal()}>+ New Service</Button>
      </div>

  
      {loading ? (
  <div className="flex items-center justify-center">
    <Spinner />
  </div>
) : (
  <div ref={contentRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
     {services.map((service, index) => {
          const imageKey = `${service.serviceId}-0`;
          const imageUrl = imageUrls[imageKey];
          const uniqueKey = service.serviceId ? String(service.serviceId) : `service-${index}`;

          return (
            <Card key={uniqueKey}>
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* <p><strong>Title:</strong> {service.title}</p> */}
                <p><strong>Category:</strong> {service.category}</p>
                <p><strong>Description:</strong> {service.description.length > 200 ? service.description.substring(0, 200) + "..." : service.description}</p>
                {/* <p><strong>Description:</strong> {service.description}</p> */}

                
                  <img
                    src={imageUrl}
                    alt={service.name}
                    className="mt-2 w-full h-32 object-cover rounded"
                    onError={(e) => {
                      e.target.src = "/fallback-image.jpg";
                      console.error(`Failed to load image for service ${service.serviceId}: ${imageUrl}`, e);
                    }}
                  />
               

                <div className="flex mt-4 space-x-2">
                  <Button variant="createBtn" size="sm" onClick={() => openModal(service)}>Edit</Button>
                  <Button variant="deleteBtn" size="sm" onClick={() => handleDeleteClick(service.serviceId)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
  </div>
)}

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formData.serviceId ? "Edit Service" : "Add New Service"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            
            {/* service name */}
            <div>
            <Label>Service Name</Label>
            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Service Name" />
            </div>
            {/* title */}
            <div>
            <Label>Title</Label>
            <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Service Title" />
            </div>

            {/* category */}
            <div>
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategory?.data?.length > 0 ? (
                    serviceCategory.data.map((category) => (
                      <SelectItem key={category.uniqueId} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="" disabled>
                      Loading categories...
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            
           {/* description */}
           <div>
           <Label>Description</Label>
            <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Service Description" />

           </div>

           {/* attachment */}
            <div>
            <Label>Upload Image</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>
          {/* button */}
          <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
              <Button variant="createBtn" onClick={handleSubmit}>
                {formData.serviceId ? "Update" : "Create"}
              </Button>
          </div>
        </DialogContent>

        
      </Dialog>
      
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this service?</p>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>Cancel</Button>
            <Button variant="deleteBtn" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesList;

