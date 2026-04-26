import { AlertTriangle, CheckCircle2 } from 'lucide-react';

type AlertProps = {
  messages: string[];
  type?: 'warning' | 'success' | 'error';
};

export function Alert({ messages, type = 'warning' }: AlertProps) {
  if (!messages.length) {
    return null;
  }

  const styles = {
    warning: 'border-gold/50 bg-goldSoft/30 text-emeraldDeep',
    success: 'border-emeraldSoft/30 bg-emeraldSoft/10 text-emeraldDeep',
    error: 'border-red-200 bg-red-50 text-red-700',
  };

  const Icon = type === 'success' ? CheckCircle2 : AlertTriangle;

  return (
    <div className={`rounded-md border p-4 ${styles[type]}`}>
      <div className="flex gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="space-y-1 text-sm font-medium">
          {messages.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
