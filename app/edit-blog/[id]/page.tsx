'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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
import { QuillEditor } from '@/components/ui/quill-editor';
import { WritingTips } from '@/components/ui/writing-tips';
import { ImageUpload } from '@/components/ui/image-upload';
import { toast } from 'sonner';

const categories = [
  'Web Development', 'JavaScript', 'React', 'Vue.js', 'Angular', 'Node.js',
  'Python', 'AI/ML', 'Data Science', 'Mobile Development', 'DevOps',
  'Cybersecurity', 'Blockchain', 'Web3', 'Design', 'UI/UX', 'Database',
  'Cloud Computing', 'Game Development', 'Tutorial', 'Opinion', 'News'
];

// Mock blog data for editing
const mockBlogData = {
  1: {
    id: 1,
    title: "Getting Started with React Hooks",
    excerpt: "Learn the fundamentals of React Hooks and how they can simplify your component logic...",
    content: `
      <h2>Introduction to React Hooks</h2>
      <p>React Hooks revolutionized how we write React components by allowing us to use state and other React features in functional components.</p>
      
      <h3>What are React Hooks?</h3>
      <p>Hooks are functions that let you "hook into" React state and lifecycle features from function components. They don't work inside classes — they let you use React without classes.</p>
      
      <h3>The useState Hook</h3>
      <p>The useState Hook lets you add React state to function components:</p>
      <pre><code>import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
      
      <h3>The useEffect Hook</h3>
      <p>The useEffect Hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined.</p>
      
      <h3>Rules of Hooks</h3>
      <ul>
        <li>Only call Hooks at the top level</li>
        <li>Only call Hooks from React functions</li>
        <li>Don't call Hooks inside loops, conditions, or nested functions</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>React Hooks provide a more direct API to the React concepts you already know. They offer a powerful and expressive way to reuse stateful logic between components.</p>
    `,
    category: "React",
    tags: "react, hooks, javascript, frontend",
    thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2",
    socialThumbnail: "",
    status: "published",
    publishedAt: "2024-01-10T10:00:00Z"
  }
};

export default function EditBlogPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBlog, setIsLoadingBlog] = useState(true);
  
  const [blogData, setBlogData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    thumbnail: '',
    socialThumbnail: '',
    status: 'draft' as 'draft' | 'published' | 'pending'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load blog data
  useEffect(() => {
    const loadBlog = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockBlog = mockBlogData[blogId as keyof typeof mockBlogData];
        if (mockBlog) {
          setBlogData({
            title: mockBlog.title,
            excerpt: mockBlog.excerpt,
            content: mockBlog.content,
            category: mockBlog.category,
            tags: mockBlog.tags,
            thumbnail: mockBlog.thumbnail,
            socialThumbnail: mockBlog.socialThumbnail,
            status: mockBlog.status as 'draft' | 'published' | 'pending'
          });
        } else {
          toast.error('Blog not found');
          router.push('/dashboard');
        }
      } catch (error) {
        toast.error('Failed to load blog');
        router.push('/dashboard');
      } finally {
        setIsLoadingBlog(false);
      }
    };

    if (blogId) {
      loadBlog();
    }
  }, [blogId, router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!blogData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!blogData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }
    
    if (!blogData.content.trim() || blogData.content === '<p><br></p>' || blogData.content === '<p></p>') {
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
        toast.success('Blog updated and published successfully!');
      } else {
        toast.success('Blog updated and saved as draft');
      }
      
      router.push('/dashboard');
    } catch (error) {
      toast.error('Failed to update blog. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = (content: string) => {
    setBlogData(prev => ({ ...prev, content }));
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: '' }));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">Please log in to edit blog posts.</p>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoadingBlog) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading blog...</p>
          </div>
        </div>
        <Footer />
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
              <h1 className="text-4xl font-bold mb-2">Edit Blog</h1>
              <p className="text-muted-foreground">
                Update your blog post
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
                {blogData.status === 'published' ? 'Update' : 'Publish'}
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

                  {/* Quill Editor */}
                  <QuillEditor
                    label="Content *"
                    content={blogData.content}
                    onChange={handleContentChange}
                    placeholder="Tell your story..."
                    error={errors.content}
                  />
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
                  {/* Status */}
                  <div className="space-y-2">
                    <Label>Current Status</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        blogData.status === 'published' ? 'default' :
                        blogData.status === 'pending' ? 'outline' : 'secondary'
                      }>
                        {blogData.status.charAt(0).toUpperCase() + blogData.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

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