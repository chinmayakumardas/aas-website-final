
'use client';
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, registerUser, editProfile } from '@/redux/slices/authSlice'; 
import { toast } from 'react-toastify'; // Importing toastify
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Importing eye icons for toggle

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
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

  const dispatch = useDispatch();
  
  // Fetching users from Redux store
  const { users,status, loading, error } = useSelector((state) => state.auth);

  // Fetch all users when the component mounts
  useEffect(() => {
    dispatch(getAllUsers());
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
        setFormData({ username: '', email: '', role: '', password: '', firstName: '', lastName: '', bio: '' }); // Clear form after registration
        setIsDialogOpen(false);
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
      })
      .catch((err) => {
        toast.error("Error updating user. Please try again.");
      });
  };
  
  const handleCreate = () => {
    setFormData({ username: '', email: '', role: '', password: '', firstName: '', lastName: '', bio: '' });
    setIsDialogOpen(true);
  };

  // Add a check for undefined or null `users`
  const filteredUsers = (Array.isArray(users) ? users : []).filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      {/* Search and Register Section */}
      <div className="flex items-center justify-between mb-6">
        <Input
          placeholder="Search by username or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2"
        />
        <Button variant="createBtn" onClick={handleCreate}>Register</Button>
      </div>

      {/* User List as Cards */}
      <div className="grid grid-cols-1  gap-6">
        {filteredUsers.length === 0 ? (
          <p>No users found</p>
        ) : (
          filteredUsers.map((user, index) => (
            <div key={index} className="relative border p-4 rounded-md shadow">
            {/* Edit Button Positioned at Top Right */}
            <div className="absolute top-2 right-4">
              <Button variant="createBtn" size="sm" onClick={() => handleEdit(index)}>
                Edit
              </Button>
            </div>
          
            {/* User Details */}
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Full Name:</strong> {user.firstName + " " + user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
          
          ))
        )}
      </div>

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

