import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Building, Copy, Check, Loader2 } from 'lucide-react';
import { getGivingInfo, transformGivingInfo } from '@/services/api';
import { givingInfo as fallbackGivingInfo } from '@/data/mockData';

export default function GivingPage() {
  const [givingInfo, setGivingInfo] = useState(fallbackGivingInfo);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadGivingInfo() {
      try {
        const data = await getGivingInfo();
        if (data) setGivingInfo(transformGivingInfo(data));
      } catch (error) {
        console.error('Failed to fetch giving info:', error);
      } finally {
        setLoading(false);
      }
    }
    loadGivingInfo();
  }, []);

  const handleCopyIban = () => {
    navigator.clipboard.writeText(givingInfo.bankInfo.iban);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <PageContainer title="Dăruiește" showBack>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Dăruiește" showBack>
      <div className="py-4 space-y-6">
        {/* Verse */}
        <Card className="bg-gradient-to-br from-violet-600 to-purple-800 text-white border-0">
          <CardContent className="p-5">
            <div className="flex items-start">
              <Heart className="w-8 h-8 mr-3 flex-shrink-0" fill="white" />
              <div>
                <p className="text-purple-100 italic mb-2">"{givingInfo.verse.text}"</p>
                <p className="text-sm font-semibold">{givingInfo.verse.reference}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Transfer Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Transfer Bancar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Bancă</p>
                <p className="font-medium">{givingInfo.bankInfo.bankName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Titular cont</p>
                <p className="font-medium">{givingInfo.bankInfo.accountHolder}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">IBAN</p>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm font-mono break-all">
                    {givingInfo.bankInfo.iban}
                  </code>
                  <Button size="sm" variant="outline" onClick={handleCopyIban}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">BIC/SWIFT</p>
                <p className="font-medium">{givingInfo.bankInfo.bic}</p>
              </div>
            </div>

            <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg">
              <p className="text-sm text-violet-700 dark:text-violet-300">
                {givingInfo.bankInfo.details}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Ai întrebări despre donații? Contactează-ne la{' '}
              <a href="mailto:bisericacasapainii@gmail.com" className="text-violet-600 underline">
                bisericacasapainii@gmail.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
