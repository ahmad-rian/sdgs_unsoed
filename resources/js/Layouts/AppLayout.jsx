import React from 'react';
import { ThemeProvider } from '@/Contexts/ThemeContext';
import { LanguageProvider } from '@/Contexts/LanguageContext';
import Navbar from '@/Components/Navbar';

const AppLayout = ({ children }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative min-h-screen bg-white dark:bg-gray-900">
          <Navbar />
          <main className="relative z-0">{children}</main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default AppLayout;