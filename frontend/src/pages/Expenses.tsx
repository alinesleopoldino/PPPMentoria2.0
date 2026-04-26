import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { CurrencyInput } from '../components/ui/CurrencyInput';
import { EmptyState } from '../components/ui/EmptyState';
import { Input } from '../components/ui/Input';
import { LoadingState } from '../components/ui/LoadingState';
import { Select } from '../components/ui/Select';
import { getApiErrorMessage } from '../services/api';
import { Category, listCategories } from '../services/categoryService';
import { createExpense, deleteExpense, listExpenses, updateExpense } from '../services/expenseService';
import { Expense } from '../types/api';
import { formatCurrency } from '../utils/formatters';
import { parseCurrencyInput } from '../utils/formatters';

const schema = z.object({
  description: z.string().min(2),
  amount: z.coerce.number().positive('O valor deve ser maior que zero.'),
  categoryId: z.string().min(1),
  date: z.string().min(1),
  type: z.enum(['FIXED', 'VARIABLE']),
});

type FormData = z.infer<typeof schema>;

export function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function loadExpenses() {
    const response = await listExpenses();
    setExpenses(response.data);
  }

  useEffect(() => {
    Promise.all([loadExpenses(), listCategories().then((response) => setCategories(response.data))])
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({ label: category.name, value: category.id }));
  }, [categories]);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = categoryFilter === 'all' || expense.category.id === categoryFilter;
    const matchesType = typeFilter === 'all' || expense.type === typeFilter;
    const matchesMonth = !monthFilter || expense.date.slice(0, 7) === monthFilter;
    return matchesCategory && matchesType && matchesMonth;
  });

  async function onSubmit(data: FormData) {
    setError('');
    try {
      const response = editing ? await updateExpense(editing.id, data) : await createExpense(data);
      setAlerts(response.alerts);
      setEditing(null);
      reset();
      await loadExpenses();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  function handleEdit(expense: Expense) {
    setEditing(expense);
    reset({
      description: expense.description,
      amount: expense.amount,
      categoryId: expense.category.id,
      date: expense.date.slice(0, 10),
      type: expense.type,
    });
  }

  async function handleDelete(id: string) {
    await deleteExpense(id);
    await loadExpenses();
  }

  if (loading) {
    return <LoadingState label="Carregando despesas..." />;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-md border border-emeraldDeep/10 bg-white p-5 shadow-premium">
        <h2 className="text-xl font-black text-emeraldDeep">{editing ? 'Editar despesa' : 'Cadastrar despesa'}</h2>
        <div className="mt-6 space-y-4">
          <Input label="Descricao" {...register('description')} />
          <CurrencyInput label="Valor" placeholder="Ex.: 120,00" {...register('amount', { setValueAs: (value) => parseCurrencyInput(String(value)) })} />
          <Select label="Categoria" options={[{ label: 'Selecione', value: '' }, ...categoryOptions]} {...register('categoryId')} />
          <Input label="Data" type="date" {...register('date')} />
          <Select
            label="Tipo"
            options={[
              { label: 'Fixa', value: 'FIXED' },
              { label: 'Variavel', value: 'VARIABLE' },
            ]}
            {...register('type')}
          />
          <Alert messages={alerts} />
          <Alert messages={error ? [error] : []} type="error" />
          <Button disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : editing ? 'Atualizar' : 'Cadastrar'}</Button>
        </div>
      </form>

      <section className="rounded-md border border-emeraldDeep/10 bg-white p-5 shadow-premium">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-emeraldDeep">Despesas</h2>
            <p className="text-sm text-ink/60">Filtre por categoria, tipo e mes.</p>
          </div>
          <div className="grid w-full gap-2 md:w-auto md:grid-cols-3">
            <select className="rounded-md border border-emeraldDeep/15 px-3 py-2 text-sm" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="all">Todas categorias</option>
              {categoryOptions.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <select className="rounded-md border border-emeraldDeep/15 px-3 py-2 text-sm" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">Todos tipos</option>
              <option value="FIXED">Fixa</option>
              <option value="VARIABLE">Variavel</option>
            </select>
            <input className="rounded-md border border-emeraldDeep/15 px-3 py-2 text-sm" type="month" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} />
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {filteredExpenses.length ? (
            filteredExpenses.map((expense) => (
              <div key={expense.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-emeraldDeep/10 p-4">
                <div>
                  <p className="font-bold text-emeraldDeep">{expense.description}</p>
                  <p className="text-sm text-ink/55">
                    {expense.category.name} · {expense.type === 'FIXED' ? 'Fixa' : 'Variavel'} · {expense.date.slice(0, 10)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <strong className="text-emeraldDeep">{formatCurrency(expense.amount)}</strong>
                  <button title="Editar" className="rounded-md bg-goldSoft p-2 text-emeraldDeep" onClick={() => handleEdit(expense)}>
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button title="Excluir" className="rounded-md bg-red-50 p-2 text-red-600" onClick={() => handleDelete(expense.id)}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <EmptyState icon={<CreditCard />} title="Nenhuma despesa encontrada" description="Cadastre sua primeira despesa para acompanhar seus gastos." />
          )}
        </div>
      </section>
    </div>
  );
}
