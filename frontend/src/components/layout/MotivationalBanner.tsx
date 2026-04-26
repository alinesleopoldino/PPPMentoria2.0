import { Coins } from 'lucide-react';

export function MotivationalBanner({ quote }: { quote: string }) {
  return (
    <div className="relative overflow-hidden rounded-md bg-emeraldDeep p-5 text-white shadow-premium">
      <div className="absolute right-4 top-3 text-7xl font-black text-gold/10">$</div>
      <div className="relative flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-gold text-emeraldDeep">
          <Coins className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-goldSoft">Mentalidade financeira</p>
          <p className="mt-1 text-lg font-semibold leading-snug">{quote}</p>
        </div>
      </div>
    </div>
  );
}
