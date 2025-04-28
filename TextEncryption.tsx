import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, Unlock, Copy, Eye, EyeOff, Shield, RefreshCw, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { Input } from '../ui/Input';
import { encryptText, generatePassword, evaluatePasswordStrength } from '../../utils/crypto';
import { showToast } from '../../utils/toast';

interface TextEncryptionProps {
  mode: 'encrypt' | 'decrypt';
}

export const TextEncryption: React.FC<TextEncryptionProps> = ({ mode }) => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [passwordLength, setPasswordLength] = useState(16);
  
  const processText = useCallback(async () => {
    if (!input || !password) {
      showToast(t('encryption.missingInputs'), 'warning');
      return;
    }
    
    setIsProcessing(true);

    try {
      const result = await encryptText(input, password);
      setOutput(result);
      showToast(t('encryption.success'), 'success');
    } catch (error) {
      showToast(t('encryption.processingError'), 'error');
    } finally {
      setIsProcessing(false);
    }
  }, [input, password, t]);
  
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(t('encryption.copied'), 'success');
    } catch {
      showToast(t('encryption.copyError'), 'error');
    }
  }, [t]);

  const generateSecurePassword = () => {
    const newPassword = generatePassword(
      Math.max(8, parseInt(passwordLength.toString()) || 16)
    );
    setPassword(newPassword);
    showToast(t('encryption.passwordGenerated'), 'success');
  };

  const passwordStrength = evaluatePasswordStrength(password);
  
  return (
      <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-gray-800/50 shadow-xl">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
              <div className="relative w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              {mode === 'encrypt' ? (
                <Lock className="w-8 h-8 text-primary" />
              ) : (
                <Unlock className="w-8 h-8 text-primary" />
              )}
              </div>
            </div>
          </div>
          <CardTitle className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
          {mode === 'encrypt' ? t('tools.textEncryption.encrypt') : t('tools.textEncryption.decrypt')}
          </CardTitle>
          <CardDescription className="text-center text-lg text-gray-400">
          {mode === 'encrypt' ? t('tools.textEncryption.encryptDescription') : t('tools.textEncryption.decryptDescription')}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-200">
            {mode === 'encrypt' ? t('tools.textEncryption.inputEncrypt') : t('tools.textEncryption.inputDecrypt')}
          </label>
            <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
              rows={5}
            placeholder={mode === 'encrypt' ? t('tools.textEncryption.inputEncryptPlaceholder') : t('tools.textEncryption.inputDecryptPlaceholder')}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
            <label className="text-lg font-medium text-gray-200">{t('tools.textEncryption.password')}</label>
              <button
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-1"
              >
                <Info size={16} />
              {showAdvancedOptions ? t('tools.textEncryption.hideAdvanced') : t('tools.textEncryption.showAdvanced')}
              </button>
            </div>

              <div className="relative">
            <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              placeholder={t('tools.textEncryption.passwordPlaceholder')}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-24 placeholder:text-gray-500"
                />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                className="hover:bg-transparent"
                >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={generateSecurePassword}
                className="hover:bg-transparent"
              >
                <RefreshCw size={16} />
              </Button>
            </div>
            </div>

          {showAdvancedOptions && (
            <div className="space-y-4 mt-4 p-4 bg-gray-900/30 rounded-lg border border-gray-800/50">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">{t('tools.textEncryption.passwordLength')}</label>
                <Input
                  type="number"
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(parseInt(e.target.value) || 16)}
                  min={8}
                  max={64}
                  className="w-24 px-2 py-1 bg-gray-900/50 border border-gray-800 rounded text-gray-200 text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className={`text-${passwordStrength.color}`} />
                <span className={`text-sm text-${passwordStrength.color}`}>
                  {t(`tools.textEncryption.strength.${passwordStrength.level}`)}
                </span>
                </div>
              </div>
            )}
          </div>

        <Button 
          onClick={processText}
          disabled={isProcessing || !input || !password}
          className="w-full flex items-center justify-center gap-2 px-6 py-3"
        >
          {mode === 'encrypt' ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
          {isProcessing ? t('common.processing') : mode === 'encrypt' ? t('tools.textEncryption.encrypt') : t('tools.textEncryption.decrypt')}
        </Button>

        {output && (
            <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-200">
              {mode === 'encrypt' ? t('tools.textEncryption.outputEncrypt') : t('tools.textEncryption.outputDecrypt')}
            </label>
            <div className="relative">
              <Textarea
                value={output}
                readOnly
                rows={5}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono"
              />
          <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(output)}
                className="absolute top-2 right-2"
              >
                <Copy className="w-4 h-4" />
          </Button>
            </div>
          </div>
        )}
        </CardContent>
      </Card>
  );
};