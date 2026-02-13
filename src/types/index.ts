export interface Memory {
  id: number;
  year: string;
  title: string;
  description: string;
  date: string;
  emoji: string;
}

export interface AppState {
  currentStep: number;
  answer: string | null;
  quizScore: number;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  hint?: string;
}

export interface Photo {
  id: number;
  url: string;
  caption: string;
  date: string;
}
