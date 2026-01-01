import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import AnnouncementCard from '@/components/common/AnnouncementCard';
import { announcements } from '@/data/mockData';
import { Megaphone } from 'lucide-react';

export default function AnnouncementsPage() {
  return (
    <PageContainer title="Anunțuri" showBack>
      <div className="py-4">
        {announcements.length > 0 ? (
          <div className="space-y-4">
            {announcements.map(announcement => (
              <AnnouncementCard key={announcement.id} announcement={announcement} expanded />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Megaphone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nu există anunțuri momentan.</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
