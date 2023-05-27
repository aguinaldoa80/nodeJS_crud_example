import {Request, Response } from 'express'
import { ApiError } from '../helpers/api-errors';
import { CreateVideoService } from '../services/CreateVideoService';

export class CreateVideoController {
  
  async handle(request: Request, response: Response){
    const {title, url, room_id} = request.body

    const service = new CreateVideoService();
    const result = await service.execute({title, url, room_id});
    if(result instanceof ApiError){
      return response.status(result.statusCode).json({message: result.message});
    }else{
      response.status(201).json(result);
    }

  }
}