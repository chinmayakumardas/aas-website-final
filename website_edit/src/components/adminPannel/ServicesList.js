// "use client";
// import { toast } from 'react-toastify';
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchServices, updateService, deleteService, createService } from "@/redux/slices/serviceSlice";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const ServicesList = () => {
//   const dispatch = useDispatch();
//   const { services, status, error } = useSelector((state) => state.service);

//   const [isModalOpen, setModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     serviceId: null,
//     name: "",
//     title: "",
//     category: "",
//     description: "",
//     images: null,
//   });
// console.log(services)
//   useEffect(() => {
//     dispatch(fetchServices());
//   }, [dispatch]);

//   const openModal = (service = null) => {
//     if (service) {
//       setFormData({ ...service, images: null });
//     } else {
//       setFormData({ serviceId: null, name: "", title: "", category: "", description: "", images: null });
//     }
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setFormData({ serviceId: null, name: "", title: "", category: "", description: "", images: null });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
//       setFormData({ ...formData, images: file });
//     } else {
//       alert("Only image files (JPG, JPEG, PNG) are allowed.");
//       e.target.value = "";
//     }
//   };

//   const handleSubmit = () => {
//     if (formData.name && formData.title && formData.category && formData.description) {
//       const serviceData = { ...formData };
//       if (formData.serviceId) {
//         dispatch(updateService({ serviceId: formData.serviceId, updatedData: serviceData }));
//         toast.success("Updated Sucessfully!.");
//       } else {
//         dispatch(createService(serviceData));
//         toast.success("Service Added Sucessfully!.");
//       }
//       closeModal();
//     } else {
//       toast.error("All fields are required.");
//     }
//   };

//   const handleDelete = (serviceId) => {
//     dispatch(deleteService(serviceId));
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Manage Services</h1>
//         <Button variant="createBtn" onClick={() => openModal()}>+ New Service</Button>
//       </div>

//       {status === 'loading' && <p>Loading services...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {services.map((service) => (
//           <Card key={service.serviceId}>
//             <CardHeader>
//               <CardTitle>{service.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p><strong>Title:</strong> {service.title}</p>
//               <p><strong>Category:</strong> {service.category}</p>
//               <p><strong>Description:</strong> {service.description}</p>
              
//               <img 
//                 src={ service.images[0]} 
//                 alt="Service" 
//                 className="mt-2 w-full h-32 object-cover rounded" 
//               />

//               <div className="flex mt-4 space-x-2">
//                 <Button variant="createBtn" size="sm" onClick={() => openModal(service)}>Edit</Button>
//                 <Button variant="deleteBtn" size="sm" onClick={() => handleDelete(service.serviceId)}>Delete</Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{formData.serviceId ? "Edit Service" : "Add New Service"}</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div>
//               <Label>Service Name</Label>
//               <Input
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 placeholder="Service Name"
//               />
//             </div>

//             <div>
//               <Label>Title</Label>
//               <Input
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 placeholder="Service Title"
//               />
//             </div>

//             <div>
//               <Label>Category</Label>
//               <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select Category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Development">Development</SelectItem>
//                   <SelectItem value="Marketing">Marketing</SelectItem>
//                   <SelectItem value="Design">Design</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label>Description</Label>
//               <Textarea
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 placeholder="Service Description"
//               />
//             </div>

//             <div>
//               <Label>Upload Image</Label>
//               <Input type="file" accept="image/*" onChange={handleFileChange} />
//               {formData.images && (
//                 <img
//                   src={URL.createObjectURL(formData.images)}
//                   alt="Preview"
//                   className="mt-2 w-full h-32 object-cover rounded"
//                 />
//               )}
//             </div>

//             <div className="flex justify-end space-x-2">
//               <Button variant="outline" onClick={closeModal}>Cancel</Button>
//               <Button variant="createBtn" onClick={handleSubmit}>{formData.serviceId ? "Update" : "Create"}</Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ServicesList;























"use client";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  updateService,
  deleteService,
  createService,
  downloadServiceImage,
  fetchCategories,
} from "@/redux/slices/serviceSlice";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BASE_URL = "http://localhost:8003";

const ServicesList = () => {
  const dispatch = useDispatch();
  const { services, status, error, imageUrls, categories, categoriesStatus, categoriesError } = useSelector((state) => state.service);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [formData, setFormData] = useState({
    serviceId: null,
    name: "",
    title: "",
    category: "",
    description: "",
    images: null,
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchServices())
          .then(() => {
              dispatch(fetchServices()); // Dispatch it again, if intentional
          });
   }
    if (categoriesStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status, categoriesStatus]);

  useEffect(() => {
    if (status === "succeeded" && services.length > 0) {
      // console.log("Services:", services);
      services.forEach((service) => {
        const imageKey = `${service.serviceId}-0`;
        if (service.images && service.images.length > 0 && !imageUrls[imageKey]) {
          dispatch(downloadServiceImage({ serviceId: service.serviceId, imageIndex: 0 }));
        }
      });
    }
  }, [dispatch, services, status, imageUrls]);

  useEffect(() => {
    if (status === "succeeded" && services.length > 0) {
      const serviceIds = services.map((s) => s.serviceId);
      const uniqueIds = new Set(serviceIds);
      if (serviceIds.length !== uniqueIds.size) {
        //console.error("Duplicate serviceIds detected:", serviceIds);
      } else {
        //console.log("All serviceIds are unique:", serviceIds);
      }
    }
    if (categoriesStatus === "succeeded") {
     // console.log("Categories loaded:", categories);
    }
  }, [services, status, categories, categoriesStatus]);

  const openModal = (service = null) => {
    if (service) {
      setFormData({ ...service, images: null });
    } else {
      setFormData({ serviceId: null, name: "", title: "", category: "", description: "", images: null });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ serviceId: null, name: "", title: "", category: "", description: "", images: null });
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
    if (formData.name && formData.title && formData.category && formData.description) {
      const serviceData = { ...formData };
      try {
        let newServiceId;
        if (formData.serviceId) {
          const action = await dispatch(updateService({ serviceId: formData.serviceId, updatedData: serviceData })).unwrap();
          //console.log("Update action payload:", action);
          newServiceId = formData.serviceId;
          dispatch(fetchServices());
          toast.success('Service updated!'); // Success message on update
        } else {
          const action = await dispatch(createService(serviceData)).unwrap();
        
          //console.log("Create action payload:", action);
          newServiceId = action.serviceId; // Ensure your API returns this
          dispatch(fetchServices());
          toast.success('New service Added!'); // Success message on create
        }

        // Attempt to fetch the image, but don't fail the submission if it errors
        if (serviceData.images && newServiceId) {
          try {
            await dispatch(downloadServiceImage({ serviceId: newServiceId, imageIndex: 0 })).unwrap();
            //console.log("Image fetch successful for serviceId:", newServiceId);
          } catch (imageError) {
            //console.warn("Failed to fetch image after submission, it may not be ready yet:", imageError);
       
          }
        }
        closeModal();
      } catch (err) {
        //console.error("Error submitting service:", err);
        toast.error(`Failed`); // Error message on failure
      }
    } else {
      toast.error("All fields are required!");
    }
  };

  const handleDeleteClick = (serviceId) => {
    setServiceToDelete(serviceId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (serviceToDelete) {
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
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <Button variant="createBtn" onClick={() => openModal()}>+ New Service</Button>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
        {services.map((service, index) => {
          const imageKey = `${service.serviceId}-0`;
          const imageUrl = imageUrls[imageKey];
          const uniqueKey = service.serviceId !== undefined && service.serviceId !== null
            ? `${typeof service.serviceId === 'string' ? service.serviceId : String(service.serviceId)}`
            : `service-${index}`;

          return (
            <Card key={uniqueKey}>
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
              <p><strong>Title:</strong> {service.title}</p>
                <p><strong>Category:</strong> {service.category}</p>
                <p><strong>Description:</strong> {service.description}</p>
                {/* <p><strong>Description:</strong> {service.description.length > 100 ? service.description.substring(0, 100) + "..." : service.description}</p> */}


                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={service.name}
                    className="mt-2 w-full h-32 object-cover rounded"
                    onError={(e) => {
                      e.target.src = "/fallback-image.jpg";
                      console.error(`Failed to load image for service ${service.serviceId}: ${imageUrl}`, e);
                    }}
                  />
                ) : (
                  <p className="mt-2 text-gray-500">Loading image...</p>
                )}

                <div className="flex mt-4 space-x-2">
                  <Button variant="createBtn" size="sm" onClick={() => openModal(service)}>
                    Edit
                  </Button>
                  <Button variant="deleteBtn" size="sm" onClick={() => handleDeleteClick(service.serviceId)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formData.serviceId ? "Edit Service" : "Add New Service"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Service Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Service Name"
              />
            </div>

            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Service Title"
              />
            </div>

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
                  {categoriesStatus === "succeeded" && categories.length > 0 ? (
                    categories.map((category) => (
                      <SelectItem key={category.categoryId} value={category.category}>
                        {category.category}
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

            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Service Description"
              />
            </div>

            <div>
              <Label>Upload Image</Label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {formData.images && (
                <img
                  src={URL.createObjectURL(formData.images)}
                  alt="Preview"
                  className="mt-2 w-full h-32 object-cover rounded"
                />
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
              <Button variant="createBtn" onClick={handleSubmit}>
                {formData.serviceId ? "Update" : "Create"}
              </Button>
            </div>
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














