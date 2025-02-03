import { FileText } from 'lucide-react';
import { BaseCard } from '../BaseCard';
import { Tags } from '../Tags';
import { Note } from '../../../utils/note';

interface DocumentCardProps {
  note: Note;
  onShare?: () => void;
  onDelete?: () => void;
}


export function DocumentCard({ note, onShare, onDelete }: DocumentCardProps) {
  return (
    <BaseCard
      title={note.title}
      icon={FileText}
      onShare={onShare}
      onDelete={onDelete}
    >
      {note.content && (
        <p className="text-gray-600 mb-4 whitespace-pre-line">{note.content}</p>
      )}
      <Tags tags={note.tags} />
      <p className="text-sm text-gray-500">{note.date}</p>
    </BaseCard>
  );
}