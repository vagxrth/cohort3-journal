import { useState } from 'react';
import { Share2, PlusCircle } from 'lucide-react';
import { Button } from './Button';
import { Note } from '../utils/note';
import { NoteCard } from './cards/NoteCard';
import { AddContent } from './AddContent';

export function ContentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      type: "document",
      title: "Project Ideas",
      content: "Future Projects\n• Build a personal knowledge base\n• Create a habit tracker\n• Design a minimalist todo app",
      tags: ["productivity", "ideas"],
      date: "Added on 10/03/2024"
    },
    {
      id: '2',
      type: "video",
      title: "How to Build a Second Brain",
      tags: ["productivity", "learning"],
      date: "Added on 09/03/2024",
      thumbnail: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: '3',
      type: "tweet",
      title: "Productivity Tip",
      content: "The best way to learn is to build in public. Share your progress, get feedback, and help others along the way.",
      tags: ["productivity", "learning"],
      date: "Added on 08/03/2024"
    }
  ]);

  const handleShare = (noteId: string) => {
    console.log('Share note:', noteId);
  };

  const handleDelete = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const handleAddContent = (newNote: Omit<Note, 'id' | 'date'>) => {
    const note: Note = {
      ...newNote,
      id: Math.random().toString(36).substr(2, 9),
      date: `Added on ${new Date().toLocaleDateString('en-GB')}`
    };
    setNotes([note, ...notes]);
  };

  return (
    <main className="flex-1 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">All Notes</h2>
          <div className="flex gap-4">
            <Button variant="secondary" icon={Share2}>
              Share Brain
            </Button>
            <Button 
              variant="primary" 
              icon={PlusCircle}
              onClick={() => setIsModalOpen(true)}
            >
              Add Content
            </Button>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onShare={() => handleShare(note.id)}
              onDelete={() => handleDelete(note.id)}
            />
          ))}
        </div>

        <AddContent
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddContent}
        />
      </div>
    </main>
  );
}