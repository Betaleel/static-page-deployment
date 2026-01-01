import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Heart, Compass, CheckCircle2 } from 'lucide-react';
import { churchInfo } from '@/data/mockData';

export default function AboutPage() {
  return (
    <PageContainer title="Despre Noi" showBack>
      <div className="py-4 space-y-6">
        {/* Hero */}
        <Card className="overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-600 font-bold text-2xl">R</span>
              </div>
              <h1 className="text-2xl font-bold text-white">{churchInfo.name}</h1>
              <p className="text-primary-200">{churchInfo.tagline}</p>
            </div>
          </div>
        </Card>

        {/* Vision */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-lg">Viziunea Noastră</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">{churchInfo.vision}</p>
          </CardContent>
        </Card>

        {/* Mission */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                <Compass className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg">Misiunea Noastră</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">{churchInfo.mission}</p>
          </CardContent>
        </Card>

        {/* Values */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mr-3">
                <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              </div>
              <CardTitle className="text-lg">Valorile Noastre</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {churchInfo.values.map((value, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">{value.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Scurt Istoric</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Biserica Rhema a fost fondată în anul 2000 cu o viziune clară: să aducem mesajul Evangheliei în orașul Iași și împrejurimi.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              De-a lungul anilor, am crescut de la un mic grup de credincioși la o comunitate vibrantă de sute de membri care se întâlnesc săptămânal pentru închinare, studiu biblic și părtășie.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Astăzi, continuăm să ne extindem impactul prin programe pentru toate vârstele, misiuni locale și internaționale, și servicii care transformă vieți.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
