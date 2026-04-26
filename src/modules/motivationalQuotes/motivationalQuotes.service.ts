const quotes = [
  'A riqueza comeca quando voce decide pagar primeiro o seu futuro.',
  'Pequenos valores, aplicados com consistencia, constroem grandes resultados.',
  'Quem controla o dinheiro hoje conquista mais liberdade amanha.',
  'Investir nao e sobre quanto sobra, mas sobre a prioridade que voce escolhe dar ao seu futuro.',
  'Disciplina financeira transforma renda limitada em escolhas mais inteligentes.',
  'Cada real organizado abre espaco para uma decisao melhor.',
];

export class MotivationalQuotesService {
  getRandomQuote() {
    const index = Math.floor(Math.random() * quotes.length);

    return {
      quote: quotes[index],
    };
  }

  getDailyQuote() {
    const dayIndex = new Date().getDate() % quotes.length;

    return {
      quote: quotes[dayIndex],
    };
  }
}
