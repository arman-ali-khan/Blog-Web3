'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, Heart, MessageCircle, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const featuredBlogs = [
  {
    id: 1,
    title: "The Future of Web3 and Decentralized Applications",
    excerpt: "Exploring how Web3 technologies are revolutionizing the way we build and interact with applications...",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      role: "Blockchain Developer"
    },
    thumbnail: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2",
    category: "Web3",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    stats: {
      views: 2840,
      likes: 142,
      comments: 28
    }
  },
  {
    id: 2,
    title: "Building Scalable React Applications with Modern Architecture",
    excerpt: "Learn the best practices for building large-scale React applications that maintain performance and developer experience...",
    author: {
      name: "Mike Johnson",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      role: "Frontend Architect"
    },
    thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2",
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
    id: 3,
    title: "The Art of Technical Writing: From Code to Communication",
    excerpt: "How to effectively communicate complex technical concepts through clear, engaging writing that resonates with your audience...",
    author: {
      name: "Emily Rodriguez",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      role: "Technical Writer"
    },
    thumbnail: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2",
    category: "Writing",
    publishedAt: "2024-01-13",
    readTime: "6 min read",
    stats: {
      views: 1650,
      likes: 76,
      comments: 12
    }
  }
];

export function FeaturedBlogs() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredBlogs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredBlogs.length) % featuredBlogs.length);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Articles</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {featuredBlogs.map((blog, index) => (
            <div key={blog.id} className="w-full flex-shrink-0 px-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <div 
                      className="h-48 bg-gradient-primary rounded-t-lg relative overflow-hidden"
                      style={{
                        backgroundImage: `url(${blog.thumbnail})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-white/90 text-black">
                          {blog.category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-xl mb-2 line-clamp-2">
                          {blog.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center space-x-4 mb-4">
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
                        <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <span>{blog.readTime}</span>
                    </div>

                    <div className="flex items-center justify-between">
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
                      <Link href={`/blog/${blog.id}`}>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center space-x-2">
        {featuredBlogs.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
}