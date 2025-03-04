
'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '@/redux/slices/blogSlice';
import { useRouter } from 'next/navigation';
import { Visibility, Edit } from '@mui/icons-material';
import Spinner from '@/components/ui/spinner';
import gsap from 'gsap';

const AllBlogs = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { blogs } = useSelector((state) => state.blogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleBlogs, setVisibleBlogs] = useState(10);
  const [loading, setLoading] = useState(true);
  const observer = useRef();
  const contentRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchBlogs()).finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [loading]);

  const lastBlogRef = (node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleBlogs((prev) => prev + 10);
      }
    });
    if (node) observer.current.observe(node);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.tittle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Blogs</h1>
        <Button onClick={() => router.push('/blogs/create-blog')} variant="createBtn">
          Write a Blog
        </Button>
      </div>
      
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search blogs..."
        className="mt-4"
      />

      {loading ? (
        <div className="fixed inset-0 m-auto flex items-center justify-center ">
          <Spinner />
        </div>
      ) : (
        <div ref={contentRef} className="flex flex-col gap-4 mt-4">
          {filteredBlogs.slice(0, visibleBlogs).map((blog, index) => (
            <Card
              key={blog.blog_id}
              ref={index === visibleBlogs - 1 ? lastBlogRef : null}
              className="p-4 flex justify-between items-center w-full"
            >
              <div className="flex-1">
                <h3 className="sm:block md:hidden lg:hidden">{blog.tittle}</h3>
                <h3 className="hidden md:block lg:hidden">{blog.tittle}</h3>
                <h3 className="hidden lg:block">{blog.tittle}</h3>
              </div>
              <div className="flex gap-2">
                <Visibility 
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                  onClick={() => router.push(`/blogs/${blog.blog_id}`)}
                />
                <Edit 
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => router.push(`/blogs/edit/${blog.blog_id}`)}
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;