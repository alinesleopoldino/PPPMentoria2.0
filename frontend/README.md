# Smart Invest Planner Front-end

Interface React para consumir a Smart Invest Planner API.

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

## Configurar ambiente

Crie um arquivo `.env` dentro da pasta `frontend/`:

```env
VITE_API_URL=http://localhost:3333
```

## Instalar dependencias

```bash
cd frontend
npm install
```

## Rodar o front

Com a API rodando na raiz do projeto:

```bash
npm run dev
```

Ou pela raiz do projeto:

```bash
npm.cmd run dev:frontend
```

O Vite abre em:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

Ou pela raiz:

```bash
npm.cmd run build:frontend
```

## Fluxo recomendado

Na raiz do projeto, prepare o banco e suba a API:

```bash
npm.cmd run db:setup
npm.cmd run dev
```

Em outro terminal, suba o front:

```bash
npm.cmd run dev:frontend
```

## Telas

- Landing page
- Login
- Cadastro
- Dashboard
- Orcamento mensal
- Despesas
- Investimentos

## Observacoes

- O token JWT e salvo no `localStorage`.
- Rotas internas sao protegidas.
- Estados de loading, erro e vazio foram tratados nas principais telas.
- O visual usa verde e dourado para reforcar crescimento, prosperidade e fintech premium.
