import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyRound, Copy, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface PasswordGeneratorProps {
  mode: 'generate';
}

export const PasswordGenerator: React.FC<PasswordGeneratorProps> = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  
  const generatePassword = () => {
    const charset = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let chars = charset.lowercase;
    if (useUppercase) chars += charset.uppercase;
    if (useNumbers) chars += charset.numbers;
    if (useSymbols) chars += charset.symbols;

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(result);
  };
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      // Show success toast
    } catch (err) {
      // Show error toast
    }
  };
  
  return (
    <Card className="max-w-2xl mx-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader>
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
            <div className="relative w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <KeyRound className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
        <CardTitle className="text-center text-2xl font-bold text-foreground mb-2">
          {t('tools.generators.password.title')}
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          {t('tools.generators.password.description')}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Password Length: {length}</label>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-64"
            />
        </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={useUppercase}
                onChange={(e) => setUseUppercase(e.target.checked)}
                />
              <span>Uppercase</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                checked={useNumbers}
                onChange={(e) => setUseNumbers(e.target.checked)}
                />
              <span>Numbers</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                checked={useSymbols}
                onChange={(e) => setUseSymbols(e.target.checked)}
                />
              <span>Symbols</span>
              </label>
            </div>
          </div>

        <div className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              value={password}
              readOnly
              className="w-full px-4 py-2 bg-secondary/50 rounded-lg font-mono text-lg"
              placeholder="Generated password will appear here"
            />
            {password && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={copyToClipboard}
              >
                <Copy className="w-4 h-4" />
              </Button>
          )}
        </div>

        <Button
            onClick={generatePassword}
            className="w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Generate Password
        </Button>
        </div>
      </CardContent>
    </Card>
  );
};