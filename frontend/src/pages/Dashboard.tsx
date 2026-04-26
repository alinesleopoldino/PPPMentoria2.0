import { Coins, PiggyBank, TrendingUp, WalletCards } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SummaryCard } from '../components/cards/SummaryCard';
import { CategoryChart } from '../components/charts/CategoryChart';
import { InvestmentProjectionChart } from '../components/charts/InvestmentProjectionChart';
import { MotivationalBanner } from '../components/layout/MotivationalBanner';
import { Alert } from '../components/ui/Alert';
import { EmptyState } from '../components/ui/EmptyState';
import { LoadingState } from '../components/ui/LoadingState';
import { getApiErrorMessage } from '../services/api';
import { getDashboard } from '../services/dashboardService';
import { listInvestmentPlans } from '../services/investmentService';
import { Dashboard as DashboardType, InvestmentPlan } from '../types/api';
import { formatCurrency } from '../utils/formatters';

export function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardType | null>(null);
  const [latestPlan, setLatestPlan] = useState<InvestmentPlan | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [dashboardResponse, plansResponse] = await Promise.all([getDashboard(), listInvestmentPlans()]);
        setDashboard(dashboardResponse.data);
        setLatestPlan(plansResponse.data[0]);
      } catch (err) {
        setError(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <LoadingState label="Carregando dashboard financeiro..." />;
  }

  if (error) {
    return <Alert messages={[error]} type="error" />;
  }

  if (!dashboard) {
    return <EmptyState icon={<WalletCards />} title="Dashboard indisponivel" description="Cadastre seus dados financeiros para iniciar." />;
  }

  const hasCategories = Object.keys(dashboard.categoryPercentages).length > 0;

  return (
    <div className="space-y-6">
      <MotivationalBanner quote={dashboard.motivationalQuote} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Renda mensal" value={formatCurrency(dashboard.monthlyIncome)} icon={<WalletCards />} />
        <SummaryCard title="Total de despesas" value={formatCurrency(dashboard.totalExpenses)} icon={<Coins />} />
        <SummaryCard title="Investimento planejado" value={formatCurrency(dashboard.totalPlannedInvestment)} icon={<PiggyBank />} accent />
        <SummaryCard title="Saldo restante" value={formatCurrency(dashboard.remainingBalance)} icon={<TrendingUp />} />
      </div>

      <Alert
        messages={dashboard.alerts}
        type={dashboard.alerts.some((alert) => alert.includes('Parabens')) ? 'success' : 'warning'}
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <section className="rounded-md border border-emeraldDeep/10 bg-white p-5 shadow-premium">
          <h2 className="text-lg font-black text-emeraldDeep">Distribuicao por categoria</h2>
          {hasCategories ? (
            <CategoryChart data={dashboard.categoryPercentages} />
          ) : (
            <EmptyState icon={<Coins />} title="Sem despesas" description="Cadastre despesas para visualizar a distribuicao." />
          )}
        </section>
        <section className="rounded-md border border-emeraldDeep/10 bg-white p-5 shadow-premium">
          <h2 className="text-lg font-black text-emeraldDeep">Projecao de investimentos</h2>
          {latestPlan ? (
            <InvestmentProjectionChart plan={latestPlan} />
          ) : (
            <EmptyState icon={<PiggyBank />} title="Sem plano" description="Crie um plano para acompanhar a evolucao projetada." />
          )}
        </section>
      </div>
    </div>
  );
}
