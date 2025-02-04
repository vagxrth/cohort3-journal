import { Video } from 'lucide-react';
import { BaseCard } from '../BaseCard';
import { Tags } from '../Tags';
import { Note } from '../../../utils/note';
import { getYouTubeVideoId } from '../../../utils/urlHelper';


interface VideoCardProps {
  note: Note;
  onShare?: () => void;
  onDelete?: () => void;
}

export function VideoCard({ note, onShare, onDelete }: VideoCardProps) {
  const videoId = note.url ? getYouTubeVideoId(note.url) : null;

  return (
    <BaseCard
      title={note.title}
      icon={Video}
      onShare={onShare}
      onDelete={onDelete}
    >
      {videoId ? (
        <div className="mb-4 aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={note.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ) : (
        <div className="mb-4 aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          <Video className="w-12 h-12" />
        </div>
      )}
      <Tags tags={note.tags} />
      <p className="text-sm text-gray-500">{note.date}</p>
    </BaseCard>
  );
}