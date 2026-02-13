import React, { useState } from 'react';
import Hero from './components/Hero';
import Question from './components/Question';
import Timeline from './components/Timeline';
import FinalMessage from './components/FinalMessage';
import { AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentStep: 0,
    answer: null,
  });

  const handleNext = () => {
    setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  const handleAnswer = (answer: string) => {
    setState(prev => ({ ...prev, answer }));
    if (answer === 'yes') {
      handleNext();
    }
  };

  const handleTimelineComplete = () => {
    handleNext();
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 0:
        return <Hero onNext={handleNext} />;
      case 1:
        return <Question onAnswer={handleAnswer} />;
      case 2:
        return <Timeline onComplete={handleTimelineComplete} />;
      case 3:
        return <FinalMessage />;
      default:
        return <Hero onNext={handleNext} />;
    }
  };

  return <div className="App">{renderStep()}</div>;
};

export default App;
