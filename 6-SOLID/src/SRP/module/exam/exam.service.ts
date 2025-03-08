import { SubjectService } from "./../subject/subject.service";

export class ExamService {
  private subjectService: SubjectService;

  constructor(subjectService: SubjectService) {
    this.subjectService = subjectService;
  }

  getSubjectQuestion(subjectName: string) {
    return this.subjectService.getService(subjectName);
  }
}
