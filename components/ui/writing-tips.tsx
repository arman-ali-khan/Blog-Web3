'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Lightbulb, CheckCircle, Target, Users, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const writingTips = [
  {
    icon: Target,
    title: "Start with a compelling hook",
    description: "Your first sentence should grab attention and make readers want to continue.",
    type: "essential"
  },
  {
    icon: Users,
    title: "Know your audience",
    description: "Write for your specific readers. Use language and examples they'll understand and relate to.",
    type: "important"
  },
  {
    icon: Eye,
    title: "Use clear, descriptive headings",
    description: "Break up your content with headings that tell readers what to expect in each section.",
    type: "helpful"
  },
  {
    icon: Lightbulb,
    title: "Show, don't just tell",
    description: "Use specific examples, stories, and data to support your points rather than making abstract statements.",
    type: "helpful"
  },
  {
    icon: CheckCircle,
    title: "Edit ruthlessly",
    description: "Remove unnecessary words, fix grammar, and ensure every sentence adds value to your story.",
    type: "essential"
  }
];

const warnings = [
  "Avoid clickbait titles that don't match your content",
  "Don't publish without proofreading for spelling and grammar errors",
  "Ensure all images have proper attribution and alt text",
  "Check that all links work and open in appropriate windows",
  "Make sure your content is original and not plagiarized"
];

export function WritingTips() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showWarnings, setShowWarnings] = useState(false);

  return (
    <div className="space-y-4">
      {/* Warning Alert */}
      <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
        <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-yellow-800 dark:text-yellow-200">
            Review our writing guidelines before publishing to ensure quality content.
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowWarnings(!showWarnings)}
            className="text-yellow-700 hover:text-yellow-900 dark:text-yellow-300 dark:hover:text-yellow-100"
          >
            {showWarnings ? 'Hide' : 'Show'} Guidelines
          </Button>
        </AlertDescription>
      </Alert>

      {/* Warnings List */}
      <AnimatePresence>
        {showWarnings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Important Guidelines
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowWarnings(false)}
                    className="h-6 w-6 p-0 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <ul className="space-y-2">
                  {warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-red-700 dark:text-red-300 flex items-start">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                      {warning}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Writing Tips */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold flex items-center">
              <Lightbulb className="w-4 h-4 mr-2 text-primary" />
              Writing Tips
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </Button>
          </div>
          
          <div className="space-y-3">
            {writingTips.slice(0, isExpanded ? writingTips.length : 2).map((tip, index) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors"
                >
                  <div className={`p-1.5 rounded-lg ${
                    tip.type === 'essential' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' :
                    tip.type === 'important' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400' :
                    'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                  }`}>
                    <Icon className="w-3 h-3" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-sm mb-1">{tip.title}</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tip.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}