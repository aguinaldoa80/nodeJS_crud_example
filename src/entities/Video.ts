import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { Room } from "./Room";

@Entity('videos')
export class Video {

  @PrimaryColumn()
  id: string

  @Column({type: 'text'})
  title: string

  @Column({type: 'text', nullable: true})
  url: string

  @ManyToOne(() => Room, room => room.videos)
  @JoinColumn({name: 'room_id'})
  room: Room

  constructor(){
    if(!this.id){
      this.id = uuid()
    }
  }
}