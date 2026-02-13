import React from 'react';

interface HeroProps {
  onNext: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-red-50 to-rose-100 p-4">
      <div className="text-center animate-fade-in">
        <div className="animate-float mb-8">
          <span className="text-9xl">💕</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6 animate-slide-up">
          Happy Valentine's Day!
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 animate-slide-up">
          I have something special to tell you...
        </p>
        <button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl animate-bounce-slow"
        >
          Continue ❤️
        </button>
      </div>
    </div>
  );
};

export default Hero;
