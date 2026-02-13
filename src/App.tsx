import React, { useState } from 'react';
import Hero from './components/Hero';
import Quiz from './components/Quiz';
import PhotoGallery from './components/PhotoGallery';
import Question from './components/Question';
import FinalMessage from './components/FinalMessage';
import { AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentStep: 0,
    answer: null,
    quizScore: 0,
  });

  const handleNext = () => {
    setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  const handleQuizComplete = (score: number) => {
    setState(prev => ({ ...prev, quizScore: score }));
    handleNext();
  };

  const handleAnswer = (answer: string) => {
    setState(prev => ({ ...prev, answer }));
    if (answer === 'yes') {
      handleNext();
    }
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 0:
        return <Hero onNext={handleNext} />;
      case 1:
        return <Quiz onComplete={handleQuizComplete} />;
      case 2:
        return <PhotoGallery onNext={handleNext} />;
      case 3:
        return <Question onAnswer={handleAnswer} />;
      case 4:
        return <FinalMessage />;
      default:
        return <Hero onNext={handleNext} />;
    }
  };

  return <div className="App">{renderStep()}</div>;
};

export default App;
