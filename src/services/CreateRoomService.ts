import { Subject } from "../entities/Subject";
import { Room } from "../entities/Room";
import { roomRepository } from "../repositories/RoomRepository";
import { BadRequestError, DuplicityError } from "../helpers/api-errors";

type RoomRequest = {
  name: string;
  subjects: []
}

export class CreateRoomService {

  async execute({ name, subjects }: RoomRequest): Promise<Room | Error> {
    
    if(!name){
      throw new BadRequestError('Field mandatory [name] not found');
    }

    if(await roomRepository.findOneBy({name})){
      throw new DuplicityError(`Room name [${name}] already exists`);
    }
    
    const room = roomRepository.create({
      name,
      subjects
    })
    const sub = new Subject();
    sub.id = "f5d0614d-18fd-4305-907f-3ead63c42aa3"

    await roomRepository.save(room);
    
    return room;
  }
}