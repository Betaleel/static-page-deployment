import React, { useState, useMemo } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import EventCard from '@/components/common/EventCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { events } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories
  const categories = useMemo(() => ['all', ...new Set(events.map(e => e.category))], []);

  // Separate upcoming and past events
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date();
    const upcoming = events
      .filter(e => new Date(e.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    const past = events
      .filter(e => new Date(e.date) < now)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    return { upcomingEvents: upcoming, pastEvents: past };
  }, []);

  // Filter by category
  const filterByCategory = (eventsList) => {
    if (selectedCategory === 'all') return eventsList;
    return eventsList.filter(e => e.category === selectedCategory);
  };

  return (
    <PageContainer title="Evenimente" showBack>
      <div className="py-4">
        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-2 mb-4 -mx-4 px-4 gap-2 no-scrollbar">
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'Toate' : category}
            </Badge>
          ))}
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="upcoming" className="flex-1">
              Viitoare ({filterByCategory(upcomingEvents).length})
            </TabsTrigger>
            <TabsTrigger value="past" className="flex-1">
              Trecute ({filterByCategory(pastEvents).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="space-y-4">
              {filterByCategory(upcomingEvents).length > 0 ? (
                filterByCategory(upcomingEvents).map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nu există evenimente viitoare.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="space-y-4">
              {filterByCategory(pastEvents).length > 0 ? (
                filterByCategory(pastEvents).map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nu există evenimente trecute.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
