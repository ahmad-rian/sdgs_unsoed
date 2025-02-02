import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { BookOpen, Users, Search, FileText } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import HeroSection from '@/Components/sections/HeroSections';
import FeaturesSection from '@/Components/sections/FeaturesSection';
import SDGsSection from '@/Components/sections/SDGsSection';
import SDGsGoalsSection from '@/Components/sections/SDGsGoalsSection';
import Footer from '@/Components/Footer';
import PartnershipSection from '@/Components/sections/PartnershipSection';
import ProjectHighlightsSection from '@/Components/sections/ProjectHighlightsSection';

// Data
const slides = [
  {
    title: "SDG's Center Universitas Jenderal Soedirman",
    subtitle: "Driving Sustainable Development",
    description: "Leading the transformation towards a sustainable future through innovative research and global collaboration",
    image: "../assets/sdgs/unsoed-pusat.png",
    ctaText: "Explore Our Vision",
    ctaLink: "/about/us"
  },
  {
    title: "Environmental Action",
    subtitle: "Green Campus Initiative",
    description: "Pioneering sustainable practices and environmental conservation strategies",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1600",
    ctaText: "Join Our Mission",
    ctaLink: "/initiatives"
  },
  {
    title: "Research Excellence",
    subtitle: "Innovative Solutions",
    description: "Developing cutting-edge solutions for global sustainability challenges",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1600",
    ctaText: "Discover Research",
    ctaLink: "/research"
  },
  {
    title: "Global Partnership",
    subtitle: "International Collaboration",
    description: "Building bridges for sustainable development across continents",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600",
    ctaText: "Meet Partners",
    ctaLink: "/partners"
  }
];

const features = [
  {
    title: "Expert Network",
    description: "Connect with leading sustainability experts and researchers worldwide",
    icon: Users
  },
  {
    title: "Publications",
    description: "Access cutting-edge research and publications on sustainable development",
    icon: BookOpen
  },
  {
    title: "Research Hub",
    description: "Explore innovative research projects and sustainability initiatives",
    icon: Search
  },
  {
    title: "Resources",
    description: "Comprehensive collection of SDG-related papers and documents",
    icon: FileText
  }
];

const sdgs = [
  { id: 1, title: "NO POVERTY", description: "End poverty in all its forms everywhere", color: "#E5243B", link: "https://www.un.org/sustainabledevelopment/poverty/" },
  { id: 2, title: "ZERO HUNGER", description: "End hunger, achieve food security and improved nutrition", color: "#DDA63A", link: "https://www.un.org/sustainabledevelopment/hunger/" },
  { id: 3, title: "GOOD HEALTH AND WELL-BEING", description: "Ensure healthy lives and promote well-being", color: "#4C9F38", link: "https://www.un.org/sustainabledevelopment/health/" },
  { id: 4, title: "QUALITY EDUCATION", description: "Ensure inclusive and equitable quality education", color: "#C5192D", link: "https://www.un.org/sustainabledevelopment/education/" },
  { id: 5, title: "GENDER EQUALITY", description: "Achieve gender equality and empower all women and girls", color: "#FF3A21", link: "https://www.un.org/sustainabledevelopment/gender-equality/" },
  { id: 6, title: "CLEAN WATER AND SANITATION", description: "Ensure availability of water and sanitation", color: "#26BDE2", link: "https://www.un.org/sustainabledevelopment/water-and-sanitation/" },
  { id: 7, title: "AFFORDABLE AND CLEAN ENERGY", description: "Ensure access to affordable and clean energy", color: "#FCC30B", link: "https://www.un.org/sustainabledevelopment/energy/" },
  { id: 8, title: "DECENT WORK AND ECONOMIC GROWTH", description: "Promote inclusive and sustainable economic growth", color: "#A21942", link: "https://www.un.org/sustainabledevelopment/economic-growth/" },
  { id: 9, title: "INDUSTRY, INNOVATION AND INFRASTRUCTURE", description: "Build resilient infrastructure", color: "#FD6925", link: "https://www.un.org/sustainabledevelopment/infrastructure-industrialization/" },
  { id: 10, title: "REDUCED INEQUALITIES", description: "Reduce inequality within and among countries", color: "#DD1367", link: "https://www.un.org/sustainabledevelopment/inequality/" },
  { id: 11, title: "SUSTAINABLE CITIES AND COMMUNITIES", description: "Make cities inclusive, safe, resilient and sustainable", color: "#FD9D24", link: "https://www.un.org/sustainabledevelopment/cities/" },
  { id: 12, title: "RESPONSIBLE CONSUMPTION AND PRODUCTION", description: "Ensure sustainable consumption and production", color: "#BF8B2E", link: "https://www.un.org/sustainabledevelopment/sustainable-consumption-production/" },
  { id: 13, title: "CLIMATE ACTION", description: "Take urgent action to combat climate change", color: "#3F7E44", link: "https://www.un.org/sustainabledevelopment/climate-change/" },
  { id: 14, title: "LIFE BELOW WATER", description: "Conserve and sustainably use marine resources", color: "#0A97D9", link: "https://www.un.org/sustainabledevelopment/oceans/" },
  { id: 15, title: "LIFE ON LAND", description: "Protect and restore terrestrial ecosystems", color: "#56C02B", link: "https://www.un.org/sustainabledevelopment/biodiversity/" },
  { id: 16, title: "PEACE, JUSTICE AND STRONG INSTITUTIONS", description: "Promote peaceful and inclusive societies", color: "#00689D", link: "https://www.un.org/sustainabledevelopment/peace-justice/" },
  { id: 17, title: "PARTNERSHIPS FOR THE GOALS", description: "Strengthen global partnership for sustainable development", color: "#19486A", link: "https://www.un.org/sustainabledevelopment/globalpartnerships/" }
];

export default function Welcome({ auth }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayRef = useRef(null);
  const SLIDE_DURATION = 5000;

  useEffect(() => {
    if (isAutoplay) {
      autoplayRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, SLIDE_DURATION);
    }
    return () => clearInterval(autoplayRef.current);
  }, [isAutoplay]);

  const handleMouseEnter = () => setIsAutoplay(false);
  const handleMouseLeave = () => setIsAutoplay(true);

  const handleSlideChange = (direction) => {
    setIsAutoplay(false);
    clearInterval(autoplayRef.current);
    setCurrentSlide(prev => {
      if (direction === 'next') return (prev + 1) % slides.length;
      return (prev - 1 + slides.length) % slides.length;
    });
  };

  return (
    <AppLayout>
      <Head title="SDG's Center Unsoed - Sustainable Development Goals" />
      
      <div className="min-h-screen">
        <HeroSection 
          currentSlide={currentSlide}
          slides={slides}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          handleSlideChange={handleSlideChange}
          setCurrentSlide={setCurrentSlide}
        />
        <FeaturesSection features={features} />
        <SDGsGoalsSection/>
        <SDGsSection sdgs={sdgs} />
        <PartnershipSection />
        <ProjectHighlightsSection />
        <Footer />
      </div>
    </AppLayout>
  );
}


