import { useEffect, useRef } from 'react';
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
  const tweetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tweetId && tweetContainerRef.current) {
      // Clean up previous tweet
      tweetContainerRef.current.innerHTML = '';
      
      // Create new tweet
      const loadTweet = async () => {
        if (window.twttr) {
          try {
            await window.twttr.widgets.createTweet(
              tweetId,
              tweetContainerRef.current!,
              {
                conversation: 'none'
              }
            );
          } catch (error) {
            console.error('Error embedding tweet:', error);
          }
        }
      };

      loadTweet();
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
        <div ref={tweetContainerRef} className="mb-4" />
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