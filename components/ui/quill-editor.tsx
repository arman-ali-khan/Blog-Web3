'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface QuillEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
}

export function QuillEditor({ 
  content, 
  onChange, 
  placeholder = "Tell your story...",
  label,
  error 
}: QuillEditorProps) {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [ReactQuill, setReactQuill] = useState<any>(null);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import ReactQuill to avoid SSR issues
    const loadQuill = async () => {
      try {
        const { default: QuillComponent } = await import('react-quill');
        await import('react-quill/dist/quill.snow.css');
        setReactQuill(() => QuillComponent);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load Quill editor:', error);
        setIsLoading(false);
      }
    };

    loadQuill();
  }, []);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      [{ 'align': [] }],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'color', 'background',
    'align', 'code-block'
  ];

  if (isLoading) {
    return (
      <div className="space-y-2">
        {label && <Label className="text-sm font-medium">{label}</Label>}
        <div className="border rounded-lg overflow-hidden bg-background">
          <div className="flex items-center justify-center h-64 bg-muted/30">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading editor...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!ReactQuill) {
    return (
      <div className="space-y-2">
        {label && <Label className="text-sm font-medium">{label}</Label>}
        <div className="border rounded-lg overflow-hidden bg-background">
          <div className="flex items-center justify-center h-64 bg-muted/30">
            <span className="text-muted-foreground">Failed to load editor</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      {label && <Label className="text-sm font-medium">{label}</Label>}
      <div 
        className={`quill-editor-container border rounded-lg overflow-hidden bg-background ${
          error ? 'border-red-500' : 'border-input'
        }`}
      >
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={{
            minHeight: '300px',
          }}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <style jsx global>{`
        .quill-editor-container .ql-toolbar {
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid hsl(var(--border));
          background: hsl(var(--muted) / 0.3);
        }

        .quill-editor-container .ql-container {
          border: none;
          font-size: 16px;
          line-height: 1.6;
        }

        .quill-editor-container .ql-editor {
          min-height: 300px;
          padding: 1.5rem;
          color: hsl(var(--foreground));
        }

        .quill-editor-container .ql-editor.ql-blank::before {
          color: hsl(var(--muted-foreground));
          font-style: normal;
        }

        /* Dark theme adjustments */
        .dark .quill-editor-container .ql-toolbar {
          background: hsl(var(--muted) / 0.5);
        }

        .dark .quill-editor-container .ql-stroke {
          stroke: hsl(var(--foreground));
        }

        .dark .quill-editor-container .ql-fill {
          fill: hsl(var(--foreground));
        }

        .dark .quill-editor-container .ql-picker {
          color: hsl(var(--foreground));
        }

        .dark .quill-editor-container .ql-picker-options {
          background: hsl(var(--background));
          border: 1px solid hsl(var(--border));
        }

        .dark .quill-editor-container .ql-picker-item:hover {
          background: hsl(var(--accent));
        }

        .dark .quill-editor-container .ql-toolbar button:hover {
          background: hsl(var(--accent));
        }

        .dark .quill-editor-container .ql-toolbar button.ql-active {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
        }

        /* Light theme adjustments */
        .quill-editor-container .ql-stroke {
          stroke: hsl(var(--foreground));
        }

        .quill-editor-container .ql-fill {
          fill: hsl(var(--foreground));
        }

        .quill-editor-container .ql-picker {
          color: hsl(var(--foreground));
        }

        .quill-editor-container .ql-picker-options {
          background: hsl(var(--background));
          border: 1px solid hsl(var(--border));
        }

        .quill-editor-container .ql-picker-item:hover {
          background: hsl(var(--accent));
        }

        .quill-editor-container .ql-toolbar button:hover {
          background: hsl(var(--accent));
        }

        .quill-editor-container .ql-toolbar button.ql-active {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
        }

        /* Content styling */
        .quill-editor-container .ql-editor h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin: 1.5rem 0 1rem 0;
          line-height: 1.2;
        }

        .quill-editor-container .ql-editor h2 {
          font-size: 1.875rem;
          font-weight: 600;
          margin: 1.25rem 0 0.75rem 0;
          line-height: 1.3;
        }

        .quill-editor-container .ql-editor h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.4;
        }

        .quill-editor-container .ql-editor p {
          margin: 0.75rem 0;
          line-height: 1.6;
        }

        .quill-editor-container .ql-editor blockquote {
          border-left: 4px solid hsl(var(--primary));
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: hsl(var(--muted-foreground));
        }

        .quill-editor-container .ql-editor ul, 
        .quill-editor-container .ql-editor ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }

        .quill-editor-container .ql-editor li {
          margin: 0.25rem 0;
        }

        .quill-editor-container .ql-editor pre {
          background-color: hsl(var(--muted));
          padding: 1rem;
          border-radius: 0.5rem;
          margin: 1rem 0;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
        }

        .quill-editor-container .ql-editor code {
          background-color: hsl(var(--muted));
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: 'Courier New', monospace;
        }

        .quill-editor-container .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }

        .quill-editor-container .ql-editor a {
          color: hsl(var(--primary));
          text-decoration: underline;
        }

        .quill-editor-container .ql-editor a:hover {
          text-decoration: none;
        }
      `}</style>
    </motion.div>
  );
}