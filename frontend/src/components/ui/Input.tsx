import { forwardRef, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className = '', ...props },
  ref,
) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-emeraldDeep">{label}</span>
      <input
        ref={ref}
        className={`w-full rounded-md border border-emeraldDeep/15 bg-white px-3 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25 ${className}`}
        {...props}
      />
      {error ? <span className="text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  );
});
