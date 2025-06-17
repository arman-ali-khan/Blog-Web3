'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AdBoxProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  buttonText?: string;
  href?: string;
  size?: 'small' | 'medium' | 'large';
}

export function AdBox({ 
  title = "Premium Web3 Courses",
  description = "Learn blockchain development with our comprehensive courses. Get certified and boost your career in Web3.",
  imageUrl = "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2",
  buttonText = "Explore Courses",
  href = "#",
  size = "medium"
}: AdBoxProps) {
  const sizeClasses = {
    small: "h-32",
    medium: "h-48",
    large: "h-64"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="glass overflow-hidden cursor-pointer group">
        <div className="relative">
          <div 
            className={`${sizeClasses[size]} bg-gradient-secondary rounded-t-lg relative overflow-hidden`}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
            <div className="absolute top-2 right-2">
              <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-medium">
                Sponsored
              </span>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              {description}
            </p>
            <Button 
              className="w-full group-hover:bg-primary/90 transition-colors"
              onClick={() => window.open(href, '_blank')}
            >
              {buttonText}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}