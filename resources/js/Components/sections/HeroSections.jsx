import { useEffect, useState, memo } from "react"
import { ArrowRight, Globe2, BookOpen, GraduationCap, Target, Award, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from '@inertiajs/react'

// Optimized keyframes with hardware acceleration
const style = document.createElement("style")
style.textContent = `
  @keyframes float {
    0% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0; }
    50% { opacity: 0.2; transform: translate3d(0, -20px, 0) rotate(5deg); }
    100% { transform: translate3d(0, -40px, 0) rotate(0deg); opacity: 0; }
  }
  
  @keyframes floatGentle {
    0% { transform: translate3d(0, 0, 0) rotate(0deg); }
    50% { transform: translate3d(0, -10px, 0) rotate(1deg); }
    100% { transform: translate3d(0, 0, 0) rotate(0deg); }
  }

  @keyframes pulseSlow {
    0% { opacity: 0.3; }
    50% { opacity: 0.6; }
    100% { opacity: 0.3; }
  }

  @keyframes slideUp {
    0% { transform: translate3d(0, 30px, 0); opacity: 0; }
    100% { transform: translate3d(0, 0, 0); opacity: 1; }
  }

  .animate-float { animation: float 4s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
  .animate-float-gentle { animation: floatGentle 6s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
  .animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
  .animate-slideUp { animation: slideUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
`
document.head.appendChild(style)

// Add preload link for images
const preloadImages = () => {
  const images = ['/assets/sdg1.png'];
  images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Memoized Icons Component
const AnimatedIcon = memo(({ icon: Icon, size = "md", className = "", delay = 0 }) => {
  const sizeClasses = {
    sm: "w-4 h-4 md:w-6 md:h-6",
    md: "w-6 h-6 md:w-8 md:h-8",
    lg: "w-8 h-8 md:w-10 md:h-10",
  }

  return (
    <div
      className={`absolute opacity-0 animate-float ${className} hidden md:block`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
        willChange: 'transform, opacity',
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      <Icon className={`${sizeClasses[size]} text-slate-600/20 dark:text-white/20`} />
    </div>
  )
})

// Memoized Background Component
const Background = memo(() => (
  <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-slate-200 
    dark:from-[#0B1C2E] dark:to-[#1B3A5B] transition-colors duration-500"
    style={{ willChange: 'background-color', transform: 'translate3d(0, 0, 0)' }}>
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-20%,white/90,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_80%_50%,white/80,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_70%_-20%,#B94D4D/10,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_30%_100%,#1B3A5B/10,transparent_60%)]" />
    </div>
  </div>
))

// Memoized Content Components
const Badge = memo(() => (
  <div className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 bg-white/40 dark:bg-slate-900/40 
    border border-slate-200 dark:border-slate-700 rounded-full backdrop-blur-lg mx-auto">
    <span className="text-slate-700 dark:text-slate-200 text-xs md:text-sm font-medium">
      SDGs Center
    </span>
  </div>
))

const Title = memo(() => (
  <h1 className="animate-slideUp opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
    <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2 md:mb-4
      text-[#1B3A5B] dark:text-slate-200">
      Integrated Beyond
    </span>
    <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold
      text-[#1B3A5B] dark:text-slate-200">
      Universitas Jenderal Soedirman
    </span>
  </h1>
))

const CTAButtons = memo(() => (
  <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 md:pt-8 animate-slideUp opacity-0 
    [animation-delay:900ms] [animation-fill-mode:forwards]">
    <Link href="/about/sdgs">
      <Button className="w-full sm:w-auto group bg-[#B94D4D] text-white
        px-6 md:px-8 py-5 md:py-6 rounded-full flex items-center justify-center gap-2 transition-transform
        hover:scale-105 hover:-translate-y-1">
        <span className="text-sm md:text-base">Explore Our Vision</span>
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Link>
    <Link href="/about/us">
      <Button variant="outline"
        className="w-full sm:w-auto border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 
        px-6 md:px-8 py-5 md:py-6 rounded-full transition-transform backdrop-blur-lg
        hover:scale-105 hover:-translate-y-1">
        <span className="text-sm md:text-base">Learn More</span>
      </Button>
    </Link>
  </div>
))

// Optimized Logo Component
const Logo = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/assets/sdg1.png';
    img.onload = () => {
      setIsLoaded(true);
      setTimeout(() => setIsAnimating(true), 100);
    };
  }, []);

  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
      <div className="relative w-full max-w-md lg:max-w-2xl">
        <div className="relative w-full pt-[100%] lg:pt-[120%]">
          <div className={`absolute inset-0 bg-slate-200/50 dark:bg-slate-800/50 rounded-full 
            transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`} 
          />
          
          <img
            src="/assets/sdg1.png"
            alt="SDG's Center Logo"
            className={`absolute inset-0 w-full h-full object-contain transition-all duration-700
              ${isAnimating ? 'animate-float-gentle opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{ 
              willChange: 'transform, opacity',
              transform: 'translate3d(0, 0, 0)'
            }}
            fetchPriority="high"
            decoding="async"
          />
          
          <div className={`absolute inset-0 bg-gradient-to-r from-[#B94D4D]/20 to-[#1B3A5B]/20 
            rounded-full blur-3xl transition-opacity duration-700
            ${isAnimating ? 'opacity-50 animate-pulse-slow' : 'opacity-0'}`}
            style={{ willChange: 'opacity' }}
          />
        </div>
      </div>
    </div>
  );
});

const HeroSection = () => {
  useEffect(() => {
    preloadImages();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Background />
      
      {/* Animated Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatedIcon icon={Globe2} size="lg" className="top-[15%] left-[10%]" delay={0} />
        <AnimatedIcon icon={BookOpen} size="md" className="top-[25%] right-[15%]" delay={0.5} />
        <AnimatedIcon icon={GraduationCap} size="lg" className="bottom-[20%] left-[20%]" delay={1} />
        <AnimatedIcon icon={Target} size="md" className="top-[40%] right-[10%]" delay={1.5} />
        <AnimatedIcon icon={Award} size="lg" className="bottom-[30%] right-[25%]" delay={2} />
        <AnimatedIcon icon={Users} size="md" className="top-[35%] left-[25%]" delay={3} />
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4 py-8 md:py-10">
        <div className="container mx-auto mt-8 md:mt-0">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 text-center space-y-8 md:space-y-12 mt-8 md:mt-0">
              <Badge />
              {/* Title */}
              <div className="space-y-6 md:space-y-8">
                <h1 className="animate-slideUp opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
                  <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2 md:mb-4
                    bg-gradient-to-r from-[#1B3A5B] via-[#B94D4D] to-[#1B3A5B]
                    dark:from-slate-200 dark:via-[#B94D4D] dark:to-slate-200
                    bg-clip-text text-transparent bg-[size:200%]
                    animate-gradientFlow">
                    Integrated Beyond
                  </span>
                  <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold animate-pulse">
                    <span className="text-[#1B3A5B] dark:text-slate-200">Universitas</span>
                    <span className="text-[#1B3A5B] dark:text-slate-200"> Jenderal</span>
                    <span className="text-[#1B3A5B] dark:text-slate-200"> Soedirman</span>
                  </span>
                </h1>

                <p className="animate-slideUp opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]
                  text-slate-600 dark:text-slate-300 text-base md:text-xl max-w-xl mx-auto leading-relaxed tracking-wide">
                  UNSOED will integrate SDGs beyond its boundaries
                </p>
              </div>

              <CTAButtons />
            </div>


            <Logo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;