'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoEmbedProps {
  videoUrl: string;
  thumbnailUrl?: string;
  title?: string;
  className?: string;
}

function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function getVideoEmbedUrl(url: string): string {
  // Check if it's already an embed URL
  if (url.includes('/embed/')) {
    return url;
  }

  // Try to extract YouTube ID and create embed URL
  const youtubeId = getYouTubeId(url);
  if (youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}`;
  }

  // Return original URL if we can't parse it
  return url;
}

function getYouTubeThumbnail(url: string): string | null {
  const videoId = getYouTubeId(url);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return null;
}

export default function VideoEmbed({
  videoUrl,
  thumbnailUrl,
  title = 'Video',
  className = '',
}: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = getVideoEmbedUrl(videoUrl);
  const thumbnail = thumbnailUrl || getYouTubeThumbnail(videoUrl);

  if (isPlaying) {
    return (
      <div className={`relative w-full aspect-video rounded-xl overflow-hidden shadow-lg ${className}`}>
        <iframe
          src={`${embedUrl}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-video rounded-xl overflow-hidden shadow-lg group cursor-pointer ${className}`}>
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

      {/* Play Button */}
      <button
        onClick={() => setIsPlaying(true)}
        className="absolute inset-0 flex items-center justify-center"
        aria-label="Play video"
      >
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
          <Play className="w-8 h-8 text-white ml-1" fill="white" />
        </div>
      </button>

      {/* Title overlay */}
      {title && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <p className="text-white font-medium">{title}</p>
        </div>
      )}
    </div>
  );
}
