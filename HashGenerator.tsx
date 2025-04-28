import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Hash, Copy } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { ToolProps } from '@/types/tools';

interface HashGeneratorProps extends ToolProps {
  // Add any additional props specific to HashGenerator here
}

export const HashGenerator: React.FC<HashGeneratorProps> = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState('sha256');
  const [hash, setHash] = useState('');

  const generateHash = async () => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest(algorithm.toUpperCase(), data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHash(hashHex);
    } catch (error) {
      console.error('Error generating hash:', error);
      setHash('Error generating hash');
    }
  };

  return (
    <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-gray-800/50 shadow-xl">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
            <div className="relative w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Hash className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
        <CardTitle className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
          {t('tools.hash.title')}
        </CardTitle>
        <CardDescription className="text-center text-lg text-gray-400">
          {t('tools.hash.description')}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
    <div className="space-y-4">
          <Label htmlFor="input" className="text-lg font-medium text-gray-200">
            {t('tools.hashGenerator.input')}
          </Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('tools.hashGenerator.inputPlaceholder')}
            className="min-h-[100px] px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none placeholder:text-gray-500"
        />
      </div>

        <div className="space-y-4">
          <Label htmlFor="algorithm" className="text-lg font-medium text-gray-200">
            {t('tools.hashGenerator.algorithm')}
          </Label>
        <Select value={algorithm} onValueChange={setAlgorithm}>
            <SelectTrigger className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-200">
            <SelectValue placeholder={t('tools.hashGenerator.selectAlgorithm')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sha256">SHA-256</SelectItem>
            <SelectItem value="sha384">SHA-384</SelectItem>
            <SelectItem value="sha512">SHA-512</SelectItem>
          </SelectContent>
        </Select>
      </div>

        <Button 
          onClick={generateHash} 
          className="w-full flex items-center justify-center gap-2 px-6 py-3"
        >
          <Hash className="w-5 h-5" />
        {t('tools.hashGenerator.generate')}
      </Button>

      {hash && (
          <div className="space-y-4">
            <Label htmlFor="hash" className="text-lg font-medium text-gray-200">
              {t('tools.hashGenerator.result')}
            </Label>
          <div className="flex gap-2">
            <Input
              id="hash"
              value={hash}
              readOnly
                className="font-mono px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-200"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard.writeText(hash)}
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