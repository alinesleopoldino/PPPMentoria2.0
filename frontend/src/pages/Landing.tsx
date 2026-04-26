import { BarChart3, Coins, Euro, Landmark, LineChart, PiggyBank, ShieldAlert, WalletCards } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const benefits = [
  { title: 'Controle de despesas', icon: WalletCards },
  { title: 'Planejamento de investimentos', icon: PiggyBank },
  { title: 'Alertas financeiros', icon: ShieldAlert },
  { title: 'Frases motivacionais', icon: Coins },
  { title: 'Dashboard inteligente', icon: BarChart3 },
];

export function Landing() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-emeraldDeep text-gold">
            <Landmark className="h-6 w-6" />
          </div>
          <div>
            <p className="font-black text-emeraldDeep">Smart Invest Planner</p>
            <p className="text-xs font-semibold text-ink/55">Fintech para pequenos orcamentos</p>
          </div>
        </div>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-ink/70 md:flex">
          <a href="#beneficios">Beneficios</a>
          <Link to="/login">Entrar</Link>
          <Link to="/register">
            <Button>Comecar agora</Button>
          </Link>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl items-center gap-10 px-4 pb-12 pt-4 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">Organizacao, reserva e futuro</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-emeraldDeep md:text-6xl">
              Organize seu dinheiro hoje para conquistar liberdade amanha.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
              Planeje seu orcamento, acompanhe seus gastos e comece a investir mesmo com pouco.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register">
                <Button icon={<Coins className="h-4 w-4" />}>Comecar agora</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="secondary" icon={<LineChart className="h-4 w-4" />}>
                  Ver demonstracao
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-10 hidden h-16 w-16 items-center justify-center rounded-full bg-gold text-3xl font-black text-emeraldDeep shadow-premium md:flex">
              $
            </div>
            <div className="absolute -right-2 bottom-20 hidden h-14 w-14 items-center justify-center rounded-full bg-emeraldDeep text-gold shadow-premium md:flex">
              <Euro className="h-7 w-7" />
            </div>
            <div className="rounded-md border border-emeraldDeep/10 bg-white p-6 shadow-premium">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-ink/50">Patrimonio planejado</p>
                  <p className="mt-2 text-4xl font-black text-emeraldDeep">R$ 12.480</p>
                </div>
                <div className="rounded-md bg-goldSoft p-3 text-emeraldDeep">
                  <PiggyBank className="h-8 w-8" />
                </div>
              </div>
              <div className="mt-8 space-y-4">
                {['Investimento mensal', 'Reserva de emergencia', 'Despesas controladas'].map((item, index) => (
                  <div key={item}>
                    <div className="mb-2 flex justify-between text-sm font-semibold text-ink/70">
                      <span>{item}</span>
                      <span>{[82, 65, 74][index]}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-emeraldDeep/10">
                      <div className="h-3 rounded-full bg-gold" style={{ width: `${[82, 65, 74][index]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="beneficios" className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-md border border-emeraldDeep/10 bg-white p-5 shadow-premium">
                <benefit.icon className="h-7 w-7 text-gold" />
                <h2 className="mt-4 text-base font-bold text-emeraldDeep">{benefit.title}</h2>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
