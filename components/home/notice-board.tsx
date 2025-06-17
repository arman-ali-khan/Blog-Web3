'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, ChevronRight, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const notices = [
  {
    id: 1,
    type: 'announcement',
    title: 'Platform Update v2.1',
    message: 'New features including dark mode, improved editor, and performance enhancements.',
    timestamp: '2024-01-15T10:00:00Z',
    icon: Info,
    color: 'blue'
  },
  {
    id: 2,
    type: 'maintenance',
    title: 'Scheduled Maintenance',
    message: 'Server maintenance scheduled for Jan 20, 2024 from 2:00 AM to 4:00 AM UTC.',
    timestamp: '2024-01-14T15:30:00Z',
    icon: AlertTriangle,
    color: 'yellow'
  },
  {
    id: 3,
    type: 'success',
    title: 'Community Milestone',
    message: 'We\'ve reached 10,000 published articles! Thank you to all our amazing contributors.',
    timestamp: '2024-01-13T12:00:00Z',
    icon: CheckCircle,
    color: 'green'
  },
  {
    id: 4,
    type: 'alert',
    title: 'Security Update',
    message: 'Please update your passwords for enhanced security. Two-factor authentication is now available.',
    timestamp: '2024-01-12T09:00:00Z',
    icon: AlertCircle,
    color: 'red'
  }
];

export function NoticeBoard() {
  const [dismissedNotices, setDismissedNotices] = useState<number[]>([]);

  const activeNotices = notices.filter(notice => !dismissedNotices.includes(notice.id));

  const dismissNotice = (id: number) => {
    setDismissedNotices(prev => [...prev, id]);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950 dark:border-blue-800',
      yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950 dark:border-yellow-800',
      green: 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800',
      red: 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800'
    };
    return colors[color as keyof typeof colors] || colors.blue;
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
    <Card className="glass">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-primary" />
          <span>Notice Board</span>
          {activeNotices.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {activeNotices.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <AnimatePresence>
          {activeNotices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-muted-foreground"
            >
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No new notices</p>
            </motion.div>
          ) : (
            activeNotices.slice(0, 3).map((notice, index) => {
              const Icon = notice.icon;
              return (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-3 rounded-lg border ${getColorClasses(notice.color)}`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm line-clamp-1">
                          {notice.title}
                        </h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => dismissNotice(notice.id)}
                          className="h-6 w-6 opacity-50 hover:opacity-100"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xs opacity-90 line-clamp-2 mb-2">
                        {notice.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs opacity-75">
                          {formatTimeAgo(notice.timestamp)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                        >
                          Read More
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
        
        {activeNotices.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center pt-2"
          >
            <Button variant="outline" size="sm" className="text-xs">
              View All Notices ({activeNotices.length - 3} more)
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}