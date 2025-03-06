'use client';
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, editProfile } from '@/redux/slices/authSlice';
import { Textarea } from '@/components/ui/textarea';  
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';
import Spinner from '@/components/ui/spinner';
import gsap from "gsap";
const EditProfile = () => {
  const dispatch = useDispatch();
  const { userDetails, error } = useSelector((state) => state.auth);
  const email =  Cookies.get('email');
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    role: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getUserDetails(email))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [dispatch, email]);
  useEffect(() => {
    if (userDetails) {
      setFormData({
        firstName: userDetails.firstName || '',
        lastName: userDetails.lastName || '',
        bio: userDetails.bio || '',
        role: userDetails.role || '',
      });
    }
  }, [userDetails]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editProfile({ ...formData, email }));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (e) {
      toast.error("Error while updating profile!");
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)]">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Spinner />
        </div>
      ) : (
        <Card className="h-full w-full bg-white/50 backdrop-blur-sm shadow-lg rounded-xl border border-gray-100">
          <div className="p-4 md:p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Profile Settings</h2>
              <div className="flex gap-3">
                <Button 
                  type="button" 
                  onClick={() => setIsEditing(!isEditing)} 
                  variant={isEditing ? "destructive" : "default"}
                  size="sm"
                  className="transition-all duration-300"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
                {isEditing && (
                  <Button 
                    type="submit"
                    form="profile-form" 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 transform hover:scale-[1.02]"
                    size="sm"
                  >
                    Save Changes
                  </Button>
                )}
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form id="profile-form" onSubmit={handleSubmit} className="h-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Profile Details */}
                <div className="space-y-4 h-full">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Username</Label>
                    <Input 
                      type="text" 
                      value={userDetails.username ? `@${userDetails.username}` : ''} 
                      readOnly 
                      className="bg-gray-50 border-gray-200" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Email</Label>
                    <Input 
                      type="text" 
                      value={userDetails.email || ''} 
                      readOnly 
                      className="bg-gray-50 border-gray-200" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">First Name</Label>
                    <Input 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleChange} 
                      disabled={!isEditing}
                      className={`transition-all duration-300 ${!isEditing ? 'bg-gray-50' : 'bg-white hover:border-blue-400 focus:border-blue-500'}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Last Name</Label>
                    <Input 
                      type="text" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleChange} 
                      disabled={!isEditing}
                      className={`transition-all duration-300 ${!isEditing ? 'bg-gray-50' : 'bg-white hover:border-blue-400 focus:border-blue-500'}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Role</Label>
                    <Input 
                      type="text" 
                      value={formData.role} 
                      readOnly 
                      className="bg-gray-50 border-gray-200" 
                    />
                  </div>
                </div>

                {/* Right Column - Bio */}
                <div className="flex flex-col h-full">
                  <Label className="text-sm font-medium text-gray-700 mb-2">Bio</Label>
                  <Textarea 
                    name="bio" 
                    value={formData.bio} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                    className={`h-full min-h-[300px] transition-all duration-300 ${!isEditing ? 'bg-gray-50' : 'bg-white hover:border-blue-400 focus:border-blue-500'}`}
                    placeholder={isEditing ? "Tell us about yourself..." : ""}
                  />
                </div>
              </div>
            </form>
          </div>
        </Card>
      )}
    </div>
  );
};

export default EditProfile;