import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Note } from '../utils/note';
import { getTweetId, getYouTubeVideoId } from '../utils/urlHelper';

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (note: Omit<Note, 'id' | 'date'>) => void;
}

export function AddContent({ isOpen, onClose, onSubmit }: AddContentModalProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<'video' | 'tweet'>('video');
  const [error, setError] = useState('');

  const validateUrl = (url: string, type: 'video' | 'tweet'): boolean => {
    if (type === 'video') {
      return !!getYouTubeVideoId(url);
    } else {
      return !!getTweetId(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUrl(url, type)) {
      setError(`Invalid ${type === 'video' ? 'YouTube' : 'Twitter'} URL`);
      return;
    }

    const newNote: Omit<Note, 'id' | 'date'> = {
      type,
      title,
      url,
      tags: ['productivity']
    };

    onSubmit(newNote);
    setTitle('');
    setUrl('');
    setType('video');
    setError('');
    onClose();
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Content">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Content Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="video"
                checked={type === 'video'}
                onChange={(e) => setType(e.target.value as 'video')}
                className="mr-2"
              />
              YouTube Video
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="tweet"
                checked={type === 'tweet'}
                onChange={(e) => setType(e.target.value as 'tweet')}
                className="mr-2"
              />
              Tweet
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={handleUrlChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={type === 'video' ? 'YouTube video URL' : 'Tweet URL'}
            required
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Content
          </Button>
        </div>
      </form>
    </Modal>
  );
}