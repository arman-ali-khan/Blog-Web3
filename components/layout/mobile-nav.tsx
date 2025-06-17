'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Search, PenTool, User, Settings, Users, FileText, Bell, BarChart3, Shield } from 'lucide-react';
import { useAuth } from '@/components/auth-provider';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Admin navigation items
  const adminNavItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/admin', icon: Shield, label: 'Admin' },
    { href: '/admin?tab=blogs', icon: FileText, label: 'Blogs' },
    { href: '/admin?tab=users', icon: Users, label: 'Users' },
    { href: '/admin?tab=notices', icon: Bell, label: 'Notices' },
  ];

  // Regular user navigation items
  const userNavItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/search', icon: Search, label: 'Search' },
    { href: '/create-blog', icon: PenTool, label: 'Write' },
    { href: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  // Guest navigation items
  const guestNavItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/search', icon: Search, label: 'Search' },
    { href: '/categories', icon: FileText, label: 'Categories' },
    { href: '/login', icon: User, label: 'Login' },
  ];

  // Determine which navigation to show
  let navItems = guestNavItems;
  if (user) {
    if (user.role === 'admin' && pathname.startsWith('/admin')) {
      navItems = adminNavItems;
    } else {
      navItems = userNavItems;
    }
  }

  return (
    <motion.nav
      className="mobile-nav glass md:hidden"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href.includes('?tab=') && pathname === item.href.split('?')[0]);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
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
        })}
      </div>
    </motion.nav>
  );
}