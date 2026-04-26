import { Request, Response } from 'express';
import { successResponse } from '../../shared/http/response';
import { CategoryService } from './category.service';

const categoryService = new CategoryService();

export class CategoryController {
  async list(_request: Request, response: Response) {
    const categories = await categoryService.list();
    return response.status(200).json(successResponse(categories, 'Categorias retornadas com sucesso.'));
  }
}
