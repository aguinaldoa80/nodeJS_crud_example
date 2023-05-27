import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { Room } from "./Room";

@Entity('subjects')
export class Subject {

  @PrimaryColumn()
  id: string

  @Column({type: 'text'})
  name: string

  @ManyToMany(() => Room, room => room.subjects)
  @JoinTable({
    name: 'room_subject',
    joinColumn: {
      name: 'room_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'subject_id',
      referencedColumnName: 'id'
    }
  })
  rooms: Room[]

  constructor(){
    if(!this.id){
      this.id = uuid()
    }
  }
}