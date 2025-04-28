import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Blocks, 
  Cpu, 
  Clock, 
  Database,
  ShieldCheck,
  Binary,
  Share2
} from 'lucide-react';

export const Features: React.FC = () => {
  const { t } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const mainFeatures = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: t('features.encryption.title'),
      description: t('features.encryption.description'),
      color: 'from-primary-500/20 to-primary-600/20 group-hover:from-primary-500/30 group-hover:to-primary-600/30',
      iconColor: 'text-primary-400',
      gradient: 'bg-gradient-to-br from-primary-500/10 via-primary-400/5 to-transparent',
      details: [
        t('features.encryption.detail1'),
        t('features.encryption.detail2'),
        t('features.encryption.detail3')
      ]
    },
    {
      icon: <Blocks className="w-6 h-6" />,
      title: t('features.chaos.title'),
      description: t('features.chaos.description'),
      color: 'from-purple-500/20 to-purple-600/20 group-hover:from-purple-500/30 group-hover:to-purple-600/30',
      iconColor: 'text-purple-400',
      gradient: 'bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent',
      details: [
        t('features.chaos.detail1'),
        t('features.chaos.detail2'),
        t('features.chaos.detail3')
      ]
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: t('features.quantum.title'),
      description: t('features.quantum.description'),
      color: 'from-blue-500/20 to-blue-600/20 group-hover:from-blue-500/30 group-hover:to-blue-600/30',
      iconColor: 'text-blue-400',
      gradient: 'bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent',
      details: [
        t('features.quantum.detail1'),
        t('features.quantum.detail2'),
        t('features.quantum.detail3')
      ]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t('features.autoDelete.title'),
      description: t('features.autoDelete.description'),
      color: 'from-amber-500/20 to-amber-600/20 group-hover:from-amber-500/30 group-hover:to-amber-600/30',
      iconColor: 'text-amber-400',
      gradient: 'bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent',
      details: [
        t('features.autoDelete.detail1'),
        t('features.autoDelete.detail2'),
        t('features.autoDelete.detail3')
      ]
    }
  ];

  const securityFeatures = [
    {
      icon: <Database className="w-6 h-6" />,
      title: t('features.localProcessing.title'),
      description: t('features.localProcessing.description'),
      color: "from-primary-500/10 to-primary-600/10",
      gradient: "bg-gradient-to-br from-primary-500/5 via-primary-400/5 to-transparent",
      detail: t('features.localProcessing.detail')
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: t('features.algorithms.title'),
      description: t('features.algorithms.description'),
      color: "from-purple-500/10 to-purple-600/10",
      gradient: "bg-gradient-to-br from-purple-500/5 via-purple-400/5 to-transparent",
      detail: t('features.algorithms.detail')
    },
    {
      icon: <Binary className="w-6 h-6" />,
      title: t('features.integrity.title'),
      description: t('features.integrity.description'),
      color: "from-green-500/10 to-green-600/10",
      gradient: "bg-gradient-to-br from-green-500/5 via-green-400/5 to-transparent",
      detail: t('features.integrity.detail')
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: t('features.noStorage.title'),
      description: t('features.noStorage.description'),
      color: "from-amber-500/10 to-amber-600/10",
      gradient: "bg-gradient-to-br from-amber-500/5 via-amber-400/5 to-transparent",
      detail: t('features.noStorage.detail')
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0B1120]"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-[#0066FF]/[0.02] rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-[#0066FF]/[0.04] rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#0066FF]/[0.05] rounded-full blur-[50px] animate-float" />
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-[#0066FF]/[0.03] rounded-full blur-[40px] animate-float-delay-1" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293733_1px,transparent_1px),linear-gradient(to_bottom,#1f293733_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] animate-[grid_20s_linear_infinite]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            className="inline-block"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500/20 blur-2xl rounded-full animate-pulse-slow"></div>
              <div className="relative bg-secondary-800 border border-secondary-700/50 rounded-2xl px-6 py-2 backdrop-blur-sm hover:border-primary-500/50 transition-all duration-300">
                <span className="text-primary-400 font-medium">{t('features.badge')}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-200 mt-6 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('features.title')}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('features.subtitle')}
          </motion.p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {mainFeatures.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={item}
              className="group"
            >
              <div className="relative h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100`}></div>
                <div className={`relative h-full ${feature.gradient} backdrop-blur-sm border border-secondary-700/50 rounded-2xl p-6 transition-all duration-300 group-hover:border-secondary-600 group-hover:translate-y-[-2px] group-hover:shadow-xl group-hover:shadow-secondary-900/20`}>
                  <div className="relative w-12 h-12 rounded-xl bg-secondary-700/50 flex items-center justify-center mb-4 overflow-hidden">
                    <div className={`absolute inset-0 ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    <div className="relative flex items-center justify-center">
                      <div className={`${feature.iconColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-400 group-hover:text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500/50 mr-2"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 pt-16 border-t border-secondary-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('features.securityTitle')}
          </motion.h3>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {securityFeatures.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={item}
                className="group"
              >
                <div className={`relative p-6 rounded-2xl ${feature.gradient} border border-secondary-800/50 transition-all duration-300 hover:border-secondary-700 hover:translate-y-[-2px] hover:shadow-lg`}>
                  <div className="flex items-start space-x-4">
                    <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-secondary-800/50 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                      <div className={`absolute inset-0 ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                      <div className="relative flex items-center justify-center">
                        <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-2">
                        {feature.description}
                      </p>
                      <div className="text-sm text-gray-400 group-hover:text-gray-300">
                        {feature.detail}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};