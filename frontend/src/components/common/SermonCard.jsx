import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SermonCard({ sermon, compact = false }) {
  const formattedDate = new Date(sermon.date).toLocaleDateString('ro-RO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  if (compact) {
    return (
      <Link to={`/sermons/${sermon.id}`}>
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="flex">
            <div className="relative w-28 h-20 flex-shrink-0">
              <img
                src={sermon.thumbnail}
                alt={sermon.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Play className="w-8 h-8 text-white" fill="white" />
              </div>
            </div>
            <CardContent className="p-3 flex-1">
              <h3 className="font-semibold text-sm line-clamp-1">{sermon.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{sermon.speaker}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{formattedDate}</p>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/sermons/${sermon.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative aspect-video">
          <img
            src={sermon.thumbnail}
            alt={sermon.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <Badge variant="secondary" className="mb-2">{sermon.category}</Badge>
            <h3 className="font-semibold text-white text-lg line-clamp-2">{sermon.title}</h3>
          </div>
          <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded text-white text-xs flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {sermon.duration}
          </div>
          <button className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-primary-600" fill="currentColor" />
            </div>
          </button>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <User className="w-4 h-4 mr-1" />
            <span>{sermon.speaker}</span>
            <span className="mx-2">•</span>
            <span>{formattedDate}</span>
          </div>
          {sermon.series && (
            <p className="text-xs text-primary-600 dark:text-primary-400 mt-2">Seria: {sermon.series}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
