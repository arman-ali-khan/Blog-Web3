'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, AlertCircle, Info, CheckCircle, AlertTriangle, Filter, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';

const allNotices = [
  {
    id: 1,
    type: 'announcement',
    title: 'Platform Update v2.1 Released',
    message: 'We\'ve released a major update with new features including dark mode, improved editor, performance enhancements, and better mobile experience. Check out the changelog for detailed information.',
    content: `
      <h3>What's New in v2.1</h3>
      <ul>
        <li><strong>Dark Mode:</strong> Toggle between light and dark themes</li>
        <li><strong>Enhanced Editor:</strong> New rich text editor with better formatting options</li>
        <li><strong>Performance:</strong> 40% faster page load times</li>
        <li><strong>Mobile Experience:</strong> Improved responsive design</li>
        <li><strong>Search:</strong> Enhanced search functionality with filters</li>
      </ul>
      <p>We're committed to continuously improving your blogging experience. Thank you for your feedback and support!</p>
    `,
    timestamp: '2024-01-15T10:00:00Z',
    icon: Info,
    color: 'blue',
    priority: 'high',
    author: 'Platform Team'
  },
  {
    id: 2,
    type: 'maintenance',
    title: 'Scheduled Server Maintenance',
    message: 'Server maintenance scheduled for January 20, 2024 from 2:00 AM to 4:00 AM UTC. The platform will be temporarily unavailable during this time.',
    content: `
      <h3>Maintenance Details</h3>
      <p><strong>Date:</strong> January 20, 2024</p>
      <p><strong>Time:</strong> 2:00 AM - 4:00 AM UTC</p>
      <p><strong>Duration:</strong> Approximately 2 hours</p>
      
      <h4>What to Expect:</h4>
      <ul>
        <li>Platform will be temporarily unavailable</li>
        <li>Database optimizations and security updates</li>
        <li>Server infrastructure improvements</li>
      </ul>
      
      <p>We apologize for any inconvenience and appreciate your patience.</p>
    `,
    timestamp: '2024-01-14T15:30:00Z',
    icon: AlertTriangle,
    color: 'yellow',
    priority: 'medium',
    author: 'DevOps Team'
  },
  {
    id: 3,
    type: 'success',
    title: 'Community Milestone: 10,000 Articles!',
    message: 'We\'ve reached an incredible milestone of 10,000 published articles! Thank you to all our amazing contributors who make this community thrive.',
    content: `
      <h3>Amazing Achievement!</h3>
      <p>Our community has grown tremendously, and we're proud to announce that we've reached <strong>10,000 published articles</strong>!</p>
      
      <h4>Community Stats:</h4>
      <ul>
        <li>10,000+ Published Articles</li>
        <li>2,500+ Active Contributors</li>
        <li>50,000+ Monthly Readers</li>
        <li>25+ Categories Covered</li>
      </ul>
      
      <p>This milestone wouldn't be possible without our dedicated writers, readers, and community members. Here's to the next 10,000!</p>
    `,
    timestamp: '2024-01-13T12:00:00Z',
    icon: CheckCircle,
    color: 'green',
    priority: 'low',
    author: 'Community Team'
  },
  {
    id: 4,
    type: 'alert',
    title: 'Important Security Update',
    message: 'Please update your passwords for enhanced security. Two-factor authentication is now available in your account settings.',
    content: `
      <h3>Security Enhancement</h3>
      <p>We've implemented additional security measures to protect your account and data.</p>
      
      <h4>Action Required:</h4>
      <ul>
        <li>Update your password if it's older than 6 months</li>
        <li>Enable two-factor authentication (2FA)</li>
        <li>Review your account activity</li>
      </ul>
      
      <h4>New Security Features:</h4>
      <ul>
        <li>Two-factor authentication via SMS or authenticator app</li>
        <li>Login activity monitoring</li>
        <li>Enhanced password requirements</li>
        <li>Session management</li>
      </ul>
      
      <p>Your security is our priority. Please take a moment to secure your account.</p>
    `,
    timestamp: '2024-01-12T09:00:00Z',
    icon: AlertCircle,
    color: 'red',
    priority: 'high',
    author: 'Security Team'
  },
  {
    id: 5,
    type: 'announcement',
    title: 'New Category: AI & Machine Learning',
    message: 'We\'ve added a new category for AI & Machine Learning content. Share your knowledge about artificial intelligence, machine learning, and data science.',
    content: `
      <h3>Expanding Our Content Categories</h3>
      <p>Due to popular demand, we've added a dedicated category for AI & Machine Learning content.</p>
      
      <h4>What You Can Share:</h4>
      <ul>
        <li>Machine Learning tutorials and guides</li>
        <li>AI project showcases</li>
        <li>Data science methodologies</li>
        <li>Deep learning frameworks</li>
        <li>Natural Language Processing</li>
        <li>Computer Vision projects</li>
      </ul>
      
      <p>We're excited to see the innovative content our community will create in this rapidly evolving field!</p>
    `,
    timestamp: '2024-01-11T14:20:00Z',
    icon: Info,
    color: 'blue',
    priority: 'medium',
    author: 'Content Team'
  },
  {
    id: 6,
    type: 'maintenance',
    title: 'Database Migration Completed',
    message: 'We\'ve successfully completed our database migration to improve performance and reliability. All data has been preserved.',
    content: `
      <h3>Migration Success</h3>
      <p>Our database migration has been completed successfully with zero data loss.</p>
      
      <h4>Improvements:</h4>
      <ul>
        <li>50% faster query performance</li>
        <li>Enhanced data backup systems</li>
        <li>Improved scalability</li>
        <li>Better disaster recovery</li>
      </ul>
      
      <p>You should notice improved loading times across the platform. Thank you for your patience during this process.</p>
    `,
    timestamp: '2024-01-10T11:30:00Z',
    icon: CheckCircle,
    color: 'green',
    priority: 'low',
    author: 'Technical Team'
  }
];

export default function AllNoticesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const filteredNotices = allNotices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notice.type === filterType;
    const matchesPriority = filterPriority === 'all' || notice.priority === filterPriority;
    
    return matchesSearch && matchesType && matchesPriority;
  });

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950 dark:border-blue-800',
      yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950 dark:border-yellow-800',
      green: 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800',
      red: 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'destructive',
      medium: 'default',
      low: 'secondary'
    };
    return variants[priority as keyof typeof variants] || 'secondary';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Bell className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">All Notices</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay updated with the latest announcements, maintenance schedules, and important information.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="announcement">Announcements</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="alert">Alerts</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Notices List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {filteredNotices.map((notice, index) => {
            const Icon = notice.icon;
            return (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/notices/${notice.id}`}>
                  <Card className={`glass hover:shadow-lg transition-all duration-300 group cursor-pointer border ${getColorClasses(notice.color)}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl ${getColorClasses(notice.color)} flex-shrink-0`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-xl group-hover:text-primary transition-colors line-clamp-1">
                              {notice.title}
                            </h3>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                              <Badge variant={getPriorityBadge(notice.priority) as any} className="text-xs">
                                {notice.priority.toUpperCase()}
                              </Badge>
                              <Badge variant="outline" className="text-xs capitalize">
                                {notice.type}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {notice.message}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <span>By {notice.author}</span>
                              <span>•</span>
                              <span>{formatDate(notice.timestamp)}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="group-hover:bg-accent">
                              Read More
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredNotices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No notices found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters.
            </p>
          </motion.div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}