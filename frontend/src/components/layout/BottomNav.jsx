import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PlayCircle, Calendar, Heart, Menu, Radio } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Acasă' },
  { to: '/live', icon: Radio, label: 'Live' },
  { to: '/sermons', icon: PlayCircle, label: 'Predici' },
  { to: '/events', icon: Calendar, label: 'Evenimente' },
  { to: '/more', icon: Menu, label: 'Mai mult' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50 safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 h-full transition-colors ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`
            }
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
