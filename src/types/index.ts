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
}
