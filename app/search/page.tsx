'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, Calendar, Eye, Heart, MessageCircle, User } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';

// Mock search results data
const mockSearchResults = {
  blogs: [
    {
      id: 1,
      title: "The Future of Web3 and Decentralized Applications",
      excerpt: "Exploring how Web3 technologies are revolutionizing the way we build and interact with applications...",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
      },
      thumbnail: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
      category: "Web3",
      publishedAt: "2024-01-15",
      readTime: "8 min read",
      stats: { views: 2840, likes: 142, comments: 28 }
    },
    {
      id: 2,
      title: "Building Scalable React Applications with Modern Architecture",
      excerpt: "Learn the best practices for building large-scale React applications that maintain performance...",
      author: {
        name: "Mike Johnson",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
      },
      thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
      category: "React",
      publishedAt: "2024-01-14",
      readTime: "12 min read",
      stats: { views: 1920, likes: 89, comments: 15 }
    },
    {
      id: 3,
      title: "Machine Learning Model Deployment with Docker",
      excerpt: "Master containerization for ML models and improve your deployment workflow...",
      author: {
        name: "Dr. Lisa Wang",
        avatar: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
      },
      thumbnail: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
      category: "AI/ML",
      publishedAt: "2024-01-13",
      readTime: "15 min read",
      stats: { views: 3200, likes: 178, comments: 34 }
    }
  ],
  users: [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      role: "Blockchain Developer",
      followers: 1250,
      totalBlogs: 28
    },
    {
      id: 2,
      name: "Mike Johnson",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      role: "Frontend Architect",
      followers: 890,
      totalBlogs: 15
    }
  ],
  categories: [
    { name: "Web3", count: 245, description: "Blockchain and decentralized technologies" },
    { name: "React", count: 189, description: "React framework and ecosystem" },
    { name: "AI/ML", count: 134, description: "Artificial Intelligence and Machine Learning" }
  ]
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('blogs');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [results, setResults] = useState(mockSearchResults);

  useEffect(() => {
    // Simulate search API call
    if (searchQuery) {
      // In a real app, this would be an API call
      setResults(mockSearchResults);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform search
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const totalResults = results.blogs.length + results.users.length + results.categories.length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Search Results</h1>
          {searchQuery && (
            <p className="text-muted-foreground text-lg mb-6">
              {totalResults} results for "{searchQuery}"
            </p>
          )}
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search blogs, users, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </motion.div>

        {/* Filters and Controls */}
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
                <SelectItem value="relevance">Most Relevant</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
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

        {/* Search Results Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="blogs">
                Blogs ({results.blogs.length})
              </TabsTrigger>
              <TabsTrigger value="users">
                Users ({results.users.length})
              </TabsTrigger>
              <TabsTrigger value="categories">
                Categories ({results.categories.length})
              </TabsTrigger>
            </TabsList>

            {/* Blog Results */}
            <TabsContent value="blogs" className="space-y-6">
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                {results.blogs.map((blog, index) => (
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
                                  <p className="text-xs text-muted-foreground">{formatDate(blog.publishedAt)}</p>
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
              </div>
            </TabsContent>

            {/* User Results */}
            <TabsContent value="users" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.users.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link href={`/profile/${user.id}`}>
                      <Card className="glass hover:shadow-lg transition-all duration-300 group cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <Avatar className="h-16 w-16 mx-auto mb-4">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                            {user.name}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">{user.role}</p>
                          <div className="flex justify-center space-x-6 text-sm">
                            <div className="text-center">
                              <div className="font-bold">{user.followers}</div>
                              <div className="text-muted-foreground">Followers</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold">{user.totalBlogs}</div>
                              <div className="text-muted-foreground">Blogs</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Category Results */}
            <TabsContent value="categories" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.categories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link href={`/category/${category.name.toLowerCase()}`}>
                      <Card className="glass hover:shadow-lg transition-all duration-300 group cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                              {category.name}
                            </h3>
                            <Badge variant="secondary">
                              {category.count} posts
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {category.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* No Results */}
        {totalResults === 0 && searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse our categories.
            </p>
          </motion.div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}