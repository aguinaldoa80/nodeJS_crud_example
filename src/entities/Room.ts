import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { Subject } from "./Subject";
import { Video } from "./Video";

@Entity('rooms')
export class Room {
  @PrimaryColumn()
  id: string

  @Column({type: 'text'})
  name: string

  @OneToMany(() => Video, video => video.room)
  videos: Video[]

  @ManyToMany(() => Subject, subject => subject.rooms)
  subjects: Subject[]


  constructor(){
    if(!this.id){
      this.id = uuid()
    }
  }
}