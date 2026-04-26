# Regras de Negocio

## Usuarios e autenticacao

| ID | Regra | Resultado esperado |
| --- | --- | --- |
| RN01 | E-mail deve ser unico. | Cadastro duplicado retorna `409 Conflict`. |
| RN02 | Senha deve ser criptografada. | A senha nunca deve ser salva em texto puro. |
| RN03 | Login deve validar e-mail e senha. | Credenciais invalidas retornam `401 Unauthorized`. |
| RN04 | Rotas financeiras devem exigir JWT. | Requisicao sem token retorna `401 Unauthorized`. |

## Orcamento mensal

| ID | Regra | Resultado esperado |
| --- | --- | --- |
| RN05 | Investimento minimo recomendado e 5% da renda. | Percentual menor e aceito com alerta educativo. |
| RN06 | Renda mensal deve ser maior que zero. | Valor invalido retorna erro de validacao. |
| RN07 | Valores de distribuicao do orcamento nao podem ser negativos. | Valor negativo retorna erro de validacao. |
| RN08 | Saude ou estudos zerados geram alerta. | API retorna recomendacao de reserva minima para essas areas. |

## Despesas

| ID | Regra | Resultado esperado |
| --- | --- | --- |
| RN09 | Despesa nao pode ter valor negativo. | Cadastro ou atualizacao retorna erro de validacao. |
| RN10 | Despesa deve ter categoria valida. | Categoria inexistente retorna `400` ou `404`. |
| RN11 | Total de despesas acima da renda gera alerta. | API permite registrar e retorna alerta de desequilibrio. |
| RN12 | Despesas fixas acima de 50% da renda geram alerta. | Dashboard indica comprometimento elevado da renda. |

## Investimentos

| ID | Regra | Resultado esperado |
| --- | --- | --- |
| RN13 | Perfil deve ser conservador, moderado ou arrojado. | Valor fora do enum retorna erro de validacao. |
| RN14 | Prazo deve ser maior que zero. | Prazo invalido retorna erro de validacao. |
| RN15 | Valor mensal recomendado deve ser calculado pela renda e percentual. | `monthlyIncome * investmentPercentage / 100`. |
| RN16 | Projecao simples nao considera juros. | `monthlyRecommendedAmount * months`. |

## Dashboard

| ID | Regra | Resultado esperado |
| --- | --- | --- |
| RN17 | Dashboard deve consolidar renda, despesas, investimento planejado e saldo. | Retorna resumo financeiro completo. |
| RN18 | Saldo negativo deve gerar sugestao de revisao. | API retorna alerta de saldo negativo. |
| RN19 | Investimento igual ou superior a 5% deve gerar destaque positivo. | API retorna mensagem positiva. |
| RN20 | Frase motivacional do dia deve acompanhar o dashboard. | Dashboard retorna frase original. |

## Categorias padrao

As categorias iniciais devem ser criadas por seed:

- Moradia
- Alimentacao
- Transporte
- Saude
- Estudos
- Lazer
- Investimentos
- Reserva de emergencia
- Outros
