import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ScrollToTop from '@/Components/ScrollToTop';
import './i18n';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
   title: (title) => `${title} - ${appName}`,
   resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
   setup({ el, App, props }) {
       const root = createRoot(el);
       root.render(
           <ThemeProvider>
               <App {...props} />
               <ScrollToTop />
           </ThemeProvider>
       );
   },
   progress: {
       color: '#4B5563',
   },
});