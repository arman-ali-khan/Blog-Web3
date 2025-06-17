'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Settings, 
  Clock ,
  BarChart3,
  TrendingUp,
  MessageSquare,
  Bell,
  Shield,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';
import { toast } from 'sonner';

// Mock data
const dashboardStats = {
  totalUsers: 2847,
  totalBlogs: 10234,
  pendingBlogs: 23,
  totalViews: 1250000,
  monthlyGrowth: {
    users: 12.5,
    blogs: 8.3,
    views: 15.7
  }
};

const pendingBlogs = [
  {
    id: 1,
    title: "Advanced React Patterns for Large Applications",
    author: {
      name: "John Smith",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    },
    category: "React",
    submittedAt: "2024-01-15T10:30:00Z",
    wordCount: 2500,
    readTime: "12 min read"
  },
  {
    id: 2,
    title: "Machine Learning Model Deployment with Docker",
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    },
    category: "AI/ML",
    submittedAt: "2024-01-15T09:15:00Z",
    wordCount: 3200,
    readTime: "15 min read"
  },
  {
    id: 3,
    title: "Building Secure APIs with Node.js",
    author: {
      name: "Mike Chen",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    },
    category: "Backend",
    submittedAt: "2024-01-14T16:45:00Z",
    wordCount: 1800,
    readTime: "8 min read"
  }
];

const recentUsers = [
  {
    id: 1,
    name: "Alice Williams",
    email: "alice@example.com",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    role: "contributor",
    joinedAt: "2024-01-15T08:30:00Z",
    status: "active",
    blogCount: 5
  },
  {
    id: 2,
    name: "Bob Martinez",
    email: "bob@example.com",
    avatar: "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    role: "contributor",
    joinedAt: "2024-01-14T14:20:00Z",
    status: "active",
    blogCount: 2
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com",
    avatar: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    role: "viewer",
    joinedAt: "2024-01-14T11:10:00Z",
    status: "pending",
    blogCount: 0
  }
];

const systemNotices = [
  {
    id: 1,
    title: "Server Maintenance Scheduled",
    type: "maintenance",
    priority: "high",
    createdAt: "2024-01-15T10:00:00Z",
    isActive: true
  },
  {
    id: 2,
    title: "New Feature Release",
    type: "announcement",
    priority: "medium",
    createdAt: "2024-01-14T15:30:00Z",
    isActive: true
  }
];

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const handleApproveBlog = (blogId: number) => {
    toast.success('Blog approved successfully');
  };

  const handleRejectBlog = (blogId: number) => {
    toast.error('Blog rejected');
  };

  const handleUserAction = (userId: number, action: string) => {
    toast.success(`User ${action} successfully`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Manage users, content, and platform settings from your central control panel.
          </p>
        </motion.div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="blogs">Blog Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="notices">Notices</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
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
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatNumber(dashboardStats.totalUsers)}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+{dashboardStats.monthlyGrowth.users}%</span> from last month
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
                    <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatNumber(dashboardStats.totalBlogs)}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+{dashboardStats.monthlyGrowth.blogs}%</span> from last month
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
                    <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.pendingBlogs}</div>
                    <p className="text-xs text-muted-foreground">
                      Blogs awaiting review
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
                    <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatNumber(dashboardStats.totalViews)}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+{dashboardStats.monthlyGrowth.views}%</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>Recent Blog Submissions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pendingBlogs.slice(0, 3).map((blog) => (
                      <div key={blog.id} className="flex items-center space-x-3 p-3 rounded-lg bg-accent/50">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                          <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-1">{blog.title}</p>
                          <p className="text-xs text-muted-foreground">
                            by {blog.author.name} • {formatDate(blog.submittedAt)}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {blog.category}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>New User Registrations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center space-x-3 p-3 rounded-lg bg-accent/50">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.email} • {formatDate(user.joinedAt)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                            {user.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {user.role}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Blog Management Tab */}
          <TabsContent value="blogs" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Pending Blog Approvals</span>
                    <Badge variant="secondary">{pendingBlogs.length} pending</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Word Count</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingBlogs.map((blog) => (
                        <TableRow key={blog.id}>
                          <TableCell className="font-medium max-w-xs">
                            <div className="line-clamp-2">{blog.title}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                                <AvatarFallback className="text-xs">{blog.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{blog.author.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{blog.category}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(blog.submittedAt)}
                          </TableCell>
                          <TableCell className="text-sm">
                            {blog.wordCount} words
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                Preview
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleApproveBlog(blog.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleRejectBlog(blog.id)}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
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

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Blogs</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {user.email}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(user.joinedAt)}
                          </TableCell>
                          <TableCell className="text-sm">
                            {user.blogCount}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Select onValueChange={(action) => handleUserAction(user.id, action)}>
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="Actions" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="activate">Activate</SelectItem>
                                  <SelectItem value="suspend">Suspend</SelectItem>
                                  <SelectItem value="promote">Promote</SelectItem>
                                  <SelectItem value="delete">Delete</SelectItem>
                                </SelectContent>
                              </Select>
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

          {/* Notices Tab */}
          <TabsContent value="notices" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>System Notices</span>
                    <Button>
                      <Bell className="w-4 h-4 mr-2" />
                      Create Notice
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemNotices.map((notice) => (
                      <div key={notice.id} className="flex items-center justify-between p-4 rounded-lg bg-accent/50">
                        <div className="flex-1">
                          <h4 className="font-medium">{notice.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs capitalize">
                              {notice.type}
                            </Badge>
                            <Badge 
                              variant={notice.priority === 'high' ? 'destructive' : 'default'} 
                              className="text-xs"
                            >
                              {notice.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(notice.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={notice.isActive ? 'default' : 'secondary'}>
                            {notice.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Platform Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Site Name</label>
                      <input 
                        type="text" 
                        defaultValue="Web3Blog Platform" 
                        className="w-full p-2 border rounded-lg bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Site Description</label>
                      <textarea 
                        defaultValue="A modern Web3-inspired blogging platform"
                        className="w-full p-2 border rounded-lg bg-background h-20"
                      />
                    </div>
                    <Button className="w-full">Save Settings</Button>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Content Moderation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-approve blogs</span>
                      <input type="checkbox" className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Require email verification</span>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enable comments</span>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                    <Button className="w-full">Update Moderation</Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}