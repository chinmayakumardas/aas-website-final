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

const BASE_URL = "http://192.168.0.117:8003";

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
    <div className="min-h-screen w-full p-6 ">
    
        <h1 className="text-2xl font-semibold text-center mb-6">Write a Blog!...</h1>
      
        <form onSubmit={handleCreateBlog} className="space-y-6 w-full">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-center w-full">
            <div className="sm:col-span-3">
            <Label htmlFor="authorname" className="text-right font-medium text-gray-700">
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
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-center">
            <div className="sm:col-span-3">
            <Label htmlFor="tittle" className="text-right font-medium text-gray-700">
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-start">
            <div className="sm:col-span-3 relative">
            <Label htmlFor="description" className="text-right font-medium text-gray-700 pt-2">
              Description
            </Label>
              <RichTextEditor
                content={formData.description}
                interimTranscript={interimTranscript}
                onChange={handleDescriptionChange}
              />
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={`absolute bottom-4 right-4 p-2 rounded-full ${isRecording ? "bg-red-500" : "bg-teal-500"} text-white`}
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-start">
            <div className="sm:col-span-3">
            <Label className="text-right font-medium text-gray-700 pt-2">Categories</Label>
              <DropdownMenu open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen}>
                <DropdownMenuTrigger asChild>
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
                <DropdownMenuContent className="w-full max-h-64 overflow-y-auto">
                  {categoryOptions.map((category) => (
                    <DropdownMenuItem
                      key={category._id}
                      onSelect={(e) => e.preventDefault()}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        id={`category-${category._id}`}
                        checked={formData.categories.includes(category.name)}
                        onCheckedChange={() => handleCategoryChange(category.name)}
                      />
                      <Label htmlFor={`category-${category._id}`} className="cursor-pointer">
                        {category.name}
                      </Label>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-start">
            <div className="sm:col-span-3">
            <Label className="text-right font-medium text-gray-700 pt-2">Tags</Label>
              <DropdownMenu open={isTagsOpen} onOpenChange={setIsTagsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {formData.tags.length > 0 ? formData.tags.join(", ") : "Select tags"}
                    {isTagsOpen ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full max-h-64 overflow-y-auto">
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-center">
            <div className="sm:col-span-3">
            <Label htmlFor="images" className="text-right font-medium text-gray-700">
              Select featured Image
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

          <div className="flex justify-end gap-4">
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