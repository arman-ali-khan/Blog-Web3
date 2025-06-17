'use client';

import { motion } from 'framer-motion';
import { Eye, Heart, MessageCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const popularBlogs = [
  {
    id: 4,
    title: "Mastering CSS Grid: A Complete Guide for Modern Layouts",
    excerpt: "Everything you need to know about CSS Grid to create responsive, modern web layouts...",
    author: {
      name: "Alex Kim",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    },
    thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    category: "CSS",
    publishedAt: "2024-01-12",
    readTime: "10 min read",
    stats: {
      views: 3250,
      likes: 189,
      comments: 34
    }
  },
  {
    id: 5,
    title: "Introduction to Machine Learning with Python",
    excerpt: "Start your machine learning journey with Python and scikit-learn...",
    author: {
      name: "Dr. Lisa Wang",
      avatar: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    },
    thumbnail: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    category: "AI/ML",
    publishedAt: "2024-01-11",
    readTime: "15 min read",
    stats: {
      views: 2890,
      likes: 156,
      comments: 42
    }
  },
  {
    id: 6,
    title: "Building RESTful APIs with Node.js and Express",
    excerpt: "Learn how to build robust and scalable APIs using Node.js and Express framework...",
    author: {
      name: "Carlos Martinez",
      avatar: "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    },
    thumbnail: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    category: "Backend",
    publishedAt: "2024-01-10",
    readTime: "12 min read",
    stats: {
      views: 2640,
      likes: 128,
      comments: 29
    }
  },
  {
    id: 7,
    title: "UI/UX Design Principles for Developers",
    excerpt: "Essential design principles every developer should know to create better user experiences...",
    author: {
      name: "Maya Patel",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    },
    thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    category: "Design",
    publishedAt: "2024-01-09",
    readTime: "8 min read",
    stats: {
      views: 2180,
      likes: 102,
      comments: 18
    }
  }
];

export function PopularBlogs() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Popular This Week</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {popularBlogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/blog/${blog.id}`}>
              <Card className="glass overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="flex">
                  <div 
                    className="w-32 h-32 bg-gradient-primary relative overflow-hidden flex-shrink-0"
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
                  
                  <CardContent className="flex-1 p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                        <AvatarFallback className="text-xs">{blog.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-xs">{blog.author.name}</p>
                        <p className="text-xs text-muted-foreground">{blog.readTime}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
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