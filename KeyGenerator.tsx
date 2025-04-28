import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Key, Copy } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { ToolProps } from '@/types/tools';

export const KeyGenerator: React.FC<ToolProps> = () => {
  const { t } = useTranslation();
  const [keyType, setKeyType] = useState('aes');
  const [keyLength, setKeyLength] = useState('256');
  const [key, setKey] = useState('');

  const generateKey = async () => {
    try {
      const key = await crypto.subtle.generateKey(
        {
          name: keyType.toUpperCase(),
          length: parseInt(keyLength),
        },
        true,
        ['encrypt', 'decrypt']
      );

      const exportedKey = await crypto.subtle.exportKey('raw', key);
      const keyArray = new Uint8Array(exportedKey);
      const keyHex = Array.from(keyArray)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      setKey(keyHex);
    } catch (error) {
      console.error('Error generating key:', error);
      setKey('Error generating key');
    }
  };

  return (
    <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-gray-800/50 shadow-xl">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
            <div className="relative w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Key className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
        <CardTitle className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
          {t('tools.key.title')}
        </CardTitle>
        <CardDescription className="text-center text-lg text-gray-400">
          {t('tools.key.description')}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="space-y-4">
          <Label htmlFor="keyType" className="text-lg font-medium text-gray-200">
            {t('tools.keyGenerator.keyType')}
          </Label>
          <Select value={keyType} onValueChange={setKeyType}>
            <SelectTrigger className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-200">
              <SelectValue placeholder={t('tools.keyGenerator.selectKeyType')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aes">AES</SelectItem>
              <SelectItem value="hmac">HMAC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label htmlFor="keyLength" className="text-lg font-medium text-gray-200">
            {t('tools.keyGenerator.keyLength')}
          </Label>
          <Select value={keyLength} onValueChange={setKeyLength}>
            <SelectTrigger className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-200">
              <SelectValue placeholder={t('tools.keyGenerator.selectKeyLength')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="128">128 bits</SelectItem>
              <SelectItem value="256">256 bits</SelectItem>
              <SelectItem value="512">512 bits</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={generateKey} 
          className="w-full flex items-center justify-center gap-2 px-6 py-3"
        >
          <Key className="w-5 h-5" />
          {t('tools.keyGenerator.generate')}
        </Button>

        {key && (
          <div className="space-y-4">
            <Label htmlFor="key" className="text-lg font-medium text-gray-200">
              {t('tools.keyGenerator.result')}
            </Label>
            <div className="flex gap-2">
              <Input
                id="key"
                value={key}
                readOnly
                className="font-mono px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-200"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.clipboard.writeText(key)}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center"
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