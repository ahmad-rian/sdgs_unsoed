import React from 'react';
import FooterLink from './FooterLink';

const QuickLinks = ({ theme, t }) => (
  <div className="lg:col-span-2">
    <h3 className={`text-lg font-semibold mb-6 flex items-center ${
      theme === 'dark' ? 'text-[#FFEFD6]' : 'text-[#0A2647]'
    }`}>
      {t('footer.quickLinks.title')}
      <div className={`h-px flex-1 ml-4 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-[#FFEFD6]/40 to-transparent'
          : 'bg-gradient-to-r from-[#0A2647]/30 to-transparent'
      }`} />
    </h3>
    
    <div className="grid grid-cols-2 gap-8">
      {/* Education Links */}
      <LinkSection
        title={t('footer.quickLinks.education.title')}
        links={[
          { href: "/education/seminar", text: t('footer.quickLinks.education.seminar') },
          { href: "/education/workshop", text: t('footer.quickLinks.education.workshop') },
          { href: "/education/course", text: t('footer.quickLinks.education.course') },
          // { href: "/education/others", text: t('footer.quickLinks.education.others') },
        ]}
        theme={theme}
      />

      {/* Research Links */}
      <LinkSection
        title={t('footer.quickLinks.research.title')}
        links={[
          { href: "/research/mapping", text: t('footer.quickLinks.research.mapping') },
          { href: "/research/journal", text: t('footer.quickLinks.research.journal') },
        ]}
        theme={theme}
      />

      {/* Community Links */}
      <LinkSection
        title={t('footer.quickLinks.community.title')}
        links={[
          { href: "/service/training", text: t('footer.quickLinks.community.training') },
          { href: "/service/community", text: t('footer.quickLinks.community.student') },
        ]}
        theme={theme}
      />

      {/* Publication Links */}
      <LinkSection
        title={t('footer.quickLinks.publication.title')}
        links={[
          { href: "/publication/review", text: t('footer.quickLinks.publication.review') },
          { href: "/publication/journal", text: t('footer.quickLinks.publication.journal') },
        ]}
        theme={theme}
      />
    </div>
  </div>
);

const LinkSection = ({ title, links, theme }) => (
  <div className="space-y-3">
    <h4 className={`font-medium ${
      theme === 'dark' 
        ? 'text-[#FFEFD6] opacity-90' 
        : 'text-[#0A2647] opacity-90'
    }`}>
      {title}
    </h4>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <FooterLink href={link.href}>{link.text}</FooterLink>
        </li>
      ))}
    </ul>
  </div>
);

export default QuickLinks;