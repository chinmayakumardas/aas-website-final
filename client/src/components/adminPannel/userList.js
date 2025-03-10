'use client';
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, registerUser, editProfile,deleteUser } from '@/redux/slices/authSlice'; 
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff, FiEdit, FiUserPlus, FiMail, FiUserCheck, FiFilter, FiSearch, FiTrash } from 'react-icons/fi';
import  Spinner  from "@/components/ui/spinner";

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('active');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    password: '',
    firstName: '',
    lastName: '',
    bio: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Register modal state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Edit modal state
  const [editIndex, setEditIndex] = useState(null); // Index to track which user is being edited
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
 const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  
  // Fetching users from Redux store
  const { users, status, loading, error } = useSelector((state) => state.auth);



  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllUsers())
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.role || !formData.password || !formData.firstName || !formData.lastName || !formData.bio) {
      toast.error("Please fill in all fields");
      return;
    }
    // Dispatch action to create a new user
    dispatch(registerUser(formData))
      .then(() => {
        toast.success("User registered successfully!");
        setFormData({ username: '', email: '', role: '', password: '', firstName: '', lastName: '', bio: '' }); 
        setIsDialogOpen(false);
        dispatch(getAllUsers()); 
      })
      .catch((err) => {
        toast.error("Error registering user!");
      });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    // Populate form data with existing user data except for fields like password or username
    setFormData({ 
      //username: users[index].username,
      email: users[index].email,
      firstName: users[index].firstName,
      lastName: users[index].lastName,
      bio: users[index].bio,
      role: users[index].role,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Dispatch action to update the user data (do not include password for editing)
    const updatedUser = {
      //username:formData.username,
      email:formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      bio: formData.bio,
      role: formData.role,
    };
  
    dispatch(editProfile(updatedUser))
      .then(() => {
        toast.success("User updated successfully!");
        setFormData({  role: '', firstName: '',email:'', lastName: '',username:'', bio: '' }); // Clear form after update
        setIsEditDialogOpen(false);
        setEditIndex(null);
        dispatch(getAllUsers()); 
      })
      .catch((err) => {
        toast.error("Error updating user. Please try again.");
      });
  };
  
  const handleCreate = () => {
    setFormData({ username: '', email: '', role: '', password: '', firstName: '', lastName: '', bio: '' });
    setIsDialogOpen(true);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (email) => {
    dispatch(deleteUser(email))
      .then(() => {
        toast.success('User Deleted!');
        dispatch(getAllUsers()); // Refresh list
      })
      .catch(() => {
        toast.error('Error deleting user.');
      });
  };
  

 

  // Filter users based on search term and status
  const filteredUsers = (Array.isArray(users) ? users : []).filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    const isActive = user.status === 'active' || !user.status;
    return matchesSearch && (
      (statusFilter === 'active' && isActive) ||
      (statusFilter === 'inactive' && !isActive)
    );
  });

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'text-purple-600 bg-purple-50';
      case 'author':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    return status === 'inactive' 
      ? 'text-red-600 bg-red-50' 
      : 'text-green-600 bg-green-50';
  };

  return (
    <div className=" p-6 ">
      {/* Search and Filter Section */}
      <div className="flex items-center gap-4 justify-between mb-6 bg-white p-4 rounded-lg shadow ">
  
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by username or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
         <div className='flex -mt-3 gap-4 '>
            <Select className="" value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <FiFilter className="mr-0" />
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            <Button 
              variant="createBtn" 
              onClick={handleCreate}
              className=" flex items-center  h-full gap-2 bg-blue-600 hover:bg-blue-700 text-white  md:w-auto"
            >
              <FiUserPlus /> Register
            </Button>
         </div>
       
      </div>

   

      {/* Desktop User List */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <div className="min-w-full">
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-5 gap-4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-2">User Info</div>
              <div>Role</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center h-[100vh]">
              <Spinner />
            </div>
          ) : (
            <div className="divide-y divide-gray-200 min-h-screen">
              {filteredUsers.length === 0 ? (
                <div className="px-6 py-4 text-center text-gray-500">No users found</div>
              ) : (
                filteredUsers.map((user, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4 px-6 py-4 items-center hover:bg-gray-50">
                    <div className="col-span-2 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        <FiUserPlus className="text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 flex items-center">
                          <FiUserCheck className="mr-1 text-gray-400" /> {user.username}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <FiMail className="mr-1 text-gray-400" /> {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        <FiUserCheck className="mr-1" />
                        {user.role}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status || 'active'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button onClick={() => handleViewDetails(user)} title="View">
                        <FiEye className="text-blue-500" />
                      </button>
                      <button onClick={() => handleEdit(index)} title="Edit">
                        <FiEdit className="text-green-500" />
                      </button>
                      <button onClick={() => handleDelete(user.email)} title="Delete">
                        <FiTrash className="text-red-500" />
                      </button>
                     
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile User List */}
      <div className="block md:hidden">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <Spinner />
          </div>
        ) : (
          filteredUsers.length === 0 ? (
            <div className="px-4 py-3 text-center text-gray-500">No users found</div>
          ) : (
            filteredUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full  flex items-center justify-center mr-2">
                    <FiUserPlus className="text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-500 flex items-center">
                      <FiUserCheck className="mr-1 text-gray-400" /> {user.username}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <FiMail className="mr-1 text-gray-400" /> {user.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={() => handleViewDetails(user)} title="View">
                    <FiEye className="text-blue-500" />
                  </button>
                  <button onClick={() => handleEdit(index)} title="Edit">
                    <FiEdit className="text-green-500" />
                  </button>
                  <button onClick={() => handleDelete(user.email)} title="Delete">
                    <FiTrash className="text-red-500" />
                  </button>
                  
                </div>
              </div>
            ))
          )
        )}
      </div>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4  overflow-y-auto">
              <div className="flex items-center space-x-4 p-4  rounded-lg">
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <FiUserPlus className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedUser.username}</h3>
                  <p className="text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">First Name</Label>
                  <p className="text-gray-900">{selectedUser.firstName}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Last Name</Label>
                  <p className="text-gray-900">{selectedUser.lastName}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Role</Label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(selectedUser.role)}`}>
                    <FiUserCheck className="mr-1" />
                    {selectedUser.role}
                  </span>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                    {selectedUser.status || 'active'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">Bio</Label>
                <div className=" p-4 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap  overflow-y-auto" >
                    {selectedUser.bio}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Register User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          {/* Button to open the Register modal */}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register New User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Email</Label>
                <Input name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div>
                <Label>Username</Label>
                <Input name="username" value={formData.username} onChange={handleChange} required />
              </div>

              <div>
                <Label>First Name</Label>
                <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>

              <div>
                <Label>Last Name</Label>
                <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>

              <div>
                <Label>Bio</Label>
                <Input name="bio" value={formData.bio} onChange={handleChange} required />
              </div>

              <div>
                <Label>Role</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <Label>Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <Button variant="createBtn" type="submit" className="mt-4 ">Register</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogTrigger asChild>
          {/* No need for a trigger here */}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              

              <div>
                <Label>First Name</Label>
                <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>

              <div>
                <Label>Last Name</Label>
                <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>

              <div>
                <Label>Bio</Label>
                <Input name="bio" value={formData.bio} onChange={handleChange} required />
              </div>

              <div>
                <Label>Role</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button variant="createBtn" type="submit" className="mt-4 ">Update</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersList;
