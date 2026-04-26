import { Request, Response } from 'express';
import { successResponse } from '../../shared/http/response';
import { MotivationalQuotesService } from './motivationalQuotes.service';

const motivationalQuotesService = new MotivationalQuotesService();

export class MotivationalQuotesController {
  async random(_request: Request, response: Response) {
    const quote = motivationalQuotesService.getRandomQuote();
    return response.status(200).json(successResponse(quote, 'Frase motivacional retornada com sucesso.'));
  }
}
