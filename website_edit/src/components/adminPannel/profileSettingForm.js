

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

  useEffect(() => {
    if (email) {
      dispatch(getUserDetails(email));
    }
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
    <div className="">
      <Card className="p-6 mx-auto rounded-none  w-full">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label>Username</Label>
            <Input type="text" value={userDetails.username ? `@${userDetails.username}` : ''} readOnly className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed" />
          </div>

          <div className="mb-4">
            <Label>Email</Label>
            <Input type="text" value={userDetails.email || ''} readOnly className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed" />
          </div>

          <div className="mb-4">
            <Label>First Name</Label>
            <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} disabled={!isEditing} className="w-full p-2 border rounded" />
          </div>

          <div className="mb-4">
            <Label>Last Name</Label>
            <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} disabled={!isEditing} className="w-full p-2 border rounded" />
          </div>

          <div className="mb-4">
            <Label>Role</Label>
            <Input type="text" value={formData.role} readOnly className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed" />
          </div>

          <div className="mb-4">
            <Label>Bio</Label>
            <Textarea name="bio" value={formData.bio} onChange={handleChange} disabled={!isEditing} className="w-full p-2 border rounded h-[30vh]" />
          </div>

          <Button type="button" onClick={() => setIsEditing(!isEditing)} variant="editBtn" className="mr-2">
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          {isEditing && <Button type="submit" variant="editBtn">Update</Button>}
        </form>
      </Card>
    </div>
  );
};

export default EditProfile;