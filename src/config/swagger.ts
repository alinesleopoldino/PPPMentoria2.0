export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Smart Invest Planner API',
    version: '1.0.0',
    description:
      'API REST para organizacao financeira pessoal, controle de despesas e planejamento de investimentos.',
  },
  servers: [{ url: 'http://localhost:3333', description: 'Ambiente local' }],
  tags: [
    { name: 'Health' },
    { name: 'Auth' },
    { name: 'Budgets' },
    { name: 'Expenses' },
    { name: 'Investments' },
    { name: 'Dashboard' },
    { name: 'Motivational Quotes' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Verifica se a API esta disponivel',
        responses: { '200': { description: 'API disponivel' } },
      },
    },
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Cadastra um usuario',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                name: 'Aline Santos',
                email: 'aline@example.com',
                password: 'Senha@123',
                monthlyIncome: 2500,
              },
            },
          },
        },
        responses: {
          '201': { description: 'Usuario cadastrado' },
          '409': { description: 'E-mail duplicado' },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Realiza login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: { email: 'aline@example.com', password: 'Senha@123' },
            },
          },
        },
        responses: {
          '200': { description: 'Login realizado' },
          '401': { description: 'Credenciais invalidas' },
        },
      },
    },
    '/budgets': {
      post: {
        tags: ['Budgets'],
        security: [{ bearerAuth: [] }],
        summary: 'Cadastra orcamento mensal',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                monthlyIncome: 2500,
                investmentPercentage: 5,
                fixedExpenses: 1200,
                health: 150,
                education: 100,
                leisure: 150,
                freeReserve: 775,
              },
            },
          },
        },
        responses: { '201': { description: 'Orcamento cadastrado' } },
      },
    },
    '/budgets/current': {
      get: {
        tags: ['Budgets'],
        security: [{ bearerAuth: [] }],
        summary: 'Consulta orcamento atual',
        responses: { '200': { description: 'Orcamento retornado' } },
      },
    },
    '/budgets/{id}': {
      put: {
        tags: ['Budgets'],
        security: [{ bearerAuth: [] }],
        summary: 'Atualiza orcamento',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Orcamento atualizado' } },
      },
    },
    '/expenses': {
      post: {
        tags: ['Expenses'],
        security: [{ bearerAuth: [] }],
        summary: 'Cadastra despesa',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                description: 'Aluguel',
                amount: 900,
                categoryId: 'category-id',
                date: '2026-04-26',
                type: 'FIXED',
              },
            },
          },
        },
        responses: { '201': { description: 'Despesa cadastrada' } },
      },
      get: {
        tags: ['Expenses'],
        security: [{ bearerAuth: [] }],
        summary: 'Lista despesas',
        responses: { '200': { description: 'Despesas retornadas' } },
      },
    },
    '/expenses/{id}': {
      get: {
        tags: ['Expenses'],
        security: [{ bearerAuth: [] }],
        summary: 'Consulta despesa por id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Despesa retornada' } },
      },
      put: {
        tags: ['Expenses'],
        security: [{ bearerAuth: [] }],
        summary: 'Atualiza despesa',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Despesa atualizada' } },
      },
      delete: {
        tags: ['Expenses'],
        security: [{ bearerAuth: [] }],
        summary: 'Remove despesa',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '204': { description: 'Despesa removida' } },
      },
    },
    '/investments/plans': {
      post: {
        tags: ['Investments'],
        security: [{ bearerAuth: [] }],
        summary: 'Cria plano de investimento',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                investmentPercentage: 5,
                goal: 'Reserva de emergencia',
                months: 12,
                profile: 'CONSERVATIVE',
              },
            },
          },
        },
        responses: { '201': { description: 'Plano cadastrado' } },
      },
      get: {
        tags: ['Investments'],
        security: [{ bearerAuth: [] }],
        summary: 'Lista planos de investimento',
        responses: { '200': { description: 'Planos retornados' } },
      },
    },
    '/dashboard': {
      get: {
        tags: ['Dashboard'],
        security: [{ bearerAuth: [] }],
        summary: 'Consulta dashboard financeiro',
        responses: { '200': { description: 'Dashboard retornado' } },
      },
    },
    '/motivational-quotes/random': {
      get: {
        tags: ['Motivational Quotes'],
        summary: 'Retorna frase motivacional randomica',
        responses: { '200': { description: 'Frase retornada' } },
      },
    },
  },
};
