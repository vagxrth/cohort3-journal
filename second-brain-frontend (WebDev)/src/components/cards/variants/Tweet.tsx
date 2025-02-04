import { useEffect } from 'react';
import { Twitter } from 'lucide-react';
import { BaseCard } from '../BaseCard';
import { Tags } from '../Tags';
import { Note } from '../../../utils/note';
import { getTweetId } from '../../../utils/urlHelper';

interface TweetCardProps {
  note: Note;
  onShare?: () => void;
  onDelete?: () => void;
}

export function TweetCard({ note, onShare, onDelete }: TweetCardProps) {
  const tweetId = note.url ? getTweetId(note.url) : null;

  useEffect(() => {
    // Load Twitter widget script
    if (tweetId && window.twttr) {
      window.twttr.widgets.load();
    }
  }, [tweetId]);

  return (
    <BaseCard
      title={note.title}
      icon={Twitter}
      onShare={onShare}
      onDelete={onDelete}
    >
      {tweetId ? (
        <div className="mb-4">
          <blockquote className="twitter-tweet" data-conversation="none">
            <a href={note.url}></a>
          </blockquote>
        </div>
      ) : (
        <div className="mb-4 p-6 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          <Twitter className="w-12 h-12" />
        </div>
      )}
      <Tags tags={note.tags} />
      <p className="text-sm text-gray-500">{note.date}</p>
    </BaseCard>
  );
}