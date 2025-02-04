import { Brain, Twitter, Video, FileText, Link as LinkIcon, Hash } from 'lucide-react';

interface NavItem {
  icon: typeof Brain;
  label: string;
  href: string;
}

export function Sidebar() {
  const navItems: NavItem[] = [
    { icon: Twitter, label: 'Tweets', href: '#' },
    { icon: Video, label: 'Videos', href: '#' },
    { icon: FileText, label: 'Documents', href: '#' },
    { icon: LinkIcon, label: 'Links', href: '#' },
    { icon: Hash, label: 'Tags', href: '#' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-8">
        <Brain className="w-8 h-8 text-indigo-600" />
        <h1 className="text-xl font-semibold">Second Brain</h1>
      </div>
      
      <nav className="space-y-4">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 text-gray-700 hover:text-indigo-600"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}