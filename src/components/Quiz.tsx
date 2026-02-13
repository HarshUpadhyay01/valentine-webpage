import React, { useState } from 'react';
import { Question } from '../types';

interface QuizProps {
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [hearts, setHearts] = useState(3);

  // Updated questions about your relationship!
  const questions: Question[] = [
    {
      id: 1,
      question: "Where did we first meet?",
      options: ["At a café", "College", "At a party", "Online"],
      correctAnswer: "College",
      hint: "Think about that special place..."
    },
    {
      id: 2,
      question: "Who approached first?",
      options: ["Harsh", "Pooja"],
      correctAnswer: "Pooja",
      hint: "Who made the first move? 😊"
    },
    {
      id: 3,
      question: "Who proposed first?",
      options: ["Harsh", "Pooja"],
      correctAnswer: "Harsh",
      hint: "Who took the bold step? 💕"
    },
    {
      id: 4,
      question: "What's your favourite thing about our relationship?",
      options: ["Me Being Possessive", "Our Adventures", "Late Night Talks", "Your Cooking"],
      correctAnswer: "Me Being Possessive",
      hint: "You know what makes us special..."
    },
    {
      id: 5,
      question: "What do I love most in you?",
      options: ["Your Smile", "Your Kindness", "Your Voice", "Everything"],
      correctAnswer: "Everything",
      hint: "This one's easy! There's only one right answer 💕"
    }
  ];

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    const isCorrect = answer === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    } else {
      setHearts(hearts - 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setTimeout(() => onComplete(score + (isCorrect ? 1 : 0)), 1500);
      }
    }, 1500);
  };

  const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 p-4">
      <div className="max-w-2xl w-full">
        {/* Hearts Display */}
        <div className="flex justify-center gap-3 mb-8 animate-fade-in">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`text-6xl transition-all duration-500 ${
                index < hearts
                  ? 'animate-heart-beat scale-100 opacity-100'
                  : 'scale-50 opacity-30 grayscale'
              }`}
            >
              {index < hearts ? '❤️' : '💔'}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Score: {score}/{questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-pink-400 to-rose-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            {questions[currentQuestion].question}
          </h2>

          {questions[currentQuestion].hint && (
            <p className="text-center text-gray-500 italic mb-6">
              💭 {questions[currentQuestion].hint}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = option === questions[currentQuestion].correctAnswer;
              const showResult = isAnswered;

              let buttonStyle = 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200';

              if (showResult) {
                if (isCorrectAnswer) {
                  buttonStyle = 'bg-green-100 border-2 border-green-500';
                } else if (isSelected && !isCorrectAnswer) {
                  buttonStyle = 'bg-red-100 border-2 border-red-500';
                }
              } else if (isSelected) {
                buttonStyle = 'bg-pink-100 border-2 border-pink-400';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  className={`${buttonStyle} p-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed relative overflow-hidden`}
                >
                  {option}
                  {showResult && isCorrectAnswer && (
                    <span className="absolute right-4 text-2xl">✓</span>
                  )}
                  {showResult && isSelected && !isCorrectAnswer && (
                    <span className="absolute right-4 text-2xl">✗</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Animation */}
          {isAnswered && (
            <div className="mt-6 text-center animate-fade-in">
              {isCorrect ? (
                <div className="text-green-600 font-bold text-xl flex items-center justify-center gap-2">
                  <span className="text-4xl animate-bounce">💚</span>
                  <span>Correct! You know me so well!</span>
                </div>
              ) : (
                <div className="text-red-600 font-bold text-xl flex items-center justify-center gap-2">
                  <span className="text-4xl">💔</span>
                  <span>Oops! But I still love you!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
