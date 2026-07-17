import React, { useState, useEffect } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ src, fallbackSrc, alt, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasFailed, setHasFailed] = useState(false);

  // Monitor src changes
  useEffect(() => {
    setImgSrc(src);
    setHasFailed(false);
  }, [src]);

  const handleError = () => {
    if (!hasFailed) {
      setImgSrc(fallbackSrc);
      setHasFailed(true);
    }
  };

  return (
    <img
      src={imgSrc}
      onError={handleError}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};
