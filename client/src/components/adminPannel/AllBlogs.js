



"use client";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, deleteBlog } from "@/redux/slices/blogSlice";
import { useRouter } from "next/navigation";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import Spinner from "@/components/ui/spinner";
import gsap from "gsap";
import Cookies from "js-cookie";

const AllBlogs = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { blogs } = useSelector((state) => state.blogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleBlogs, setVisibleBlogs] = useState(10);
  const [loading, setLoading] = useState(true);
  const observer = useRef();
  const contentRef = useRef(null);

  // Get role from cookies
  const userRole = typeof window !== "undefined" ? Cookies.get("role") : null;

  useEffect(() => {
    setLoading(true);
    dispatch(fetchBlogs()).finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
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

  const filteredBlogs = (blogs || []).filter((blog) =>
    blog?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (blogId) => {
    dispatch(deleteBlog(blogId)).then(() => {
      toast.success("Blog Deleted!");
      dispatch(fetchBlogs()); // Fetch blogs again after deleting
    });
  };

  return (
    <div className=" p-4 relative">
      <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
      <div className="flex flex-row justify-between items-center mb-6 gap-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search blogs..."
          className="flex-1 border-2 border-gray-300 focus:border-gray-500 rounded-lg shadow-sm"
        />
        {/* Show "Write a Blog" button only if user is an admin */}
        {userRole !== "admin" && (
          <Button
            onClick={() => router.push("/blogs/create-blog")}
            className="bg-blue-500 hover:bg-blue-600 text-white -mt-1 font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
          >
            Write a Blog
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[100vh]">
          <Spinner />
        </div>
      ) : (
        <div ref={contentRef} className="flex flex-col gap-4 mt-4">
          {filteredBlogs.slice(0, visibleBlogs).map((blog, index) => (
            <Card
              key={blog.blogId}
              ref={index === visibleBlogs - 1 ? lastBlogRef : null}
              className="p-4 flex justify-between items-center w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {blog.title.length > 50
                    ? `${blog.title.substring(0, 50)}...`
                    : blog.title}
                </h3>
              </div>
              <div className="flex gap-4">
                <FiEye
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                  onClick={() => router.push(`/blogs/${blog.blogId}`)}
                />
                <FiEdit
                  className="cursor-pointer text-yellow-500 hover:text-yellow-700"
                  onClick={() => router.push(`/blogs/edit/${blog.blogId}`)}
                />
                <FiTrash
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(blog.blogId)}
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
