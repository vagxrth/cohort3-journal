interface TagsProps {
  tags: string[];
}

export function Tags({ tags }: TagsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {tags.map((tag, index) => (
        <span 
          key={index} 
          className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md text-sm"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}