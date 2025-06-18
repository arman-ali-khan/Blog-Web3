'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  Code,
  Quote,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Type,
  Palette,
  Upload,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ content, onChange, placeholder = "Tell your story..." }: RichTextEditorProps) {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [editorRef, setEditorRef] = useState<HTMLDivElement | null>(null);

  const executeCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef) {
      onChange(editorRef.innerHTML);
    }
  }, [editorRef, onChange]);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        executeCommand('insertImage', imageUrl);
        toast.success('Image uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  }, [executeCommand]);

  const insertLink = useCallback(() => {
    if (linkUrl && linkText) {
      const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">${linkText}</a>`;
      executeCommand('insertHTML', linkHtml);
      setLinkUrl('');
      setLinkText('');
      setIsLinkDialogOpen(false);
    }
  }, [linkUrl, linkText, executeCommand]);

  const insertImage = useCallback(() => {
    if (imageUrl) {
      const imageHtml = `<img src="${imageUrl}" alt="${imageAlt}" class="max-w-full h-auto rounded-lg my-4 mx-auto block" />`;
      executeCommand('insertHTML', imageHtml);
      setImageUrl('');
      setImageAlt('');
      setIsImageDialogOpen(false);
    }
  }, [imageUrl, imageAlt, executeCommand]);

  const handleEditorChange = useCallback(() => {
    if (editorRef) {
      onChange(editorRef.innerHTML);
    }
  }, [editorRef, onChange]);

  const toolbarGroups = [
    {
      name: 'Text Formatting',
      tools: [
        { icon: Bold, command: 'bold', tooltip: 'Bold (Ctrl+B)' },
        { icon: Italic, command: 'italic', tooltip: 'Italic (Ctrl+I)' },
        { icon: Underline, command: 'underline', tooltip: 'Underline (Ctrl+U)' },
        { icon: Strikethrough, command: 'strikeThrough', tooltip: 'Strikethrough' },
        { icon: Code, command: 'formatBlock', value: 'pre', tooltip: 'Code Block' },
      ]
    },
    {
      name: 'Headings',
      tools: [
        { icon: Heading1, command: 'formatBlock', value: 'h1', tooltip: 'Heading 1' },
        { icon: Heading2, command: 'formatBlock', value: 'h2', tooltip: 'Heading 2' },
        { icon: Heading3, command: 'formatBlock', value: 'h3', tooltip: 'Heading 3' },
        { icon: Type, command: 'formatBlock', value: 'p', tooltip: 'Paragraph' },
      ]
    },
    {
      name: 'Lists & Quotes',
      tools: [
        { icon: List, command: 'insertUnorderedList', tooltip: 'Bullet List' },
        { icon: ListOrdered, command: 'insertOrderedList', tooltip: 'Numbered List' },
        { icon: Quote, command: 'formatBlock', value: 'blockquote', tooltip: 'Quote' },
      ]
    },
    {
      name: 'Alignment',
      tools: [
        { icon: AlignLeft, command: 'justifyLeft', tooltip: 'Align Left' },
        { icon: AlignCenter, command: 'justifyCenter', tooltip: 'Align Center' },
        { icon: AlignRight, command: 'justifyRight', tooltip: 'Align Right' },
      ]
    },
    {
      name: 'History',
      tools: [
        { icon: Undo, command: 'undo', tooltip: 'Undo (Ctrl+Z)' },
        { icon: Redo, command: 'redo', tooltip: 'Redo (Ctrl+Y)' },
      ]
    }
  ];

  return (
    <div className="border rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="border-b bg-muted/30 p-3">
        <div className="flex flex-wrap items-center gap-1">
          {toolbarGroups.map((group, groupIndex) => (
            <div key={group.name} className="flex items-center">
              {group.tools.map((tool, toolIndex) => {
                const Icon = tool.icon;
                return (
                  <Button
                    key={toolIndex}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => executeCommand(tool.command, tool.value)}
                    title={tool.tooltip}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                );
              })}
              {groupIndex < toolbarGroups.length - 1 && (
                <Separator orientation="vertical" className="mx-1 h-6" />
              )}
            </div>
          ))}
          
          <Separator orientation="vertical" className="mx-1 h-6" />
          
          {/* Link Dialog */}
          <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Insert Link">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Insert Link</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="link-text">Link Text</Label>
                  <Input
                    id="link-text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="Enter link text"
                  />
                </div>
                <div>
                  <Label htmlFor="link-url">URL</Label>
                  <Input
                    id="link-url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsLinkDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={insertLink}>Insert Link</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Image Dialog */}
          <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Insert Image">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Insert Image</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="image-upload">Upload Image</Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                </div>
                <div className="text-center text-muted-foreground">or</div>
                <div>
                  <Label htmlFor="image-url">Image URL</Label>
                  <Input
                    id="image-url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="image-alt">Alt Text</Label>
                  <Input
                    id="image-alt"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Describe the image"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsImageDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={insertImage}>Insert Image</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Upload Image Button */}
          <label htmlFor="direct-image-upload" className="cursor-pointer">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Upload Image" asChild>
              <span>
                <Upload className="h-4 w-4" />
              </span>
            </Button>
            <input
              id="direct-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={setEditorRef}
        contentEditable
        className="min-h-[400px] p-6 focus:outline-none prose prose-lg max-w-none dark:prose-invert"
        style={{
          lineHeight: '1.6',
          fontSize: '18px',
        }}
        onInput={handleEditorChange}
        onKeyDown={(e) => {
          // Handle keyboard shortcuts
          if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
              case 'b':
                e.preventDefault();
                executeCommand('bold');
                break;
              case 'i':
                e.preventDefault();
                executeCommand('italic');
                break;
              case 'u':
                e.preventDefault();
                executeCommand('underline');
                break;
              case 'z':
                e.preventDefault();
                executeCommand('undo');
                break;
              case 'y':
                e.preventDefault();
                executeCommand('redo');
                break;
            }
          }
        }}
        dangerouslySetInnerHTML={{ __html: content }}
        data-placeholder={placeholder}
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        
        [contenteditable] h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin: 1.5rem 0 1rem 0;
          line-height: 1.2;
        }
        
        [contenteditable] h2 {
          font-size: 1.875rem;
          font-weight: 600;
          margin: 1.25rem 0 0.75rem 0;
          line-height: 1.3;
        }
        
        [contenteditable] h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.4;
        }
        
        [contenteditable] p {
          margin: 1rem 0;
          line-height: 1.6;
        }
        
        [contenteditable] blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }
        
        [contenteditable] li {
          margin: 0.5rem 0;
        }
        
        [contenteditable] pre {
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          margin: 1rem 0;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
        }
        
        [contenteditable] code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: 'Courier New', monospace;
        }
      `}</style>
    </div>
  );
}