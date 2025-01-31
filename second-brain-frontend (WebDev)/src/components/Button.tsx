import { ReactElement } from "react";

interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  text: string;
  icon?: ReactElement;
  onClick: () => void;
}

const variantStyles = {
  "primary": "bg-purple-600 text-black",
  "secondary": "bg-blue-100 text-purple"
}

const sizeStyles = {
  "sm": "px-2 py-1 text-sm",
  "md": "px-4 py-2 text-md",
  "lg": "px-8 py-3 text-lg"
}

const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} rounded-[10px] flex cursor-pointer`}>
      {props.icon}
      {props.text}
    </button>
  )
}

export default Button