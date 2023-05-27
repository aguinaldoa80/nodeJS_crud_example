import {Room} from '../entities/Room'
import {Subject} from '../entities/Subject'

export class RoomSubjectDTO {
  room: Room
  subject: Subject
  roomSubjectDto: Promise<Room | null>
}