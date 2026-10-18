import React, { useState } from 'react';

interface WeddingImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  aspectRatio?: '9/16' | '4/5' | '1/1' | '16/9';
  priority?: boolean;
}

export const WeddingImage: React.FC<WeddingImageProps> = ({
  src,
  alt,
  fallbackTitle = 'Vineeth & Alida',
  fallbackSubtitle = 'Wedding Celebration',
  aspectRatio = '4/5',
  className = '',
  priority = false,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getAspectClass = () => {
    switch (aspectRatio) {
      case '9/16':
        return 'aspect-[9/16]';
      case '4/5':
        return 'aspect-[4/5]';
      case '1/1':
        return 'aspect-square';
      case '16/9':
        return 'aspect-[16/9]';
      default:
        return 'aspect-[4/5]';
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-champagne-light/60 ${getAspectClass()} ${className}`}
    >
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-champagne/40 via-pearl to-champagne/40 animate-pulse" />
      )}

      {/* Actual Image */}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          {...rest}
        />
      ) : (
        /* Refined Wedding Monogram Vector Fallback */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-pearl-100 via-champagne-light to-champagne/40 select-none">
          {/* Subtle ornate decorative frame */}
          <div className="w-full h-full border border-gold/30 rounded-2xl p-4 flex flex-col items-center justify-center relative">
            {/* Corner flourishes */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gold/50" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gold/50" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-gold/50" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-gold/50" />

            {/* Botanical Floral Icon */}
            <div className="w-16 h-16 rounded-full bg-botanical/10 border border-gold/40 flex items-center justify-center mb-4 text-gold">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="w-8 h-8 text-botanical"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" strokeOpacity="0.3" />
                <path d="M12 6c-2 2-3 4-3 6 0 2.5 1.5 4 3 4s3-1.5 3-4c0-2-1-4-3-6z" fill="currentColor" fillOpacity="0.15" />
                <path d="M6 12c2-2 4-3 6-3 2.5 0 4 1.5 4 3s-1.5 3-4 3c-2 0-4-1-6-3z" fill="currentColor" fillOpacity="0.15" />
              </svg>
            </div>

            {/* Monogram */}
            <span className="font-script text-3xl md:text-4xl text-gold mb-1">
              V &amp; A
            </span>

            <h4 className="font-display text-lg md:text-xl font-semibold text-botanical tracking-wide">
              {fallbackTitle}
            </h4>
            <p className="font-sans text-xs text-slate tracking-widest uppercase mt-1">
              {fallbackSubtitle}
            </p>

            <span className="text-[10px] text-slate/70 mt-3 px-2 py-0.5 rounded-full bg-pearl/80 border border-gold/20">
              Replace in public/images/
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
