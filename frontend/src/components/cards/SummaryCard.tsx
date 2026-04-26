import { ReactNode } from 'react';

export function SummaryCard({
  title,
  value,
  icon,
  accent = false,
}: {
  title: string;
  value: string;
  icon: ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="rounded-md border border-emeraldDeep/10 bg-white p-5 shadow-premium">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink/55">{title}</p>
          <strong className={`mt-2 block text-2xl ${accent ? 'text-gold' : 'text-emeraldDeep'}`}>{value}</strong>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-emeraldDeep text-goldSoft">{icon}</div>
      </div>
    </div>
  );
}
