import { Twitter } from 'lucide-react';
import { BaseCard } from '../BaseCard';
import { Tags } from '../Tags';
import { Note } from '../../../utils/note';

interface TweetCardProps {
  note: Note;
  onShare?: () => void;
  onDelete?: () => void;
}

export function TweetCard({ note, onShare, onDelete }: TweetCardProps) {
  return (
    <BaseCard
      title={note.title}
      icon={Twitter}
      onShare={onShare}
      onDelete={onDelete}
    >
      {note.content && (
        <p className="text-gray-600 mb-4 text-lg">{note.content}</p>
      )}
      <Tags tags={note.tags} />
      <p className="text-sm text-gray-500">{note.date}</p>
    </BaseCard>
  );
}