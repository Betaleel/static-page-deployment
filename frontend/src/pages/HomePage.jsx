import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, PlayCircle, Calendar, Heart, ChevronRight, Clock, MapPin } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SermonCard from '@/components/common/SermonCard';
import EventCard from '@/components/common/EventCard';
import AnnouncementCard from '@/components/common/AnnouncementCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sermons, events, announcements, liveStreamInfo, churchInfo } from '@/data/mockData';

const QuickActionButton = ({ icon: Icon, label, to, color }) => (
  <Link to={to} className="flex flex-col items-center">
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color} mb-2 shadow-sm`}>
      <Icon className="w-7 h-7 text-white" />
    </div>
    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{label}</span>
  </Link>
);

const SectionHeader = ({ title, viewAllLink }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
    {viewAllLink && (
      <Link to={viewAllLink} className="text-primary-600 dark:text-primary-400 text-sm font-medium flex items-center">
        Vezi toate
        <ChevronRight className="w-4 h-4 ml-1" />
      </Link>
    )}
  </div>
);

export default function HomePage() {
  // Get upcoming events (future events sorted by date)
  const upcomingEvents = events
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  // Get latest sermons
  const latestSermons = sermons.slice(0, 4);

  // Get latest announcements
  const latestAnnouncements = announcements.slice(0, 2);

  // Calculate countdown to next service
  const getNextService = () => {
    const now = new Date();
    const nextDate = new Date(liveStreamInfo.nextServiceDate + 'T' + liveStreamInfo.nextServiceTime);
    if (nextDate > now) {
      const diff = nextDate - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      return { days, hours, date: nextDate };
    }
    return null;
  };

  const nextService = getNextService();

  return (
    <PageContainer title="Acasă">
      {/* Hero Section - Live/Next Service */}
      <section className="mt-4 mb-6">
        <Card className="overflow-hidden bg-gradient-to-br from-violet-600 to-purple-800 text-white border-0 shadow-lg">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              {liveStreamInfo.isLive ? (
                <Badge className="bg-red-500 text-white animate-pulse">LIVE ACUM</Badge>
              ) : (
                <Badge className="bg-white/20 text-white border-white/30">
                  <Clock className="w-3 h-3 mr-1" />
                  Următorul Serviciu
                </Badge>
              )}
            </div>
            <h2 className="text-xl font-bold mb-2 text-white">{liveStreamInfo.currentTitle}</h2>
            <p className="text-purple-100 text-sm mb-4">{liveStreamInfo.description}</p>
            
            {nextService && !liveStreamInfo.isLive && (
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-center">
                  <span className="text-2xl font-bold text-white">{nextService.days}</span>
                  <span className="text-xs block text-purple-200">zile</span>
                </div>
                <span className="text-xl text-white">:</span>
                <div className="text-center">
                  <span className="text-2xl font-bold text-white">{nextService.hours}</span>
                  <span className="text-xs block text-purple-200">ore</span>
                </div>
              </div>
            )}
            
            <Link to="/live">
              <Button className="w-full bg-white text-purple-700 hover:bg-purple-50 font-semibold">
                <Radio className="w-4 h-4 mr-2" />
                {liveStreamInfo.isLive ? 'Urmărește Live' : 'Vezi Pagina Live'}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <div className="flex justify-around">
          <QuickActionButton icon={Radio} label="Live" to="/live" color="bg-red-500" />
          <QuickActionButton icon={PlayCircle} label="Predici" to="/sermons" color="bg-primary-600" />
          <QuickActionButton icon={Calendar} label="Evenimente" to="/events" color="bg-green-500" />
          <QuickActionButton icon={Heart} label="Dăruiește" to="/giving" color="bg-pink-500" />
        </div>
      </section>

      {/* Service Times */}
      <section className="mb-8">
        <SectionHeader title="Program Servicii" />
        <Card>
          <CardContent className="p-4 divide-y divide-gray-100 dark:divide-gray-800">
            {churchInfo.serviceTimes.map((service, index) => (
              <div key={index} className={`flex items-center justify-between ${index > 0 ? 'pt-3' : ''} ${index < churchInfo.serviceTimes.length - 1 ? 'pb-3' : ''}`}>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-3">
                    <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{service.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{service.day}</p>
                  </div>
                </div>
                <Badge variant="outline">{service.time}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Latest Sermons */}
      <section className="mb-8">
        <SectionHeader title="Predici Recente" viewAllLink="/sermons" />
        <div className="space-y-3">
          {latestSermons.slice(0, 1).map(sermon => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
          {latestSermons.slice(1, 4).map(sermon => (
            <SermonCard key={sermon.id} sermon={sermon} compact />
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mb-8">
        <SectionHeader title="Evenimente Următoare" viewAllLink="/events" />
        <div className="space-y-3">
          {upcomingEvents.map(event => (
            <EventCard key={event.id} event={event} compact />
          ))}
        </div>
      </section>

      {/* Announcements */}
      <section className="mb-8">
        <SectionHeader title="Anunțuri" viewAllLink="/announcements" />
        <div className="space-y-3">
          {latestAnnouncements.map(announcement => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
