'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const hadiths = [
  {
    text: "The best of people are those who benefit others.",
    source: "Prophet Muhammad (PBUH)",
    reference: "Ahmad"
  },
  {
    text: "Kindness is a mark of faith, and whoever is not kind has no faith.",
    source: "Prophet Muhammad (PBUH)",
    reference: "Muslim"
  },
  {
    text: "The believer is not one who eats while his neighbor goes hungry.",
    source: "Prophet Muhammad (PBUH)",
    reference: "Bukhari"
  },
  {
    text: "Speak good or remain silent.",
    source: "Prophet Muhammad (PBUH)",
    reference: "Bukhari & Muslim"
  },
  {
    text: "The world is green and beautiful, and Allah has appointed you as His stewards over it.",
    source: "Prophet Muhammad (PBUH)",
    reference: "Muslim"
  }
];

export function HadithBox() {
  const [currentHadith, setCurrentHadith] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHadith((prev) => (prev + 1) % hadiths.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleRotate = () => {
    setIsRotating(true);
    setCurrentHadith((prev) => (prev + 1) % hadiths.length);
    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <Card className="glass overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Daily Hadith
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRotate}
              disabled={isRotating}
              className="h-8 w-8"
            >
              <RotateCw className={`h-4 w-4 ${isRotating ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHadith}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <blockquote className="text-foreground italic leading-relaxed">
              "{hadiths[currentHadith].text}"
            </blockquote>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">{hadiths[currentHadith].source}</p>
              <p className="text-xs">{hadiths[currentHadith].reference}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-border/50"
            >
              <div className="space-y-2">
                <h4 className="font-medium text-sm">All Hadiths</h4>
                <div className="grid grid-cols-1 gap-2">
                  {hadiths.map((hadith, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentHadith(index)}
                      className={`text-left p-2 rounded-lg transition-colors text-xs ${
                        index === currentHadith
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-accent text-muted-foreground'
                      }`}
                    >
                      {hadith.text.substring(0, 50)}...
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}