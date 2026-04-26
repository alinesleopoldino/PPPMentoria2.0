import { forwardRef, InputHTMLAttributes } from 'react';
import { formatCurrencyInput } from '../../utils/formatters';

type CurrencyInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  error?: string;
};

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(function CurrencyInput(
  { label, error, className = '', onBlur, ...props },
  ref,
) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-emeraldDeep">{label}</span>
      <input
        ref={ref}
        inputMode="numeric"
        className={`w-full rounded-md border border-emeraldDeep/15 bg-white px-3 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25 ${className}`}
        onBlur={(event) => {
          event.target.value = formatCurrencyInput(event.target.value);
          onBlur?.(event);
        }}
        {...props}
      />
      {error ? <span className="text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  );
});
