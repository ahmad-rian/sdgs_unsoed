const getMenuItems = (t) => [
    { 
      name: t('nav.home'),
      href: '/',
      icon: 'Home'
    },
    { 
      name: t('nav.about.title'),
      icon: 'Info',
      children: [
        { name: t('nav.about.about_us'), href: '/about/us', icon: 'UserCircle' },
        { name: t('nav.about.about_sdgs'), href: '/about/sdgs', icon: 'Command' }
      ]
    },
    {
      name: t('nav.research.title'),
      icon: 'Search',
      children: [
        { name: t('nav.research.mapping'), href: '/research/mapping', icon: 'MapPin' },
        { name: t('nav.research.journal'), href: '/research/journal', icon: 'BookOpen' }
      ]
    },
    {
      name: t('nav.education.title'),
      icon: 'BookOpen',
      // children: [
      //   { name: t('nav.education.seminar'), href: '/education/seminar', icon: 'Users' },
      //   { name: t('nav.education.workshop'), href: '/education/workshop', icon: 'Wrench' },
      //   { name: t('nav.education.course'), href: '/education/course', icon: 'BookOpen' },
      //   // { name: t('nav.education.others'), href: '/education/others', icon: 'Plus' }
      // ]
      href:'/education'
    },
    
    {
      name: t('nav.community.title'),
      icon: 'Users',
      // children: [
      //   { name: t('nav.community.training'), href: '/service/training', icon: 'Target' },
      //   { name: t('nav.community.student'), href: '/service/community', icon: 'UserPlus' }
      // ]
      href:'/community'
    },
    {
      name: t('nav.publication.title'),
      icon: 'FileText',
      // children: [
      //   { name: t('nav.publication.review'), href: '/publication/review', icon: 'CheckSquare' },
      //   { name: t('nav.publication.journal'), href: '/publication/journal', icon: 'BookOpen' }
      // ]
      href:'/publication'
    },
    { 
      name: t('nav.expert'),
      href: '/expert',
      icon: 'Award'
    }
  ];
  
  export default getMenuItems;