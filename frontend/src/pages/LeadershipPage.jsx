import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { getLeadership, transformLeader } from '@/services/api';
import { leadership as fallbackLeadership } from '@/data/mockData';

export default function LeadershipPage() {
  const [leadership, setLeadership] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeadership() {
      try {
        const data = await getLeadership();
        if (data && data.length > 0) {
          setLeadership(data.map(transformLeader));
        } else {
          setLeadership(fallbackLeadership);
        }
      } catch (error) {
        console.error('Failed to fetch leadership:', error);
        setLeadership(fallbackLeadership);
      } finally {
        setLoading(false);
      }
    }
    loadLeadership();
  }, []);

  if (loading) {
    return (
      <PageContainer title="Echipa de Conducere" showBack>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Echipa de Conducere" showBack>
      <div className="py-4 space-y-4">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Cunoaște-i pe liderii care slujesc cu dedicație în biserica noastră.
        </p>
        
        {leadership.map(leader => (
          <Card key={leader.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-20 h-20 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{leader.name}</h3>
                  <p className="text-violet-600 dark:text-violet-400 text-sm mb-2">{leader.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{leader.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
