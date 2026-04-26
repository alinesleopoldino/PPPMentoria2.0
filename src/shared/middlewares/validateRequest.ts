import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

type Schemas = {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
};

export function validateRequest(schemas: Schemas) {
  return (request: Request, _response: Response, next: NextFunction) => {
    if (schemas.body) {
      request.body = schemas.body.parse(request.body);
    }

    if (schemas.params) {
      request.params = schemas.params.parse(request.params);
    }

    if (schemas.query) {
      request.query = schemas.query.parse(request.query);
    }

    return next();
  };
}
