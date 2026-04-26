# Arquitetura - Smart Invest Planner API

## Decisao de stack

Para este portfolio, a arquitetura proposta usa Express com TypeScript. A escolha prioriza simplicidade de execucao local, clareza para avaliadores de QA e liberdade para demonstrar boas praticas de organizacao sem excesso de estrutura.

## Tecnologias

- Runtime: Node.js
- Framework HTTP: Express
- Linguagem: TypeScript
- ORM: Prisma
- Banco local: SQLite
- Autenticacao: JWT
- Criptografia de senha: Bcrypt
- Testes unitarios e de API: Jest e Supertest
- Documentacao: Swagger/OpenAPI
- Variaveis de ambiente: dotenv

## Camadas

### Controller

Responsavel por receber requisicoes, extrair dados de entrada, chamar services e devolver respostas HTTP adequadas.

### Service

Responsavel por regras de negocio, calculos financeiros, alertas, validacoes de dominio e orquestracao entre repositorios.

### Repository

Responsavel por persistencia de dados usando Prisma. Essa camada evita que controllers e services dependam diretamente da implementacao do banco.

### DTO e Validacao

Responsavel por contratos de entrada. A implementacao devera validar campos obrigatorios, tipos, valores minimos e enums antes da execucao das regras.

### Middleware

Responsavel por autenticacao JWT, tratamento centralizado de erros e validacao de requisicoes.

## Modulos da API

- `auth`: cadastro, login, hash de senha e JWT.
- `budgets`: orcamento mensal e alertas de investimento.
- `categories`: categorias padrao financeiras.
- `expenses`: CRUD de despesas e alertas de desequilibrio.
- `investments`: planos e calculos de investimento.
- `dashboard`: resumo financeiro consolidado.
- `motivationalQuotes`: frases motivacionais originais.

## Modelo de dados previsto

### User

- `id`
- `name`
- `email`
- `passwordHash`
- `monthlyIncome`
- `createdAt`
- `updatedAt`

### Budget

- `id`
- `userId`
- `monthlyIncome`
- `investmentPercentage`
- `fixedExpenses`
- `health`
- `education`
- `leisure`
- `freeReserve`
- `createdAt`
- `updatedAt`

### Category

- `id`
- `name`
- `createdAt`

### Expense

- `id`
- `userId`
- `categoryId`
- `description`
- `amount`
- `date`
- `type`
- `createdAt`
- `updatedAt`

### InvestmentPlan

- `id`
- `userId`
- `investmentPercentage`
- `goal`
- `months`
- `profile`
- `monthlyRecommendedAmount`
- `projectedTotalWithoutInterest`
- `incomeCommitmentPercentage`
- `createdAt`
- `updatedAt`

## Padrao de resposta

### Sucesso

```json
{
  "data": {},
  "alerts": [],
  "message": "Operacao realizada com sucesso."
}
```

### Erro

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Campos obrigatorios nao informados.",
    "details": []
  }
}
```

## Codigos HTTP

- `200 OK`: consulta ou atualizacao bem-sucedida.
- `201 Created`: recurso criado.
- `400 Bad Request`: entrada invalida ou regra de negocio violada.
- `401 Unauthorized`: token ausente ou invalido.
- `404 Not Found`: recurso inexistente.
- `409 Conflict`: conflito, como e-mail duplicado.
- `500 Internal Server Error`: erro inesperado.

## Estrategia de implementacao por modulos

1. Setup base: TypeScript, Express, Prisma, Jest, Supertest e Swagger.
2. Auth: cadastro, login, hash de senha, JWT e testes.
3. Categories: seed de categorias padrao.
4. Budgets: cadastro, consulta, atualizacao e alertas.
5. Expenses: CRUD, validacoes e alertas de renda.
6. Investments: plano e calculos.
7. Motivational Quotes: endpoint randomico com frases originais.
8. Dashboard: consolidacao financeira.
9. Collection Postman e refinamento final da documentacao.
