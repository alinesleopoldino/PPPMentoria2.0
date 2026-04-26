import { zodResolver } from '@hookform/resolvers/zod';
import { Landmark } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { getApiErrorMessage } from '../services/api';
import { login } from '../services/authService';
import { saveToken, saveUser } from '../utils/storage';

const schema = z.object({
  email: z.string().email('Informe um e-mail valido.'),
  password: z.string().min(1, 'Informe sua senha.'),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setError('');
    try {
      const response = await login(data);
      saveToken(response.data.token);
      saveUser(response.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  return (
    <div className="grid min-h-screen bg-paper lg:grid-cols-2">
      <section className="hidden bg-emeraldDeep p-10 text-white lg:block">
        <div className="flex items-center gap-3">
          <Landmark className="h-9 w-9 text-gold" />
          <span className="text-xl font-black">Smart Invest Planner</span>
        </div>
        <div className="mt-24 max-w-lg">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-goldSoft">Bem-vinda de volta</p>
          <h1 className="mt-4 text-5xl font-black leading-tight">O dinheiro precisa de direcao antes de gerar liberdade.</h1>
        </div>
      </section>
      <section className="flex items-center justify-center px-4 py-10">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-md bg-white p-6 shadow-premium">
          <h2 className="text-2xl font-black text-emeraldDeep">Entrar</h2>
          <p className="mt-2 text-sm text-ink/60">Acesse seu painel financeiro.</p>
          <div className="mt-6 space-y-4">
            <Input label="E-mail" type="email" error={errors.email?.message} {...register('email')} />
            <Input label="Senha" type="password" error={errors.password?.message} {...register('password')} />
            <Alert messages={error ? [error] : []} type="error" />
            <Button className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
          <p className="mt-5 text-center text-sm text-ink/60">
            Ainda nao tem conta?{' '}
            <Link className="font-bold text-emeraldDeep" to="/register">
              Criar cadastro
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
