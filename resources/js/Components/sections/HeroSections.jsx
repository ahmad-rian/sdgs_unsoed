import { useEffect, useState } from "react"
import {
  ArrowRight,
  Globe2,
  BookOpen,
  GraduationCap,
  Target,
  Award,
  Compass,
  Users,
  Atom,
  Leaf,
  Brain,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from '@inertiajs/react'

// Add required keyframes and styles
const style = document.createElement("style")
style.textContent = `
  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
    50% { opacity: 0.2; transform: translateY(-20px) rotate(5deg); }
    100% { transform: translateY(-40px) rotate(0deg); opacity: 0; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes slideUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes patternShift {
    0% { transform: translateX(0) translateY(0); }
    50% { transform: translateX(20px) translateY(10px); }
    100% { transform: translateX(0) translateY(0); }
  }
  
  @keyframes particle {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(-100vh) translateX(100px); opacity: 0; }
  }
  
  @keyframes scrollPulse {
    0% { transform: scaleY(1); opacity: 1; }
    50% { transform: scaleY(1.2); opacity: 0.5; }
    100% { transform: scaleY(1); opacity: 1; }
  }

  @keyframes floatGentle {
    0% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(0, -10px) rotate(1deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }

  @keyframes pulseSlow {
    0% { opacity: 0.3; }
    50% { opacity: 0.6; }
    100% { opacity: 0.3; }
  }

  .animate-float { animation: float 4s infinite; }
  .animate-float-gentle { animation: floatGentle 6s ease-in-out infinite; }
  .animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
  .animate-fadeIn { animation: fadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .animate-slideUp { animation: slideUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .animate-gradientFlow { animation: gradientFlow 8s linear infinite; }
  .animate-patternShift { animation: patternShift 20s ease-in-out infinite; }
  .animate-particle { animation: particle 20s linear infinite; }
  .animate-scrollPulse { animation: scrollPulse 2s ease-in-out infinite; }

  .dark { color-scheme: dark; }
`

document.head.appendChild(style)

const AnimatedIcon = ({ icon: Icon, size = "md", className = "", delay = 0 }) => {
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
      }}
    >
      <Icon className={`${sizeClasses[size]} text-slate-600/20 dark:text-white/20`} />
    </div>
  )
}

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-full h-full">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-slate-400/10 dark:bg-white/10 animate-particle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      setIsVisible(scrollPosition < windowHeight * 0.1)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 md:gap-3">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#B94D4D] via-[#1B3A5B] to-[#B94D4D] rounded-full opacity-20 group-hover:opacity-30 transition-opacity blur-md" />
        <span className="relative px-4 md:px-6 py-2 bg-white/10 dark:bg-slate-900/10 backdrop-blur-sm rounded-full
          border border-slate-200/20 dark:border-slate-700/20
          text-[#1B3A5B] dark:text-slate-200 text-xs md:text-sm font-medium tracking-wider 
          animate-bounce cursor-pointer transition-all duration-300
          hover:bg-white/20 dark:hover:bg-slate-800/20">
          Scroll to explore
        </span>
      </div>
      
      <div className="relative flex flex-col items-center">
        <div className="w-[2px] md:w-[3px] h-12 md:h-20 bg-gradient-to-b from-[#B94D4D] via-[#1B3A5B] to-transparent 
          rounded-full animate-scrollPulse" />
        <div className="absolute bottom-0 animate-bounce">
          <div className="w-2 h-2 md:w-3 md:h-3 border-b-2 border-r-2 border-[#1B3A5B] dark:border-slate-200 
            transform rotate-45 translate-y-1" />
        </div>
      </div>
    </div>
  )
}

const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-slate-200 
        dark:from-[#0B1C2E] dark:to-[#1B3A5B] transition-colors duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-20%,white/90,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_80%_50%,white/80,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_70%_-20%,#B94D4D/10,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_30%_100%,#1B3A5B/10,transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] animate-patternShift">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#1B3A5B_1px,transparent_1px),
            linear-gradient(-45deg,#1B3A5B_1px,transparent_1px)] bg-[size:2rem_2rem] md:bg-[size:3rem_3rem]" />
        </div>
      </div>

      <ParticleBackground />
      
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
              {/* Badge */}
              <div className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 bg-white/40 dark:bg-slate-900/40 
                border border-slate-200 dark:border-slate-700 rounded-full animate-fadeIn backdrop-blur-lg
                hover:scale-105 transition-transform duration-300 mx-auto">
                <span className="text-slate-700 dark:text-slate-200 text-xs md:text-sm font-medium
                  bg-gradient-to-r from-[#B94D4D] via-[#1B3A5B] to-[#B94D4D] bg-clip-text text-transparent
                  animate-gradientFlow">
                  SDGs Center
                </span>
              </div>

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

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 md:pt-8 animate-slideUp opacity-0 
                [animation-delay:900ms] [animation-fill-mode:forwards]">
                <Link href="/about/sdgs">
                  <Button className="w-full sm:w-auto group bg-gradient-to-r from-[#B94D4D] to-[#B94D4D]/90 text-white
                    px-6 md:px-8 py-5 md:py-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300
                    shadow-lg hover:shadow-xl hover:shadow-[#B94D4D]/20
                    border border-[#B94D4D]/20 hover:scale-105 hover:-translate-y-1">
                    <span className="text-sm md:text-base">Explore Our Vision</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link href="/about/us">
                  <Button variant="outline"
                    className="w-full sm:w-auto border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 
                    hover:bg-slate-100 dark:hover:bg-slate-800
                    px-6 md:px-8 py-5 md:py-6 rounded-full transition-all duration-300 backdrop-blur-lg
                    hover:border-slate-400 dark:hover:border-slate-500 
                    hover:scale-105 hover:-translate-y-1">
                    <span className="text-sm md:text-base">Learn More</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Logo */}
            <div className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-md lg:max-w-2xl animate-fadeIn [animation-delay:600ms]">
                <div className="relative w-full pt-[100%] lg:pt-[120%]">
                  <img
                    src="/assets/sdg1.png"
                    alt="SDG's Center Logo"
                    className="absolute inset-0 w-full h-full object-contain
                      animate-float-gentle filter drop-shadow-2xl"
                  />
                  {/* Logo Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B94D4D]/20 to-[#1B3A5B]/20 
                    rounded-full blur-3xl opacity-50 animate-pulse-slow">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </div>
  );
};

// Tailwind CSS custom animations
const customAnimations = {
  keyframes: {
    float: {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-20px)' },
    },
    floatGentle: {
      '0%, 100%': { transform: 'translate(0, 0)' },
      '50%': { transform: 'translate(0, -10px)' },
    },
    scrollPulse: {
      '0%, 100%': { transform: 'scaleY(1)', opacity: 1 },
      '50%': { transform: 'scaleY(1.2)', opacity: 0.5 },
    },
    particle: {
      '0%': { transform: 'translateY(0)', opacity: 0 },
      '50%': { opacity: 1 },
      '100%': { transform: 'translateY(-800px)', opacity: 0 },
    },
    patternShift: {
      '0%, 100%': { transform: 'translateX(0) translateY(0)' },
      '50%': { transform: 'translateX(20px) translateY(10px)' },
    },
    gradientFlow: {
      '0%, 100%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
    },
  },
  animation: {
    float: 'float 3s ease-in-out infinite',
    floatGentle: 'floatGentle 6s ease-in-out infinite',
    scrollPulse: 'scrollPulse 2s ease-in-out infinite',
    particle: 'particle 20s linear infinite',
    patternShift: 'patternShift 20s ease-in-out infinite',
    gradientFlow: 'gradientFlow 8s linear infinite',
  },
};

export default HeroSection;