import { SubjectFactory } from "./subject.factory";
import { SubjectCache } from "../../Cache/subject.cache";
import {
  createSubjectDto,
  ISubjectServiceInterface,
  SubjectDto,
} from "./subject.dto";

export class SubjectService implements ISubjectServiceInterface {
  private subjectCache: SubjectCache;
  private subjectFactory: SubjectFactory;

  constructor(subjectCache: SubjectCache, subjectFactory: SubjectFactory) {
    this.subjectCache = subjectCache;
    this.subjectFactory = subjectFactory;
  }

  createService(dto: createSubjectDto) {
    const data = this.subjectFactory.create(dto);
    const subjectDto: SubjectDto = {
      id: data.getId(),
      name: data.getName(),
      questions: data.getQuestions(),
    };
    this.subjectCache.addServiceToCache(subjectDto);
    return data;
  }

  getService(subjectName: string) {
    return this.subjectCache.getSubject(subjectName);
  }

  getAllSubject() {
    return this.subjectCache.getAll();
  }
}
