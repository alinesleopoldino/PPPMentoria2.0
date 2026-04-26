import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: ReactNode;
};

export function Button({ children, className = '', variant = 'primary', icon, ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-emeraldDeep text-white shadow-premium hover:bg-emeraldSoft',
    secondary: 'border border-gold bg-goldSoft/40 text-emeraldDeep hover:bg-goldSoft',
    ghost: 'text-emeraldDeep hover:bg-emeraldDeep/5',
  };

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
