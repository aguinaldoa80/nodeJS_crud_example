import {Request, Response } from 'express'
import { ApiError } from '../helpers/api-errors';
import {CreateSubjectService} from '../services/CreateSubjectService'

export class CreateSubjectController {
  
  async handle(request: Request, response: Response){
    const {name, description} = request.body

    const service = new CreateSubjectService();

    const result = await service.execute({name});

    if(result instanceof ApiError){
      return response.status(result.statusCode).json({message: result.message});
    }else{
      response.status(201).json(result);
    }

  }
}