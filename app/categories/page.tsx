'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid, List, Filter } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';
import * as Icons from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Web Development',
    icon: 'Globe',
    count: 245,
    color: 'blue',
    description: 'Frontend, backend, and full-stack development tutorials and guides',
    subcategories: [
      { name: 'Frontend', count: 128 },
      { name: 'Backend', count: 89 },
      { name: 'Full Stack', count: 28 }
    ]
  },
  {
    id: 2,
    name: 'JavaScript',
    icon: 'Code',
    count: 189,
    color: 'yellow',
    description: 'Modern JavaScript, frameworks, and best practices',
    subcategories: [
      { name: 'React', count: 67 },
      { name: 'Vue.js', count: 34 },
      { name: 'Node.js', count: 56 },
      { name: 'Vanilla JS', count: 32 }
    ]
  },
  {
    id: 3,
    name: 'AI & Machine Learning',
    icon: 'Brain',
    count: 134,
    color: 'purple',
    description: 'Artificial intelligence, machine learning, and data science',
    subcategories: [
      { name: 'Deep Learning', count: 45 },
      { name: 'NLP', count: 28 },
      { name: 'Computer Vision', count: 33 },
      { name: 'MLOps', count: 28 }
    ]
  },
  {
    id: 4,
    name: 'Mobile Development',
    icon: 'Smartphone',
    count: 98,
    color: 'green',
    description: 'iOS, Android, and cross-platform mobile app development',
    subcategories: [
      { name: 'React Native', count: 42 },
      { name: 'Flutter', count: 31 },
      { name: 'iOS', count: 15 },
      { name: 'Android', count: 10 }
    ]
  },
  {
    id: 5,
    name: 'DevOps',
    icon: 'Settings',
    count: 87,
    color: 'orange',
    description: 'Deployment, CI/CD, containerization, and infrastructure',
    subcategories: [
      { name: 'Docker', count: 34 },
      { name: 'Kubernetes', count: 23 },
      { name: 'CI/CD', count: 18 },
      { name: 'AWS', count: 12 }
    ]
  },
  {
    id: 6,
    name: 'Design',
    icon: 'Palette',
    count: 76,
    color: 'pink',
    description: 'UI/UX design, graphic design, and design systems',
    subcategories: [
      { name: 'UI/UX', count: 45 },
      { name: 'Graphic Design', count: 19 },
      { name: 'Web Design', count: 12 }
    ]
  },
  {
    id: 7,
    name: 'Database',
    icon: 'Database',
    count: 65,
    color: 'indigo',
    description: 'SQL, NoSQL, database design, and optimization',
    subcategories: [
      { name: 'SQL', count: 34 },
      { name: 'NoSQL', count: 21 },
      { name: 'MongoDB', count: 10 }
    ]
  },
  {
    id: 8,
    name: 'Cybersecurity',
    icon: 'Shield',
    count: 54,
    color: 'red',
    description: 'Security best practices, ethical hacking, and privacy',
    subcategories: [
      { name: 'Web Security', count: 28 },
      { name: 'Network Security', count: 16 },
      { name: 'Ethical Hacking', count: 10 }
    ]
  },
  {
    id: 9,
    name: 'Cloud Computing',
    icon: 'Cloud',
    count: 92,
    color: 'cyan',
    description: 'AWS, Azure, Google Cloud, and cloud architecture',
    subcategories: [
      { name: 'AWS', count: 45 },
      { name: 'Azure', count: 28 },
      { name: 'Google Cloud', count: 19 }
    ]
  },
  {
    id: 10,
    name: 'Blockchain',
    icon: 'Link',
    count: 43,
    color: 'emerald',
    description: 'Cryptocurrency, smart contracts, and Web3 development',
    subcategories: [
      { name: 'Ethereum', count: 22 },
      { name: 'Bitcoin', count: 12 },
      { name: 'DeFi', count: 9 }
    ]
  },
  {
    id: 11,
    name: 'Data Science',
    icon: 'BarChart3',
    count: 78,
    color: 'violet',
    description: 'Data analysis, visualization, and statistical modeling',
    subcategories: [
      { name: 'Python', count: 34 },
      { name: 'R', count: 22 },
      { name: 'Visualization', count: 22 }
    ]
  },
  {
    id: 12,
    name: 'Game Development',
    icon: 'Gamepad2',
    count: 56,
    color: 'rose',
    description: 'Game engines, programming, and game design',
    subcategories: [
      { name: 'Unity', count: 28 },
      { name: 'Unreal Engine', count: 18 },
      { name: 'Indie Games', count: 10 }
    ]
  }
];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');

  const filteredCategories = categories
    .filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'count':
          return b.count - a.count;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/50',
      yellow: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/50',
      purple: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/50',
      green: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/50',
      orange: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/50',
      pink: 'text-pink-600 bg-pink-100 dark:text-pink-400 dark:bg-pink-900/50',
      indigo: 'text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/50',
      red: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/50',
      cyan: 'text-cyan-600 bg-cyan-100 dark:text-cyan-400 dark:bg-cyan-900/50',
      emerald: 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/50',
      violet: 'text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-900/50',
      rose: 'text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-900/50'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Blog Categories</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our diverse collection of topics and find the content that interests you most.
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
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="count">Sort by Count</SelectItem>
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
        </motion.div>

        {/* Categories Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredCategories.map((category, index) => {
            const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<any>;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Card className="glass hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
                    <CardContent className={viewMode === 'grid' ? 'p-6' : 'p-4'}>
                      <div className={viewMode === 'grid' ? 'text-center' : 'flex items-center space-x-4'}>
                        <div className={`${getColorClasses(category.color)} p-3 rounded-xl ${viewMode === 'grid' ? 'w-16 h-16 mx-auto mb-4' : 'w-12 h-12'} flex items-center justify-center`}>
                          <IconComponent className={viewMode === 'grid' ? 'w-8 h-8' : 'w-6 h-6'} />
                        </div>
                        
                        <div className={viewMode === 'grid' ? '' : 'flex-1'}>
                          <div className={`flex items-center ${viewMode === 'grid' ? 'justify-center' : 'justify-between'} mb-2`}>
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                              {category.name}
                            </h3>
                            <Badge variant="secondary" className="ml-2">
                              {category.count}
                            </Badge>
                          </div>
                          
                          <p className={`text-muted-foreground text-sm ${viewMode === 'grid' ? 'mb-4' : 'mb-2'}`}>
                            {category.description}
                          </p>
                          
                          {viewMode === 'grid' && (
                            <div className="flex flex-wrap gap-1 justify-center">
                              {category.subcategories.slice(0, 3).map((sub) => (
                                <Badge key={sub.name} variant="outline" className="text-xs">
                                  {sub.name}
                                </Badge>
                              ))}
                              {category.subcategories.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{category.subcategories.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                          
                          {viewMode === 'list' && (
                            <div className="flex flex-wrap gap-1">
                              {category.subcategories.slice(0, 4).map((sub) => (
                                <Badge key={sub.name} variant="outline" className="text-xs">
                                  {sub.name} ({sub.count})
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No categories found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse all categories.
            </p>
          </motion.div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}