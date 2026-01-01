import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Heart, CreditCard, Building, Repeat, Copy, Check, ExternalLink } from 'lucide-react';
import { givingInfo } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const iconMap = {
  'building': Building,
  'credit-card': CreditCard,
  'repeat': Repeat
};

export default function GivingPage() {
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [donationType, setDonationType] = useState('oneTime');

  const handleCopyIban = () => {
    navigator.clipboard.writeText(givingInfo.bankInfo.iban);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickAmounts = [50, 100, 200, 500];

  return (
    <PageContainer title="Dăruiește" showBack>
      <div className="py-4 space-y-6">
        {/* Verse */}
        <Card className="bg-gradient-to-br from-primary-600 to-primary-800 text-white border-0">
          <CardContent className="p-5">
            <div className="flex items-start">
              <Heart className="w-8 h-8 mr-3 flex-shrink-0" fill="white" />
              <div>
                <p className="text-primary-100 italic mb-2">"{givingInfo.verse.text}"</p>
                <p className="text-sm font-semibold">{givingInfo.verse.reference}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="online" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="online" className="flex-1">Online</TabsTrigger>
            <TabsTrigger value="bank" className="flex-1">Transfer Bancar</TabsTrigger>
          </TabsList>

          <TabsContent value="online" className="space-y-4">
            {/* Donation Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Faă o donație</CardTitle>
                <CardDescription>Alege suma și metoda de plată</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Donation Type */}
                <div className="flex space-x-2">
                  <Button
                    variant={donationType === 'oneTime' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setDonationType('oneTime')}
                  >
                    O singură dată
                  </Button>
                  <Button
                    variant={donationType === 'recurring' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setDonationType('recurring')}
                  >
                    Lunar
                  </Button>
                </div>

                {/* Quick Amounts */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Sumă rapidă</label>
                  <div className="grid grid-cols-4 gap-2">
                    {quickAmounts.map(amt => (
                      <Button
                        key={amt}
                        variant={amount === String(amt) ? 'default' : 'outline'}
                        onClick={() => setAmount(String(amt))}
                      >
                        {amt} RON
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Sau introdu o sumă</label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pr-16 text-lg"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">RON</span>
                  </div>
                </div>

                {donationType === 'recurring' && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Frecvență</label>
                    <Select defaultValue="monthly">
                      <SelectTrigger>
                        <SelectValue placeholder="Selectează" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Lunar</SelectItem>
                        <SelectItem value="quarterly">Trimestrial</SelectItem>
                        <SelectItem value="yearly">Anual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button className="w-full" size="lg" disabled={!amount}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  {donationType === 'recurring' ? 'Setează donație recurentă' : 'Continuă cu plata'}
                </Button>

                <p className="text-xs text-center text-gray-500">
                  Plata este securizată și procesată prin Stripe
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bank" className="space-y-4">
            {/* Bank Transfer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Detalii Transfer Bancar
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
                      <code className="flex-1 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm font-mono">
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

                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                  <p className="text-sm text-primary-700 dark:text-primary-300">
                    {givingInfo.bankInfo.details}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Giving Options */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Modalități de a dărui</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {givingInfo.onlineOptions.map((option, index) => {
              const Icon = iconMap[option.icon] || Heart;
              return (
                <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3">
                    <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{option.name}</p>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Ai întrebări despre donații? Contactează-ne la <a href="mailto:contact@bisericarhema.ro" className="text-primary-600 underline">contact@bisericarhema.ro</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
