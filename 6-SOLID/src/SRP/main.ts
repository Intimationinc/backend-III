import { SubjectCache } from "./Cache/subject.cache";
import { SubjectFactory } from "./module/subject/subject.factory";
import { SubjectService } from "./module/subject/subject.service";

const subjectService = new SubjectService(
  new SubjectCache(),
  new SubjectFactory()
);

const subject = subjectService.createService({
  name: "Math",
  questions: ["Question 1", "Question 2"],
});

const subject2 = subjectService.createService({
  name: "English",
  questions: ["Question 1", "Question 2"],
});

console.log({
  getAll: subjectService.getAllSubject(),
});
