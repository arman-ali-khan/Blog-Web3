'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { WritingTips } from '@/components/ui/writing-tips';
import { ImageUpload } from '@/components/ui/image-upload';
import { toast } from 'sonner';

const categories = [
  'Web Development', 'JavaScript', 'React', 'Vue.js', 'Angular', 'Node.js',
  'Python', 'AI/ML', 'Data Science', 'Mobile Development', 'DevOps',
  'Cybersecurity', 'Blockchain', 'Web3', 'Design', 'UI/UX', 'Database',
  'Cloud Computing', 'Game Development', 'Tutorial', 'Opinion', 'News'
];

export default function CreateBlogPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [blogData, setBlogData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    thumbnail: '',
    socialThumbnail: '',
    status: 'draft' // draft, published, scheduled
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!blogData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!blogData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }
    
    if (!blogData.content.trim() || blogData.content === '<p></p>' || blogData.content === '<div></div>') {
      newErrors.content = 'Content is required';
    }
    
    if (!blogData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (status: 'draft' | 'published') => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedBlogData = { ...blogData, status };
      
      if (status === 'published') {
        toast.success('Blog published successfully!');
        router.push('/dashboard');
      } else {
        toast.success('Blog saved as draft');
      }
    } catch (error) {
      toast.error('Failed to save blog. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">Please log in to create a blog post.</p>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Create New Blog</h1>
              <p className="text-muted-foreground">
                Share your knowledge with the community
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => handleSave('draft')}
                disabled={isLoading}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={() => handleSave('published')}
                disabled={isLoading}
              >
                Publish
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Writing Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <WritingTips />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Blog Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter your blog title..."
                      value={blogData.title}
                      onChange={(e) => setBlogData(prev => ({ ...prev, title: e.target.value }))}
                      className={`text-lg font-semibold ${errors.title ? 'border-red-500' : ''}`}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm">{errors.title}</p>
                    )}
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief description of your blog post..."
                      value={blogData.excerpt}
                      onChange={(e) => setBlogData(prev => ({ ...prev, excerpt: e.target.value }))}
                      className={`h-20 ${errors.excerpt ? 'border-red-500' : ''}`}
                    />
                    {errors.excerpt && (
                      <p className="text-red-500 text-sm">{errors.excerpt}</p>
                    )}
                  </div>

                  {/* Rich Text Editor */}
                  <div className="space-y-2">
                    <Label>Content *</Label>
                    <RichTextEditor
                      content={blogData.content}
                      onChange={(content) => setBlogData(prev => ({ ...prev, content }))}
                      placeholder="Tell your story..."
                    />
                    {errors.content && (
                      <p className="text-red-500 text-sm">{errors.content}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Blog Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Blog Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Category */}
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={blogData.category}
                      onValueChange={(value) => setBlogData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-red-500 text-sm">{errors.category}</p>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="Enter tags separated by commas"
                      value={blogData.tags}
                      onChange={(e) => setBlogData(prev => ({ ...prev, tags: e.target.value }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Separate tags with commas (e.g., react, javascript, tutorial)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Thumbnail Upload */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Blog Thumbnail</CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageUpload
                    value={blogData.thumbnail}
                    onChange={(url) => setBlogData(prev => ({ ...prev, thumbnail: url }))}
                    onRemove={() => setBlogData(prev => ({ ...prev, thumbnail: '' }))}
                    label="Main Thumbnail"
                    description="This image will be displayed in blog listings and previews"
                    aspectRatio="16/9"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Sharing Thumbnail */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Social Sharing Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageUpload
                    value={blogData.socialThumbnail}
                    onChange={(url) => setBlogData(prev => ({ ...prev, socialThumbnail: url }))}
                    onRemove={() => setBlogData(prev => ({ ...prev, socialThumbnail: '' }))}
                    label="Social Media Thumbnail"
                    description="Optimized for social media sharing (1200x630px recommended)"
                    aspectRatio="1200/630"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {blogData.thumbnail && (
                      <img
                        src={blogData.thumbnail}
                        alt="Preview"
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="font-bold line-clamp-2">
                        {blogData.title || 'Your blog title will appear here'}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {blogData.excerpt || 'Your blog excerpt will appear here'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {blogData.category && (
                        <Badge variant="outline" className="text-xs">
                          {blogData.category}
                        </Badge>
                      )}
                      {blogData.tags && (
                        blogData.tags.split(',').slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag.trim()}
                          </Badge>
                        ))
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}