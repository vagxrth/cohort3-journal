import React from 'react';
import { Share2, Trash2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface BaseCardProps {
  title: string;
  icon: LucideIcon;
  children?: React.ReactNode;
  onShare?: () => void;
  onDelete?: () => void;
}

export function BaseCard({ title, icon: Icon, children, onShare, onDelete }: BaseCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="flex gap-2">
          <button 
            className="text-gray-400 hover:text-gray-600"
            onClick={onShare}
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            className="text-gray-400 hover:text-gray-600"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}