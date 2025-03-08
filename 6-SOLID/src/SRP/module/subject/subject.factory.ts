import { createSubjectDto } from "./subject.dto";
import { Subject } from "./subject.model";

export class SubjectFactory {
  create(dto: createSubjectDto) {
    return new Subject(dto.name, dto.questions);
  }
}
