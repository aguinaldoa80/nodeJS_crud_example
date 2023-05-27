import {Request, Response } from 'express'
import { ApiError } from '../helpers/api-errors';
import { CreateRoomService } from '../services/CreateRoomService';

export class CreateRoomController {
  
  async handle(request: Request, response: Response){
    const {name, subjects} = request.body

    const service = new CreateRoomService();

    const result = await service.execute({name, subjects});

    if(result instanceof ApiError){
      return response.status(result.statusCode).json({message: result.message});
    }else{
      response.status(201).json(result);
    }

  }
}