import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Megaphone } from 'lucide-react';

const categoryColors = {
  'Important': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  'Tineret': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  'Voluntariat': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  'General': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  'Slujire': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
};

export default function AnnouncementCard({ announcement, expanded = false }) {
  const formattedDate = new Date(announcement.date).toLocaleDateString('ro-RO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3">
              <Megaphone className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <CardTitle className="text-base">{announcement.title}</CardTitle>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formattedDate}</p>
            </div>
          </div>
          <Badge className={categoryColors[announcement.category] || categoryColors['General']}>
            {announcement.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-sm text-gray-600 dark:text-gray-300 ${expanded ? '' : 'line-clamp-3'}`}>
          {announcement.content}
        </p>
        {announcement.links && announcement.links.length > 0 && (
          <div className="mt-3 space-y-2">
            {announcement.links.map((link, index) => (
              <Button key={index} variant="outline" size="sm" className="w-full" asChild>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {link.text}
                </a>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
