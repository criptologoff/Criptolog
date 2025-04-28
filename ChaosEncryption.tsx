import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Lock,
  Download, 
  RefreshCw, 
  ImagePlus, 
  Braces,
  Shield,
  AlertTriangle,
  Info 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { advancedChaosEncryption, advancedChaosDecryption } from '../../utils/chaos';
import { showToast } from '../../utils/toast';

interface ChaosEncryptionProps {
  mode: 'encrypt' | 'decrypt';
}

export const ChaosEncryption: React.FC<ChaosEncryptionProps> = ({ mode }) => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [encryptedImageUrl, setEncryptedImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [seed, setSeed] = useState(Math.random());
  const [iterations, setIterations] = useState(3);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  
  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const selectedFile = files[0];
    
    // Check if file is an image
    if (!selectedFile.type.startsWith('image/')) {
      showToast(t('chaosSelectImageError'), 'error');
      return;
    }

    // Check file size (10MB limit)
    if (selectedFile.size > 10 * 1024 * 1024) {
      showToast('The file is too large (maximum 10MB)', 'warning');
      return;
    }
    
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    setEncryptedImageUrl(null);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };
  
  const processImage = useCallback(async () => {
    if (!file || !previewUrl || !canvasRef.current) return;
    
    setIsProcessing(true);
    setProgress(0);
    showToast(t('chaosEncryptionStart'), 'info');
    
    try {
      // Load the image
      const img = new Image();
      img.src = previewUrl;
      await new Promise(resolve => img.onload = resolve);
      setProgress(20);
      
      // Set up canvas
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the original image
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      
      ctx.drawImage(img, 0, 0);
      setProgress(40);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setProgress(60);
      
      // Apply chaos-based encryption or decryption
      const processedData = mode === 'encrypt' 
        ? advancedChaosEncryption(imageData.data, canvas.width, canvas.height, seed, iterations)
        : advancedChaosDecryption(imageData.data, canvas.width, canvas.height, seed, iterations);
      setProgress(80);
      
      // Put the processed data back on the canvas
      const processedImageData = new ImageData(
        processedData, 
        canvas.width, 
        canvas.height
      );
      ctx.putImageData(processedImageData, 0, 0);
      
      // Convert canvas to data URL
      setEncryptedImageUrl(canvas.toDataURL(file.type));
      setProgress(100);
      
      showToast(mode === 'encrypt' ? t('chaosEncryptionSuccess') : t('chaosDecryptionSuccess'), 'success');
    } catch (error) {
      console.error(error);
      showToast(mode === 'encrypt' ? t('chaosEncryptionError') : t('chaosDecryptionError'), 'error');
    } finally {
      setIsProcessing(false);
    }
  }, [file, previewUrl, seed, iterations, t, mode]);
  
  const downloadEncryptedImage = () => {
    if (!encryptedImageUrl) return;
    
    const link = document.createElement('a');
    link.href = encryptedImageUrl;
    link.download = `chaos_encrypted_${file?.name || 'image'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Card className="max-w-4xl mx-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader>
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
            <div className="relative w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Braces className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
        <CardTitle className="text-center text-2xl font-bold text-foreground mb-2">
          {t('tools.chaosEncryption.title')}
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          {t('tools.chaosEncryption.description')}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* File Drop Zone */}
        <div
          ref={dropZoneRef}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer group
            hover:border-primary border-border"
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => handleFileSelect(e.target.files)}
            accept="image/*"
            className="hidden"
          />
          
          {previewUrl ? (
            <div className="flex flex-col items-center">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-w-full max-h-64 mb-4 rounded-lg"
              />
              <div className="flex items-center gap-2">
                <button
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setPreviewUrl(null);
                    setEncryptedImageUrl(null);
                  }}
                >
                  Remove image
                </button>
                {file && file.size > 5 * 1024 * 1024 && (
                  <div className="flex items-center gap-1 text-sm text-warning">
                    <AlertTriangle size={16} />
                    <span>Large image, encryption might take longer</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-background/50 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <ImagePlus className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-foreground group-hover:text-primary transition-colors text-center">
                Drag and drop an image here
                <br />
                <span className="text-sm text-muted-foreground">or click to select</span>
              </p>
            </div>
          )}
        </div>
        
        {/* Chaos Parameters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-foreground font-medium">Parameters</label>
            <button
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Info size={16} />
              {showAdvancedOptions ? 'Hide' : 'Show'} advanced options
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-foreground font-medium mb-2">
                Initial Condition (Seed)
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={seed}
                  onChange={(e) => setSeed(parseFloat(e.target.value))}
                  step="0.000001"
                  min="0"
                  max="1"
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={() => setSeed(Math.random())}
                  className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  title="Generate new seed"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Value between 0 and 1 that determines the chaotic behavior
              </p>
            </div>
            
            <div>
              <label className="block text-foreground font-medium mb-2">
                Iterations
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={iterations}
                onChange={(e) => setIterations(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 (Fast)</span>
                <span>5 (Balanced)</span>
                <span>10 (Secure)</span>
              </div>
            </div>
          </div>

          {showAdvancedOptions && (
            <div className="p-4 bg-card rounded-lg border border-border">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Advanced Settings</h3>
                <p className="text-xs text-muted-foreground">
                  The chaos-based encryption uses a logistic map to generate a pseudo-random sequence.
                  Higher iteration counts increase security but also processing time.
                  The seed value determines the initial condition of the chaotic system.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        {isProcessing && (
          <div className="space-y-2">
            <div className="h-2 w-full bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Processing...</span>
              <span className="text-sm text-primary font-medium">{progress}%</span>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={processImage}
            disabled={!file || isProcessing}
            isLoading={isProcessing}
            fullWidth
            size="lg"
            className="flex-1 bg-primary hover:bg-primary/90"
            icon={<Lock size={20} />}
          >
            {isProcessing ? 'Processing...' : 'Encrypt Image'}
          </Button>
          
          {encryptedImageUrl && (
            <Button
              onClick={downloadEncryptedImage}
              variant="outline"
              fullWidth
              size="lg"
              className="flex-1 border-border hover:bg-primary/10"
              icon={<Download size={20} />}
            >
              Download Encrypted Image
            </Button>
          )}
        </div>
        
        {/* Result Preview */}
        {encryptedImageUrl && (
          <div className="space-y-4">
            <label className="block text-foreground font-medium">Result Preview</label>
            <div className="relative aspect-video bg-card/50 rounded-lg overflow-hidden border border-border">
              <img
                src={encryptedImageUrl}
                alt="Encrypted"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
        
        {/* Security Information */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Security Information
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Images are encrypted using chaos theory and nonlinear dynamics.
                  The encryption is performed entirely in your browser - your images never leave your device.
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Chaos-based encryption</li>
                  <li>Adjustable security level</li>
                  <li>Local processing only</li>
                  <li>Zero server storage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  );
};