import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { InvestmentPlan } from '../../types/api';

export function InvestmentProjectionChart({ plan }: { plan?: InvestmentPlan }) {
  const data = Array.from({ length: plan?.months ?? 6 }, (_, index) => ({
    month: index + 1,
    total: plan ? plan.monthlyRecommendedAmount * (index + 1) : 0,
  }));

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d9e3d8" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="total" stroke="#0f3d2e" fill="#d9a441" fillOpacity={0.35} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
