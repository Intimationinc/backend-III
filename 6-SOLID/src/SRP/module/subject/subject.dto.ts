export type SubjectDto = {
  id: string;
  name: string;
  questions: string[];
};

export type createSubjectDto = Pick<SubjectDto, "name" | "questions">;
