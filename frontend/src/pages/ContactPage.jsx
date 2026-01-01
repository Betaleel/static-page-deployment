import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Globe, Send, CheckCircle } from 'lucide-react';
import { churchInfo } from '@/data/mockData';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    { icon: Facebook, url: churchInfo.socialMedia.facebook, label: 'Facebook' },
    { icon: Instagram, url: churchInfo.socialMedia.instagram, label: 'Instagram' },
    { icon: Youtube, url: churchInfo.socialMedia.youtube, label: 'YouTube' },
  ];

  return (
    <PageContainer title="Contact" showBack>
      <div className="py-4 space-y-6">
        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informații de Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <a href={`mailto:${churchInfo.email}`} className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3">
                <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{churchInfo.email}</p>
              </div>
            </a>

            <a href={`tel:${churchInfo.phone}`} className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Telefon</p>
                <p className="font-medium">{churchInfo.phone}</p>
              </div>
            </a>

            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Adresă</p>
                <p className="font-medium">{churchInfo.address}</p>
              </div>
            </div>

            <a href={`https://${churchInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <p className="font-medium">{churchInfo.website}</p>
              </div>
            </a>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Urmărește-ne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-4">
              {socialLinks.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trimite-ne un Mesaj</CardTitle>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Mesaj trimis!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Îți mulțumim pentru mesaj. Te vom contacta în curând.
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Trimite alt mesaj
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nume</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Numele tău"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="email@exemplu.com"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Mesaj</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    placeholder="Scrie mesajul tău aici..."
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  <Send className="w-4 h-4 mr-2" />
                  {isLoading ? 'Se trimite...' : 'Trimite mesajul'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
