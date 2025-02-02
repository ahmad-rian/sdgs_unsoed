import React from 'react';
import GradientBorder from './GradientBorder';
import SocialButton from './SocialButton';
import NewsletterForm from './NewsletterForm';

const ConnectWithUs = ({ theme, t, socialIcons }) => (
  <div>
    <h3 className={`text-lg font-semibold mb-6 flex items-center ${
      theme === 'dark' ? 'text-[#FFEFD6]' : 'text-[#0A2647]'
    }`}>
      {t('footer.connect.title')}
      <div className={`h-px flex-1 ml-4 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-[#FFEFD6]/40 to-transparent'
          : 'bg-gradient-to-r from-[#0A2647]/30 to-transparent'
      }`} />
    </h3>

    <div className="space-y-6">
      {/* Social Media */}
      <div className="flex flex-wrap gap-3">
        {socialIcons.map(({ imgSrc, label, href }) => (
          <SocialButton key={label} imgSrc={imgSrc} href={href} label={label} />
        ))}
      </div>

      {/* Newsletter */}
      <GradientBorder>
        <div className="space-y-4">
          <h4 className={`text-sm font-medium ${
            theme === 'dark' 
              ? 'text-[#FFEFD6]' 
              : 'text-[#0A2647]'
          }`}>
            {t('footer.connect.newsletter.title')}
          </h4>
          <NewsletterForm />
          <p className={`text-xs ${
            theme === 'dark' 
              ? 'text-[#FFEFD6]/70' 
              : 'text-[#0A2647]/70'
          }`}>
            {t('footer.connect.newsletter.description')}
          </p>
        </div>
      </GradientBorder>
    </div>
  </div>
);

export default ConnectWithUs;