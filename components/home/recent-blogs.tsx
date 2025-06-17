'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronLeft, ChevronRight, Eye, Heart, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const recentBlogs = [
  {
    id: 8,
    title: "Getting Started with TypeScript: A Beginner's Guide",
    excerpt: "Learn the fundamentals of TypeScript and how it can improve your JavaScript development experience...",
    author: {
      name: "David Park",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    },
    thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    category: "TypeScript",
    publishedAt: "2024-01-15T10:30:00Z",
    readTime: "7 min read",
    stats: {
      views: 892,
      likes: 34,
      comments: 8
    }
  },
  {
    id: 9,
    title: "The Complete Guide to Docker for Developers",
    excerpt: "Master containerization with Docker and improve your development workflow...",
    author: {
      name: "Jennifer Lee",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    },
    thumbnail: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    category: "DevOps",
    publishedAt: "2024-01-15T08:15:00Z",
    readTime: "14 min read",
    stats: {
      views: 1240,
      likes: 67,
      comments: 12
    }
  },
  {
    id: 10,
    title: "Modern JavaScript ES2024 Features You Should Know",
    excerpt: "Explore the latest JavaScript features and how they can make your code more efficient...",
    author: {
      name: "Robert Chen",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    },
    thumbnail: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    category: "JavaScript",
    publishedAt: "2024-01-14T16:45:00Z",
    readTime: "9 min read",
    stats: {
      views: 1680,
      likes: 89,
      comments: 23
    }
  },
  {
    id: 11,
    title: "Building Accessible Web Applications",
    excerpt: "Learn how to create web applications that are accessible to users with disabilities...",
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    },
    thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    category: "Accessibility",
    publishedAt: "2024-01-14T14:20:00Z",
    readTime: "11 min read",
    stats: {
      views: 956,
      likes: 45,
      comments: 7
    }
  },
  {
    id: 12,
    title: "State Management in React: Redux vs Zustand",
    excerpt: "Compare different state management solutions for React applications...",
    author: {
      name: "Michael Brown",
      avatar: "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    },
    thumbnail: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    category: "React",
    publishedAt: "2024-01-14T11:00:00Z",
    readTime: "13 min read",
    stats: {
      views: 1420,
      likes: 76,
      comments: 19
    }
  },
  {
    id: 13,
    title: "CSS Animation Techniques for Better UX",
    excerpt: "Learn how to use CSS animations to enhance user experience without overwhelming your users...",
    author: {
      name: "Anna Rodriguez",
      avatar: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    },
    thumbnail: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    category: "CSS",
    publishedAt: "2024-01-13T19:30:00Z",
    readTime: "6 min read",
    stats: {
      views: 734,
      likes: 32,
      comments: 5
    }
  }
];

const BLOGS_PER_PAGE = 3;

export function RecentBlogs() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(recentBlogs.length / BLOGS_PER_PAGE);

  const startIndex = currentPage * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;
  const currentBlogs = recentBlogs.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Recent Articles</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            disabled={currentPage === 0}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentPage + 1} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {currentBlogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/blog/${blog.id}`}>
              <Card className="glass overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="flex">
                  <div 
                    className="w-24 h-24 bg-gradient-primary relative overflow-hidden flex-shrink-0"
                    style={{
                      backgroundImage: `url(${blog.thumbnail})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  </div>
                  
                  <CardContent className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {blog.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(blog.publishedAt)}
                          </span>
                        </div>
                        <h3 className="font-bold text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                          {blog.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                          <AvatarFallback className="text-xs">{blog.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-xs">{blog.author.name}</p>
                          <p className="text-xs text-muted-foreground">{blog.readTime}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{blog.stats.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{blog.stats.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{blog.stats.comments}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}