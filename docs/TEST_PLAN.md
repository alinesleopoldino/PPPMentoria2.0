# Plano de Testes

## Objetivo

Garantir que a Smart Invest Planner API atenda aos requisitos funcionais, regras de negocio, contratos REST e requisitos basicos de seguranca.

## Ferramentas

- Jest para execucao dos testes.
- Supertest para chamadas HTTP.
- Prisma para preparacao e limpeza da massa de dados.
- SQLite separado para ambiente de teste.

## Organizacao dos testes

```text
tests/
  auth/
  budget/
  expenses/
  investments/
  dashboard/
  motivationalQuotes/
  helpers/
```

## Massa de dados

A massa de dados deve ser criada por helpers de teste:

- Usuario valido.
- Usuario duplicado.
- Credenciais validas.
- Credenciais invalidas.
- Orcamento com investimento de 5%.
- Orcamento com investimento abaixo de 5%.
- Despesas fixas e variaveis.
- Despesa negativa.
- Plano de investimento conservador, moderado e arrojado.

## Testes obrigatorios

| ID | Dominio | Cenario | Resultado esperado |
| --- | --- | --- | --- |
| T01 | auth | Cadastro de usuario com sucesso | `201 Created` e usuario sem senha na resposta |
| T02 | auth | Erro ao cadastrar e-mail duplicado | `409 Conflict` |
| T03 | auth | Login com sucesso | `200 OK` e token JWT |
| T04 | auth | Erro ao informar senha invalida | `401 Unauthorized` |
| T05 | budget | Cadastro de orcamento valido | `201 Created` |
| T06 | budget | Alerta quando investimento for menor que 5% | Cadastro permitido com alerta |
| T07 | expenses | Cadastro de despesa valida | `201 Created` |
| T08 | expenses | Erro ao cadastrar despesa negativa | `400 Bad Request` |
| T09 | expenses | Alerta quando despesas ultrapassarem a renda | Cadastro permitido com alerta |
| T10 | dashboard | Calculo correto do dashboard | Totais, saldo e percentuais corretos |
| T11 | motivationalQuotes | Retorno de frase motivacional | `200 OK` com frase |
| T12 | validation | Validacao de campos obrigatorios | `400 Bad Request` |
| T13 | security | Autenticacao obrigatoria em rotas protegidas | `401 Unauthorized` |

## Estrategia de automacao

- Testes de API devem subir a aplicacao em memoria usando o `app` Express.
- Cada suite deve preparar seus dados e limpar o banco apos execucao.
- Testes devem evitar dependencia de ordem.
- Rotas protegidas devem usar helper para criar usuario e obter token.
- Assertions devem validar status HTTP, estrutura do body e campos criticos.

## Cenarios por dominio

### Auth

- Registrar usuario com dados validos.
- Bloquear e-mail duplicado.
- Realizar login com senha correta.
- Rejeitar login com senha incorreta.
- Validar campos obrigatorios no cadastro e login.

### Budget

- Criar orcamento valido.
- Consultar orcamento atual.
- Atualizar orcamento.
- Retornar alerta para investimento abaixo de 5%.
- Rejeitar valores negativos.

### Expenses

- Criar despesa fixa.
- Criar despesa variavel.
- Listar despesas do usuario autenticado.
- Consultar despesa por id.
- Atualizar despesa.
- Excluir despesa.
- Rejeitar valor negativo.
- Alertar quando total de despesas ultrapassar renda.

### Investments

- Criar plano conservador.
- Criar plano moderado.
- Criar plano arrojado.
- Calcular valor mensal recomendado.
- Calcular total acumulado sem juros.
- Listar planos do usuario.

### Dashboard

- Calcular total de despesas.
- Calcular saldo restante.
- Calcular percentual por categoria.
- Alertar despesas fixas acima de 50%.
- Alertar investimento abaixo de 5%.
- Destacar investimento igual ou superior a 5%.
- Alertar saude ou estudos zerados.
- Sugerir revisao quando saldo for negativo.

### Motivational Quotes

- Retornar frase randomica.
- Garantir que a frase seja texto original do projeto.

## Criterios de aceite para qualidade

- Todos os testes obrigatorios passando.
- Erros padronizados em formato unico.
- Endpoints protegidos exigindo token.
- Dados sensiveis nao expostos nas respostas.
- Swagger refletindo contratos implementados.
- README com comandos reais apos implementacao.
