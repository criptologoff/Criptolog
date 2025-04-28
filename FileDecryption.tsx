import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Unlock, Upload, Download, Eye, EyeOff, Shield, AlertTriangle} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { decryptData } from '../../utils/crypto';
import { showToast } from '../../utils/toast';

export const FileDecryption: React.FC = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [downloadFilename, setDownloadFilename] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  
  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const selectedFile = files[0];
    if (selectedFile.size > 50 * 1024 * 1024) {
      showToast('The file is too large (maximum 50MB)', 'warning');
      return;
    }
    
    setFile(selectedFile);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files);
  };
  
  const handleDecrypt = async () => {
    if (!file) {
      showToast('No file selected', 'error');
      return;
    }
    
    if (!password) {
      showToast('Please enter a password', 'error');
      return;
    }
    
    try {
      setIsDecrypting(true);
      setProgress(0);
      
      // Read the file
      const fileBuffer = await file.arrayBuffer();
      setProgress(20);
      
      // Decrypt the file
      const { decryptedData, metadata } = await decryptData(fileBuffer, password);
      setProgress(60);
      
      // Create a download link
      const blob = new Blob([decryptedData], { type: metadata?.mimeType || 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const filename = metadata?.originalName || 'decrypted_file';
      
      setDownloadUrl(url);
      setDownloadFilename(filename);
      setProgress(100);
      
      showToast('File decrypted successfully!', 'success');
    } catch (error) {
      console.error(error);
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
          {t('tools.fileDecryption.title')}
        </CardTitle>
        <CardDescription className="text-center text-gray-400">
          {t('tools.fileDecryption.description')}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e.target.files)}
          className="hidden"
        />
        
        {/* File Drop Zone */}
        <div
          ref={dropZoneRef}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => {
            e.preventDefault();
            dropZoneRef.current?.classList.add('border-green-500/50', 'bg-green-500/5');
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            if (e.currentTarget === dropZoneRef.current) {
              dropZoneRef.current?.classList.remove('border-green-500/50', 'bg-green-500/5');
            }
          }}
          className={`
            relative group cursor-pointer rounded-xl border-2 border-dashed
            transition-all duration-300 p-8
            ${file ? 'border-green-500/50 bg-green-500/5' : 'border-gray-600 hover:border-green-500/50 hover:bg-green-500/5'}
          `}
        >
          {file ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                <Unlock className="text-green-400" size={32} />
              </div>
              <p className="text-green-400 font-medium text-lg">{file.name}</p>
              <span className="text-gray-400 mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
              <div className="flex items-center gap-2 mt-3">
                <button
                  className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                >
                  Remove file
                </button>
                {file.size > 10 * 1024 * 1024 && (
                  <div className="flex items-center gap-1 text-sm text-amber-400">
                    <AlertTriangle size={16} />
                    <span>Large file, decryption might take longer</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-secondary-700/50 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                <Upload className="w-10 h-10 text-gray-400 group-hover:text-green-400 transition-colors" />
              </div>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-center">
                Drag and drop your encrypted file here
                <br />
                <span className="text-sm text-gray-500">or click to select</span>
              </p>
            </div>
          )}
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

        {/* Decryption Progress */}
        {isDecrypting && (
          <div className="space-y-2">
            <div className="h-2 w-full bg-secondary-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Decrypting...</span>
              <span className="text-sm text-green-400 font-medium">{progress}%</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleDecrypt}
            disabled={!file || isDecrypting}
            isLoading={isDecrypting}
            fullWidth
            size="lg"
            className="flex-1"
            icon={<Unlock size={20} />}
          >
            {isDecrypting ? 'Decrypting...' : 'Decrypt File'}
          </Button>

          {downloadUrl && (
            <Button
              variant="secondary"
              fullWidth
              size="lg"
              className="flex-1"
              icon={<Download size={20} />}
              onClick={() => {
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = downloadFilename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download Decrypted File
            </Button>
          )}
        </div>

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
                  Files are decrypted using the same encryption algorithm used to encrypt them.
                  The decryption is performed entirely in your browser - your files never leave your device.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li>End-to-end encryption</li>
                  <li>Secure key derivation (PBKDF2)</li>
                  <li>File integrity verification</li>
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