'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, Upload, Image as ImageIcon, Link as LinkIcon, Bold, Italic, List, ListOrdered, Quote, Code, Heading1, Heading2, Heading3 } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';
import { toast } from 'sonner';

// Rich Text Editor Component
function RichTextEditor({ content, onChange }: { content: string; onChange: (content: string) => void }) {
  const [isPreview, setIsPreview] = useState(false);

  const insertText = (before: string, after: string = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
    
    onChange(newText);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const toolbarButtons = [
    { icon: Heading1, action: () => insertText('# '), label: 'Heading 1' },
    { icon: Heading2, action: () => insertText('## '), label: 'Heading 2' },
    { icon: Heading3, action: () => insertText('### '), label: 'Heading 3' },
    { icon: Bold, action: () => insertText('**', '**'), label: 'Bold' },
    { icon: Italic, action: () => insertText('*', '*'), label: 'Italic' },
    { icon: List, action: () => insertText('- '), label: 'Bullet List' },
    { icon: ListOrdered, action: () => insertText('1. '), label: 'Numbered List' },
    { icon: Quote, action: () => insertText('> '), label: 'Quote' },
    { icon: Code, action: () => insertText('`', '`'), label: 'Inline Code' },
    { icon: LinkIcon, action: () => insertText('[', '](url)'), label: 'Link' },
    { icon: ImageIcon, action: () => insertText('![alt text](', ')'), label: 'Image' },
  ];

  const renderPreview = (text: string) => {
    // Simple markdown-like rendering for preview
    return text
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 rounded">$1</code>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-primary pl-4 italic">$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^1\. (.*$)/gm, '<li>$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 flex-wrap">
          {toolbarButtons.map((button, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={button.action}
              title={button.label}
              className="h-8 w-8 p-0"
            >
              <button.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={isPreview ? 'outline' : 'default'}
            size="sm"
            onClick={() => setIsPreview(false)}
          >
            Edit
          </Button>
          <Button
            variant={isPreview ? 'default' : 'outline'}
            size="sm"
            onClick={() => setIsPreview(true)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      {isPreview ? (
        <div 
          className="min-h-[400px] p-4 border rounded-lg bg-background prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: renderPreview(content) }}
        />
      ) : (
        <Textarea
          id="content-editor"
          placeholder="Write your blog content here... Use markdown syntax for formatting."
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[400px] font-mono text-sm"
        />
      )}
    </div>
  );
}

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
  const [activeTab, setActiveTab] = useState('write');
  
  const [blogData, setBlogData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    thumbnail: '',
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
    
    if (!blogData.content.trim()) {
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

  const handleImageUpload = () => {
    // Simulate image upload
    const imageUrl = "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2";
    setBlogData(prev => ({ ...prev, thumbnail: imageUrl }));
    toast.success('Thumbnail uploaded successfully');
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
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
                      className={errors.title ? 'border-red-500' : ''}
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

                  {/* Content Editor */}
                  <div className="space-y-2">
                    <Label>Content *</Label>
                    <RichTextEditor
                      content={blogData.content}
                      onChange={(content) => setBlogData(prev => ({ ...prev, content }))}
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
              transition={{ delay: 0.2 }}
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

                  {/* Thumbnail */}
                  <div className="space-y-2">
                    <Label>Thumbnail Image</Label>
                    {blogData.thumbnail ? (
                      <div className="space-y-2">
                        <img
                          src={blogData.thumbnail}
                          alt="Thumbnail preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setBlogData(prev => ({ ...prev, thumbnail: '' }))}
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={handleImageUpload}
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Thumbnail
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
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

            {/* Writing Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Writing Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Use clear, descriptive titles</li>
                    <li>• Write engaging excerpts to hook readers</li>
                    <li>• Break up content with headings and lists</li>
                    <li>• Add relevant images to illustrate points</li>
                    <li>• Use tags to help readers find your content</li>
                    <li>• Proofread before publishing</li>
                  </ul>
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