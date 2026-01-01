import React, { useState, useMemo, useEffect } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import SermonCard from '@/components/common/SermonCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Loader2 } from 'lucide-react';
import { sermons as fallbackSermons } from '@/data/mockData';
import { fetchVideosFromYouTube } from '@/services/youtubeService';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function SermonsPage() {
  const [sermons, setSermons] = useState(fallbackSermons);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeries, setSelectedSeries] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    async function loadSermons() {
      try {
        const videos = await fetchVideosFromYouTube();
        if (videos && videos.length > 0) {
          setSermons(videos);
        }
      } catch (error) {
        console.error('Failed to fetch YouTube videos:', error);
      } finally {
        setLoading(false);
      }
    }
    loadSermons();
  }, []);

  // Get unique values for filters
  const speakers = useMemo(() => [...new Set(sermons.map(s => s.speaker))], []);
  const categories = useMemo(() => [...new Set(sermons.map(s => s.category))], []);
  const series = useMemo(() => [...new Set(sermons.map(s => s.series).filter(Boolean))], []);

  // Filter sermons
  const filteredSermons = useMemo(() => {
    return sermons.filter(sermon => {
      const matchesSearch = searchQuery === '' || 
        sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sermon.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSpeaker = selectedSpeaker === 'all' || sermon.speaker === selectedSpeaker;
      const matchesCategory = selectedCategory === 'all' || sermon.category === selectedCategory;
      const matchesSeries = selectedSeries === 'all' || sermon.series === selectedSeries;

      return matchesSearch && matchesSpeaker && matchesCategory && matchesSeries;
    });
  }, [searchQuery, selectedSpeaker, selectedCategory, selectedSeries]);

  const activeFiltersCount = [selectedSpeaker, selectedCategory, selectedSeries].filter(f => f !== 'all').length;

  const clearFilters = () => {
    setSelectedSpeaker('all');
    setSelectedCategory('all');
    setSelectedSeries('all');
  };

  return (
    <PageContainer title="Predici" showBack>
      <div className="py-4">
        {/* Search and Filter */}
        <div className="flex space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Caută predici..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="w-4 h-4" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh]">
              <SheetHeader>
                <SheetTitle>Filtrează Predici</SheetTitle>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Vorbitor</label>
                  <Select value={selectedSpeaker} onValueChange={setSelectedSpeaker}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toți vorbitorii" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toți vorbitorii</SelectItem>
                      {speakers.map(speaker => (
                        <SelectItem key={speaker} value={speaker}>{speaker}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Categorie</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toate categoriile" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toate categoriile</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Serie</label>
                  <Select value={selectedSeries} onValueChange={setSelectedSeries}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toate seriile" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toate seriile</SelectItem>
                      {series.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={clearFilters}>
                    Resetează
                  </Button>
                  <Button className="flex-1" onClick={() => setIsFilterOpen(false)}>
                    Aplică
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSpeaker !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {selectedSpeaker}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSpeaker('all')} />
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {selectedCategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
              </Badge>
            )}
            {selectedSeries !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {selectedSeries}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSeries('all')} />
              </Badge>
            )}
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          {filteredSermons.length} {filteredSermons.length === 1 ? 'predică' : 'predici'} găsite
        </p>

        {/* Sermons List */}
        <div className="space-y-4">
          {filteredSermons.length > 0 ? (
            filteredSermons.map(sermon => (
              <SermonCard key={sermon.id} sermon={sermon} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Nu au fost găsite predici.</p>
              <Button variant="link" onClick={clearFilters}>Resetează filtrele</Button>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
