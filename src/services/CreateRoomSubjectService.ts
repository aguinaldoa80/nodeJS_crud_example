import { Room } from "../entities/Room";
import { roomRepository } from "../repositories/RoomRepository";
import { RoomSubjectDTO } from "../dto/RoomSubjectDTO";
import { subjectRepository } from "../repositories/SubjectRepository";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";

type RoomSubjectRequest = {
  room_id: string;
  subject_id: string;
}

export class CreateRoomSubjectService {

  async execute({ room_id, subject_id }: RoomSubjectRequest): Promise<Room | Error> {
    
    if(!room_id){
      throw new BadRequestError('Field mandatory [room_id] not found');
    }else if(!subject_id){
      throw new BadRequestError('Field mandatory [subject_id] not found');
    }

    const room = await roomRepository.findOneBy({id: room_id});
    
    if(!room){
      throw new NotFoundError(`Room ID [${room_id}] not exists`);
    }

    const subject = await subjectRepository.findOneBy({id: subject_id});

    if(!subject){
      throw new NotFoundError(`Subject ID [${subject_id}] not exists`);
    }
    
    room.subjects = [subject]
    await roomRepository.save(room)
    return room;
  }
}