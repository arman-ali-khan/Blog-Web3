'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Footer } from '@/components/layout/footer';
import { HadithBox } from '@/components/home/hadith-box';
import { AdBox } from '@/components/home/ad-box';
import { FeaturedBlogs } from '@/components/home/featured-blogs';
import { PopularBlogs } from '@/components/home/popular-blogs';
import { RecentBlogs } from '@/components/home/recent-blogs';
import { NoticeBoard } from '@/components/home/notice-board';
import { CategoryList } from '@/components/home/category-list';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HadithBox />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AdBox />
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <FeaturedBlogs />
            <PopularBlogs />
            <RecentBlogs />
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <NoticeBoard />
            <AdBox />
            <CategoryList />
          </motion.div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}