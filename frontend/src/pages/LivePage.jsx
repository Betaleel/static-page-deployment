import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Radio, Clock, Calendar, ExternalLink, Share2 } from 'lucide-react';
import { liveStreamInfo, churchInfo } from '@/data/mockData';
import { YOUTUBE_CHANNEL_URL, YOUTUBE_LIVE_URL } from '@/services/youtubeService';

export default function LivePage() {
  const [isPlaying, setIsPlaying] = useState(false);

  // Calculate countdown to next service
  const getNextService = () => {
    const now = new Date();
    const nextDate = new Date(liveStreamInfo.nextServiceDate + 'T' + liveStreamInfo.nextServiceTime);
    if (nextDate > now) {
      const diff = nextDate - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return {
        days,
        hours,
        minutes,
        date: nextDate,
        formattedDate: nextDate.toLocaleDateString('ro-RO', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        formattedTime: nextDate.toLocaleTimeString('ro-RO', {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
    }
    return null;
  };

  const nextService = getNextService();

  const handleWatchLive = () => {
    setIsPlaying(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${churchInfo.name} - Transmisiune Live`,
        text: 'Alătură-te serviciului nostru live!',
        url: window.location.href
      });
    }
  };

  return (
    <PageContainer title="Transmisiune Live" showBack>
      <div className="py-4 space-y-6">
        {/* Video Player Area */}
        <Card className="overflow-hidden">
          <div className="relative aspect-video bg-gray-900">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${liveStreamInfo.streamUrl.split('v=')[1]}?autoplay=1`}
                title="Live Stream"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary-900 to-gray-900">
                {liveStreamInfo.isLive ? (
                  <>
                    <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
                      <Radio className="w-10 h-10 text-white" />
                    </div>
                    <Badge className="bg-red-500 text-white mb-3">LIVE ACUM</Badge>
                    <p className="text-white/80 text-sm mb-4">Suntem în direct!</p>
                    <Button onClick={handleWatchLive} size="lg" className="bg-red-500 hover:bg-red-600">
                      <Radio className="w-5 h-5 mr-2" />
                      Urmărește Live
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-primary-600/30 rounded-full flex items-center justify-center mb-4">
                      <Radio className="w-10 h-10 text-primary-400" />
                    </div>
                    <p className="text-white/60 text-sm mb-2">Nu suntem în direct acum</p>
                    <p className="text-white font-medium mb-4">Următorul serviciu:</p>
                    
                    {nextService && (
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="bg-white/10 rounded-lg px-4 py-3 text-center">
                          <span className="text-3xl font-bold text-white">{nextService.days}</span>
                          <span className="text-xs block text-white/60">zile</span>
                        </div>
                        <span className="text-2xl text-white/60">:</span>
                        <div className="bg-white/10 rounded-lg px-4 py-3 text-center">
                          <span className="text-3xl font-bold text-white">{nextService.hours}</span>
                          <span className="text-xs block text-white/60">ore</span>
                        </div>
                        <span className="text-2xl text-white/60">:</span>
                        <div className="bg-white/10 rounded-lg px-4 py-3 text-center">
                          <span className="text-3xl font-bold text-white">{nextService.minutes}</span>
                          <span className="text-xs block text-white/60">min</span>
                        </div>
                      </div>
                    )}
                    
                    <Button onClick={handleWatchLive} variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Vezi Ultima Înregistrare
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Service Info */}
        <Card>
          <CardContent className="p-5">
            <h2 className="font-bold text-xl mb-2">{liveStreamInfo.currentTitle}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{liveStreamInfo.description}</p>
            
            {nextService && (
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{nextService.formattedDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{nextService.formattedTime}</span>
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Distribuie
              </Button>
              <Button asChild className="flex-1">
                <a href={churchInfo.socialMedia.youtube} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  YouTube
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold text-lg mb-4">Program Transmisiuni</h3>
            <div className="space-y-3">
              {churchInfo.serviceTimes.map((service, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3">
                      <Radio className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{service.name}</p>
                      <p className="text-xs text-gray-500">{service.day}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{service.time}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
