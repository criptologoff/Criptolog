import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Unlock, Eye, EyeOff, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { decryptText } from '../../utils/crypto';
import { showToast } from '../../utils/toast';

export const TextDecryption: React.FC = () => {
  const { t } = useTranslation();
  const [encryptedText, setEncryptedText] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [decryptedText, setDecryptedText] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  
  const handleDecrypt = async () => {
    if (!encryptedText) {
      showToast('Please enter encrypted text', 'error');
      return;
    }
    
    if (!password) {
      showToast('Please enter a password', 'error');
      return;
    }
    
    try {
      setIsDecrypting(true);
      const decrypted = await decryptText(encryptedText, password);
      setDecryptedText(decrypted);
      showToast('Text decrypted successfully!', 'success');
    } catch (error) {
      console.error(error);
      setDecryptedText('');
      showToast('Error during decryption', 'error');
    } finally {
      setIsDecrypting(false);
    }
  };
  
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <Unlock className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>
        <CardTitle className="text-center text-2xl font-bold text-white mb-2">
          {t('tools.textDecryption.title')}
        </CardTitle>
        <CardDescription className="text-center text-gray-400">
          {t('tools.textDecryption.description')}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Encrypted Text Input */}
        <div className="space-y-4">
          <label className="block text-gray-200 font-medium">Encrypted Text</label>
          <Textarea
            value={encryptedText}
            onChange={(e) => setEncryptedText(e.target.value)}
            rows={5}
            placeholder="Enter encrypted text"
            className="w-full px-4 py-3 bg-secondary-700 border border-secondary-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none font-mono text-sm"
          />
        </div>

        {/* Password Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-gray-200 font-medium">Password</label>
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter the decryption password"
              className="w-full px-4 py-3 bg-secondary-700 border border-secondary-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-24"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Decrypted Text Output */}
        {decryptedText && (
          <div className="space-y-4">
            <label className="block text-gray-200 font-medium">Decrypted Text</label>
            <Textarea
              value={decryptedText}
              readOnly
              rows={5}
              className="w-full px-4 py-3 bg-secondary-700 border border-secondary-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={handleDecrypt}
          disabled={isDecrypting}
          isLoading={isDecrypting}
          fullWidth
          size="lg"
          icon={<Unlock size={20} />}
        >
          {isDecrypting ? 'Decrypting...' : 'Decrypt Text'}
        </Button>

        {/* Security Information */}
        <div className="bg-secondary-800/50 rounded-lg p-6 border border-secondary-700">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                Security Information
              </h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  Text is decrypted using the same encryption algorithm used to encrypt it.
                  The decryption is performed entirely in your browser - your data never leaves your device.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li>End-to-end encryption</li>
                  <li>Secure key derivation (PBKDF2)</li>
                  <li>Message integrity verification</li>
                  <li>Zero server storage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};