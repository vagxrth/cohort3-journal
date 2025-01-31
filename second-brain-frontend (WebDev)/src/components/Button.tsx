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
  "sm": "w-30 h-10",
  "md": "w-50 h-20",
  "lg": "w-70 h-30"
}

const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} rounded-[10px] flex`}>
      {props.icon}
      {props.text}
    </button>
  )
}

export default Button