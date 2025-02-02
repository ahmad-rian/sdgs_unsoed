import { useState, useEffect } from 'react';

export const useLanguage = () => {
    const [language, setLanguage] = useState('id');

    useEffect(() => {
        const savedLang = localStorage.getItem('language') || 'id';
        setLanguage(savedLang);
        document.documentElement.setAttribute('lang', savedLang);
    }, []);

    const toggleLanguage = () => {
        const newLang = language === 'id' ? 'en' : 'id';
        setLanguage(newLang);
        document.documentElement.setAttribute('lang', newLang);
        localStorage.setItem('language', newLang);
    };

    return { language, toggleLanguage };
};