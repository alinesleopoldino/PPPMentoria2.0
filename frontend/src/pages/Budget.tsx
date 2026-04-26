import { zodResolver } from '@hookform/resolvers/zod';
import { Calculator, WalletCards } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { CurrencyInput } from '../components/ui/CurrencyInput';
import { EmptyState } from '../components/ui/EmptyState';
import { Input } from '../components/ui/Input';
import { LoadingState } from '../components/ui/LoadingState';
import { getApiErrorMessage } from '../services/api';
import { createBudget, getCurrentBudget, updateBudget } from '../services/budgetService';
import { Budget as BudgetType } from '../types/api';
import { formatCurrency, formatPercent, parseCurrencyInput } from '../utils/formatters';

const schema = z.object({
  monthlyIncome: z.coerce.number().positive(),
  investmentPercentage: z.coerce.number().min(0).max(100),
  fixedExpenses: z.coerce.number().min(0),
  health: z.coerce.number().min(0),
  education: z.coerce.number().min(0),
  leisure: z.coerce.number().min(0),
  freeReserve: z.coerce.number().min(0),
});

type FormData = z.infer<typeof schema>;

export function Budget() {
  const [budget, setBudget] = useState<BudgetType | null>(null);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const currencyRegisterOptions = { setValueAs: (value: unknown) => parseCurrencyInput(String(value)) };

  useEffect(() => {
    getCurrentBudget()
      .then((response) => {
        setBudget(response.data);
        reset(response.data);
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, [reset]);

  const values = watch();
  const committed = useMemo(() => {
    const income = Number(values.monthlyIncome || 0);
    const total =
      Number(values.fixedExpenses || 0) +
      Number(values.health || 0) +
      Number(values.education || 0) +
      Number(values.leisure || 0) +
      Number(values.freeReserve || 0);
    return income > 0 ? (total / income) * 100 : 0;
  }, [values]);

  async function onSubmit(data: FormData) {
    setError('');
    try {
      const response = budget ? await updateBudget(budget.id, data) : await createBudget(data);
      setBudget(response.data);
      setAlerts(response.alerts);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  if (loading) {
    return <LoadingState label="Carregando orcamento..." />;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-md border border-emeraldDeep/10 bg-white p-5 shadow-premium">
        <h2 className="text-xl font-black text-emeraldDeep">Orcamento mensal</h2>
        <p className="mt-1 text-sm text-ink/60">Distribua sua renda e acompanhe o quanto esta comprometido.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <CurrencyInput label="Renda mensal" placeholder="Ex.: 4.000,00" {...register('monthlyIncome', currencyRegisterOptions)} />
          <Input label="Percentual para investimentos" type="number" step="0.01" {...register('investmentPercentage')} />
          <CurrencyInput label="Despesas fixas" placeholder="Ex.: 1.500,00" {...register('fixedExpenses', currencyRegisterOptions)} />
          <CurrencyInput label="Saude" placeholder="Ex.: 200,00" {...register('health', currencyRegisterOptions)} />
          <CurrencyInput label="Estudos" placeholder="Ex.: 300,00" {...register('education', currencyRegisterOptions)} />
          <CurrencyInput label="Lazer" placeholder="Ex.: 250,00" {...register('leisure', currencyRegisterOptions)} />
          <CurrencyInput label="Reserva" placeholder="Ex.: 500,00" {...register('freeReserve', currencyRegisterOptions)} />
        </div>
        <div className="mt-5 space-y-3">
          <Alert messages={Number(values.investmentPercentage || 0) < 5 ? ['Comecar com pelo menos 5% fortalece o habito de investir.'] : []} />
          <Alert messages={alerts} type="success" />
          <Alert messages={error ? [error] : []} type="error" />
          <Button disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : budget ? 'Atualizar orcamento' : 'Cadastrar orcamento'}</Button>
        </div>
      </form>

      <section className="rounded-md border border-emeraldDeep/10 bg-white p-5 shadow-premium">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-goldSoft p-3 text-emeraldDeep">
            <Calculator className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-emeraldDeep">Resumo automatico</h2>
            <p className="text-sm text-ink/60">Percentual comprometido pelas categorias.</p>
          </div>
        </div>
        {Number(values.monthlyIncome || 0) > 0 ? (
          <div className="mt-6 space-y-4">
            <p className="text-4xl font-black text-gold">{formatPercent(committed)}</p>
            <p className="text-sm text-ink/60">Renda informada: {formatCurrency(Number(values.monthlyIncome || 0))}</p>
            <div className="h-3 rounded-full bg-emeraldDeep/10">
              <div className="h-3 rounded-full bg-emeraldDeep" style={{ width: `${Math.min(committed, 100)}%` }} />
            </div>
          </div>
        ) : (
          <EmptyState icon={<WalletCards />} title="Informe sua renda" description="O calculo aparece assim que voce preencher os valores." />
        )}
      </section>
    </div>
  );
}
