'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import * as Icons from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Web Development',
    icon: 'Globe',
    count: 245,
    color: 'blue',
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
    subcategories: [
      { name: 'Web Security', count: 28 },
      { name: 'Network Security', count: 16 },
      { name: 'Ethical Hacking', count: 10 }
    ]
  }
];

export function CategoryList() {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/50',
      yellow: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/50',
      purple: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/50',
      green: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/50',
      orange: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/50',
      pink: 'text-pink-600 bg-pink-100 dark:text-pink-400 dark:bg-pink-900/50',
      indigo: 'text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/50',
      red: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/50'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <Card className="glass">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <span>Blog Categories</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {categories.map((category, index) => {
          const isExpanded = expandedCategories.includes(category.id);
          const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<any>;
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="space-y-1"
            >
              <div className="flex items-center justify-between">
                <Link 
                  href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center space-x-3 flex-1 group"
                >
                  <div className={`p-2 rounded-lg ${getColorClasses(category.color)}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </Link>
                
                {category.subcategories.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleCategory(category.id)}
                    className="h-6 w-6 ml-2"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                )}
              </div>

              <AnimatePresence>
                {isExpanded && category.subcategories.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-12 space-y-1"
                  >
                    {category.subcategories.map((subcategory, subIndex) => (
                      <motion.div
                        key={subcategory.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: subIndex * 0.05 }}
                      >
                        <Link
                          href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}/${subcategory.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors group"
                        >
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            {subcategory.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {subcategory.count}
                          </Badge>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: categories.length * 0.05 }}
          className="pt-4 border-t border-border/50"
        >
          <Link href="/categories">
            <Button variant="outline" className="w-full text-sm">
              View All Categories
            </Button>
          </Link>
        </motion.div>
      </CardContent>
    </Card>
  );
}