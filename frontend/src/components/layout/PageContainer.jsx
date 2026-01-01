import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

export default function PageContainer({ 
  children, 
  title, 
  showBack = false, 
  noPadding = false,
  transparentHeader = false 
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header title={title} showBack={showBack} transparent={transparentHeader} />
      <main className={`pt-14 pb-20 ${noPadding ? '' : 'px-4'}`}>
        <div className="max-w-lg mx-auto">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
