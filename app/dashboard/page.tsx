'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  FileText, 
  Eye, 
  Heart, 
  MessageCircle, 
  Settings, 
  PenTool,
  BarChart3,
  Calendar,
  Clock,
  TrendingUp,
  Edit,
  Trash2,
  Plus,
  Home,
  Search
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/auth-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { toast } from 'sonner';

// Mock user blogs data
const userBlogs = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    status: "published",
    category: "React",
    publishedAt: "2024-01-10T10:00:00Z",
    stats: {
      views: 1250,
      likes: 89,
      comments: 23
    },
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    status: "draft",
    category: "TypeScript",
    updatedAt: "2024-01-12T15:30:00Z",
    stats: {
      views: 0,
      likes: 0,
      comments: 0
    },
    readTime: "12 min read"
  },
  {
    id: 3,
    title: "Building REST APIs with Node.js",
    status: "pending",
    category: "Node.js",
    submittedAt: "2024-01-14T09:15:00Z",
    stats: {
      views: 0,
      likes: 0,
      comments: 0
    },
    readTime: "15 min read"
  },
  {
    id: 4,
    title: "CSS Grid Layout Masterclass",
    status: "published",
    category: "CSS",
    publishedAt: "2024-01-08T14:20:00Z",
    stats: {
      views: 890,
      likes: 67,
      comments: 15
    },
    readTime: "10 min read"
  }
];

const userStats = {
  totalBlogs: 12,
  publishedBlogs: 8,
  draftBlogs: 3,
  pendingBlogs: 1,
  totalViews: 15420,
  totalLikes: 892,
  totalComments: 156,
  followers: 234,
  following: 89
};

// Mobile Bottom Navigation Component
function MobileDashboardNav({ selectedTab, setSelectedTab }: { selectedTab: string; setSelectedTab: (tab: string) => void }) {
  const navItems = [
    { id: 'overview', icon: BarChart3, label: 'Overview' },
    { id: 'blogs', icon: FileText, label: 'Blogs' },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'home', icon: Home, label: 'Home', href: '/' },
  ];

  return (
    <motion.nav
      className="fixed bottom-4 left-4 right-4 z-50 md:hidden glass rounded-xl p-2"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = selectedTab === item.id;
          const Icon = item.icon;
          
          if (item.href) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          }
          
          return (
            <button
              key={item.id}
              onClick={() => setSelectedTab(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center space-y-1"
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </motion.div>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}

export default function UserDashboard() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    website: '',
    twitter: '',
    linkedin: ''
  });

  const handleProfileUpdate = () => {
    toast.success('Profile updated successfully');
  };

  const handleDeleteBlog = (blogId: number) => {
    toast.success('Blog deleted successfully');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      published: 'default',
      draft: 'secondary',
      pending: 'outline'
    };
    return variants[status as keyof typeof variants] || 'secondary';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      published: 'text-green-600',
      draft: 'text-gray-600',
      pending: 'text-yellow-600'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">Please log in to access your dashboard.</p>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold">Welcome back, {user.name}!</h1>
              <p className="text-muted-foreground text-lg">
                Manage your blogs, profile, and account settings.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Desktop Tabs */}
        <div className="hidden md:block">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="blogs">My Blogs</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="glass">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{userStats.totalBlogs}</div>
                      <p className="text-xs text-muted-foreground">
                        {userStats.publishedBlogs} published, {userStats.draftBlogs} drafts
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="glass">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatNumber(userStats.totalViews)}</div>
                      <p className="text-xs text-muted-foreground">
                        Across all published blogs
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="glass">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                      <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{userStats.totalLikes}</div>
                      <p className="text-xs text-muted-foreground">
                        {userStats.totalComments} comments received
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="glass">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Followers</CardTitle>
                      <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{userStats.followers}</div>
                      <p className="text-xs text-muted-foreground">
                        Following {userStats.following} users
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Link href="/create-blog">
                        <Button className="w-full h-20 flex flex-col space-y-2">
                          <PenTool className="w-6 h-6" />
                          <span>Write New Blog</span>
                        </Button>
                      </Link>
                      <Link href="/profile">
                        <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                          <User className="w-6 h-6" />
                          <span>View Profile</span>
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                        <Settings className="w-6 h-6" />
                        <span>Account Settings</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Blogs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Recent Blogs</span>
                      <Link href="/create-blog">
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          New Blog
                        </Button>
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userBlogs.slice(0, 3).map((blog) => (
                        <div key={blog.id} className="flex items-center space-x-4 p-4 rounded-lg bg-accent/50">
                          <div className="flex-1">
                            <h4 className="font-medium">{blog.title}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={getStatusBadge(blog.status) as any} className="text-xs">
                                {blog.status}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {blog.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {blog.readTime}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{blog.stats.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{blog.stats.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{blog.stats.comments}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Blogs Tab */}
            <TabsContent value="blogs" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>My Blogs</span>
                      <Link href="/create-blog">
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          New Blog
                        </Button>
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Stats</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userBlogs.map((blog) => (
                          <TableRow key={blog.id}>
                            <TableCell className="font-medium max-w-xs">
                              <div className="line-clamp-1">{blog.title}</div>
                              <div className="text-xs text-muted-foreground">{blog.readTime}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStatusBadge(blog.status) as any} className="capitalize">
                                {blog.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{blog.category}</Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {blog.status === 'published' && blog.publishedAt && formatDate(blog.publishedAt)}
                              {blog.status === 'draft' && blog.updatedAt && `Updated ${formatDate(blog.updatedAt)}`}
                              {blog.status === 'pending' && blog.submittedAt && `Submitted ${formatDate(blog.submittedAt)}`}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Eye className="w-3 h-3" />
                                  <span>{blog.stats.views}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Heart className="w-3 h-3" />
                                  <span>{blog.stats.likes}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageCircle className="w-3 h-3" />
                                  <span>{blog.stats.comments}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleDeleteBlog(blog.id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5" />
                        <span>Performance Overview</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Average Views per Blog</span>
                          <span className="font-bold">{Math.round(userStats.totalViews / userStats.publishedBlogs)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Average Likes per Blog</span>
                          <span className="font-bold">{Math.round(userStats.totalLikes / userStats.publishedBlogs)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Engagement Rate</span>
                          <span className="font-bold">
                            {((userStats.totalLikes + userStats.totalComments) / userStats.totalViews * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5" />
                        <span>Top Performing Blogs</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {userBlogs
                          .filter(blog => blog.status === 'published')
                          .sort((a, b) => b.stats.views - a.stats.views)
                          .slice(0, 3)
                          .map((blog, index) => (
                            <div key={blog.id} className="flex items-center space-x-3">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm line-clamp-1">{blog.title}</p>
                                <p className="text-xs text-muted-foreground">{blog.stats.views} views</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <Button variant="outline">Change Avatar</Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          JPG, PNG or GIF. Max size 2MB.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user.email}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        className="h-24"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          placeholder="https://yourwebsite.com"
                          value={profileData.website}
                          onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input
                          id="twitter"
                          placeholder="@username"
                          value={profileData.twitter}
                          onChange={(e) => setProfileData(prev => ({ ...prev, twitter: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          placeholder="linkedin.com/in/username"
                          value={profileData.linkedin}
                          onChange={(e) => setProfileData(prev => ({ ...prev, linkedin: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button variant="outline">Cancel</Button>
                      <Button onClick={handleProfileUpdate}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Mobile Content */}
        <div className="md:hidden">
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Blogs</span>
                    </div>
                    <div className="text-2xl font-bold">{userStats.totalBlogs}</div>
                  </CardContent>
                </Card>
                <Card className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Views</span>
                    </div>
                    <div className="text-2xl font-bold">{formatNumber(userStats.totalViews)}</div>
                  </CardContent>
                </Card>
                <Card className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Likes</span>
                    </div>
                    <div className="text-2xl font-bold">{userStats.totalLikes}</div>
                  </CardContent>
                </Card>
                <Card className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Followers</span>
                    </div>
                    <div className="text-2xl font-bold">{userStats.followers}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Link href="/create-blog">
                      <Button className="w-full h-16 flex flex-col space-y-1">
                        <PenTool className="w-5 h-5" />
                        <span className="text-sm">Write Blog</span>
                      </Button>
                    </Link>
                    <Link href="/profile">
                      <Button variant="outline" className="w-full h-16 flex flex-col space-y-1">
                        <User className="w-5 h-5" />
                        <span className="text-sm">View Profile</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedTab === 'blogs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">My Blogs</h2>
                <Link href="/create-blog">
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New
                  </Button>
                </Link>
              </div>
              {userBlogs.map((blog) => (
                <Card key={blog.id} className="glass">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium line-clamp-2">{blog.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={getStatusBadge(blog.status) as any} className="text-xs">
                            {blog.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {blog.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{blog.stats.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{blog.stats.likes}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Analytics</h2>
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Avg. Views per Blog</span>
                      <span className="font-bold">{Math.round(userStats.totalViews / userStats.publishedBlogs)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Avg. Likes per Blog</span>
                      <span className="font-bold">{Math.round(userStats.totalLikes / userStats.publishedBlogs)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Engagement Rate</span>
                      <span className="font-bold">
                        {((userStats.totalLikes + userStats.totalComments) / userStats.totalViews * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Profile Settings</h2>
              <Card className="glass">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile-name">Full Name</Label>
                      <Input
                        id="mobile-name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mobile-bio">Bio</Label>
                      <Textarea
                        id="mobile-bio"
                        placeholder="Tell us about yourself..."
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        className="h-20"
                      />
                    </div>
                    
                    <Button onClick={handleProfileUpdate} className="w-full">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileDashboardNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </div>
  );
}