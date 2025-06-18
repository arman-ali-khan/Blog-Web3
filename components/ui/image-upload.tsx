'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  label: string;
  description?: string;
  aspectRatio?: string;
  maxSize?: string;
}

export function ImageUpload({ 
  value, 
  onChange, 
  onRemove, 
  label, 
  description,
  aspectRatio = "16:9",
  maxSize = "2MB"
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = useCallback((file: File) => {
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      toast.error(`File size must be less than ${maxSize}`);
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // In a real app, you would upload to a server
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
      toast.success('Image uploaded successfully');
    };
    reader.readAsDataURL(file);
  }, [onChange, maxSize]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleUrlSubmit = useCallback(() => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl('');
      toast.success('Image URL added successfully');
    }
  }, [imageUrl, onChange]);

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">{label}</Label>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      {value ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <div className={`relative overflow-hidden rounded-lg border-2 border-dashed border-border aspect-${aspectRatio}`}>
            <img
              src={value}
              alt="Uploaded image"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="destructive"
                size="sm"
                onClick={onRemove}
                className="bg-red-600 hover:bg-red-700"
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        </motion.div>
      ) : (
        <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload" className="flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload</span>
                </TabsTrigger>
                <TabsTrigger value="url" className="flex items-center space-x-2">
                  <LinkIcon className="w-4 h-4" />
                  <span>URL</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-4">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging 
                      ? 'border-primary bg-primary/5' 
                      : 'border-muted-foreground/25 hover:border-primary/50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Drag and drop an image here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports JPG, PNG, GIF up to {maxSize}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </TabsContent>

              <TabsContent value="url" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="image-url">Image URL</Label>
                    <Input
                      id="image-url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    onClick={handleUrlSubmit} 
                    disabled={!imageUrl}
                    className="w-full"
                  >
                    Add Image URL
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}