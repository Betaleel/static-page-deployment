import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Info, 
  Users, 
  Heart, 
  Mail, 
  Phone, 
  FileText, 
  Shield, 
  ChevronRight,
  Clock,
  Megaphone
} from 'lucide-react';

const menuItems = [
  {
    title: 'Anunțuri',
    description: 'Ultimele anunțuri de la biserică',
    icon: Megaphone,
    to: '/announcements'
  },
  {
    title: 'Despre Noi',
    description: 'Viziune, misiune și valori',
    icon: Info,
    to: '/about'
  },
  {
    title: 'Echipa de Conducere',
    description: 'Cunoaște-ne liderii',
    icon: Users,
    to: '/leadership'
  },
  {
    title: 'Program Servicii',
    description: 'Când ne întâlnim',
    icon: Clock,
    to: '/schedule'
  },
  {
    title: 'Dăruiește',
    description: 'Susține lucrarea bisericii',
    icon: Heart,
    to: '/giving'
  },
  {
    title: 'Contact',
    description: 'Scrie-ne un mesaj',
    icon: Mail,
    to: '/contact'
  }
];

const legalItems = [
  {
    title: 'Politica de Confidențialitate',
    icon: Shield,
    to: '/privacy'
  },
  {
    title: 'Termeni și Condiții',
    icon: FileText,
    to: '/terms'
  }
];

const MenuItem = ({ item }) => {
  const Icon = item.icon;
  return (
    <Link to={item.to}>
      <div className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3">
          <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div className="flex-1">
          <p className="font-medium">{item.title}</p>
          {item.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
          )}
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </Link>
  );
};

export default function MorePage() {
  return (
    <PageContainer title="Mai mult">
      <div className="py-4 space-y-4">
        <Card>
          <CardContent className="p-0 divide-y divide-gray-100 dark:divide-gray-800">
            {menuItems.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0 divide-y divide-gray-100 dark:divide-gray-800">
            {legalItems.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4">
          <p>Biserica Rhema Iași</p>
          <p>Versiune 1.0.0</p>
        </div>
      </div>
    </PageContainer>
  );
}
