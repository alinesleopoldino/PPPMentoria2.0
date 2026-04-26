import { ReactNode } from 'react';

export function EmptyState({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-md border border-dashed border-emeraldDeep/20 bg-white p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-goldSoft/40 text-emeraldDeep">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-bold text-emeraldDeep">{title}</h3>
      <p className="mt-1 text-sm text-ink/60">{description}</p>
    </div>
  );
}
