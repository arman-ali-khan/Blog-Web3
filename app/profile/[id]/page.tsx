'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  Twitter, 
  Linkedin,
  Eye,
  Heart,
  MessageCircle,
  UserPlus,
  UserCheck,
  Filter,
  Grid,
  List
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';
import { toast } from 'sonner';

// Mock user profile data
const mockUserProfile = {
  id: 1,
  name: "Sarah Chen",
  email: "sarah@example.com",
  avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2",
  bio: "Passionate blockchain developer and Web3 enthusiast with 5+ years of experience building decentralized applications. I love sharing knowledge about emerging technologies and helping others learn.",
  role: "Blockchain Developer",
  location: "San Francisco, CA",
  website: "https://sarahchen.dev",
  twitter: "@sarahchen_dev",
  linkedin: "linkedin.com/in/sarahchen",
  joinDate: "2022-03-15",
  stats: {
    followers: 1250,
    following: 340,
    totalBlogs: 28,
    totalViews: 45600,
    totalLikes: 2340
  },
  isFollowing: false
};

const userBlogs = [
  {
    id: 1,
    title: "The Future of Web3 and Decentralized Applications",
    excerpt: "Exploring how Web3 technologies are revolutionizing the way we build and interact with applications...",
    thumbnail: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    category: "Web3",
    publishedAt: "2024-01-15T10:00:00Z",
    readTime: "8 min read",
    stats: {
      views: 2840,
      likes: 142,
      comments: 28
    }
  },
  {
    id: 2,
    title: "Smart Contract Security Best Practices",
    excerpt: "Learn essential security practices for developing secure smart contracts on Ethereum...",
    thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    category: "Blockchain",
    publishedAt: "2024-01-12T14:30:00Z",
    readTime: "12 min read",
    stats: {
      views: 1920,
      likes: 89,
      comments: 15
    }
  },
  {
    id: 3,
    title: "Building DeFi Applications with Solidity",
    excerpt: "A comprehensive guide to building decentralized finance applications using Solidity...",
    thumbnail: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    category: "DeFi",
    publishedAt: "2024-01-10T09:15:00Z",
    readTime: "15 min read",
    stats: {
      views: 3200,
      likes: 178,
      comments: 34
    }
  },
  {
    id: 4,
    title: "Introduction to NFT Development",
    excerpt: "Learn how to create and deploy your own NFT collection on the Ethereum blockchain...",
    thumbnail: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    category: "NFT",
    publishedAt: "2024-01-08T16:45:00Z",
    readTime: "10 min read",
    stats: {
      views: 2150,
      likes: 95,
      comments: 19
    }
  },
  {
    id: 5,
    title: "Web3 Authentication with MetaMask",
    excerpt: "Implement secure Web3 authentication in your applications using MetaMask and ethers.js...",
    thumbnail: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    category: "Authentication",
    publishedAt: "2024-01-05T11:20:00Z",
    readTime: "9 min read",
    stats: {
      views: 1680,
      likes: 72,
      comments: 12
    }
  },
  {
    id: 6,
    title: "Optimizing Gas Costs in Smart Contracts",
    excerpt: "Techniques and strategies to reduce gas costs and optimize your smart contract performance...",
    thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    category: "Optimization",
    publishedAt: "2024-01-03T13:10:00Z",
    readTime: "11 min read",
    stats: {
      views: 1450,
      likes: 63,
      comments: 8
    }
  }
];

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const [user, setUser] = useState(mockUserProfile);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleFollow = () => {
    setUser(prev => ({
      ...prev,
      isFollowing: !prev.isFollowing,
      stats: {
        ...prev.stats,
        followers: prev.isFollowing ? prev.stats.followers - 1 : prev.stats.followers + 1
      }
    }));
    toast.success(user.isFollowing ? 'Unfollowed user' : 'Following user');
  };

  const sortedBlogs = [...userBlogs].sort((a, b) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="glass">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                <Avatar className="h-32 w-32 mx-auto md:mx-0">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <p className="text-lg text-muted-foreground mb-4">{user.role}</p>
                  <p className="text-foreground mb-4 max-w-2xl">{user.bio}</p>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {formatDate(user.joinDate)}</span>
                    </div>
                    {user.website && (
                      <a 
                        href={user.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 hover:text-primary transition-colors"
                      >
                        <LinkIcon className="w-4 h-4" />
                        <span>Website</span>
                      </a>
                    )}
                    {user.twitter && (
                      <a 
                        href={`https://twitter.com/${user.twitter.replace('@', '')}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 hover:text-primary transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                        <span>{user.twitter}</span>
                      </a>
                    )}
                    {user.linkedin && (
                      <a 
                        href={`https://${user.linkedin}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 hover:text-primary transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start space-x-6 mb-6">
                    <div className="text-center">
                      <div className="font-bold text-lg">{formatNumber(user.stats.followers)}</div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{formatNumber(user.stats.following)}</div>
                      <div className="text-sm text-muted-foreground">Following</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{user.stats.totalBlogs}</div>
                      <div className="text-sm text-muted-foreground">Blogs</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{formatNumber(user.stats.totalViews)}</div>
                      <div className="text-sm text-muted-foreground">Views</div>
                    </div>
                  </div>
                  
                  <Button onClick={handleFollow} className="w-full md:w-auto">
                    {user.isFollowing ? (
                      <>
                        <UserCheck className="w-4 h-4 mr-2" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Follow
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Blogs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold">Published Blogs ({userBlogs.length})</h2>
            
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
            </div>
          </div>

          {/* Blogs Grid/List */}
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6'
          }>
            {sortedBlogs.map((blog, index) => (
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
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <span>{formatDate(blog.publishedAt)}</span>
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
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>{formatDate(blog.publishedAt)}</span>
                              <span>•</span>
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
                          </div>
                        </CardContent>
                      </div>
                    )}
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}