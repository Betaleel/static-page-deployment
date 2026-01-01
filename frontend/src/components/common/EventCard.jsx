import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function EventCard({ event, compact = false }) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('ro-RO', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });
  const isPast = eventDate < new Date();

  if (compact) {
    return (
      <Link to={`/events/${event.id}`}>
        <Card className={`overflow-hidden hover:shadow-md transition-shadow ${isPast ? 'opacity-60' : ''}`}>
          <CardContent className="p-4 flex items-center">
            <div className="bg-primary-100 dark:bg-primary-900 rounded-lg p-3 mr-4 text-center min-w-[60px]">
              <span className="text-primary-600 dark:text-primary-400 text-xs font-medium uppercase block">
                {eventDate.toLocaleDateString('ro-RO', { month: 'short' })}
              </span>
              <span className="text-primary-600 dark:text-primary-400 text-2xl font-bold block">
                {eventDate.getDate()}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm line-clamp-1">{event.title}</h3>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                <Clock className="w-3 h-3 mr-1" />
                <span>{event.time}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/events/${event.id}`}>
      <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${isPast ? 'opacity-60' : ''}`}>
        {event.image && (
          <div className="relative h-40">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-3 left-3" variant="secondary">
              {event.category}
            </Badge>
            {isPast && (
              <Badge className="absolute top-3 right-3" variant="outline">
                Trecut
              </Badge>
            )}
          </div>
        )}
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
            {event.description}
          </p>
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
          {event.registrationRequired && (
            <Badge className="mt-3" variant="outline">Necesită înregistrare</Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
