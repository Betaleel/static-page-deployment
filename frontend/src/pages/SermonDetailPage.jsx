import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Share2, BookOpen, User, Calendar, Clock, ExternalLink, Loader2 } from 'lucide-react';
import { getSermon, transformSermon } from '@/services/api';
import { sermons as fallbackSermons } from '@/data/mockData';

export default function SermonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sermon, setSermon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSermon() {
      try {
        const data = await getSermon(id);
        if (data) {
          setSermon(transformSermon(data));
        } else {
          // Try fallback
          const found = fallbackSermons.find(s => s.id === id || s.id === parseInt(id));
          setSermon(found);
        }
      } catch (error) {
        console.error('Failed to fetch sermon:', error);
        const found = fallbackSermons.find(s => s.id === id || s.id === parseInt(id));
        setSermon(found);
      } finally {
        setLoading(false);
      }
    }
    loadSermon();
  }, [id]);

  if (loading) {
    return (
      <PageContainer title="Predică" showBack>
        <div className="py-12 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
        </div>
      </PageContainer>
    );
  }

  if (!sermon) {
    return (
      <PageContainer title="Predică" showBack>
        <div className="py-12 text-center">
          <p className="text-gray-500">Predica nu a fost găsită.</p>
          <Button variant="link" onClick={() => navigate('/sermons')}>Mergi la Predici</Button>
        </div>
      </PageContainer>
    );
  }

  const formattedDate = new Date(sermon.date).toLocaleDateString('ro-RO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: sermon.title,
        text: sermon.description,
        url: window.location.href
      });
    }
  };

  const videoId = sermon.videoId || (sermon.videoUrl && sermon.videoUrl.split('v=')[1]);

  return (
    <PageContainer title="Predică" showBack noPadding>
      <div className="pb-4">
        {/* Video Player */}
        <div className="relative aspect-video bg-gray-900">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={sermon.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="px-4">
          {/* Title and Info */}
          <div className="py-4">
            <Badge className="mb-2">{sermon.category}</Badge>
            <h1 className="text-xl font-bold mb-2">{sermon.title}</h1>
            
            <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {sermon.speaker}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formattedDate}
              </div>
              {sermon.duration && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {sermon.duration}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 mb-6">
            <Button variant="outline" className="flex-1" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Distribuie
            </Button>
            <Button asChild className="flex-1">
              <a href={sermon.videoUrl || `https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                YouTube
              </a>
            </Button>
          </div>

          {/* Series */}
          {sermon.series && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Din seria:</p>
                <p className="font-semibold text-violet-600 dark:text-violet-400">{sermon.series}</p>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          {sermon.description && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Descriere</h3>
                <p className="text-gray-600 dark:text-gray-300">{sermon.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Bible References */}
          {sermon.bibleReferences && sermon.bibleReferences.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Referințe Biblice
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sermon.bibleReferences.map((ref, index) => (
                    <Badge key={index} variant="outline">{ref}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
