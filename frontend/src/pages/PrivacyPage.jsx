import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { churchInfo } from '@/data/mockData';

export default function PrivacyPage() {
  return (
    <PageContainer title="Politica de Confidențialitate" showBack>
      <div className="py-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Politica de Confidențialitate</CardTitle>
            <p className="text-sm text-gray-500">Ultima actualizare: Ianuarie 2025</p>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h3 className="text-lg font-semibold mt-4 mb-2">1. Introducere</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {churchInfo.name} respectă confidențialitatea datelor personale ale utilizatorilor săi. Această politică descrie modul în care colectăm, utilizăm și protejăm informațiile dumneavoastră.
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">2. Date Colectate</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Putem colecta următoarele tipuri de informații:
            </p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 mb-4">
              <li>Nume și adresă de email (pentru formularele de contact)</li>
              <li>Date de utilizare a aplicației (pentru îmbunătățirea serviciilor)</li>
              <li>Informații despre dispozitiv (pentru optimizarea experienței)</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">3. Utilizarea Datelor</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Datele colectate sunt utilizate pentru:
            </p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 mb-4">
              <li>Răspunsul la solicitările dumneavoastră</li>
              <li>Îmbunătățirea serviciilor noastre</li>
              <li>Trimiterea de notificări relevante (cu acordul dumneavoastră)</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">4. Protecția Datelor</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Implementăm măsuri de securitate adecvate pentru a proteja datele dumneavoastră împotriva accesului neautorizat, alterării, divulgării sau distrugerii.
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">5. Contact</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Pentru orice întrebări privind această politică, ne puteți contacta la: {churchInfo.email}
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
