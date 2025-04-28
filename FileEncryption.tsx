import React, { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  Info, 
  Lock, 
  FileUp, 
  Download, 
  Settings, 
  X, 
  Eye,
  EyeOff
} from 'lucide-react';
import { encryptLargeFile, evaluatePasswordStrength, generatePassword } from '@/utils/crypto';
import { showToast } from '@/utils/toast';
import { ToolProps } from '@/types/tools';

interface FileEncryptionProps extends ToolProps {
  // Add any additional props specific to FileEncryption here
}

export const FileEncryption: React.FC<FileEncryptionProps> = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [algorithm, setAlgorithm] = useState('AES-GCM');
  const [chunkSize, setChunkSize] = useState(1024 * 1024); // 1MB
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const passwordStrength = evaluatePasswordStrength(password);
  
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  }, []);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  }, []);
  
  const validateAndSetFile = (file: File) => {
    setError(null);
    
    // Basic file validation
    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      setError(t('errors.fileTooLarge', { size: '100MB' }));
      showToast('File is too large. Maximum size is 100MB.', 'error');
      return;
    }
    
    // Check for potentially dangerous file types
    const dangerousExtensions = ['.exe', '.bat', '.cmd', '.sh', '.js'];
    if (dangerousExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
      setError(t('errors.unsupportedFileType'));
      showToast('This file type is not supported for security reasons.', 'error');
      return;
    }
    
    setFile(file);
    showToast('File selected successfully!', 'success');
  };
  
  const handleEncrypt = async () => {
    if (!file || !password) {
      showToast('Please select a file and enter a password.', 'error');
      return;
    }
    
    if (passwordStrength.score < 40) {
      showToast('Please use a stronger password.', 'warning');
      return;
    }
    
    try {
      setIsEncrypting(true);
      setError(null);
      setProgress(0);
      
      // Revoke previous download URL
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
      
      const encryptedBlob = await encryptLargeFile(
        file,
        password,
        algorithm,
        chunkSize,
        (progress) => setProgress(progress)
      );
      
      const url = URL.createObjectURL(encryptedBlob);
      setDownloadUrl(url);
      showToast('File encrypted successfully!', 'success');
    } catch (err: any) {
      setError(err.message || t('errors.encryptionFailed'));
      showToast('Encryption failed. Please try again.', 'error');
    } finally {
      setIsEncrypting(false);
    }
  };
  
  const generateNewPassword = () => {
    const newPassword = generatePassword(16);
    setPassword(newPassword);
    showToast('New password generated!', 'success');
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    showToast('Password copied to clipboard!', 'success');
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`w-full max-w-2xl mx-auto p-6 space-y-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-xl shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">File Encryption</h2>
        <button
          onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
        >
          <Settings size={20} />
          <span className="text-sm">{showAdvancedOptions ? 'Hide' : 'Show'} Advanced</span>
        </button>
      </div>

      {/* File Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-xl p-8 transition-all duration-200
          ${isDragging ? 'border-blue-500 bg-blue-500/10' : file ? 'border-green-500 bg-green-500/10' : 'border-border hover:border-blue-500'}
          cursor-pointer group
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <FileUp 
            className={`
              ${file ? 'text-green-500' : 'text-muted-foreground'} 
              group-hover:scale-110 transition-transform duration-200
            `} 
            size={48} 
          />
          <div className="text-center">
            {file ? (
              <>
                <p className="text-lg font-medium text-green-500">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </>
            ) : (
              <div className="space-y-2">
                <p className="text-foreground font-medium">
                  Drop your file here or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Maximum file size: 100MB
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Password Input */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter encryption password"
            className="w-full px-4 py-2 pr-24 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all text-foreground placeholder:text-muted-foreground"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 text-muted-foreground hover:text-foreground"
              type="button"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <button
              onClick={copyPassword}
              className="p-1 text-muted-foreground hover:text-foreground"
              type="button"
              disabled={!password}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={generateNewPassword}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Lock size={18} />
            <span>Generate Strong Password</span>
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        {password && (
          <div className="space-y-2">
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${
                  passwordStrength.score >= 80 ? 'bg-green-500' :
                  passwordStrength.score >= 60 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${passwordStrength.score}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {passwordStrength.feedback.map((feedback, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Info size={16} className="text-blue-500" />
                  <span>{feedback}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Advanced Options */}
      <AnimatePresence>
        {showAdvancedOptions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-4 overflow-hidden bg-card rounded-lg p-4 border border-border"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Encryption Algorithm
                </label>
                <select
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value)}
                  className="w-full rounded-lg bg-background border border-border text-foreground"
                >
                  <option value="AES-GCM">AES-GCM (Recommended)</option>
                  <option value="AES-CBC">AES-CBC</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Processing Chunk Size
                </label>
                <select
                  value={chunkSize}
                  onChange={(e) => setChunkSize(Number(e.target.value))}
                  className="w-full rounded-lg bg-background border border-border text-foreground"
                >
                  <option value={512 * 1024}>512 KB</option>
                  <option value={1024 * 1024}>1 MB (Recommended)</option>
                  <option value={2 * 1024 * 1024}>2 MB</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-2 text-red-500 bg-red-500/10 p-4 rounded-lg border border-red-500/20"
          >
            <AlertTriangle size={20} />
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto hover:text-red-600"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Progress Bar */}
      {isEncrypting && (
        <div className="space-y-2">
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Encrypting... {progress.toFixed(1)}%
          </p>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex justify-between space-x-4">
        <button
          onClick={handleEncrypt}
          disabled={!file || !password || isEncrypting}
          className={`
            flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg
            ${!file || !password || isEncrypting
              ? 'bg-muted cursor-not-allowed text-muted-foreground'
              : 'bg-blue-500 hover:bg-blue-600 transform hover:scale-105 text-white'}
            font-medium transition-all duration-200
          `}
        >
          <Lock size={20} />
          <span>Encrypt File</span>
        </button>
        
        {downloadUrl && (
          <a
            href={downloadUrl}
            download={`${file?.name}.encrypted`}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transform hover:scale-105 transition-all duration-200"
          >
            <Download size={20} />
            <span>Download Encrypted File</span>
          </a>
        )}
      </div>
      
      {/* Security Info */}
      <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <div className="flex items-start space-x-3">
          <Shield className="text-blue-500 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-medium text-foreground">
              Security Information
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your files are encrypted locally in your browser using strong encryption algorithms.
              We never store or transmit your files or encryption keys.
            </p>
            <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>End-to-end encryption using AES-256</li>
              <li>Files never leave your device</li>
              <li>Open-source and auditable code</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FileEncryption;