import React from 'react';
import GradientBorder from './GradientBorder';
import ContactInfo from './ContactInfo';
import { MapPin, Phone, Mail } from 'lucide-react';

const AboutSection = ({ theme, t }) => (
  <div className="space-y-8">
    <GradientBorder>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-[#0A2647] to-[#144272] p-2">
            <img src="/assets/sdg2.png" alt="SDGs Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${
              theme === 'dark' 
                ? 'text-[#FFEFD6]' 
                : 'text-[#0A2647]'
            }`}>
              {t('footer.brand.title')}
            </h3>
            <p className={`text-sm ${
              theme === 'dark' 
                ? 'text-[#FFEFD6]/80' 
                : 'text-[#0A2647]/70'
            }`}>
              {t('footer.brand.subtitle')}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <ContactInfo 
            icon={MapPin} 
            text={t('footer.address')}
            className={`${
              theme === 'dark' 
                ? 'text-[#FFEFD6]/70 hover:text-[#FFEFD6]' 
                : 'text-[#0A2647]/70 hover:text-[#0A2647]'
            }`}
          />
          <ContactInfo 
            icon={Phone} 
            text="+62 812-2679-8679 ( Yemima )"
            link="tel:+6281226798679"
            className={`${
              theme === 'dark' 
                ? 'text-[#FFEFD6]/70 hover:text-[#FFEFD6]' 
                : 'text-[#0A2647]/70 hover:text-[#0A2647]'
            }`}
          />
          <ContactInfo 
            icon={Phone} 
            text="+62 858-9623-9634 ( Khaidar )"
            link="tel:+625896239634"
            className={`${
              theme === 'dark' 
                ? 'text-[#FFEFD6]/70 hover:text-[#FFEFD6]' 
                : 'text-[#0A2647]/70 hover:text-[#0A2647]'
            }`}
          />
          <ContactInfo 
            icon={Mail} 
            text="sdgscenter@unsoed.ac.id"
            link="mailto:sdgscenter@unsoed.ac.id"
            className={`${
              theme === 'dark' 
                ? 'text-[#FFEFD6]/70 hover:text-[#FFEFD6]' 
                : 'text-[#0A2647]/70 hover:text-[#0A2647]'
            }`}
          />
        </div>
      </div>
    </GradientBorder>
  </div>
);

export default AboutSection;