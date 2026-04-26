export type ApiResponse<T> = {
  data: T;
  alerts: string[];
  message: string;
};

export type ApiErrorResponse = {
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  monthlyIncome: number;
};

export type Budget = {
  id: string;
  monthlyIncome: number;
  investmentPercentage: number;
  fixedExpenses: number;
  health: number;
  education: number;
  leisure: number;
  freeReserve: number;
};

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'FIXED' | 'VARIABLE';
  category: {
    id: string;
    name: string;
  };
};

export type InvestmentPlan = {
  id: string;
  investmentPercentage: number;
  goal: string;
  months: number;
  profile: 'CONSERVATIVE' | 'MODERATE' | 'BOLD';
  monthlyRecommendedAmount: number;
  projectedTotalWithoutInterest: number;
  incomeCommitmentPercentage: number;
};

export type Dashboard = {
  monthlyIncome: number;
  totalExpenses: number;
  totalPlannedInvestment: number;
  remainingBalance: number;
  categoryPercentages: Record<string, number>;
  alerts: string[];
  motivationalQuote: string;
};

export type AuthPayload = {
  token: string;
  user: User;
};
