# Documentacao Funcional

## Visao geral do produto

Smart Invest Planner API e uma API REST para ajudar pessoas com orcamento pequeno a organizar renda mensal, controlar despesas, preservar areas importantes como saude e estudos, e iniciar investimentos com uma meta minima recomendada de 5% da renda.

## Personas

### Persona 1: Pessoa em inicio de organizacao financeira

- Tem renda limitada.
- Nao sabe exatamente quanto gasta.
- Quer evitar endividamento.
- Precisa de alertas simples e educativos.

### Persona 2: Pessoa que quer comecar a investir

- Acredita que investir exige muito dinheiro.
- Precisa de metas pequenas e consistentes.
- Quer visualizar o impacto de investir 5% ao mes.

### Persona 3: Profissional de QA em portfolio

- Precisa demonstrar testes de API.
- Quer cenarios com regras de negocio reais.
- Busca evidencias de criterios de aceite e automacao.

## Jornada do usuario

1. Usuario cria conta.
2. Usuario faz login.
3. Usuario registra o orcamento mensal.
4. Usuario cadastra despesas fixas e variaveis.
5. Usuario cria plano de investimento.
6. Usuario consulta dashboard financeiro.
7. Usuario recebe alertas e frase motivacional.

## Epicos

- EP01: Autenticacao e seguranca.
- EP02: Organizacao de orcamento.
- EP03: Controle de despesas.
- EP04: Planejamento de investimentos.
- EP05: Dashboard e recomendacoes.
- EP06: Engajamento por frases motivacionais.

## Features

- Cadastro de usuario.
- Login com JWT.
- Cadastro e atualizacao de orcamento.
- Categorias financeiras padrao.
- CRUD de despesas.
- Criacao e consulta de planos de investimento.
- Dashboard consolidado.
- Frase motivacional randomica.

## User Stories e criterios de aceite

### US01 - Cadastrar usuario

Como pessoa que deseja organizar minha vida financeira, quero criar uma conta no sistema, para registrar meus dados financeiros de forma segura.

**Cenario: cadastro realizado com sucesso**

Dado que informo nome, e-mail, senha e renda mensal validos  
Quando envio a requisicao de cadastro  
Entao o sistema deve criar o usuario  
E deve retornar status `201 Created`  
E nao deve retornar a senha na resposta

**Cenario: e-mail duplicado**

Dado que ja existe um usuario cadastrado com o mesmo e-mail  
Quando tento cadastrar uma nova conta com esse e-mail  
Entao o sistema deve retornar status `409 Conflict`  
E deve informar que o e-mail ja esta em uso

### US02 - Registrar orcamento mensal

Como usuario cadastrado, quero informar minha renda e dividir meu orcamento por categorias, para entender como meu dinheiro esta sendo distribuido.

**Cenario: orcamento valido**

Dado que estou autenticado  
E informo os dados validos do orcamento  
Quando envio a requisicao de cadastro de orcamento  
Entao o sistema deve salvar o orcamento  
E deve retornar status `201 Created`

**Cenario: investimento abaixo de 5%**

Dado que estou autenticado  
E informo percentual de investimento menor que 5%  
Quando envio a requisicao de cadastro de orcamento  
Entao o sistema deve permitir o cadastro  
E deve retornar alerta educativo sobre a recomendacao minima de 5%

### US03 - Controlar despesas

Como usuario cadastrado, quero cadastrar minhas despesas fixas e variaveis, para acompanhar meus gastos mensais.

**Cenario: despesa valida**

Dado que estou autenticado  
E informo descricao, valor, categoria, data e tipo validos  
Quando envio a requisicao de cadastro de despesa  
Entao o sistema deve criar a despesa  
E deve retornar status `201 Created`

**Cenario: despesa negativa**

Dado que estou autenticado  
E informo valor de despesa negativo  
Quando envio a requisicao de cadastro de despesa  
Entao o sistema deve rejeitar a requisicao  
E deve retornar erro de validacao

**Cenario: despesas ultrapassam a renda**

Dado que estou autenticado  
E o total de despesas fica maior que minha renda mensal  
Quando cadastro uma nova despesa  
Entao o sistema deve salvar a despesa  
E deve retornar alerta de desequilibrio financeiro

### US04 - Planejar investimentos

Como usuario com orcamento limitado, quero definir um percentual inicial de investimento a partir de 5%, para comecar a construir minha reserva e patrimonio de forma gradual.

**Cenario: plano de investimento criado**

Dado que estou autenticado  
E informo percentual, objetivo, prazo e perfil validos  
Quando envio a requisicao de criacao do plano  
Entao o sistema deve calcular o valor mensal recomendado  
E deve calcular a projecao simples sem juros  
E deve retornar status `201 Created`

### US05 - Visualizar dashboard financeiro

Como usuario cadastrado, quero visualizar um resumo financeiro com alertas e recomendacoes, para tomar melhores decisoes sobre meu dinheiro.

**Cenario: dashboard calculado corretamente**

Dado que estou autenticado  
E possuo orcamento, despesas e plano de investimento cadastrados  
Quando consulto o dashboard  
Entao o sistema deve retornar renda mensal, total de despesas, investimento planejado e saldo restante  
E deve retornar percentuais por categoria  
E deve retornar alertas financeiros aplicaveis

**Cenario: saldo negativo**

Dado que estou autenticado  
E minhas despesas ultrapassam minha renda  
Quando consulto o dashboard  
Entao o sistema deve retornar alerta sugerindo revisao do orcamento

### US06 - Receber frases motivacionais

Como usuario em processo de educacao financeira, quero receber frases motivacionais sobre disciplina e prosperidade, para me manter engajado no meu planejamento financeiro.

**Cenario: frase motivacional retornada**

Dado que acesso o endpoint de frases motivacionais  
Quando solicito uma frase randomica  
Entao o sistema deve retornar uma frase original  
E deve retornar status `200 OK`

## Matriz de testes

| ID | Funcionalidade | Cenario | Tipo | Prioridade |
| --- | --- | --- | --- | --- |
| CT01 | Auth | Cadastro com sucesso | API | Alta |
| CT02 | Auth | E-mail duplicado | API | Alta |
| CT03 | Auth | Login com sucesso | API | Alta |
| CT04 | Auth | Senha invalida | API | Alta |
| CT05 | Budget | Cadastro valido | API | Alta |
| CT06 | Budget | Investimento menor que 5% | API | Alta |
| CT07 | Expenses | Despesa valida | API | Alta |
| CT08 | Expenses | Despesa negativa | API | Alta |
| CT09 | Expenses | Despesas acima da renda | API | Alta |
| CT10 | Dashboard | Calculo correto | API | Alta |
| CT11 | Motivational Quotes | Retorno de frase | API | Media |
| CT12 | Validacao | Campos obrigatorios | API | Alta |
| CT13 | Seguranca | Rota protegida sem token | API | Alta |

## Plano de testes de API

Escopo:

- Validar endpoints principais.
- Validar contratos de request e response.
- Validar codigos HTTP.
- Validar regras de negocio e alertas.
- Validar autenticacao obrigatoria.

Fora de escopo inicial:

- Testes de carga.
- Testes de seguranca avancada.
- Integracao com provedores externos.

Criterios de entrada:

- API executando localmente.
- Banco de teste configurado.
- Seed de categorias executado.
- Variaveis de ambiente configuradas.

Criterios de saida:

- Todos os testes obrigatorios passando.
- Cobertura dos principais fluxos de negocio.
- Documentacao Swagger disponivel.
- README atualizado com comandos reais.
