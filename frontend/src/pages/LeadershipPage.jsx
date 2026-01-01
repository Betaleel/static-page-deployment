import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { leadership } from '@/data/mockData';

export default function LeadershipPage() {
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
                  <p className="text-primary-600 dark:text-primary-400 text-sm mb-2">{leader.role}</p>
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
