import {Request, Response } from 'express'
import { ApiError } from '../helpers/api-errors';
import { CreateRoomSubjectService } from '../services/CreateRoomSubjectService';

export class CreateRoomSubjectController {
  
  async handle(request: Request, response: Response){
    const {room_id, subject_id} = request.body

    const service = new CreateRoomSubjectService();

    const result = await service.execute({room_id, subject_id});

    if(result instanceof ApiError){
      return response.status(result.statusCode).json({message: result.message});
    }else{
      response.status(201).json(result);
    }

  }
}