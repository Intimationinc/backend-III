import { SubjectDto } from "../module/subject/subject.dto";
import { Subject } from "../module/subject/subject.model";

export class SubjectCache {
  private subjects: Map<string, SubjectDto> = new Map();

  getSubject(subjectName: string) {
    return this.subjects.get(subjectName) || null;
  }

  addServiceToCache(subject: SubjectDto) {
    this.subjects.set(subject.name, subject);
  }

  getAll() {
    return this.subjects;
  }
}
