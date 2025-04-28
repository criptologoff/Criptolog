import React from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, Key, Shield, ChevronRight, ArrowRight, Cpu, Fingerprint, Hash, Binary, Code2, Network } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center bg-[#0B1120] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base background */}
        <div className="absolute inset-0 bg-[#0B1120]"></div>
        
        {/* Ambient light effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-[#0066FF]/[0.02] rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-[#0066FF]/[0.04] rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#0066FF]/[0.05] rounded-full blur-[50px] animate-float" />
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-[#0066FF]/[0.03] rounded-full blur-[40px] animate-float-delay-1" />
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293733_1px,transparent_1px),linear-gradient(to_bottom,#1f293733_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] animate-[grid_20s_linear_infinite]" />
        
        {/* Particle effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full animate-[particle_15s_linear_infinite]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center pt-16">
            {/* Left Column - Text Content */}
            <motion.div className="text-center lg:text-left" variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.05] backdrop-blur-sm mb-8 hover:bg-white/[0.08] transition-all duration-300 group">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]"></span>
                </span>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">Secure & Private by Design</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300 leading-tight">
                {t('hero.title')}
              </h1>

              <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="#tools" 
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#0066FF] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#0052CC] hover:shadow-lg hover:shadow-[#0066FF]/25 hover:scale-105"
                >
                  <span>{t('hero.cta')}</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                
                <a 
                  href="#features" 
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-white/[0.05] text-gray-300 hover:text-white rounded-lg font-medium transition-all duration-300 hover:bg-white/[0.08] border border-white/[0.05] hover:scale-105"
                >
                  {t('hero.learnMore')}
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="mt-16 pt-12 border-t border-white/[0.05]">
                <p className="text-sm text-gray-500 mb-6">Trusted by developers worldwide</p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8">
                  <div className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-lg bg-white/[0.05] flex items-center justify-center group-hover:bg-white/[0.08] transition-all duration-300">
                      <Shield className="w-6 h-6 text-[#0066FF]" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">100%</div>
                      <div className="text-xs text-gray-400">Secure</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-lg bg-white/[0.05] flex items-center justify-center group-hover:bg-white/[0.08] transition-all duration-300">
                      <Lock className="w-6 h-6 text-[#0066FF]" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">256-bit</div>
                      <div className="text-xs text-gray-400">Encryption</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-lg bg-white/[0.05] flex items-center justify-center group-hover:bg-white/[0.08] transition-all duration-300">
                      <Key className="w-6 h-6 text-[#0066FF]" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">Private</div>
                      <div className="text-xs text-gray-400">Zero-knowledge</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Visual Content */}
            <motion.div 
              className="relative lg:h-[600px]"
              variants={itemVariants}
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-[#0066FF]/5 rounded-2xl blur-[100px]" />
              
              {/* Main visual container */}
              <div className="relative h-full rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm p-8 overflow-hidden hover:border-white/[0.1] transition-all duration-300">
                {/* Grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293722_1px,transparent_1px),linear-gradient(to_bottom,#1f293722_1px,transparent_1px)] bg-[size:2rem_2rem] animate-[grid_10s_linear_infinite]" />
                
                {/* Content */}
                <div className="relative h-full flex items-center justify-center">
                  {/* Main Logo */}
                  <div className="w-32 h-32 relative animate-float">
                    <div className="absolute inset-0 bg-[#0066FF]/10 rounded-full blur-[50px] animate-pulse" />
                    <div className="absolute inset-0 bg-[#0066FF]/5 rounded-full blur-[30px] animate-pulse-slow" />
                    <img
                      src="/logo.png"
                      alt="Criptolog"
                      className="relative w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,102,255,0.5)]"
                    />
                  </div>

                  {/* Network of connecting lines */}
                  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                    {/* Main connections from center */}
                    <path d="M50% 50% Q 40% 25%, 25% 15%" stroke="rgba(0,102,255,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
                    <path d="M50% 50% Q 60% 25%, 75% 15%" stroke="rgba(0,102,255,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
                    <path d="M50% 50% Q 40% 75%, 25% 85%" stroke="rgba(0,102,255,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
                    <path d="M50% 50% Q 60% 75%, 75% 85%" stroke="rgba(0,102,255,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
                    
                    {/* Interconnections between nodes */}
                    <path d="M25% 15% Q 20% 35%, 15% 50%" stroke="rgba(0,102,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="2 2" />
                    <path d="M75% 15% Q 80% 35%, 85% 50%" stroke="rgba(0,102,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="2 2" />
                    <path d="M25% 85% Q 20% 65%, 15% 50%" stroke="rgba(0,102,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="2 2" />
                    <path d="M75% 85% Q 80% 65%, 85% 50%" stroke="rgba(0,102,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="2 2" />
                    
                    {/* Additional connections */}
                    <path d="M15% 50% Q 35% 50%, 50% 50%" stroke="rgba(0,102,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="2 2" />
                    <path d="M85% 50% Q 65% 50%, 50% 50%" stroke="rgba(0,102,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="2 2" />
                    <path d="M25% 15% Q 50% 25%, 75% 15%" stroke="rgba(0,102,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="2 2" />
                    <path d="M25% 85% Q 50% 75%, 75% 85%" stroke="rgba(0,102,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="2 2" />
                  </svg>

                  {/* Enhanced floating elements - Network nodes */}
                  <div className="absolute top-[15%] left-[25%] animate-float-delay-1">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-[#0066FF] animate-pulse-slow drop-shadow-[0_0_10px_rgba(0,102,255,0.5)]" />
                    </div>
                  </div>
                  <div className="absolute top-[15%] right-[25%] animate-float-delay-2">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-[#0066FF] animate-pulse-slow drop-shadow-[0_0_10px_rgba(0,102,255,0.5)]" />
                    </div>
                  </div>
                  <div className="absolute bottom-[15%] left-[25%] animate-float-delay-3">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <Key className="w-8 h-8 text-[#0066FF] animate-pulse-slow drop-shadow-[0_0_10px_rgba(0,102,255,0.5)]" />
                    </div>
                  </div>
                  <div className="absolute bottom-[15%] right-[25%] animate-float-delay-4">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <Cpu className="w-8 h-8 text-[#0066FF] animate-pulse-slow drop-shadow-[0_0_10px_rgba(0,102,255,0.5)]" />
                    </div>
                  </div>

                  {/* Secondary nodes */}
                  <div className="absolute top-[50%] left-[15%] animate-float-delay-5">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Fingerprint className="w-6 h-6 text-[#0066FF] animate-pulse-slow drop-shadow-[0_0_10px_rgba(0,102,255,0.5)]" />
                    </div>
                  </div>
                  <div className="absolute top-[50%] right-[15%] animate-float-delay-6">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Hash className="w-6 h-6 text-[#0066FF] animate-pulse-slow drop-shadow-[0_0_10px_rgba(0,102,255,0.5)]" />
                    </div>
                  </div>
                  <div className="absolute top-[25%] left-[40%] animate-float-delay-7">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Binary className="w-6 h-6 text-[#0066FF] animate-pulse-slow drop-shadow-[0_0_10px_rgba(0,102,255,0.5)]" />
                    </div>
                  </div>
                  <div className="absolute top-[25%] right-[40%] animate-float-delay-8">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Code2 className="w-6 h-6 text-[#0066FF] animate-pulse-slow drop-shadow-[0_0_10px_rgba(0,102,255,0.5)]" />
                    </div>
                  </div>
                  <div className="absolute bottom-[25%] left-[40%] animate-float-delay-9">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Network className="w-6 h-6 text-[#0066FF] animate-pulse-slow drop-shadow-[0_0_10px_rgba(0,102,255,0.5)]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1120] to-transparent"></div>
    </section>
  );
};