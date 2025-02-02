import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  icon?: typeof LucideIcon;
  onClick?: () => void;
}

export function Button({ variant = 'primary', children, icon: Icon, onClick }: ButtonProps) {
  const baseStyles = "flex items-center gap-2 px-4 py-2 rounded-lg";
  const variants = {
    primary: "text-white bg-indigo-600 hover:bg-indigo-700",
    secondary: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]}`}
      onClick={onClick}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}