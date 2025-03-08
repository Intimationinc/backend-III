export class Subject {
  private id: string;
  private name: string;
  private questions: string[];

  constructor(name: string, questions: string[] = []) {
    (this.id = crypto.randomUUID()),
      (this.name = name),
      (this.questions = questions);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getQuestions() {
    return this.questions;
  }

  update(name?: string, questions: string[] = []) {
    this.name = name || this.name;
    this.questions = questions.length ? questions : this.questions;
  }
}
