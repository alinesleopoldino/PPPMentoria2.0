import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, PiggyBank, Trash2, TrendingUp, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { InvestmentProjectionChart } from '../components/charts/InvestmentProjectionChart';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { Input } from '../components/ui/Input';
import { LoadingState } from '../components/ui/LoadingState';
import { Select } from '../components/ui/Select';
import { getApiErrorMessage } from '../services/api';
import {
  createInvestmentPlan,
  deleteInvestmentPlan,
  listInvestmentPlans,
  updateInvestmentPlan,
} from '../services/investmentService';
import { InvestmentPlan } from '../types/api';
import { formatCurrency, formatPercent } from '../utils/formatters';

const schema = z.object({
  investmentPercentage: z.coerce.number().min(0).max(100),
  goal: z.string().min(2),
  months: z.coerce.number().int().positive(),
  profile: z.enum(['CONSERVATIVE', 'MODERATE', 'BOLD']),
});

type FormData = z.infer<typeof schema>;

export function Investments() {
  const [plans, setPlans] = useState<InvestmentPlan[]>([]);
  const [editingPlan, setEditingPlan] = useState<InvestmentPlan | null>(null);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { profile: 'CONSERVATIVE' } });

  async function loadPlans() {
    const response = await listInvestmentPlans();
    setPlans(response.data);
  }

  useEffect(() => {
    loadPlans()
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  async function onSubmit(data: FormData) {
    setError('');
    try {
      const response = editingPlan
        ? await updateInvestmentPlan(editingPlan.id, data)
        : await createInvestmentPlan(data);
      setAlerts(response.alerts);
      setEditingPlan(null);
      reset({ profile: 'CONSERVATIVE' });
      await loadPlans();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  function handleEdit(plan: InvestmentPlan) {
    setEditingPlan(plan);
    setAlerts([]);
    reset({
      investmentPercentage: plan.investmentPercentage,
      goal: plan.goal,
      months: plan.months,
      profile: plan.profile,
    });
  }

  function handleCancelEdit() {
    setEditingPlan(null);
    reset({ profile: 'CONSERVATIVE' });
  }

  async function handleDelete(planId: string) {
    setError('');
    try {
      await deleteInvestmentPlan(planId);
      if (editingPlan?.id === planId) {
        handleCancelEdit();
      }
      await loadPlans();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  if (loading) {
    return <LoadingState label="Carregando investimentos..." />;
  }

  const latestPlan = plans[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-md border border-emeraldDeep/10 bg-white p-5 shadow-premium">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-emeraldDeep">
              {editingPlan ? 'Editar plano de investimento' : 'Planejamento de investimentos'}
            </h2>
            <p className="mt-1 text-sm text-ink/60">Transforme disciplina em possibilidades.</p>
          </div>
          {editingPlan ? (
            <button
              type="button"
              title="Cancelar edicao"
              className="rounded-md bg-emeraldDeep/5 p-2 text-emeraldDeep"
              onClick={handleCancelEdit}
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        <div className="mt-6 space-y-4">
          <Input label="Percentual da renda" type="number" step="0.01" {...register('investmentPercentage')} />
          <Input label="Objetivo" {...register('goal')} />
          <Input label="Prazo em meses" type="number" {...register('months')} />
          <Select
            label="Perfil"
            options={[
              { label: 'Conservador', value: 'CONSERVATIVE' },
              { label: 'Moderado', value: 'MODERATE' },
              { label: 'Arrojado', value: 'BOLD' },
            ]}
            {...register('profile')}
          />
          <Alert messages={alerts.length ? alerts : ['Comecar com 5% da renda ja cria consistencia para o futuro.']} type={alerts.some((alert) => alert.includes('Parabens')) ? 'success' : 'warning'} />
          <Alert messages={error ? [error] : []} type="error" />
          <Button disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : editingPlan ? 'Atualizar plano' : 'Criar plano'}
          </Button>
        </div>
      </form>

      <section className="space-y-5">
        <div className="rounded-md border border-emeraldDeep/10 bg-white p-5 shadow-premium">
          <h2 className="text-xl font-black text-emeraldDeep">Projecao</h2>
          {latestPlan ? <InvestmentProjectionChart plan={latestPlan} /> : <EmptyState icon={<TrendingUp />} title="Sem projecao" description="Crie um plano para visualizar o acumulado sem juros." />}
        </div>
        <div className="rounded-md border border-emeraldDeep/10 bg-white p-5 shadow-premium">
          <h2 className="text-lg font-black text-emeraldDeep">Planos cadastrados</h2>
          <div className="mt-4 space-y-3">
            {plans.length ? (
              plans.map((plan) => (
                <div key={plan.id} className="rounded-md border border-emeraldDeep/10 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-emeraldDeep">{plan.goal}</p>
                      <p className="text-sm text-ink/55">{plan.months} meses · {formatPercent(plan.incomeCommitmentPercentage)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        title="Editar"
                        className="rounded-md bg-goldSoft p-2 text-emeraldDeep"
                        onClick={() => handleEdit(plan)}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        title="Excluir"
                        className="rounded-md bg-red-50 p-2 text-red-600"
                        onClick={() => handleDelete(plan.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
                    <span>Mensal: <strong>{formatCurrency(plan.monthlyRecommendedAmount)}</strong></span>
                    <span>Total: <strong>{formatCurrency(plan.projectedTotalWithoutInterest)}</strong></span>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState icon={<PiggyBank />} title="Nenhum plano" description="Cadastre um objetivo de investimento para comecar." />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
