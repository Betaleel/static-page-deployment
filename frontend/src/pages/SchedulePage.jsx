import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Calendar } from 'lucide-react';
import { churchInfo } from '@/data/mockData';

export default function SchedulePage() {
  return (
    <PageContainer title="Program Servicii" showBack>
      <div className="py-4 space-y-6">
        {/* Service Times */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Servicii Săptămânale
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {churchInfo.serviceTimes.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
                    <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-semibold">{service.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{service.day}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-lg px-4 py-2">{service.time}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Locație
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-48 flex items-center justify-center mb-4">
              <div className="text-center text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p>Vizualizează pe hartă</p>
              </div>
            </div>
            <p className="font-medium">{churchInfo.name}</p>
            <p className="text-gray-600 dark:text-gray-300">{churchInfo.address}</p>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Informații Utile</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Parcare gratuită disponibilă</li>
              <li>• Program pentru copii în timpul serviciului duminical</li>
              <li>• Traducere în limba engleză disponibilă la cerere</li>
              <li>• Acces pentru persoane cu dizabilități</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
