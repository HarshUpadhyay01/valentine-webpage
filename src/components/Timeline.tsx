import React, { useState, useEffect } from 'react';
import { Memory } from '../types';

interface TimelineProps {
  onComplete: () => void;
}

const Timeline: React.FC<TimelineProps> = ({ onComplete }) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  // Customize these memories with your actual memories!
  const memories: Memory[] = [
    {
      id: 1,
      year: 'Year 1',
      title: 'Our First Meeting',
      description: 'The day we first met and my world changed forever. Your smile lit up the room.',
      date: 'February 14, 2023',
      emoji: '✨'
    },
    {
      id: 2,
      year: 'Year 1',
      title: 'First Coffee Date',
      description: 'That cozy café where we talked for hours and time just flew by.',
      date: 'March 2023',
      emoji: '☕'
    },
    {
      id: 3,
      year: 'Year 1',
      title: 'Summer Adventures',
      description: 'Beach trips, late-night drives, and endless laughter under the stars.',
      date: 'June 2023',
      emoji: '🌅'
    },
    {
      id: 4,
      year: 'Year 2',
      title: 'Birthday Surprise',
      description: 'When I surprised you with your favorite things and saw that beautiful smile.',
      date: 'August 2023',
      emoji: '🎂'
    },
    {
      id: 5,
      year: 'Year 2',
      title: 'Road Trip',
      description: 'Our spontaneous road trip filled with music, snacks, and unforgettable moments.',
      date: 'December 2023',
      emoji: '🚗'
    },
    {
      id: 6,
      year: 'Year 2',
      title: 'New Year Together',
      description: 'Starting 2024 with you by my side was the best way to begin the year.',
      date: 'January 2024',
      emoji: '🎆'
    },
    {
      id: 7,
      year: 'Year 3',
      title: 'Growing Together',
      description: 'Through ups and downs, we grew stronger and closer every single day.',
      date: 'Mid 2024',
      emoji: '🌱'
    },
    {
      id: 8,
      year: 'Year 3',
      title: 'Simple Moments',
      description: 'Movie nights, cooking together, silly jokes - the little things that mean everything.',
      date: '2024-2025',
      emoji: '🎬'
    },
    {
      id: 9,
      year: 'Year 3',
      title: 'Today & Forever',
      description: 'Every moment with you is a treasure. Here\'s to many more years together!',
      date: 'February 14, 2026',
      emoji: '💕'
    }
  ];

  useEffect(() => {
    memories.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, index * 400);
    });

    const completeTimer = setTimeout(() => {
      onComplete();
    }, memories.length * 400 + 2000);

    return () => clearTimeout(completeTimer);
  }, [memories.length, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center gradient-text mb-4 animate-fade-in">
          Our Journey Together
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg">
          Three beautiful years of memories 💖
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-300 via-rose-400 to-purple-400"></div>

          {memories.map((memory, index) => (
            <div
              key={memory.id}
              className={`mb-12 flex items-center w-full ${
                index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
              } transition-all duration-700 ${
                visibleItems.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="w-full md:w-5/12"></div>
              
              <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                <div className="absolute w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-pink-300 animate-pulse">
                  <span className="text-2xl md:text-3xl">{memory.emoji}</span>
                </div>
              </div>

              <div className={`w-full md:w-5/12 px-4 md:px-8 ${
                index % 2 === 0 ? 'md:text-right' : 'md:text-left'
              }`}>
                <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-pink-100">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-sm rounded-full mb-2 font-semibold">
                    {memory.year}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {memory.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{memory.description}</p>
                  <p className="text-sm text-gray-500">{memory.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
