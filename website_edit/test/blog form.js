// "use client";

// import { useState, useRef, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ChevronDown, ChevronUp, Mic } from "lucide-react";
// import { motion } from "framer-motion";
// import dynamic from "next/dynamic";
// import debounce from "lodash/debounce";

// const RichTextEditor = dynamic(() => import("../../components/adminPannel/BlogDesc"), {
//   ssr: false,
// });

// const BASE_URL = "http://192.168.0.117:8003";

// const BlogCreateForm = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     authorname: "",
//     tittle: "",
//     description: "",
//     categories: [],
//     tags: [],
//     images: null,
//     optionalImages: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isTagsOpen, setIsTagsOpen] = useState(false);
//   const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [categoryOptions, setCategoryOptions] = useState([]);
//   const [tagOptions, setTagOptions] = useState([]);
//   const recognitionRef = useRef(null);
//   const [interimTranscript, setInterimTranscript] = useState("");

//   useEffect(() => {
//     const fetchCategoriesAndTags = async () => {
//       try {
//         const [categoryResponse, tagResponse] = await Promise.all([
//           axios.get(`${BASE_URL}/api/getcategory`),
//           axios.get(`${BASE_URL}/api/gettags`),
//         ]);
//         setCategoryOptions(categoryResponse.data);
//         setTagOptions(tagResponse.data);
//       } catch (err) {
//         setError("Failed to load categories or tags: " + err.message);
//       }
//     };
//     fetchCategoriesAndTags();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "images") {
//       setFormData((prev) => ({ ...prev, images: files[0] }));
//     } else if (name === "optionalImages") {
//       setFormData((prev) => ({ ...prev, optionalImages: files }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const debouncedHandleDescriptionChange = useCallback(
//     debounce((newDescription) => {
//       setFormData((prev) => ({ ...prev, description: newDescription }));
//     }, 500),
//     []
//   );

//   const handleDescriptionChange = (newDescription) => {
//     debouncedHandleDescriptionChange(newDescription);
//   };

//   const handleCategoryChange = (categoryName) => {
//     setFormData((prev) => {
//       const newCategories = prev.categories.includes(categoryName)
//         ? prev.categories.filter((c) => c !== categoryName)
//         : [...prev.categories, categoryName];
//       return { ...prev, categories: newCategories };
//     });
//   };

//   const handleTagChange = (tagName) => {
//     setFormData((prev) => {
//       const newTags = prev.tags.includes(tagName)
//         ? prev.tags.filter((t) => t !== tagName)
//         : [...prev.tags, tagName];
//       return { ...prev, tags: newTags };
//     });
//   };

//   const startRecording = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       setError("Speech recognition is not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     recognition.onstart = () => {
//       setIsRecording(true);
//       setError(null);
//       console.log("Recording started");
//     };

//     recognition.onresult = (event) => {
//       let finalTranscript = "";
//       let interim = "";
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcript = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           finalTranscript += transcript + " ";
//         } else {
//           interim += transcript;
//         }
//       }
//       setInterimTranscript(interim);
//       if (finalTranscript) {
//         setFormData((prev) => ({
//           ...prev,
//           description: prev.description + finalTranscript,
//         }));
//         setInterimTranscript("");
//       }
//     };

//     recognition.onerror = (event) => {
//       setError(`Speech recognition error: ${event.error}`);
//       setIsRecording(false);
//       recognition.stop();
//     };

//     recognition.onend = () => {
//       if (isRecording) {
//         recognition.start();
//       } else {
//         setIsRecording(false);
//         setInterimTranscript("");
//       }
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//   };

//   const stopRecording = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsRecording(false);
//       setInterimTranscript("");
//     }
//   };

//   const handleCreateBlog = async (e) => {
//     e.preventDefault();
//     console.log("handleCreateBlog triggered");
//     try {
//       setLoading(true);
//       debouncedHandleDescriptionChange.flush();
//       const formDataToSend = new FormData();
//       formDataToSend.append("authorname", formData.authorname);
//       formDataToSend.append("tittle", formData.tittle);
//       formDataToSend.append("description", formData.description);
//       formDataToSend.append("category", JSON.stringify(formData.categories));
//       formDataToSend.append("tags", JSON.stringify(formData.tags));

//       if (formData.images) {
//         formDataToSend.append("images", formData.images);
//       }
//       if (formData.optionalImages) {
//         Array.from(formData.optionalImages).forEach((file) =>
//           formDataToSend.append("optionalImages", file)
//         );
//       }

//       const response = await axios.post(`${BASE_URL}/api/create`, formDataToSend, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("Create Blog Response:", response.data);
//       router.push("/blogs");
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full from-teal-50 via-cyan-50 to-blue-50  p-6">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="w-full  bg-white rounded-xl shadow-lg p-6 pl-6 border border-gray-100"
//       >
//         <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//           Create Your Blog
//         </h1>
//         {error && (
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-red-600 mb-4 text-center font-medium bg-red-50 p-2 rounded-md"
//           >
//             {error}
//           </motion.p>
//         )}
//         <div className="space-y-6">
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-center">
//             <Label htmlFor="authorname" className="text-right font-medium text-gray-700">
//               Author
//             </Label>
//             <div className="sm:col-span-3">
//               <Input
//                 id="authorname"
//                 name="authorname"
//                 value={formData.authorname}
//                 onChange={handleInputChange}
//                 placeholder="Your name"
//                 className="w-full"
//               />
//             </div>
//           </div>
  
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-center">
//             <Label htmlFor="tittle" className="text-right font-medium text-gray-700">
//               Title
//             </Label>
//             <div className="sm:col-span-3">
//               <Input
//                 id="tittle"
//                 name="tittle"
//                 value={formData.tittle}
//                 onChange={handleInputChange}
//                 placeholder="A catchy title"
//                 required
//                 className="w-full"
//               />
//             </div>
//           </div>
  
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-start">
//             <Label htmlFor="description" className="text-right font-medium text-gray-700 pt-2">
//               Description
//             </Label>
//             <div className="sm:col-span-3 relative">
//               <RichTextEditor
//                 content={formData.description}
//                 interimTranscript={interimTranscript}
//                 onChange={handleDescriptionChange}
//               />
//               <motion.button
//                 type="button"
//                 onClick={isRecording ? stopRecording : startRecording}
//                 className={`absolute bottom-4 right-4 p-2 rounded-full ${
//                   isRecording ? "bg-red-500" : "bg-teal-500"
//                 } text-white`}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
//                 transition={isRecording ? { repeat: Infinity, duration: 0.8 } : {}}
//               >
//                 <Mic className="h-5 w-5" />
//               </motion.button>
//             </div>
//           </div>
  
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-start">
//             <Label className="text-right font-medium text-gray-700 pt-2">Categories</Label>
//             <div className="sm:col-span-3">
//               <DropdownMenu open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen}>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" className="w-full justify-between">
//                     {formData.categories.length > 0
//                       ? formData.categories.join(", ")
//                       : "Select categories"}
//                     {isCategoriesOpen ? (
//                       <ChevronUp className="ml-2 h-4 w-4" />
//                     ) : (
//                       <ChevronDown className="ml-2 h-4 w-4" />
//                     )}
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="w-full max-h-64 overflow-y-auto">
//                   {categoryOptions.map((category) => (
//                     <DropdownMenuItem
//                       key={category._id}
//                       onSelect={(e) => e.preventDefault()}
//                       className="flex items-center gap-2"
//                     >
//                       <Checkbox
//                         id={`category-${category._id}`}
//                         checked={formData.categories.includes(category.name)}
//                         onCheckedChange={() => handleCategoryChange(category.name)}
//                       />
//                       <Label htmlFor={`category-${category._id}`} className="cursor-pointer">
//                         {category.name}
//                       </Label>
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
  
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-start">
//             <Label className="text-right font-medium text-gray-700 pt-2">Tags</Label>
//             <div className="sm:col-span-3">
//               <DropdownMenu open={isTagsOpen} onOpenChange={setIsTagsOpen}>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" className="w-full justify-between">
//                     {formData.tags.length > 0 ? formData.tags.join(", ") : "Select tags"}
//                     {isTagsOpen ? (
//                       <ChevronUp className="ml-2 h-4 w-4" />
//                     ) : (
//                       <ChevronDown className="ml-2 h-4 w-4" />
//                     )}
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="w-full max-h-64 overflow-y-auto">
//                   {tagOptions.map((tag) => (
//                     <DropdownMenuItem
//                       key={tag._id}
//                       onSelect={(e) => e.preventDefault()}
//                       className="flex items-center gap-2"
//                     >
//                       <Checkbox
//                         id={`tag-${tag._id}`}
//                         checked={formData.tags.includes(tag.name)}
//                         onCheckedChange={() => handleTagChange(tag.name)}
//                       />
//                       <Label htmlFor={`tag-${tag._id}`} className="cursor-pointer">
//                         {tag.name}
//                       </Label>
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
  
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-center">
//             <Label htmlFor="images" className="text-right font-medium text-gray-700">
//               Main Image
//             </Label>
//             <div className="sm:col-span-3">
//               <Input
//                 id="images"
//                 name="images"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleInputChange}
//                 className="w-full"
//               />
//             </div>
//           </div>
  
//           <div className="flex justify-end gap-4">
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => router.push("/blogs")}
//                 disabled={loading}
//               >
//                 Cancel
//               </Button>
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button
//                 type="button" // No form, so this is just a regular button
//                 onClick={handleCreateBlog} // Call the function directly
//                 disabled={loading}
//               >
//                 {loading ? "Creating..." : "Create Blog"}
//               </Button>
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default BlogCreateForm;







"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, Mic } from "lucide-react";
import dynamic from "next/dynamic";
import debounce from "lodash/debounce";

const RichTextEditor = dynamic(() => import("../../components/adminPannel/BlogDesc"), {
  ssr: false,
});

const BASE_URL = "http://localhost:8003";

const BlogCreateForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    authorname: "",
    tittle: "",
    description: "",
    categories: [],
    tags: [],
    images: null,
    optionalImages: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const recognitionRef = useRef(null);
  const [interimTranscript, setInterimTranscript] = useState("");
  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const [categoryResponse, tagResponse] = await Promise.all([
          axios.get(`${BASE_URL}/api/getcategory`),
          axios.get(`${BASE_URL}/api/gettags`),
        ]);
        setCategoryOptions(categoryResponse.data);
        setTagOptions(tagResponse.data);
      
      } catch (err) {
        setError("Failed to load categories or tags: " + err.message);
      }
    };
    fetchCategoriesAndTags();
  }, []);
  console.log(categoryOptions,tagOptions)
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData((prev) => ({ ...prev, images: files[0] }));
    } else if (name === "optionalImages") {
      setFormData((prev) => ({ ...prev, optionalImages: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const debouncedHandleDescriptionChange = useCallback(
    debounce((newDescription) => {
      setFormData((prev) => ({ ...prev, description: newDescription }));
    }, 500),
    []
  );

  const handleDescriptionChange = (newDescription) => {
    debouncedHandleDescriptionChange(newDescription);
  };

  const handleCategoryChange = (categoryName) => {
    setFormData((prev) => {
      const newCategories = prev.categories.includes(categoryName)
        ? prev.categories.filter((c) => c !== categoryName)
        : [...prev.categories, categoryName];
      return { ...prev, categories: newCategories };
    });
  };

  const handleTagChange = (tagName) => {
    setFormData((prev) => {
      const newTags = prev.tags.includes(tagName)
        ? prev.tags.filter((t) => t !== tagName)
        : [...prev.tags, tagName];
      return { ...prev, tags: newTags };
    });
  };

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsRecording(true);
      setError(null);
      console.log("Recording started");
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interim += transcript;
        }
      }
      setInterimTranscript(interim);
      if (finalTranscript) {
        setFormData((prev) => ({
          ...prev,
          description: prev.description + finalTranscript,
        }));
        setInterimTranscript("");
      }
    };

    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsRecording(false);
      recognition.stop();
    };

    recognition.onend = () => {
      if (isRecording) {
        recognition.start();
      } else {
        setIsRecording(false);
        setInterimTranscript("");
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setInterimTranscript("");
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      debouncedHandleDescriptionChange.flush();
      const formDataToSend = new FormData();
      formDataToSend.append("authorname", formData.authorname);
      formDataToSend.append("tittle", formData.tittle);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", JSON.stringify(formData.categories));
      formDataToSend.append("tags", JSON.stringify(formData.tags));

      if (formData.images) {
        formDataToSend.append("images", formData.images);
      }
      if (formData.optionalImages) {
        Array.from(formData.optionalImages).forEach((file) =>
          formDataToSend.append("optionalImages", file)
        );
      }

      const response = await axios.post(`${BASE_URL}/api/create`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/blogs");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6 flex flex-col items-center w-full">
      <h1 className="text-2xl font-semibold text-center mb-6">Write a Blog!</h1>
      
      <form onSubmit={handleCreateBlog} className="space-y-6 w-full flex flex-col items-center">
        {/* Title */}
        <div className="w-full flex flex-col items-center sm:flex-row gap-4">
          <div className="w-full ">
            <Label htmlFor="tittle" className="font-medium text-gray-700">
              Title
            </Label>
            <Input
              id="tittle"
              name="tittle"
              value={formData.tittle}
              onChange={handleInputChange}
              placeholder="A catchy title"
              required
              className="w-full"
            />
          </div>
        </div>

        {/* category and tags */}
        <div className="w-full flex flex-col md:flex-row gap-4">
          {/* Categories */}
          <div className="w-full "> {/* Set fixed width to match dropdown */}
            <Label className="font-medium text-gray-700 pt-2">Categories *</Label>
            <DropdownMenu open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen} >
              <DropdownMenuTrigger asChild className="border-2 rounded-md">
                <Button variant="outline" className="w-full justify-between">
                  {formData.categories.length > 0
                    ? formData.categories.join(", ")
                    : "Select categories"}
                  {isCategoriesOpen ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full ">
                    {categoryOptions.map((category) => (
                        <DropdownMenuItem
                          key={category._id}
                          onSelect={(e) => e.preventDefault()}
                          className=" flex flex-start gap-2"
                        >
                          <Checkbox
                            id={`category-${category._id}`}
                            checked={formData.categories.includes(category.name)}
                            onCheckedChange={() => handleCategoryChange(category.name)}
                          />
                          <Label htmlFor={`category-${category._id}`} className="w-full cursor-pointer">
                            {category.name}
                          </Label>
                        </DropdownMenuItem>
                      ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Tags */}
          <div className="w-full">
            <Label className="font-medium text-gray-700 pt-2">Tags #</Label>
            <DropdownMenu open={isTagsOpen} onOpenChange={setIsTagsOpen}>
              <DropdownMenuTrigger asChild className="border-2 rounded-md">
                <Button variant="outline" className="w-full justify-between">
                  {formData.tags.length > 0 ? formData.tags.join(", ") : "Select tags"}
                  {isTagsOpen ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full  overflow-y-auto">
                {tagOptions.map((tag) => (
                  <DropdownMenuItem
                    key={tag._id}
                    onSelect={(e) => e.preventDefault()}
                    className="flex items-center gap-2"
                  >
                    <Checkbox
                      id={`tag-${tag._id}`}
                      checked={formData.tags.includes(tag.name)}
                      onCheckedChange={() => handleTagChange(tag.name)}
                    />
                    <Label htmlFor={`tag-${tag._id}`} className="cursor-pointer">
                      {tag.name}
                    </Label>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* auther and image */}
        <div className="w-full flex flex-col md:flex-row gap-4">
          {/* Author */}
          <div className="flex-1">
            <Label htmlFor="authorname" className="font-medium text-gray-700">
              Author
            </Label>
            <Input
              id="authorname"
              name="authorname"
              value={formData.authorname}
              onChange={handleInputChange}
              placeholder="Your name"
              className="w-full"
            />
          </div>

          {/* Featured Image */}
          <div className="flex-1">
            <Label htmlFor="images" className="font-medium text-gray-700">
              Select Featured Image
            </Label>
            <Input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
        </div>

        {/* Description */}
        <div className="w-full flex flex-col items-center sm:flex-row gap-4">
          <div className="w-full  relative">
            <Label htmlFor="description" className="font-medium text-gray-700 pt-2">
              Description
            </Label>
            <div className="max-h-96 overflow-y-auto">
              <RichTextEditor
                content={formData.description}
                interimTranscript={interimTranscript}
                onChange={handleDescriptionChange}
              />
            </div>
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`absolute bottom-4 right-4 p-2 rounded-full ${isRecording ? "bg-red-500" : "bg-teal-500"} text-white`}
            >
              <Mic className="h-5 w-5" />
            </button>
          </div>
        </div>

         {/* Submit Buttons */}
         <div className=" flex justify-end gap-4 mt-6">
                  <Button variant="outline" onClick={() => router.push("/blogs")} disabled={loading}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Blog"}
                  </Button>
        </div>

       

       
      </form>
    </div>
  );
};

export default BlogCreateForm;



"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import { Extension } from "@tiptap/core";
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl } from "react-icons/fa";
import { MdOutlineTitle, MdOutlineTextFields } from "react-icons/md";
import { useEffect } from "react";

// Custom Case Conversion Extension
const CaseConversion = Extension.create({
  name: "caseConversion",
  addCommands() {
    return {
      toUpperCase: () => ({ tr, state, dispatch }) => {
        const { from, to } = state.selection;
        const text = state.doc.textBetween(from, to);
        if (!text || !dispatch) return false;
        dispatch(tr.replaceWith(from, to, state.schema.text(text.toUpperCase())));
        return true;
      },
      toLowerCase: () => ({ tr, state, dispatch }) => {
        const { from, to } = state.selection;
        const text = state.doc.textBetween(from, to);
        if (!text || !dispatch) return false;
        dispatch(tr.replaceWith(from, to, state.schema.text(text.toLowerCase())));
        return true;
      },
    };
  },
});

// Custom Bullet List Extension
const CustomBulletList = BulletList.extend({
  addCommands() {
    return {
      toggleBulletList:
        () =>
        ({ commands, editor, state, dispatch }) => {
          const { from, to } = state.selection;
          const text = state.doc.textBetween(from, to) || editor.getText();

          // If no text is selected or available, toggle normally
          if (!text || !dispatch) {
            return commands.toggleBulletList();
          }

          // Split text by newlines and filter out empty lines
          const lines = text.split("\n").filter((line) => line.trim() !== "");
          if (lines.length === 0) {
            return commands.toggleBulletList();
          }

          // Create a bullet list with each line as a separate <li>
          const listItems = lines.map((line) => {
            // Create a paragraph node containing the text
            const paragraph = state.schema.nodes.paragraph.create(null, state.schema.text(line));
            // Create a list item containing the paragraph
            return state.schema.nodes.listItem.create(null, paragraph);
          });

          // Create the bullet list with the list items
          const bulletList = state.schema.nodes.bulletList.create(null, listItems);

          // Replace the selected range with the new bullet list
          dispatch(state.tr.replaceSelectionWith(bulletList));
          return true;
        },
    };
  },

  // Handle Enter key to create new list items
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { $from } = editor.state.selection;
        const parent = $from.parent;

        // If we're inside a list item, pressing Enter should create a new list item
        if (parent.type.name === "listItem") {
          return editor.commands.splitListItem("listItem");
        }
        return false;
      },
    };
  },
});

const editorStyles = `
  .editor-container {
    max-width: 100%;
    margin: 0 auto;
  }
  .toolbar {
    display: flex;
    gap: 8px;
    padding: 8px;
    
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;
    margin-bottom: 12px;
  }
  .toolbar button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    background: #ffffff;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .toolbar button:hover {
    background: #e5e7eb;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
  .toolbar button.active {
    background: #3b82f6;
    color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  .tiptap-editor {
    border: 1px solid #e5e7eb;
    padding: 12px;
    min-height: 200px;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    outline: none;
  }
  .tiptap-editor:focus-within {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
  .tiptap-editor p.is-empty::before {
    content: attr(data-placeholder);
    color: #9ca3af;
    pointer-events: none;
    position: absolute;
  }
  .tiptap-editor p {
    margin: 0;
    border: none !important;
    outline: none !important;
  }
  .tiptap-editor ul {
    list-style-type: disc;
    margin-left: 20px;
  }
  .tiptap-editor ul li {
    border: none !important;
    outline: none !important;
  }
  .tiptap-editor ol {
    list-style-type: decimal;
    margin-left: 20px;
  }
  .tiptap-editor ol li {
    border: none !important;
    outline: none !important;
  }
  .tiptap-editor h1 {
    font-size: 2em;
    font-weight: bold;
    margin: 0.67em 0;
    border: none !important;
    outline: none !important;
  }
  .tiptap-editor h2 {
    font-size: 1.5em;
    font-weight: bold;
    margin: 0.83em 0;
    border: none !important;
    outline: none !important;
  }
  .tiptap-editor *:focus {
    outline: none !important;
    border: none !important;
  }
`;

const RichTextEditor = ({ content, interimTranscript, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false, // Disable default to use custom
        orderedList: false, // Disable default to use custom
        heading: false, // Disable default to use custom
      }),
      Underline,
      CaseConversion,
      CustomBulletList, // Use custom bullet list
      OrderedList,
      Heading.configure({
        levels: [1, 2], // Only allow H1 and H2
      }),
    ],
    content: content || "<p></p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) {
        onChange(html);
      }
    },
  });

  // Debugging: Log editor extensions
  useEffect(() => {
    if (editor) {
      console.log("Editor extensions:", editor.extensionManager.extensions);
    }
  }, [editor]);

  // Update editor content when interimTranscript changes
  useEffect(() => {
    if (editor && interimTranscript) {
      const currentContent = editor.getHTML();
      const newContent = `${currentContent.replace(/<\/p>$/, "")} ${interimTranscript}</p>`;
      editor.commands.setContent(newContent, false); // false prevents unnecessary emit
    }
  }, [interimTranscript, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-container">
      <style>{editorStyles}</style>
      <div className="toolbar">
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toggleBold().run();
          }}
          className={editor.isActive("bold") ? "active" : ""}
          title="Bold"
        >
          <FaBold size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toggleItalic().run();
          }}
          className={editor.isActive("italic") ? "active" : ""}
          title="Italic"
        >
          <FaItalic size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={editor.isActive("underline") ? "active" : ""}
          title="Underline"
        >
          <FaUnderline size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
            console.log("H1 toggled:", editor.getHTML());
          }}
          className={editor.isActive("heading", { level: 1 }) ? "active" : ""}
          title="Heading 1"
        >
          <MdOutlineTitle size={22} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
            console.log("H2 toggled:", editor.getHTML());
          }}
          className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
          title="Heading 2"
        >
          <MdOutlineTitle size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toggleBulletList().run();
            console.log("Bullet List toggled:", editor.getHTML());
          }}
          className={editor.isActive("bulletList") ? "active" : ""}
          title="Bullet List"
        >
          <FaListUl size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toggleOrderedList().run();
            console.log("Ordered List toggled:", editor.getHTML());
          }}
          className={editor.isActive("orderedList") ? "active" : ""}
          title="Ordered List"
        >
          <FaListOl size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toUpperCase().run();
          }}
          title="Uppercase"
        >
          <MdOutlineTextFields size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toLowerCase().run();
          }}
          title="Lowercase"
        >
          <MdOutlineTextFields size={14} />
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="tiptap-editor"
        data-placeholder="Start typing..."
      />
    </div>
  );
};

export default RichTextEditor;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBlogApi,
  updateBlogApi,
  getAllBlogsApi,
  getBlogByIdApi,
  deleteBlogApi,
  getBlogsByStatusApi,
  incrementLikeApi,
  incrementViewApi,
  updateBlogStatusApi,
} from "@/api/blogApi"; // Ensure this path matches your API file location

// Async Thunks
export const fetchAllBlogs = createAsyncThunk("blogs/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getAllBlogsApi();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchBlogById = createAsyncThunk("blogs/fetchById", async (blogId, { rejectWithValue }) => {
  try {
    return await getBlogByIdApi(blogId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchBlogsByStatus = createAsyncThunk("blogs/fetchByStatus", async (status, { rejectWithValue }) => {
  try {
    return await getBlogsByStatusApi(status);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createBlog = createAsyncThunk("blogs/create", async (blogData, { rejectWithValue }) => {
  try {
    return await createBlogApi(blogData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateBlog = createAsyncThunk("blogs/update", async ({ blogId, blogData }, { rejectWithValue }) => {
  try {
    return await updateBlogApi(blogId, blogData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteBlog = createAsyncThunk("blogs/delete", async (blogId, { rejectWithValue }) => {
  try {
    return await deleteBlogApi(blogId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const incrementLike = createAsyncThunk("blogs/incrementLike", async (blogId, { rejectWithValue }) => {
  try {
    return await incrementLikeApi(blogId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const incrementView = createAsyncThunk("blogs/incrementView", async (blogId, { rejectWithValue }) => {
  try {
    return await incrementViewApi(blogId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateBlogStatus = createAsyncThunk("blogs/updateStatus", async ({ blogId, status }, { rejectWithValue }) => {
  try {
    return await updateBlogStatusApi(blogId, status);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Slice
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    singleBlog: null,
    status: "idle",
    error: null,
  },
  reducers: {}, // No extra reducers needed here
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.singleBlog = action.payload;
      })
      .addCase(fetchBlogsByStatus.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.map((blog) => (blog.blog_id === action.payload.blog_id ? action.payload : blog));
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog.blog_id !== action.meta.arg);
      })
      .addCase(incrementLike.fulfilled, (state, action) => {
        const blog = state.blogs.find((b) => b.blog_id === action.meta.arg);
        if (blog) blog.likes += 1;
      })
      .addCase(incrementView.fulfilled, (state, action) => {
        const blog = state.blogs.find((b) => b.blog_id === action.meta.arg);
        if (blog) blog.views += 1;
      })
      .addCase(updateBlogStatus.fulfilled, (state, action) => {
        const blog = state.blogs.find((b) => b.blog_id === action.meta.arg.blogId);
        if (blog) blog.status = action.meta.arg.status;
      });
  },
});

export default blogSlice.reducer;
import axiosInstance from "@/utils/axiosInstance";

// Create a new blog
export const createBlogApi = async (blogData) => {
  try {
    const response = await axiosInstance.post("/blogs", blogData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to create blog");
  }
};

// Update a blog
export const updateBlogApi = async (blogId, blogData) => {
  try {
    const response = await axiosInstance.put(`/blogs/${blogId}`, blogData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to update blog");
  }
};

// Get all blogs
export const getAllBlogsApi = async () => {
  try {
    const response = await axiosInstance.get("/getallblogs");
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to fetch blogs");
  }
};

// Get a single blog by ID
export const getBlogByIdApi = async (blogId) => {
  try {
    const response = await axiosInstance.get(`/blogs/${blogId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to fetch blog");
  }
};

// Delete a blog (soft delete)
export const deleteBlogApi = async (blogId) => {
  try {
    const response = await axiosInstance.put(`/blogs/delete/${blogId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to delete blog");
  }
};

// Get blogs by status
export const getBlogsByStatusApi = async (status) => {
  try {
    const response = await axiosInstance.get(`/blogs/status?status=${status}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to fetch blogs by status");
  }
};

// Increment likes
export const incrementLikeApi = async (blogId) => {
  try {
    const response = await axiosInstance.patch(`/blogs/${blogId}/like`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to like blog");
  }
};

// Increment views
export const incrementViewApi = async (blogId) => {
  try {
    const response = await axiosInstance.patch(`/blogs/${blogId}/view`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to increase view count");
  }
};

// Update blog status
export const updateBlogStatusApi = async (blogId, status) => {
  try {
    const response = await axiosInstance.patch(`/blogs/${blogId}/status`, { status });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to update blog status");
  }
};
