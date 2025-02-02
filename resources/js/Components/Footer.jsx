import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { useTheme } from '@/Contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ContactInfo from './FooterComponents/ContactInfo';
import SocialButton from './FooterComponents/SocialButton';
import FooterLink from './FooterComponents/FooterLink';
import NewsletterForm from './FooterComponents/NewsletterForm';
import GradientBorder from './FooterComponents/GradientBorder';

import AboutSection from './FooterComponents/AboutSection';
import QuickLinks from './FooterComponents/QuickLinks';
import ConnectWithUs from './FooterComponents/ConnectWithUs';
import Copyright from './FooterComponents/Copyright';

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const socialIcons = [
    { 
      imgSrc: "/assets/social/instagram.svg", 
      label: 'Instagram', 
      href: 'https://www.instagram.com/sdgscentersoed/' 
    },
    { 
      imgSrc: "/assets/social/youtube.svg", 
      label: 'Youtube', 
      href: 'https://www.youtube.com/@sdgscentersoed' 
    },
    { 
      imgSrc: "/assets/social/tiktok.svg", 
      label: 'TikTok', 
      href: 'https://www.tiktok.com/@sdgscentersoed' 
    }
  ];

  return (
    <footer className={`relative overflow-hidden ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
    }`}>
      

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <AboutSection theme={theme} t={t} />

          {/* Quick Links */}
          <QuickLinks theme={theme} t={t} />

          {/* Connect with Us */}
          <ConnectWithUs theme={theme} t={t} socialIcons={socialIcons} />
        </div>

        {/* Copyright */}
        <Copyright theme={theme} t={t} />
      </div>
    </footer>
  );
};

export default Footer;
