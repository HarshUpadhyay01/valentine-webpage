import React from 'react';

const FinalMessage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-pink-100 to-rose-100 p-4">
      <div className="text-center max-w-3xl animate-fade-in">
        <div className="animate-heart-beat mb-8">
          <span className="text-9xl">💕</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
          You Said Yes! 🎉
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
          These three years have been the most amazing journey of my life. 
          Every moment with you is a blessing, and I can't wait to create 
          countless more memories together. You make my world brighter, 
          my days happier, and my heart fuller.
        </p>
        <p className="text-2xl md:text-3xl font-bold text-rose-600 mb-8">
          Happy Valentine's Day, My Love! 💖
        </p>
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block">
          <p className="text-lg text-gray-700 italic">
            "In all the world, there is no heart for me like yours.<br/>
            In all the world, there is no love for you like mine."<br/>
            <span className="text-sm">- Maya Angelou</span>
          </p>
        </div>
        <div className="flex justify-center gap-4 text-4xl animate-bounce-slow">
          <span>💖</span>
          <span>💝</span>
          <span>💗</span>
          <span>💓</span>
          <span>💕</span>
        </div>
      </div>
    </div>
  );
};

export default FinalMessage;
