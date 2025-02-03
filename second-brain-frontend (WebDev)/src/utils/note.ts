export interface Note {
    id: string;
    type: 'document' | 'video' | 'tweet' | 'link';
    title: string;
    content?: string;
    tags: string[];
    date: string;
    url?: string;
    thumbnail?: string;
}