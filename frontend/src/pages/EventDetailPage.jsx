import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Share2, CalendarPlus, ExternalLink } from 'lucide-react';
import { events } from '@/data/mockData';

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === parseInt(id));

  if (!event) {
    return (
      <PageContainer title="Eveniment" showBack>
        <div className="py-12 text-center">
          <p className="text-gray-500">Evenimentul nu a fost găsit.</p>
          <Button variant="link" onClick={() => navigate('/events')}>Mergi la Evenimente</Button>
        </div>
      </PageContainer>
    );
  }

  const eventDate = new Date(event.date);
  const isPast = eventDate < new Date();
  
  const formattedDate = eventDate.toLocaleDateString('ro-RO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      });
    }
  };

  const handleAddToCalendar = () => {
    const startDate = new Date(`${event.date}T${event.time}`).toISOString().replace(/[-:]/g, '').split('.')[0];
    const endDate = event.endDate 
      ? new Date(`${event.endDate}T${event.time}`).toISOString().replace(/[-:]/g, '').split('.')[0]
      : new Date(new Date(`${event.date}T${event.time}`).getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0];
    
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    window.open(calendarUrl, '_blank');
  };

  return (
    <PageContainer title="Eveniment" showBack noPadding>
      <div className="pb-4">
        {/* Event Image */}
        {event.image && (
          <div className="relative h-56">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <Badge className="mb-2" variant="secondary">{event.category}</Badge>
              <h1 className="text-2xl font-bold text-white">{event.title}</h1>
            </div>
            {isPast && (
              <Badge className="absolute top-4 right-4" variant="outline">Eveniment trecut</Badge>
            )}
          </div>
        )}

        <div className="px-4">
          {!event.image && (
            <div className="pt-4">
              <Badge className="mb-2">{event.category}</Badge>
              <h1 className="text-2xl font-bold">{event.title}</h1>
              {isPast && <Badge className="mt-2" variant="outline">Eveniment trecut</Badge>}
            </div>
          )}

          {/* Event Details */}
          <Card className="mt-4">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-primary-600" />
                <div>
                  <p className="font-medium">{formattedDate}</p>
                  {event.endDate && (
                    <p className="text-sm text-gray-500">
                      până la {new Date(event.endDate).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long' })}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-primary-600" />
                <p className="font-medium">{event.time}</p>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-primary-600" />
                <p className="font-medium">{event.location}</p>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="mt-4">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Descriere</h3>
              <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="mt-6 space-y-3">
            {!isPast && (
              <Button className="w-full" onClick={handleAddToCalendar}>
                <CalendarPlus className="w-4 h-4 mr-2" />
                Adaugă în Calendar
              </Button>
            )}
            
            {event.registrationRequired && event.registrationLink && !isPast && (
              <Button variant="outline" className="w-full" asChild>
                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Înscrie-te
                </a>
              </Button>
            )}
            
            <Button variant="outline" className="w-full" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Distribuie
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
