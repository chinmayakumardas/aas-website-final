'use client';
import { useEffect } from 'react';
import { Card } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs } from '@/redux/slices/blogSlice';
import { useParams } from 'next/navigation';

export default function BlogPost() {
  const { blog_id } = useParams(); // ✅ Get blog_id from URL params
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  const blog = blogs.find((b) => Number(b.blog_id) === Number(blog_id));

  if (loading) {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }

  if (!blog) {
    return (
      <div className="p-4 text-red-500">
        Blog with ID {blog_id} not found!
      </div>
    );
  }

  // Parse category (if it's a stringified array)
  let categories = [];
  try {
    categories = JSON.parse(blog.category);
  } catch (error) {
    console.error("Invalid category format:", blog.category);
  }

  return (
    <div className="container mx-auto p-4">
      {/* All Blogs Button */}
      <div className="mb-6 flex justify-start">
        <Link href="/blogs">
          <Button variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white">
            All Blogs
          </Button>
        </Link>
      </div>

      <Card className="bg-white shadow-lg rounded-lg p-6">
        {/* Blog Title */}
        <h1 className="text-4xl font-bold text-gray-900">{blog.tittle}</h1>

        {/* Author and Date */}
        <div className="mt-2 text-sm text-gray-600">
          <span>By {blog.authorname}</span> | 
          <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            <strong>Categories:</strong> {categories.join(', ')}
          </div>
        )}

        {/* Blog Image */}
        {blog.images?.[0] && (
          <div className="mt-6">
            <img 
              src={blog.images[0]} 
              alt={blog.title} 
              className="w-full h-auto rounded-lg shadow-md" 
            />
          </div>
        )}

        {/* Blog Description */}
        <div className="mt-6 text-lg text-gray-800" dangerouslySetInnerHTML={{ __html: blog.description }} />
      </Card>
    </div>
  );
}
