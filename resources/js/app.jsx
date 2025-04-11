import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from '@/Contexts/ThemeContext';
import ScrollToTop from '@/Components/ScrollToTop';
import './i18n';

// Import Head from Inertia for SEO
import { Head } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ThemeProvider>
                <div className="font-sans"> {/* Menggunakan font-sans yang sudah diset ke Altone */}
                    <App {...props} />
                    <ScrollToTop />
                </div>
            </ThemeProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});