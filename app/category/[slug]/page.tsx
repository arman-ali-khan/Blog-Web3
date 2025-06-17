'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Eye, Heart, MessageCircle, Filter, Grid, List } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';

// Mock data for category blogs
const mockCategoryData = {
  'web-development': {
    name: 'Web Development',
    description: 'Frontend, backend, and full-stack development tutorials and guides',
    totalBlogs: 245,
    blogs: [
      {
        id: 1,
        title: "Building Scalable React Applications with Modern Architecture",
        excerpt: "Learn the best practices for building large-scale React applications that maintain performance and developer experience...",
        author: {
          name: "Mike Johnson",
          avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
          role: "Frontend Architect"
        },
        thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
        category: "React",
        publishedAt: "2024-01-14",
        readTime: "12 min read",
        stats: {
          views: 1920,
          likes: 89,
          comments: 15
        }
      },
      {
        id: 2,
        title: "Modern CSS Grid Layouts: Complete Guide",
        excerpt: "Master CSS Grid with practical examples and real-world use cases for creating responsive layouts...",
        author: {
          name: "Sarah Wilson",
          avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
          role: "UI Developer"
        },
        thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
        category: "CSS",
        publishedAt: "2024-01-13",
        readTime: "8 min read",
        stats: {
          views: 1540,
          likes: 67,
          comments: 12
        }
      },
      {
        id: 3,
        title: "Node.js Performance Optimization Techniques",
        excerpt: "Discover advanced techniques to optimize your Node.js applications for better performance and scalability...",
        author: {
          name: "Alex Chen",
          avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
          role: "Backend Developer"
        },
        thumbnail: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
        category: "Node.js",
        publishedAt: "2024-01-12",
        readTime: "15 min read",
        stats: {
          views: 2180,
          likes: 98,
          comments: 23
        }
      },
      {
        id: 4,
        title: "Vue.js 3 Composition API Deep Dive",
        excerpt: "Explore the power of Vue.js 3 Composition API and learn how to build more maintainable components...",
        author: {
          name: "Emma Rodriguez",
          avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
          role: "Frontend Developer"
        },
        thumbnail: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
        category: "Vue.js",
        publishedAt: "2024-01-11",
        readTime: "10 min read",
        stats: {
          views: 1340,
          likes: 56,
          comments: 9
        }
      },
      {
        id: 5,
        title: "Full-Stack Development with Next.js and Prisma",
        excerpt: "Build a complete full-stack application using Next.js, Prisma, and PostgreSQL with authentication...",
        author: {
          name: "David Kim",
          avatar: "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
          role: "Full-Stack Developer"
        },
        thumbnail: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
        category: "Full-Stack",
        publishedAt: "2024-01-10",
        readTime: "18 min read",
        stats: {
          views: 2890,
          likes: 134,
          comments: 31
        }
      },
      {
        id: 6,
        title: "Progressive Web Apps: The Complete Guide",
        excerpt: "Learn how to build Progressive Web Apps that work offline and provide native app-like experiences...",
        author: {
          name: "Lisa Park",
          avatar: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
          role: "Web Developer"
        },
        thumbnail: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
        category: "PWA",
        publishedAt: "2024-01-09",
        readTime: "14 min read",
        stats: {
          views: 1760,
          likes: 78,
          comments: 16
        }
      }
    ]
  }
};

const BLOGS_PER_PAGE = 6;

export default function CategoryBlogsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get category data (fallback to web-development if not found)
  const categoryData = mockCategoryData[slug as keyof typeof mockCategoryData] || mockCategoryData['web-development'];
  
  // Sort blogs
  const sortedBlogs = [...categoryData.blogs].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      case 'oldest':
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      case 'popular':
        return b.stats.views - a.stats.views;
      case 'liked':
        return b.stats.likes - a.stats.likes;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedBlogs.length / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;
  const currentBlogs = sortedBlogs.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link href="/categories">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>
          </Link>
        </motion.div>

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">{categoryData.name}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            {categoryData.description}
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {categoryData.totalBlogs} Articles
          </Badge>
        </motion.div>

        {/* Filters and View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="liked">Most Liked</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Blogs Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'
              : 'space-y-6 mb-12'
          }
        >
          {currentBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link href={`/blog/${blog.id}`}>
                <Card className="glass overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
                  {viewMode === 'grid' ? (
                    <>
                      <div 
                        className="h-48 bg-gradient-primary relative overflow-hidden"
                        style={{
                          backgroundImage: `url(${blog.thumbnail})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary">
                            {blog.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        
                        <div className="flex items-center space-x-3 mb-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                            <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{blog.author.name}</p>
                            <p className="text-xs text-muted-foreground">{blog.author.role}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(blog.publishedAt)}</span>
                          </div>
                          <span>{blog.readTime}</span>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{blog.stats.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{blog.stats.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{blog.stats.comments}</span>
                          </div>
                        </div>
                      </CardContent>
                    </>
                  ) : (
                    <div className="flex">
                      <div 
                        className="w-48 h-32 bg-gradient-primary relative overflow-hidden flex-shrink-0"
                        style={{
                          backgroundImage: `url(${blog.thumbnail})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="text-xs">
                            {blog.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="flex-1 p-6">
                        <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                              <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{blog.author.name}</p>
                              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                <span>{formatDate(blog.publishedAt)}</span>
                                <span>•</span>
                                <span>{blog.readTime}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{blog.stats.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                              <span>{blog.stats.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{blog.stats.comments}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  )}
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center items-center space-x-2"
          >
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </motion.div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}