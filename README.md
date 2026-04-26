# Smart Invest Planner API

API REST para um Gestor Financeiro Pessoal com foco em organizacao mensal, controle de despesas, reserva para saude e estudos, e inicio gradual em investimentos a partir de 5% da renda.

Este projeto foi desenhado para portfolio de QA e automacao de API. Alem da implementacao, ele documenta regras de negocio, criterios de aceite, matriz de testes, plano de testes e cenarios automatizados com Jest e Supertest.

## Objetivo

Construir uma API completa, segura, testavel e bem documentada para demonstrar:

- Visao de produto e negocio.
- Modelagem de regras financeiras simples.
- Boas praticas de API REST.
- Autenticacao JWT e senha criptografada.
- Validacao de entrada e tratamento padronizado de erros.
- Testes automatizados por dominio.
- Documentacao Swagger/OpenAPI.

## Problema de negocio

Pessoas com orcamento pequeno muitas vezes nao sabem quanto gastam, nao separam dinheiro para necessidades importantes e acreditam que investir exige grandes valores. A API apoia esse publico a organizar a renda, identificar desequilibrios e iniciar o habito de investir com metas realistas.

## Publico-alvo

- Pessoas em inicio de educacao financeira.
- Pessoas com renda limitada que desejam investir aos poucos.
- Profissionais de QA que precisam praticar testes de API com regras reais.
- Recrutadores avaliando portfolio tecnico com foco em qualidade.

## Arquitetura proposta

Stack escolhida para a implementacao:

- Node.js
- Express
- TypeScript
- SQLite para execucao local
- Prisma ORM
- Jest
- Supertest
- Swagger/OpenAPI
- JWT
- Bcrypt

Padrao arquitetural:

- `controller`: recebe requisicoes HTTP e retorna respostas.
- `service`: concentra regras de negocio.
- `repository`: encapsula acesso ao banco via Prisma.
- `dto`: define validacoes e contratos de entrada.
- `model`: representado pelo schema Prisma.
- `middlewares`: autenticacao, validacao e erros.
- `tests`: testes automatizados por dominio.

Decisao inicial: usar Express em vez de NestJS para manter o projeto mais leve, facil de executar localmente e didatico para portfolio de QA. A separacao por camadas preserva organizacao e facilita migracao futura para NestJS, se desejado.

## Funcionalidades

- Cadastro e login de usuarios.
- Cadastro e consulta de orcamento mensal.
- Categorias financeiras padrao.
- CRUD de despesas.
- Planejamento de investimentos.
- Frases motivacionais originais.
- Dashboard financeiro com alertas e recomendacoes.

## Regras de negocio principais

- E-mail de usuario deve ser unico.
- Senha deve ser armazenada criptografada.
- Rotas financeiras devem exigir JWT.
- Investimento recomendado minimo: 5% da renda mensal.
- Investimento abaixo de 5% deve ser permitido com alerta educativo.
- Despesa nao pode ter valor negativo.
- Total de despesas acima da renda deve gerar alerta de desequilibrio financeiro.
- Despesas fixas acima de 50% da renda devem gerar alerta.
- Saude ou estudos zerados devem gerar alerta.
- Investimento igual ou superior a 5% deve gerar destaque positivo.
- Saldo negativo deve sugerir revisao do orcamento.

## Documentacao do projeto

- [Arquitetura](docs/ARCHITECTURE.md)
- [Arquitetura Front-end](docs/FRONTEND_ARCHITECTURE.md)
- [Documentacao funcional](docs/FUNCTIONAL_SPEC.md)
- [Regras de negocio](docs/BUSINESS_RULES.md)
- [Plano de testes](docs/TEST_PLAN.md)

## Endpoints previstos

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Budgets

- `POST /budgets`
- `GET /budgets/current`
- `PUT /budgets/:id`

### Expenses

- `POST /expenses`
- `GET /expenses`
- `GET /expenses/:id`
- `PUT /expenses/:id`
- `DELETE /expenses/:id`

### Investments

- `POST /investments/plans`
- `GET /investments/plans`
- `GET /investments/plans/:id`
- `PUT /investments/plans/:id`
- `DELETE /investments/plans/:id`

### Dashboard

- `GET /dashboard`

### Motivational Quotes

- `GET /motivational-quotes/random`

## Exemplos de payload

### Cadastro de usuario

```json
{
  "name": "Aline Santos",
  "email": "aline@example.com",
  "password": "Senha@123",
  "monthlyIncome": 2500
}
```

### Login

```json
{
  "email": "aline@example.com",
  "password": "Senha@123"
}
```

### Orcamento mensal

```json
{
  "monthlyIncome": 2500,
  "investmentPercentage": 5,
  "fixedExpenses": 1200,
  "health": 150,
  "education": 100,
  "leisure": 150,
  "freeReserve": 775
}
```

### Despesa

```json
{
  "description": "Aluguel",
  "amount": 900,
  "categoryId": "category-id",
  "date": "2026-04-26",
  "type": "FIXED"
}
```

### Plano de investimento

```json
{
  "investmentPercentage": 5,
  "goal": "Reserva de emergencia",
  "months": 12,
  "profile": "CONSERVATIVE"
}
```

## Estrutura prevista

```text
src/
  app.ts
  server.ts
  config/
  modules/
    auth/
    budgets/
    categories/
    expenses/
    investments/
    dashboard/
    motivationalQuotes/
  shared/
    errors/
    middlewares/
    validators/
prisma/
  schema.prisma
  seed.ts
tests/
  auth/
  budget/
  expenses/
  investments/
  dashboard/
  motivationalQuotes/
docs/
```

## Como rodar localmente

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Como rodar os testes

```bash
npm test
npm run test:coverage
```

## Como rodar o front-end

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Ou pela raiz:

```bash
npm.cmd run dev:frontend
```

## Status

Etapa atual: endpoints principais implementados com testes automatizados.

Ja existe uma API Express em TypeScript com auth, budgets, expenses, investments, motivational quotes, dashboard, Swagger, Prisma, seed de categorias, middlewares compartilhados e testes automatizados por dominio.

Proxima etapa: ampliar documentacao Swagger com schemas detalhados e gerar collection Postman.
