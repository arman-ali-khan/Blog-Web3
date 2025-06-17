'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Calendar, User, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';

// Mock notice data
const mockNotices = {
  '1': {
    id: 1,
    type: 'announcement',
    title: 'Platform Update v2.1 Released',
    message: 'We\'ve released a major update with new features including dark mode, improved editor, performance enhancements, and better mobile experience.',
    content: `
      <h3>What's New in v2.1</h3>
      <p>We're excited to announce the release of Platform v2.1, packed with new features and improvements based on your feedback.</p>
      
      <h4>🌙 Dark Mode</h4>
      <p>Toggle between light and dark themes to match your preference and reduce eye strain during late-night writing sessions.</p>
      
      <h4>✍️ Enhanced Editor</h4>
      <p>Our new rich text editor includes:</p>
      <ul>
        <li>Better formatting options</li>
        <li>Improved image handling</li>
        <li>Code syntax highlighting</li>
        <li>Real-time collaboration features</li>
      </ul>
      
      <h4>⚡ Performance Improvements</h4>
      <p>We've optimized the platform for better performance:</p>
      <ul>
        <li>40% faster page load times</li>
        <li>Reduced memory usage</li>
        <li>Better caching mechanisms</li>
        <li>Optimized database queries</li>
      </ul>
      
      <h4>📱 Mobile Experience</h4>
      <p>Enhanced mobile responsiveness with:</p>
      <ul>
        <li>Improved touch interactions</li>
        <li>Better navigation on small screens</li>
        <li>Optimized mobile editor</li>
        <li>Faster mobile loading</li>
      </ul>
      
      <h4>🔍 Enhanced Search</h4>
      <p>Find content faster with our improved search functionality:</p>
      <ul>
        <li>Advanced filtering options</li>
        <li>Category-based search</li>
        <li>Author and tag filtering</li>
        <li>Search suggestions</li>
      </ul>
      
      <h3>What's Next?</h3>
      <p>We're already working on v2.2, which will include:</p>
      <ul>
        <li>Advanced analytics dashboard</li>
        <li>Social media integration</li>
        <li>Email newsletter features</li>
        <li>Community forums</li>
      </ul>
      
      <p>We're committed to continuously improving your blogging experience. Thank you for your feedback and support!</p>
      
      <p><strong>Need help?</strong> Check out our <a href="/help">help center</a> or contact our support team.</p>
    `,
    timestamp: '2024-01-15T10:00:00Z',
    icon: Info,
    color: 'blue',
    priority: 'high',
    author: 'Platform Team',
    readTime: '3 min read'
  }
};

export default function SingleNoticePage() {
  const params = useParams();
  const noticeId = params.id as string;
  
  // Get notice data (fallback to notice 1 if not found)
  const notice = mockNotices[noticeId as keyof typeof mockNotices] || mockNotices['1'];
  const Icon = notice.icon;

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
          <Link href="/notices">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Notices
            </Button>
          </Link>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Notice Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className={`glass border ${getColorClasses(notice.color)}`}>
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className={`p-4 rounded-xl ${getColorClasses(notice.color)} flex-shrink-0`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <Badge variant={getPriorityBadge(notice.priority) as any}>
                        {notice.priority.toUpperCase()} PRIORITY
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {notice.type}
                      </Badge>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                      {notice.title}
                    </h1>
                    
                    <p className="text-lg text-muted-foreground mb-6">
                      {notice.message}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{notice.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(notice.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Bell className="w-4 h-4" />
                        <span>{notice.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notice Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass">
              <CardContent className="p-8">
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: notice.content }}
                />
                
                <Separator className="my-8" />
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Published by <strong>{notice.author}</strong> on {formatDate(notice.timestamp)}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Share Notice
                    </Button>
                    <Link href="/notices">
                      <Button size="sm">
                        View All Notices
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Related Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Card className="glass">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Need Help?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/help">
                    <Button variant="outline" className="w-full justify-start">
                      <Info className="w-4 h-4 mr-2" />
                      Help Center
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}