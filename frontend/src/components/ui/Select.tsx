import { forwardRef, SelectHTMLAttributes } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: Array<{ label: string; value: string }>;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, options, className = '', ...props },
  ref,
) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-emeraldDeep">{label}</span>
      <select
        ref={ref}
        className={`w-full rounded-md border border-emeraldDeep/15 bg-white px-3 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  );
});
