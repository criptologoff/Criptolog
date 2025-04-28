import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TextEncryption } from '@/components/tools/TextEncryption';
import { FileEncryption } from '@/components/tools/FileEncryption';
import { HashGenerator } from '@/components/tools/HashGenerator';
import { KeyGenerator } from '@/components/tools/KeyGenerator';
import { PasswordGenerator } from '@/components/tools/PasswordGenerator';
import { QuantumSimulator } from '@/components/tools/QuantumSimulator';
import { ChaosEncryption } from '@/components/tools/ChaosEncryption';
import { ToolsNavbar } from '@/components/tools/ToolsNavbar';
import { Shield, Lock } from 'lucide-react';

export const EncryptionTools: React.FC = () => {
  const { t } = useTranslation();
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const renderToolContent = () => {
    if (!activeTool) return null;

    const [toolId, mode] = activeTool.split('-');
    
    switch (toolId) {
      case 'text':
        return <TextEncryption mode={mode as 'encrypt' | 'decrypt'} />;
      case 'file':
        return <FileEncryption mode={mode as 'encrypt' | 'decrypt'} />;
      case 'hash':
        return <HashGenerator mode={mode as 'generate' | 'verify'} />;
      case 'key':
        return <KeyGenerator mode={mode as 'generate'} />;
      case 'password':
        return <PasswordGenerator mode={mode as 'generate'} />;
      case 'chaos':
        return <ChaosEncryption mode={mode as 'encrypt' | 'decrypt'} />;
      case 'quantum':
        return <QuantumSimulator mode={mode as 'simulate'} />;
      default:
        return null;
    }
  };

  return (
    <section id="tools" className="py-24 relative overflow-hidden">
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
                <span className="text-primary-400 font-medium flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  {t('tools.title')}
                </span>
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
            {t('tools.title')}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('tools.description')}
          </motion.p>
        </div>

        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ToolsNavbar activeTool={activeTool} setActiveTool={setActiveTool} />
          
          <div className="bg-secondary-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-secondary-800/50 p-8 min-h-[500px] transition-all duration-300">
            {activeTool ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderToolContent()}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary-800/50 flex items-center justify-center">
                  <Lock className="w-10 h-10 text-primary-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {t('tools.selectTool')}
                </h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  {t('tools.selectToolDescription')}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};