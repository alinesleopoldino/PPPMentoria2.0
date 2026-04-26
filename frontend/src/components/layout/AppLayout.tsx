import { BarChart3, CreditCard, Landmark, LogOut, PiggyBank, WalletCards } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { getStoredUser, clearSession } from '../../utils/storage';
import { User } from '../../types/api';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/budget', label: 'Orcamento', icon: WalletCards },
  { to: '/expenses', label: 'Despesas', icon: CreditCard },
  { to: '/investments', label: 'Investimentos', icon: PiggyBank },
];

export function AppLayout() {
  const navigate = useNavigate();
  const user = getStoredUser<User>();

  function handleLogout() {
    clearSession();
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-paper">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-emeraldDeep/10 bg-white p-5 lg:block">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emeraldDeep text-gold">
            <Landmark className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-black text-emeraldDeep">Smart Invest</p>
            <p className="text-xs font-semibold text-ink/50">Planner</p>
          </div>
        </div>
        <nav className="mt-9 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold transition ${
                  isActive ? 'bg-emeraldDeep text-white' : 'text-ink/70 hover:bg-emeraldDeep/5'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-emeraldDeep/10 bg-paper/90 px-4 py-4 backdrop-blur md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Fintech pessoal</p>
              <h1 className="text-xl font-black text-emeraldDeep">Ola, {user?.name ?? 'investidor(a)'}</h1>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <nav className="flex gap-1 lg:hidden">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    title={item.label}
                    className={({ isActive }) =>
                      `rounded-md p-2 ${isActive ? 'bg-emeraldDeep text-white' : 'bg-white text-emeraldDeep'}`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                  </NavLink>
                ))}
              </nav>
              <Button variant="ghost" onClick={handleLogout} icon={<LogOut className="h-4 w-4" />}>
                Sair
              </Button>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
