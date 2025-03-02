'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { posts } from '@/lib/posts';
import { Badge } from '@/components/ui/badge';

const BlogPage = () => {
  const [search, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories
  const categories = ['all', ...new Set(posts.map(post => post.category))];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const results = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
      setFilteredPosts(results);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[40vh]">
        <div className="absolute inset-0 bg-[url('/assets/blog-banner.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#AF9B5C]/10 to-[#AF9B5C]/5" />
        <div className="relative max-w-6xl mx-auto px-8 py-12 h-full flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Latest Blog's
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Explore our collection of articles covering technology, sustainability, and business innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <Input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer text-sm px-4 py-2 capitalize"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading articles...</p>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post,index) => (
            <Link href={`/blog/${post.slug}`} key={`${post.id ?? 'no-id'}-${index}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="capitalize">
                      {post.category}
                    </Badge>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl font-bold line-clamp-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{post.publishedAt}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{post.likes} likes</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;