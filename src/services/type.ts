export interface IUserAnswer {
  answer: string;
  correct: string;
  correctAnswer: string;
  question: string;
}

export interface IQuestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answer: string;
  questions: string;
  totalQuestions: number;
  questionNumber: number;
}
