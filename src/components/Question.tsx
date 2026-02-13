import React, { useState } from 'react';

interface QuestionProps {
  onAnswer: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ onAnswer }) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonSize, setNoButtonSize] = useState(100);
  const [yesButtonSize, setYesButtonSize] = useState(100);
  const [clickCount, setClickCount] = useState(0);

  const handleNoHover = () => {
    const randomX = Math.random() * (window.innerWidth - 200);
    const randomY = Math.random() * (window.innerHeight - 200);
    setNoButtonPosition({ x: randomX, y: randomY });
    setNoButtonSize(prev => Math.max(prev - 10, 40));
    setYesButtonSize(prev => prev + 15);
    setClickCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-red-100 p-4">
      <div className="text-center max-w-2xl animate-fade-in">
        <div className="animate-heart-beat mb-8">
          <span className="text-8xl">💖</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Will you be my Valentine?
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-12">
          {clickCount > 5 && "Come on, you know you want to say yes! 😊"}
          {clickCount > 10 && " Please? 🥺"}
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center relative">
          <button
            onClick={() => onAnswer('yes')}
            style={{ 
              width: `${yesButtonSize * 1.5}px`,
              height: `${yesButtonSize * 0.6}px`
            }}
            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full font-bold hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl z-10"
          >
            Yes! 💚
          </button>
          
          <button
            onMouseEnter={handleNoHover}
            onClick={handleNoHover}
            style={{
              position: clickCount > 0 ? 'fixed' : 'relative',
              left: noButtonPosition.x,
              top: noButtonPosition.y,
              width: `${noButtonSize * 1.5}px`,
              height: `${noButtonSize * 0.6}px`,
              fontSize: `${noButtonSize * 0.16}px`
            }}
            className="bg-gray-400 text-white rounded-full font-bold transition-all duration-300 shadow-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
