export function LoadingState({ label = 'Carregando informacoes...' }: { label?: string }) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-md border border-emeraldDeep/10 bg-white">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-emeraldDeep border-t-gold" />
      <span className="ml-3 text-sm font-semibold text-emeraldDeep">{label}</span>
    </div>
  );
}
