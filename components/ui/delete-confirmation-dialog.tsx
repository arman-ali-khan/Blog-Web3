'use client';

import { useState } from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface DeleteConfirmationDialogProps {
  title?: string;
  description?: string;
  itemName?: string;
  onConfirm: () => void;
  isLoading?: boolean;
  triggerText?: string;
  triggerVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  triggerSize?: 'default' | 'sm' | 'lg' | 'icon';
  showIcon?: boolean;
}

export function DeleteConfirmationDialog({
  title = 'Are you absolutely sure?',
  description,
  itemName = 'this item',
  onConfirm,
  isLoading = false,
  triggerText = 'Delete',
  triggerVariant = 'destructive',
  triggerSize = 'sm',
  showIcon = true
}: DeleteConfirmationDialogProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  const defaultDescription = description || 
    `This action cannot be undone. This will permanently delete ${itemName} and remove all associated data from our servers.`;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          variant={triggerVariant} 
          size={triggerSize}
          disabled={isLoading}
        >
          {showIcon && <Trash2 className="w-4 h-4 mr-1" />}
          {triggerText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="glass">
        <AlertDialogHeader>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <AlertDialogTitle className="text-lg font-semibold">
              {title}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-muted-foreground leading-relaxed">
            {defaultDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}