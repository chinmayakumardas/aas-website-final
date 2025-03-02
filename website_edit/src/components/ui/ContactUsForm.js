'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import sanitizeHtml from "sanitize-html";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createContact } from '@/redux/slices/contactSlice';
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { toast } from 'react-toastify';   
 
export function ContactUsForm({ className, ...props }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactType: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const validateInput = (name, value) => {
    let error = "";
    const forbiddenPattern = /(<([^>]+)>|javascript:|script|http|www)/gi;
    const namePattern = /^[A-Za-z\s'-]{2,50}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!value.trim()) {
      error = "This field is required.";
    } else if (forbiddenPattern.test(value)) {
      error = "Invalid characters detected.";
    } else if ((name === "firstName" || name === "lastName") && !namePattern.test(value)) {
      error = "Invalid name format.";
    } else if (name === "email" && !emailPattern.test(value)) {
      error = "Invalid email format.";
    }
    return error;
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} });
    setFormData((prev) => ({
      ...prev,
      [name] : sanitizedValue,
    }));
    setErrors((prev) => ({ ...prev, [name]: validateInput(name, sanitizedValue) }));
  };
 
  // Commenting out handleSubmit temporarily
  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = {};
    
    // Validate all required fields
    Object.keys(formData).forEach((key) => {
      const error = validateInput(key, formData[key] || "");
      if (error) {
        valid = false;
        newErrors[key] = error;
      }
    });

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      toast.success("Form Submitted!");
      // Reset form after submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        contactType: '',
        message: '',
      });
      // setStatus('Sending...');
      
      // const response = await fetch('/api/sendMail', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to send message');
      // }

      // const data = await response.json();
      
      // // Clear form after successful submission
      // setFormData({
      //   firstName: '',
      //   lastName: '',
      //   email: '',
      //   contactType: '',
      //   message: '',
      // });
      
      // setStatus('Message sent successfully!');
      // setTimeout(() => setStatus(''), 3000);

    } catch (error) {
      toast.error("Form submit failed!");
      // console.error('Error sending message:', error);
      // setStatus('Error sending message. Please try again.');
    }
  };
 
  const { loading, error } = useSelector((state) => state.contact);
 
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid lg:grid-cols-2 gap-8">
        
//         {/* Left Side - Contact Form */}
//         <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg order-2 lg:order-1">
//           <CardHeader className="px-0">
//             <CardTitle className="text-2xl sm:text-3xl md:text-4xl">
//               Connect with us
//             </CardTitle>
//             <CardDescription className="text-lg">
//               We're so glad you reached out! Connecting you to our experts on the ground is a priority for us.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="px-0">
            
//             {/* Display status message */}
//             {status && <p style={{ color: 'green' }}>{status}</p>}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid gap-4">
//                 {/* First Name Field */}
//                 <Input
//                   id="first-name"
//                   name="firstName"
//                   type="text"
//                   placeholder="First Name"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   required
//                 />
//                 {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
//                 {/* Last Name Field */}
//                 <Input
//                   id="last-name"
//                   name="lastName"
//                   type="text"
//                   placeholder="Last Name"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   required
//                 />
//                 {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
//                 {/* Email Field */}
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="contact@aasint.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//                 {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//                 {/* Reason Dropdown */}
//                 <Select
//                   name="contactType"
//                   value={formData.contactType}
//                   onValueChange={(value) => handleChange({ target: { name: 'contactType', value } })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="What can we help you with?" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       <SelectLabel>What can we help you with?</SelectLabel>
//                       <SelectItem value="collaboration">Collaboration</SelectItem>
//                       <SelectItem value="career">Career</SelectItem>
//                       <SelectItem value="data & privacy">Data and Privacy Request</SelectItem>
//                       <SelectItem value="services">Services</SelectItem>
//                       <SelectItem value="media inquiries">Media Inquiries</SelectItem>
//                       <SelectItem value="sponsorship">Sponsorship</SelectItem>
//                       <SelectItem value="feedback">Website Feedback</SelectItem>
//                       <SelectItem value="partners">Alliance & Partners</SelectItem>
//                       <SelectItem value="none">None of the Above</SelectItem>
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//                 {errors.contactType && <p className="text-red-500 text-sm">{errors.contactType}</p>}
//                 {/* Message Field */}
//                 <div>
//                   <Label htmlFor="message">Message</Label>
//                   <Textarea
//                     id="message"
//                     name="message"
//                     placeholder="Write your message here"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     rows={4}
//                   />
//                 </div>
//                 {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
 
//                 {/* Submit Button */}
//                 <Button type="submit" className="w-full" disabled={loading}>
//                   {loading ? "Sending..." : "Send Message"}
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </div>
//   {/* Right Side - Contact Information */}
//   <div className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-lg order-1 lg:order-2">
//           <div className="space-y-6 md:space-y-8">
//             {/* Company Name */}
//             <div>
//               <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">AAS Information Technology</h2>
//             </div>
 
//             {/* Addresses */}
//             <div className="space-y-4 md:space-y-6">
//               {/* Corporate Office */}
//               <div className="flex gap-3">
//                 <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
//                 <div>
//                   <strong className="block mb-1 text-sm md:text-base">BHUBANESWAR OFFICE</strong>
//                   <p className="text-gray-600 text-sm md:text-base">
//                     Plot No. 52, Bapuji Nagar, Unit-1 Main Street,
//                     Forest Park, Bhubaneswar, Khordha, Odisha, India 751009
//                   </p>
//                 </div>
//               </div>

//               {/* Branch Office */}
//               <div className="flex gap-3">
//                 <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
//                 <div>
//                   <strong className="block mb-1 text-sm md:text-base">DUBAI OFFICE</strong>
//                   <p className="text-gray-600 text-sm md:text-base">
//                     5678 Trade St,
//                     Dubai, United Arab Emirates
//                   </p>
//                 </div>
//               </div>
 
//               {/* Registered Office */}
//               <div className="flex gap-3">
//                 <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
//                 <div>
//                   <strong className="block mb-1 text-sm md:text-base">REGISTERED OFFICE</strong>
//                   <p className="text-gray-600 text-sm md:text-base">
//                     Sanara Chhaka, Jagatsinghpur,
//                     Odisha, India, 754104
//                   </p>
//                 </div>
//               </div>
//             </div>
 
//             {/* Contact Details */}
//             <div className="space-y-3 md:space-y-4">
//               <h3 className="text-lg md:text-xl font-semibold">Connect with us</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-3 cursor-pointer hover:text-blue-500 transition-colors"
//                      onClick={() => window.location.href = 'tel:+916742571111'}>
//                   <Phone className="w-5 h-5 text-blue-500" />
//                   <span className="text-md md:text-base">+91 6742571111</span>
//                 </div>
//                 <div className="flex items-center justify-center md:justify-start cursor-pointer hover:text-green-500 transition-colors"
//                      onClick={() => window.location.href = 'mailto:contact@aas.technology'}>
//                   <Mail className="w-4 h-4 mr-2 text-green-500" />
//                   <span className="text-md">contact@aas.technology</span>
//                 </div>
//                 <div className="flex items-center justify-center md:justify-start cursor-pointer hover:text-green-500 transition-colors"
//                      onClick={() => window.location.href = 'mailto:sales@aas.technology'}>
//                   <Mail className="w-4 h-4 mr-2 text-green-500" />
//                   <span className="text-md">sales@aas.technology</span>
//                 </div>
//               </div>
//             </div>
 
//             {/* Social Media */}
//             <div className="space-y-3 md:space-y-4">
//               <h3 className="text-lg md:text-xl font-semibold">Follow Us</h3>
//               <div className="flex gap-4">
//                 <Link href="https://facebook.com" target="_blank" className="hover:scale-110 transition-transform">
//                   <Facebook className="w-6 h-6 text-blue-600" />
//                 </Link>
//                 <Link href="https://twitter.com" target="_blank" className="hover:scale-110 transition-transform">
//                   <Twitter className="w-6 h-6 text-blue-400" />
//                 </Link>
//                 <Link href="https://instagram.com" target="_blank" className="hover:scale-110 transition-transform">
//                   <Instagram className="w-6 h-6 text-pink-500" />
//                 </Link>
//                 <Link href="https://linkedin.com" target="_blank" className="hover:scale-110 transition-transform">
//                   <Linkedin className="w-6 h-6 text-blue-700" />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
       
//       </div>
//     </div>
//   );
// }



return (
  <div className="container mx-auto px-4 py-8">
    <div className="flex flex-col-reverse lg:flex-row gap-8">
      
      {/* Contact Information - Appears Below on Small Screens */}
      <div className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-lg w-full lg:w-1/2">
        <div className="space-y-6 md:space-y-8">
          <h2 className="text-xl md:text-2xl font-bold">AAS Information Technology</h2>

          {/* Address Section */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <strong className="block mb-1">BHUBANESWAR OFFICE</strong>
                <p className="text-gray-600 text-sm">
                  Plot No. 52, Bapuji Nagar, Unit-1 Main Street, Forest Park, Bhubaneswar, Odisha, India 751009
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <strong className="block mb-1">DUBAI OFFICE</strong>
                <p className="text-gray-600 text-sm">
                  5678 Trade St, Dubai, United Arab Emirates
                </p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Connect with us</h3>
            <div className="flex items-center gap-3 cursor-pointer hover:text-blue-500 transition-colors"
              onClick={() => window.location.href = 'tel:+916742571111'}>
              <Phone className="w-5 h-5 text-blue-500" />
              <span>+91 6742571111</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer hover:text-green-500 transition-colors"
              onClick={() => window.location.href = 'mailto:contact@aas.technology'}>
              <Mail className="w-5 h-5 text-green-500" />
              <span>contact@aas.technology</span>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex gap-4">
              <Link href="https://facebook.com" target="_blank">
                <Facebook className="w-6 h-6 text-blue-600 hover:scale-110 transition-transform" />
              </Link>
              <Link href="https://twitter.com" target="_blank">
                <Twitter className="w-6 h-6 text-blue-400 hover:scale-110 transition-transform" />
              </Link>
              <Link href="https://instagram.com" target="_blank">
                <Instagram className="w-6 h-6 text-pink-500 hover:scale-110 transition-transform" />
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                <Linkedin className="w-6 h-6 text-blue-700 hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form - Always on Top on Small Screens */}
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg w-full lg:w-1/2">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl">Connect with us</CardTitle>
          <CardDescription className="text-lg">We're so glad you reached out!</CardDescription>
        </CardHeader>
        <CardContent>
          {status && <p className="text-green-600">{status}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input id="first-name" name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <Input id="last-name" name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
            <Input id="email" name="email" type="email" placeholder="contact@aasint.com" value={formData.email} onChange={handleChange} required />
            <Select name="contactType" value={formData.contactType} onValueChange={(value) => handleChange({ target: { name: 'contactType', value } })}>
              <SelectTrigger><SelectValue placeholder="Select Reason" /></SelectTrigger>
              <SelectContent>
              <SelectGroup>
                       <SelectLabel>What can we help you with?</SelectLabel>
                      <SelectItem value="collaboration">Collaboration</SelectItem>
                      <SelectItem value="career">Career</SelectItem>
                       <SelectItem value="data & privacy">Data and Privacy Request</SelectItem>
                       <SelectItem value="services">Services</SelectItem>
                       <SelectItem value="media inquiries">Media Inquiries</SelectItem>
                       <SelectItem value="sponsorship">Sponsorship</SelectItem>
                      <SelectItem value="feedback">Website Feedback</SelectItem>
                     <SelectItem value="partners">Alliance & Partners</SelectItem>
                      <SelectItem value="none">None of the Above</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Textarea id="message" name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
            <Button type="submit" className="w-full">{loading ? "Sending..." : "Send Message"}</Button>
          </form>
        </CardContent>
      </div>

    </div>
  </div>
);
}
 
//  "use client";
 
// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { faFacebook, faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
// import Link from 'next/link';
 
// export default function ContactUsForm() {
//     const [formData, setFormData] = useState({
//         firstn: '',
//         email: '',
//         subject: '',
//         phone: '',
//         message: '',
//     });
 
//     const [status, setStatus] = useState('');
//     const [error, setError] = useState(''); // State for error message
 
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };
 
//     const handleSubmit = async (e) => {
//     e.preventDefault();
 
//     // Form validation: check if all fields are filled
//     if (!formData.firstn || !formData.email || !formData.subject || !formData.phone || !formData.message) {
//         setError('All fields are required.');
//         return; // Prevent form submission
//     }
 
//     // Clear error message when all fields are valid
//     setError('');
   
//     // Set status to "loading" before sending the form
//     setStatus('Sending...');
 
//     try {
//         const response = await fetch('/api/sendMail', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//         });
 
//         const data = await response.json();
 
//         if (response.status === 200) {
//         setStatus('Message sent successfully!');
//         } else {
//         setStatus('Error sending message.');
//         }
//     } catch (error) {
//         setStatus('Error sending message.');
//     }
//     };
 
 
//     return (
//         <>
//             <section className="about-sec contact-page-sec sec-ptb">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-6">
//                             <div className="sec-content">
//                                 <h2 className="sec-title">Get A Quote</h2>
                               
//                                 {/* Display error message if any */}
//                                 {error && <p style={{ color: 'red' }}>{error}</p>}
 
//                                 {/* Display status message */}
//                                 {status && <p style={{ color: 'green' }}>{status}</p>}
 
//                                 <form className="itco-cform" onSubmit={handleSubmit}>
//                                     <div className="row">
//                                         <div className="col-sm-6">
//                                             <div className="contact-field">
//                                                 <input
//                                                     type="text"
//                                                     id="firstn"
//                                                     name="firstn"
//                                                     placeholder="Enter Name"
//                                                     value={formData.firstn}
//                                                     onChange={handleChange}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-sm-6">
//                                             <div className="contact-field">
//                                                 <input
//                                                     type="email"
//                                                     id="email"
//                                                     name="email"
//                                                     placeholder="Enter Email"
//                                                     value={formData.email}
//                                                     onChange={handleChange}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-sm-6">
//                                             <div className="contact-field">
//                                                 <input
//                                                     type="text"
//                                                     id="subject"
//                                                     name="subject"
//                                                     placeholder="Enter Subject"
//                                                     value={formData.subject}
//                                                     onChange={handleChange}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-sm-6">
//                                             <div className="contact-field">
//                                                 <input
//                                                     type="number"
//                                                     id="phone"
//                                                     name="phone"
//                                                     placeholder="Enter Phone"
//                                                     value={formData.phone}
//                                                     onChange={handleChange}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-sm-12">
//                                             <div className="contact-field">
//                                                 <textarea
//                                                     name="message"
//                                                     id="message"
//                                                     cols="40"
//                                                     rows="4"
//                                                     placeholder="Enter Message..."
//                                                     value={formData.message}
//                                                     onChange={handleChange}
//                                                 ></textarea>
//                                             </div>
//                                             <div className="itco-form-btn">
//                                                 <button className="thm-btn mt-3" type="submit">
//                                                     <span className="txt">Send Message</span>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                         <div className="col-lg-6 tab-col-gap">
//                             <div className="sec-content">
//                                 <h2 className="sec-title">Get In Touch</h2>
//                                 <p>These are the phrases we stay by in everything we do. Each brand we build, and we create.</p>
//                                 <div className="get-in-touch">
//                                     <div className="qinfo-item">
//                                         <div className="qinfo-icon"><i className="fa-sharp fa-solid fa-location-dot"><FontAwesomeIcon icon={faMapMarkerAlt} /></i></div>
//                                         <div className="qinfo-box">
//                                             <h5>REGISTERED OFFICE</h5>
//                                             <Link href="#">Sanara Chhaka, Jagatsinghpur, Odisha, India, 754104</Link>
//                                         </div>
//                                     </div>
//                                     <div className="qinfo-item">
//                                         <div className="qinfo-icon"><i className="fa-sharp fa-solid fa-location-dot"><FontAwesomeIcon icon={faMapMarkerAlt} /></i></div>
//                                         <div className="qinfo-box">
//                                             <h5>CORPORATE OFFICE</h5>
//                                             <Link href="#">Plot No. 52, Bapuji Nagar, Unit-1 Main Street, Forest Park, Bhubaneswar, Khordha, Odisha, India 751009</Link>
//                                         </div>
//                                     </div>
//                                     <div className="qinfo-item">
//                                         <div className="qinfo-icon"><i className="flaticon-call"><FontAwesomeIcon icon={faPhoneAlt} /></i></div>
//                                         <div className="qinfo-box">
//                                             <h5>Call Now</h5>
//                                             <Link href="tel:+(91)6742571111">+(91)6742571111</Link>
//                                         </div>
//                                     </div>
//                                     <div className="qinfo-item mb-0">
//                                         <div className="qinfo-icon"><i className="flaticon-gmail-logo"><FontAwesomeIcon icon={faEnvelope} /></i></div>
//                                         <div className="qinfo-box">
//                                             <h5>Email Us</h5>
//                                             <Link href="mailto:contact@aas.technology">contact@aas.technology</Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="company-social d-flex">
//                                     <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"> <FontAwesomeIcon icon={faFacebook} /></i></Link>
//                                     <Link href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin-in"><FontAwesomeIcon icon={faLinkedin} /></i></Link>
//                                     <Link href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"><FontAwesomeIcon icon={faTwitter} /> </i></Link>
//                                     <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"><FontAwesomeIcon icon={faInstagram} /></i></Link>
//                                 </div>
 
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
 
//             <section className="contact-map-sec">
//                 <div className="container-fluid px-0">
//                     <div className="row">
//                         <div className="col">
//                             <div className="contact-map-location">
//                                 <iframe
//                                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.586889802771!2d85.82501589463324!3d20.256621956207606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a70011040d15:0xe41a86c1b6d241fd!2sAAS+International+Private+Limited!5e0!3m2!1sen!2sin!4v1631426886429!5m2!1sen!2sin
// "
//                                     width="100%"
//                                     height="400"
//                                     style={{ border: 0 }}
//                                     allowFullScreen=""
//                                     loading="lazy"
//                                 ></iframe>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
 
//         </>
//     );
// }