'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean; // ← добавь эту строку
}


export function ImageWithFallback({
  src,
  alt = '',
  className = '',
  width = 800,
  height = 600,
  ...rest
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  const fallback =
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80";

  return (
    <Image
      {...rest}
      src={error ? fallback : src}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover rounded-[20px] ${className}`}
      onError={() => setError(true)}
      style={{ width: "100%", height: "auto", aspectRatio: "3 / 4" }}
      priority
    />
  );
}
