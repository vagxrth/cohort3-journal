import { Note } from "../../utils/note";
import { DocumentCard } from "./variants/Document";
import { TweetCard } from "./variants/Tweet";
import { VideoCard } from "./variants/Video";

interface NoteCardProps {
  note: Note;
  onShare?: () => void;
  onDelete?: () => void;
}

export function NoteCard({ note, onShare, onDelete }: NoteCardProps) {
  switch (note.type) {
    case 'document':
      return <DocumentCard note={note} onShare={onShare} onDelete={onDelete} />;
    case 'video':
      return <VideoCard note={note} onShare={onShare} onDelete={onDelete} />;
    case 'tweet':
      return <TweetCard note={note} onShare={onShare} onDelete={onDelete} />;
    default:
      return null;
  }
}