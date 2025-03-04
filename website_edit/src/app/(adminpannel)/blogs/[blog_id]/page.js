

'use client';

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '@/redux/slices/blogSlice';
import { useParams } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import gsap from 'gsap';

export default function BlogPost() {
  const { blog_id } = useParams();
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blogs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchBlogs()).finally(() => setIsLoading(false));
  }, [dispatch]);

  const blog = blogs.find((b) => Number(b.blog_id) === Number(blog_id));

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
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <Spinner />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-4">
        Blog not found!
      </div>
    );
  }

  let categories = [];
  try {
    categories = JSON.parse(blog.category);
  } catch (error) {
    console.error("Invalid category format:", blog.category);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex justify-start">
        <Link href="/blogs">
          <Button variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white">
            All Blogs
          </Button>
        </Link>
      </div>

      <Card id="blogContent" className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-gray-900">{blog.tittle}</h1>
        <div className="mt-2 text-sm text-gray-600">
          <span>By {blog.authorname}</span> | 
          <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        {categories.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            <strong>Categories:</strong> {categories.join(', ')}
          </div>
        )}
        {blog.images?.[0] && (
          <div className="mt-6">
            <img 
              src={blog.images[0]} 
              alt={blog.tittle} 
              className="w-full h-auto rounded-lg shadow-md" 
            />
          </div>
        )}
        <div className="mt-6 text-lg text-gray-800" dangerouslySetInnerHTML={{ __html: blog.description }} />
      </Card>
    </div>
  );
}












