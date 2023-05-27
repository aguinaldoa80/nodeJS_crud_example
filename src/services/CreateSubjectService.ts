import { Subject } from "../entities/Subject";
import {subjectRepository} from '../repositories/SubjectRepository'
import { Room } from "../entities/Room";
import { ApiError, BadRequestError, DuplicityError } from "../helpers/api-errors";

type SubjectRequest = {
  name: string;
}

export class CreateSubjectService {

  async execute({ name }: SubjectRequest): Promise<Subject | ApiError> {
    
    if(!name){
      throw new BadRequestError('Field mandatory [name] not found');
    }

    if(await subjectRepository.findOneBy({name})){
      throw new DuplicityError(`Subject name [${name}] already exists`);
    }
    
    const subject = subjectRepository.create({
      name
    })

    await subjectRepository.save(subject);
    return subject;
  }
}