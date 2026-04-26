# Arquitetura Front-end - Smart Invest Planner

## Objetivo

Construir uma interface web moderna, responsiva e integrada a Smart Invest Planner API, com aparencia de fintech premium e foco em organizacao financeira, pequenos orcamentos e inicio gradual em investimentos.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- React Hook Form
- Zod
- Recharts
- Lucide React

## Estrutura

```text
frontend/
  src/
    components/
      cards/
      charts/
      forms/
      layout/
      ui/
    pages/
      Landing.tsx
      Login.tsx
      Register.tsx
      Dashboard.tsx
      Budget.tsx
      Expenses.tsx
      Investments.tsx
    routes/
    services/
    types/
    utils/
    hooks/
```

## Decisoes de arquitetura

- O front-end fica em `frontend/`, separado da API, para permitir execucao e deploy independentes.
- A URL da API vem de `VITE_API_URL` no `.env`.
- O token JWT e salvo no `localStorage` e injetado automaticamente pelo interceptor do Axios.
- Rotas financeiras sao protegidas por `ProtectedRoute`.
- Formularios usam React Hook Form com validacao Zod.
- Componentes visuais reutilizaveis concentram consistencia de layout, botoes, inputs, cards e alertas.
- Graficos usam Recharts para distribuicao por categoria e projecao de investimentos.

## Identidade visual

- Verde escuro para confianca, crescimento e prosperidade.
- Dourado para conquista, patrimonio e valorizacao.
- Fundo claro para leitura e sensacao profissional.
- Cards brancos com sombra suave.
- Iconografia financeira com Lucide React: moedas, carteira, cofre, graficos, crescimento, cifroes e euros.

## Fluxo principal

1. Usuario acessa a landing page.
2. Usuario cria conta ou faz login.
3. Token JWT e salvo no navegador.
4. Usuario acessa o dashboard protegido.
5. Usuario cadastra orcamento, despesas e plano de investimento.
6. Dashboard consolida dados vindos da API.

## Telas

- Landing page: apresentacao do produto e chamada para cadastro/login.
- Login: autenticacao com tratamento de erro.
- Cadastro: criacao de usuario com renda mensal.
- Dashboard: resumo financeiro, alertas, frase motivacional e graficos.
- Orcamento: cadastro/edicao de orcamento mensal.
- Despesas: CRUD, filtros e empty states.
- Investimentos: criacao e listagem de planos com projecoes.

## Validacao e erros

- Validacoes de campos obrigatorios e valores financeiros no cliente.
- Erros da API exibidos em componentes de alerta.
- Estados de loading para acoes assíncronas.
- Empty states quando nao houver dados.

## Responsividade

- Mobile first com Tailwind CSS.
- Sidebar vira navegacao compacta em telas menores.
- Cards e graficos reorganizam em grids responsivos.
