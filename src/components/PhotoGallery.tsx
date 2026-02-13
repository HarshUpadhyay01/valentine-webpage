import React, { useState, useEffect, useRef } from 'react';
import { Photo } from '../types';

interface PhotoGalleryProps {
  onNext: () => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onNext }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const sphereRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  // Your 22 photos with custom captions and dates
    const photos: Photo[] = [
    {
        id: 1,
        url: `${process.env.PUBLIC_URL}/images/photo1.jpeg`,  // ✅ This works!
        caption: 'Promise to Always Love',
        date: 'Forever'
    },
    {
        id: 2,
        url: `${process.env.PUBLIC_URL}/images/photo2.jpeg`,
        caption: 'Promise to Make You Smile',
        date: 'Every Day'
    },
    {
        id: 3,
        url: `${process.env.PUBLIC_URL}/images/photo3.jpeg`,
        caption: 'Promise to Be There',
        date: 'Always'
    },
    {
        id: 4,
        url: `${process.env.PUBLIC_URL}/images/photo4.jpeg`,
        caption: 'Promise to Support You',
        date: 'Forever'
    },
    {
        id: 5,
        url: `${process.env.PUBLIC_URL}/images/photo5.jpeg`,
        caption: 'Promise to Care',
        date: 'Endlessly'
    },
    {
        id: 6,
        url: `${process.env.PUBLIC_URL}/images/photo6.jpeg`,
        caption: 'Promise to Listen',
        date: 'Always'
    },
    {
        id: 7,
        url: `${process.env.PUBLIC_URL}/images/photo7.jpeg`,
        caption: 'Promise to Cherish',
        date: 'Every Moment'
    },
    {
        id: 8,
        url: `${process.env.PUBLIC_URL}/images/photo8.jpeg`,
        caption: 'Promise to Protect',
        date: 'Forever'
    },
    {
        id: 9,
        url: `${process.env.PUBLIC_URL}/images/photo9.jpeg`,
        caption: 'Promise to Make Memories',
        date: 'Together'
    },
    {
        id: 10,
        url: `${process.env.PUBLIC_URL}/images/photo10.jpeg`,
        caption: 'Promise to Keep You Happy',
        date: 'Always'
    },
    {
        id: 11,
        url: `${process.env.PUBLIC_URL}/images/photo11.jpeg`,
        caption: 'Promise to Understand',
        date: 'Forever'
    },
    {
        id: 12,
        url: `${process.env.PUBLIC_URL}/images/photo12.jpeg`,
        caption: 'Promise to Grow Together',
        date: 'Always'
    },
    {
        id: 13,
        url: `${process.env.PUBLIC_URL}/images/photo13.jpeg`,
        caption: 'Promise to Respect',
        date: 'Every Day'
    },
    {
        id: 14,
        url: `${process.env.PUBLIC_URL}/images/photo14.jpeg`,
        caption: 'Promise to Be Honest',
        date: 'Always'
    },
    {
        id: 15,
        url: `${process.env.PUBLIC_URL}/images/photo15.jpeg`,
        caption: 'Promise to Adventure',
        date: 'Together'
    },
    {
        id: 16,
        url: `${process.env.PUBLIC_URL}/images/photo16.jpeg`,
        caption: 'Promise to Hold Your Hand',
        date: 'Forever'
    },
    {
        id: 17,
        url: `${process.env.PUBLIC_URL}/images/photo17.jpeg`,
        caption: 'Promise to Dream Together',
        date: 'Always'
    },
    {
        id: 18,
        url: `${process.env.PUBLIC_URL}/images/photo18.jpeg`,
        caption: 'Promise to Never Give Up',
        date: 'On Us'
    },
    {
        id: 19,
        url: `${process.env.PUBLIC_URL}/images/photo19.jpeg`,
        caption: 'Promise to Love Unconditionally',
        date: 'Forever'
    },
    {
        id: 20,
        url: `${process.env.PUBLIC_URL}/images/photo20.jpeg`,
        caption: 'Promise to Be Your Best Friend',
        date: 'Always'
    },
    {
        id: 21,
        url: `${process.env.PUBLIC_URL}/images/photo21.jpeg`,
        caption: 'Promise to Choose You',
        date: 'Every Time'
    },
    {
        id: 22,
        url: `${process.env.PUBLIC_URL}/images/photo22.jpeg`,
        caption: 'Promise to Love You Forever',
        date: 'And Always'
    }
    ];



  // Smooth auto-rotation using requestAnimationFrame with ref
  useEffect(() => {
    if (isDragging || selectedPhoto) return;

    const animate = () => {
      rotationRef.current.y += 0.2;
      
      if (sphereRef.current) {
        sphereRef.current.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging, selectedPhoto]);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedPhoto) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || selectedPhoto) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotation(prev => ({
      x: prev.x - deltaY * 0.3,
      y: prev.y + deltaX * 0.3
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (selectedPhoto) return;
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || selectedPhoto) return;

    const deltaX = e.touches[0].clientX - dragStart.x;
    const deltaY = e.touches[0].clientY - dragStart.y;

    setRotation(prev => ({
      x: prev.x - deltaY * 0.3,
      y: prev.y + deltaX * 0.3
    }));

    setDragStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const getPhotoPosition = (index: number, total: number) => {
    const phi = Math.acos(-1 + (2 * index + 1) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    const radius = 400;

    return {
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi)
    };
  };

  const handlePhotoClick = (photo: Photo, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto) {
      setSelectedPhoto(photo);
    }
  };

  const handleClosePhoto = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-rose-100 py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center gradient-text mb-4 animate-fade-in">
          Our Memory Globe
        </h2>
        <p className="text-center text-gray-600 mb-8 text-lg">
          {selectedPhoto ? 'Viewing memory' : 'Drag to rotate • Click to view 🌍💕'}
        </p>

        {/* 3D Sphere Container */}
        <div
          className={`relative w-full h-[600px] flex items-center justify-center select-none transition-all duration-500 ${
            selectedPhoto ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100'
          }`}
          style={{ perspective: '1200px' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={sphereRef}
            className="relative w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              cursor: isDragging ? 'grabbing' : 'grab',
              willChange: 'transform'
            }}
          >
            {photos.map((photo, index) => {
              const pos = getPhotoPosition(index, photos.length);

              return (
                <div
                  key={photo.id}
                  onClick={(e) => handlePhotoClick(photo, e)}
                  className="absolute z-10"
                  style={{
                    transform: `translate(-50%, -50%) translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px)`,
                    left: '50%',
                    top: '50%',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="relative group w-28 h-28 md:w-36 md:h-36">
                    {/* Memory Tag */}
                    <div
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300"
                      style={{ pointerEvents: 'none' }}
                    >
                      {photo.caption}
                    </div>

                    {/* Image Card */}
                    <div
                      className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white group-hover:border-pink-300 transition-all duration-300"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                      }}
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        draggable="false"
                        loading="lazy"
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                        <span className="text-white font-bold text-xs md:text-sm">
                          Click to view
                        </span>
                      </div>
                    </div>

                    {/* Date badge */}
                    <div
                      className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full text-xs text-gray-600 shadow-md opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300"
                      style={{ pointerEvents: 'none' }}
                    >
                      {photo.date}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lightbox Modal for Selected Photo */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={handleClosePhoto}
          >
            <div
              className="relative max-w-4xl w-full animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClosePhoto}
                className="absolute -top-12 right-0 md:-right-12 md:top-0 text-white hover:text-pink-300 transition-colors z-10"
                aria-label="Close"
              >
                <svg
                  className="w-10 h-10 md:w-12 md:h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Image Container */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                
                {/* Heart decoration */}
                <div className="absolute top-4 right-4 text-4xl md:text-5xl animate-heart-beat">
                  💖
                </div>
              </div>

              {/* Caption and Date */}
              <div className="text-center mt-6">
                <div className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full mb-3">
                  <h3 className="text-xl md:text-2xl font-bold">
                    {selectedPhoto.caption}
                  </h3>
                </div>
                <p className="text-white text-lg md:text-xl">{selectedPhoto.date}</p>
              </div>

              {/* Close instruction */}
              <div className="text-center mt-4">
                <p className="text-white/70 text-sm">
                  Click outside or ✕ to close
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        {!selectedPhoto && (
          <div className="text-center mt-12">
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-12 py-4 rounded-full text-xl font-bold hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl animate-pulse"
            >
              Continue to Something Special 💖
            </button>
          </div>
        )}

        {/* Instructions */}
        {!selectedPhoto && (
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>💡 Drag to spin the globe • Click any photo to view • {photos.length} memories</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
