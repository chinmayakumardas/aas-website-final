'use client';

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogById,fetchImageById } from '@/redux/slices/blogSlice';
import { useParams } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import gsap from 'gsap';
import { CalendarDays, User, Tag, FolderOpen, ArrowLeft } from 'lucide-react';


export default function BlogPost() {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const { blog, loading } = useSelector((state) => state.blogs);
  const [isLoading, setIsLoading] = useState(true);
  const image = useSelector((state) => state.blogs.image);

    
    useEffect(() => {
      setIsLoading(true);
      dispatch(fetchBlogById(blogId)).finally(() => setIsLoading(false));
    dispatch(fetchImageById({blogId:blogId,index:0})); // Fetch the image
  }, [dispatch, blogId]);

  

  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo(
        "#blogContent",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Spinner />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h2>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blogs">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to All Blogs
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString || Date.now()).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/blogs">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to All Blogs
          </Button>
        </Link>
      </div>

      <Card id="blogContent" className="bg-white shadow-xl rounded-xl overflow-hidden">
        {blog.images?.[0] ? (
          <div className="relative w-full ">
            <img
              src={image}
          
              alt={blog.title || "Blog featured image"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                const altText = document.createElement('div');
                altText.className = 'w-full h-full flex items-center justify-center bg-gray-100 text-gray-600';
                altText.textContent = e.target.alt;
                e.target.parentNode.appendChild(altText);
              }}
            />
          </div>
        ) : null}


        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>
          
          <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blog.authorname}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            {blog.category && (
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                <span>{blog.category}</span>
              </div>
            )}
          </div>
         
          {blog?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog?.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div 
            className="prose prose-lg max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: blog.description }} 
          />

        
        </div>
      </Card>
    </div>
  );
}
