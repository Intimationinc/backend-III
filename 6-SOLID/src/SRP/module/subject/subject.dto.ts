import { Subject } from "./subject.model";

export type SubjectDto = {
  id: string;
  name: string;
  questions: string[];
};

export interface ISubjectServiceInterface {
  createService(dto: createSubjectDto): Subject;
  getService(subjectName: string): SubjectDto | null;
  getAllSubject(): void;
}

export type createSubjectDto = Pick<SubjectDto, "name" | "questions">;
