import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { churchInfo } from '@/data/mockData';

export default function TermsPage() {
  return (
    <PageContainer title="Termeni și Condiții" showBack>
      <div className="py-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Termeni și Condiții de Utilizare</CardTitle>
            <p className="text-sm text-gray-500">Ultima actualizare: Ianuarie 2025</p>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h3 className="text-lg font-semibold mt-4 mb-2">1. Acceptarea Termenilor</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Prin utilizarea acestei aplicații, sunteți de acord cu acești termeni și condiții. Dacă nu sunteți de acord, vă rugăm să nu utilizați aplicația.
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">2. Utilizarea Aplicației</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Această aplicație este oferită de {churchInfo.name} pentru a facilita accesul membrilor la informații despre biserică, servicii, evenimente și resurse spirituale.
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">3. Conținutul</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Tot conținutul disponibil în aplicație, inclusiv predici, articole și materiale video, este proprietatea {churchInfo.name} sau utilizat cu permisiune. Nu aveți dreptul să reproduceți sau distribuiți acest conținut fără acordul nostru prealabil.
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">4. Donații</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Toate donațiile efectuate prin aplicație sunt voluntare și ne-rambursabile. Vă asigurăm că fondurile sunt utilizate pentru activitățile și misiunea bisericii.
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">5. Limitarea Răspunderii</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {churchInfo.name} nu este responsabilă pentru eventualele erori sau întreruperi în funcționarea aplicației. Ne străduim să oferim o experiență cât mai bună, dar nu garantăm disponibilitatea continuă a serviciilor.
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">6. Modificări</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Ne rezervăm dreptul de a modifica acești termeni în orice moment. Modificările vor fi publicate în aplicație și vor intra în vigoare imediat.
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">7. Contact</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Pentru întrebări despre acești termeni, contactați-ne la: {churchInfo.email}
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
