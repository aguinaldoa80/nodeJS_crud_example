import { Subject } from "../entities/Subject";
import {subjectRepository} from '../repositories/SubjectRepository'
import { Room } from "../entities/Room";
import { Video } from "../entities/Video";
import { videoRepository } from "../repositories/VideoRepository";
import { roomRepository } from "../repositories/RoomRepository";
import { ApiError, BadRequestError, DuplicityError, NotFoundError } from "../helpers/api-errors";

type VideoRequest = {
  title: string;
  url: string;
  room_id: string;
}

export class CreateVideoService {

  async execute({ title, url, room_id }: VideoRequest): Promise<Video | ApiError> {
    
    if(!title){
      throw new BadRequestError('Field mandatory [title] not found');
    }else if(!room_id){
      return new BadRequestError('Field mandatory [room_id] not found');
    }else if(await videoRepository.findOneBy({title})){
      return new DuplicityError(`Video title [${title}] already exists`);
    }
    
    const room = await roomRepository.findOne({where: {id: room_id}});

    if(!room){
      return new NotFoundError(`Room [${room_id}] not exists`);
    }
    
    const video = videoRepository.create({
      title,
      url,
      room
    })

    await videoRepository.save(video);
    return video;
  }
}