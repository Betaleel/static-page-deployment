import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import AnnouncementCard from '@/components/common/AnnouncementCard';
import { Megaphone, Loader2 } from 'lucide-react';
import { getAnnouncements, transformAnnouncement } from '@/services/api';
import { announcements as fallbackAnnouncements } from '@/data/mockData';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnnouncements() {
      try {
        const data = await getAnnouncements(50);
        if (data && data.length > 0) {
          setAnnouncements(data.map(transformAnnouncement));
        } else {
          setAnnouncements(fallbackAnnouncements);
        }
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
        setAnnouncements(fallbackAnnouncements);
      } finally {
        setLoading(false);
      }
    }
    loadAnnouncements();
  }, []);

  if (loading) {
    return (
      <PageContainer title="Anunțuri" showBack>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
        </div>
      </PageContainer>
    );
  }

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
