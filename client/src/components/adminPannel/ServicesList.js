// eslint-disable-next-line no-undef
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
import Selects from "react-select";
import Spinner from '@/components/ui/spinner';
import gsap from 'gsap';
const ServicesList = () => {
  const dispatch = useDispatch();
  const { services, status, error, imageUrls } = useSelector((state) => state.service);
  const {serviceCategory,serviceTechnology}=useSelector((state)=>state.master);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [errors, setErrors] = useState({});
  const contentRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    serviceId: null,
    name: "",
    title: "",
    category: "",
    description: "",
    images: null,
    serviceIcon:null,
    KeyFeatures:[],
    TechnologiesWeUse:[],
    OurProcess:[]

  });
    useEffect(() => {
    dispatch(fetchDataByType({ type: 'serviceCategory' }));
    dispatch(fetchDataByType({ type: 'serviceTechnology' }));
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
    setErrors({});
    if (service) {
      setFormData({
        ...service,
        images: null,
        category: service.category || "",  
        TechnologiesWeUse: Array.isArray(service.TechnologiesWeUse) ? service.TechnologiesWeUse : [],
        KeyFeatures: Array.isArray(service.KeyFeatures) ? service.KeyFeatures : [],
        OurProcess: Array.isArray(service.OurProcess) ? service.OurProcess : []
      });
    } else {
      setFormData({
        serviceId: null,
        name: "",
        title: "",
        category: "",
        description: "",
        images: null,
        serviceIcon: null,
        KeyFeatures: [],
        TechnologiesWeUse: [],
        OurProcess: []
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ serviceId: null, name: "", title: "",category: "", description: "", images: null });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/jpg","image/webp"].includes(file.type)) {
      // Map the type to the correct field name
      const fieldName = type === "icon" ? "serviceIcon" : "images";
      setFormData({ ...formData, [fieldName]: file });
    } else {
      toast.error("Only image files (JPG, JPEG, PNG,webp) are allowed.");
      e.target.value = "";
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    const requiredFields = {
      name: "Name",
      title: "Title",
      description: "Description",
      category: "Category",
      KeyFeatures: "Key Features",
      TechnologiesWeUse: "Technologies We Use",
      OurProcess: "Our Process"
    };

    // Check if form has any values
    const hasAnyValue = Object.keys(formData).some(key => {
      if (Array.isArray(formData[key])) {
        return formData[key].length > 0;
      }
      return formData[key] && formData[key] !== "";
    });

    if (!hasAnyValue) {
      toast.error("Please fill in the form");
      return;
    }

    const newErrors = {};
    Object.keys(requiredFields).forEach(field => {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        newErrors[field] = `${requiredFields[field]} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const serviceData = new FormData();
      
      // Append basic fields
      serviceData.append('name', formData.name);
      serviceData.append('title', formData.title);
      serviceData.append('category', formData.category);
      serviceData.append('description', formData.description);
      
      // Handle array fields - convert to JSON strings
      serviceData.append('KeyFeatures', JSON.stringify(formData.KeyFeatures));
      serviceData.append('TechnologiesWeUse', JSON.stringify(formData.TechnologiesWeUse));
      serviceData.append('OurProcess', JSON.stringify(formData.OurProcess));
      
      // Handle file fields
      if (formData.images) {
        serviceData.append('images', formData.images);
      }
      if (formData.serviceIcon) {
        serviceData.append('serviceIcon', formData.serviceIcon);
      }

      // Log FormData contents for debugging
    
      for (let [key, value] of serviceData.entries()) {
        //console.log(`${key}: ${value instanceof File ? 'File: ' + value.name : value}`);
      }

      let action;
      if (formData.serviceId) {
        action = await dispatch(updateService({ 
          serviceId: formData.serviceId, 
          updatedData: serviceData 
        })).unwrap();
        toast.success('Service updated successfully!');
      } else {
        action = await dispatch(createService(serviceData)).unwrap();
        toast.success('New service created successfully!');
      }

      await dispatch(fetchServices());
      
      if (formData.images && action.serviceId) {
        try {
          await dispatch(downloadServiceImage({ 
            serviceId: action.serviceId, 
            imageIndex: 0 
          })).unwrap();
        } catch (imageError) {
          //console.warn("Failed to fetch updated image:", imageError);
        }
      }
      
      setErrors({});
      closeModal();
    } catch (err) {
      
      //const errorMessage = err.response?.data?.error || err.message || "Failed to save service. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleTechChange = (selectedOptions) => {
    setFormData({ ...formData, TechnologiesWeUse: selectedOptions.map(option => option.value) });
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


  


  return (
    <div className=" p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <Button variant="createBtn" onClick={() => openModal()}>+ New Service</Button>
      </div>

  
      {loading ? (
          <div className="flex items-center justify-center h-[100vh]">
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
                      
                        <p><strong>Category:</strong> {service.category}</p>
                        <p><strong>Description:</strong> {service.description 
                          ? service.description.slice(0, 200) + (service.description.length > 200 ? "..." : "") 
                          : "No description available"}</p>
                       
                        
                          <img
                            src={imageUrl}
                            alt={service.name}
                            className="mt-2 w-full h-32 object-cover rounded"
                            onError={(e) => {
                              e.target.src = "/fallback-image.jpg";
                              //console.error(`Failed to load image for service ${service.serviceId}: ${imageUrl}`, e);
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
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select a category</option>
                {serviceCategory?.data?.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
             
            {/* tehnology we used */}

            <div>
                <Label className="text-sm font-medium text-gray-700">Technologies We Use</Label>
                <Selects
                        isMulti
                        options={serviceTechnology?.data?.map(tech => ({ value: tech.name, label: tech.name })) || []}
                        value={(formData.TechnologiesWeUse || []).map(value => ({ value, label: value }))}
                        onChange={handleTechChange}
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
              </div>

           {/* description */}
           <div>
           <Label>Description</Label>
            <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Service Description" />

           </div>
           
           {/* our process */}
           <div>
           <Label>Our Process</Label>
           <Textarea 
            value={(formData.OurProcess || []).join(",")} 
            onChange={(e) => setFormData({ 
              ...formData, 
              OurProcess: e.target.value.split(",").map(item => item.trim()) 
            })} 
          />
          {/* KeyFeatures */}
          <div>
             <Label>KeyFeatures</Label>
           <Textarea 
            value={(formData.KeyFeatures || []).join(",")} 
            onChange={(e) => setFormData({ 
              ...formData, 
              KeyFeatures: e.target.value.split(",").map(item => item.trim()) 
            })} 
          />
          </div>

          </div>
           {/* attachment */}
           <div className="flex justify-between gap-4">
            <div>
              <Label>Upload Image</Label>
              <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "image")} />
            </div>
            <div>
              <Label>Choose Icon</Label>
              <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "icon")} />
            </div>
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
