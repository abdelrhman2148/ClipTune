import Image from 'next/image';
import { useState } from 'react';

interface LazyImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
}

export function LazyImage({ src, alt, width, height, className, priority = false }: LazyImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={`relative overflow-hidden ${className || ''}`}>
            {isLoading && (
                <div className="absolute inset-0 bg-slate-200 animate-pulse" />
            )}
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
                priority={priority}
                loading={priority ? undefined : 'lazy'}
            />
        </div>
    );
}


