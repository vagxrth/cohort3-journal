import { Video } from 'lucide-react';
import { BaseCard } from '../BaseCard';
import { Tags } from '../Tags';

interface Note {
    id: string;
    type: 'document' | 'video' | 'tweet' | 'link';
    title: string;
    content?: string;
    tags: string[];
    date: string;
    url?: string;
    thumbnail?: string;
}

interface VideoCardProps {
  note: Note;
  onShare?: () => void;
  onDelete?: () => void;
}


export function VideoCard({ note, onShare, onDelete }: VideoCardProps) {
  return (
    <BaseCard
      title={note.title}
      icon={Video}
      onShare={onShare}
      onDelete={onDelete}
    >
      {note.thumbnail && (
        <div className="mb-4 aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={note.thumbnail} 
            alt={note.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <Tags tags={note.tags} />
      <p className="text-sm text-gray-500">{note.date}</p>
    </BaseCard>
  );
}