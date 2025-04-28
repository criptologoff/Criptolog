import { showToast } from './toast';
import { AES, enc } from 'crypto-js';

// Generate a secure hash of data
export async function generateHash(data: ArrayBuffer): Promise<string> {
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Import a password for key derivation
export async function importPassword(password: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
}

// Derive a key from a password and salt
export async function deriveKey(
  passwordKey: CryptoKey,
  salt: Uint8Array,
  algorithm = 'AES-GCM'
): Promise<CryptoKey> {
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    passwordKey,
    { name: algorithm, length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

// Convert ArrayBuffer to Base64 string
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Convert Base64 string to ArrayBuffer
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// Encrypt data with a password
export async function encryptData(
  data: ArrayBuffer,
  password: string,
  algorithm = 'AES-GCM',
  metadata?: any,
  progressCallback?: (progress: number) => void
): Promise<ArrayBuffer> {
  try {
    // Generate a random salt
    const salt = crypto.getRandomValues(new Uint8Array(16));
    
    // Import the password and derive a key
    const passwordKey = await importPassword(password);
    const key = await deriveKey(passwordKey, salt, algorithm);
    
    // Progress update
    if (progressCallback) progressCallback(0.2);
    
    // Generate an IV (Initialization Vector)
    const ivLength = algorithm === 'AES-GCM' ? 12 : 16;
    const iv = crypto.getRandomValues(new Uint8Array(ivLength));
    
    // Prepare the data
    let dataToEncrypt: string;
    if (metadata) {
      if (metadata.data === '') {
        metadata.data = arrayBufferToBase64(data);
      }
      dataToEncrypt = JSON.stringify(metadata);
    } else {
      dataToEncrypt = arrayBufferToBase64(data);
    }
    
    // Progress update
    if (progressCallback) progressCallback(0.4);
    
    // Encrypt the data
    const encodedData = new TextEncoder().encode(dataToEncrypt);
    const encryptedData = await crypto.subtle.encrypt(
      { name: algorithm, iv },
      key,
      encodedData
    );
    
    // Progress update
    if (progressCallback) progressCallback(0.8);
    
    // Combine salt + iv + encryptedData into a single ArrayBuffer
    const result = new Uint8Array(
      salt.byteLength + iv.byteLength + encryptedData.byteLength
    );
    result.set(salt, 0);
    result.set(iv, salt.byteLength);
    result.set(new Uint8Array(encryptedData), salt.byteLength + iv.byteLength);
    
    // Progress update
    if (progressCallback) progressCallback(1);
    
    return result.buffer;
  } catch (error) {
    console.error('Encryption error:', error);
    showToast('Error during encryption', 'error');
    throw error;
  }
}

// Decrypt data with a password
export async function decryptData(
  encryptedData: ArrayBuffer,
  password: string,
  algorithm = 'AES-GCM'
): Promise<{ decryptedData: ArrayBuffer; metadata?: any }> {
  try {
    // Extract salt, IV, and encrypted data
    const dataView = new Uint8Array(encryptedData);
    const salt = dataView.slice(0, 16);
    const ivLength = algorithm === 'AES-GCM' ? 12 : 16;
    const iv = dataView.slice(16, 16 + ivLength);
    const data = dataView.slice(16 + ivLength);
    
    // Import the password and derive a key
    const passwordKey = await importPassword(password);
    const key = await deriveKey(passwordKey, salt, algorithm);
    
    // Decrypt the data
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: algorithm, iv },
      key,
      data
    );
    
    // Convert the decrypted data to a string
    const decryptedText = new TextDecoder().decode(decryptedBuffer);
    
    // Try to parse as JSON (for metadata)
    try {
      const parsedData = JSON.parse(decryptedText);
      if (parsedData.data) {
        // It's a file with metadata
        const fileData = base64ToArrayBuffer(parsedData.data);
        
        // Verify file integrity if hash is present
        if (parsedData.hash) {
          const calculatedHash = await generateHash(fileData);
          if (calculatedHash.toLowerCase() !== parsedData.hash.toLowerCase()) {
            showToast('Warning: File integrity check failed', 'warning');
          }
        }
        
        return { decryptedData: fileData, metadata: parsedData };
      } else {
        // It's JSON data without a data field
        return { decryptedData: base64ToArrayBuffer(decryptedText), metadata: parsedData };
      }
    } catch {
      // It's not JSON, treat as base64 encoded data
      try {
        return { 
          decryptedData: base64ToArrayBuffer(decryptedText),
          metadata: { originalName: 'decrypted_file' }
        };
      } catch {
        // It's plain text
        return { 
          decryptedData: decryptedBuffer,
          metadata: { originalName: 'decrypted_file', mimeType: 'text/plain' }
        };
      }
    }
  } catch (error) {
    console.error('Decryption error:', error);
    showToast('Decryption failed. Incorrect password?', 'error');
    throw error;
  }
}

// Encrypt text with a password
export const encryptText = async (text: string, password: string): Promise<string> => {
  try {
    return AES.encrypt(text, password).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

// Decrypt text with a password
export const decryptText = async (encryptedText: string, password: string): Promise<string> => {
  try {
    const bytes = AES.decrypt(encryptedText, password);
    return bytes.toString(enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
};

// Enhanced error types
export type CryptoError = {
  code: string;
  message: string;
  details?: any;
};

interface PasswordOptions {
  uppercase?: boolean;
  lowercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
}

// Improved password generation with better entropy
export const generatePassword = (length: number = 16, options: PasswordOptions = {}): string => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const {
    uppercase: useUppercase = true,
    lowercase: useLowercase = true,
    numbers: useNumbers = true,
    symbols: useSymbols = true
  } = options;

  let chars = '';
  let password = '';
  
  // Add selected character sets
  if (useUppercase) chars += uppercase;
  if (useLowercase) chars += lowercase;
  if (useNumbers) chars += numbers;
  if (useSymbols) chars += symbols;

  // If no character sets selected, use all
  if (!chars) {
    chars = uppercase + lowercase + numbers + symbols;
  }
  
  // Generate password
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  
  // Ensure at least one character from each selected set
  let finalPassword = password;
  if (useUppercase && !/[A-Z]/.test(finalPassword)) {
    const pos = Math.floor(Math.random() * length);
    finalPassword = finalPassword.substring(0, pos) + 
                   uppercase[Math.floor(Math.random() * uppercase.length)] + 
                   finalPassword.substring(pos + 1);
  }
  if (useLowercase && !/[a-z]/.test(finalPassword)) {
    const pos = Math.floor(Math.random() * length);
    finalPassword = finalPassword.substring(0, pos) + 
                   lowercase[Math.floor(Math.random() * lowercase.length)] + 
                   finalPassword.substring(pos + 1);
  }
  if (useNumbers && !/[0-9]/.test(finalPassword)) {
    const pos = Math.floor(Math.random() * length);
    finalPassword = finalPassword.substring(0, pos) + 
                   numbers[Math.floor(Math.random() * numbers.length)] + 
                   finalPassword.substring(pos + 1);
  }
  if (useSymbols && !/[^A-Za-z0-9]/.test(finalPassword)) {
    const pos = Math.floor(Math.random() * length);
    finalPassword = finalPassword.substring(0, pos) + 
                   symbols[Math.floor(Math.random() * symbols.length)] + 
                   finalPassword.substring(pos + 1);
  }
  
  return finalPassword;
};

// Improved password strength evaluation
export function evaluatePasswordStrength(password: string): { 
  score: number; 
  feedback: string[]; 
  color: string;
  level: string;
} {
  const feedback: string[] = [];
  let score = 0;
  
  // Length check
  if (password.length < 8) {
    feedback.push('Password is too short');
  } else if (password.length >= 12) {
    score += 20;
    feedback.push('Good length');
  }
  
  // Character variety
  if (/[A-Z]/.test(password)) score += 10;
  if (/[a-z]/.test(password)) score += 10;
  if (/[0-9]/.test(password)) score += 10;
  if (/[^A-Za-z0-9]/.test(password)) score += 10;
  
  // Complexity patterns
  if (/(.)\1{2,}/.test(password)) {
    score -= 10;
    feedback.push('Avoid repeated characters');
  }
  
  if (/^[A-Za-z]+$/.test(password)) {
    score -= 10;
    feedback.push('Add numbers and symbols');
  }
  
  if (/^[0-9]+$/.test(password)) {
    score -= 10;
    feedback.push('Add letters and symbols');
  }
  
  // Common patterns check
  const commonPatterns = [
    '123', '456', '789', 'abc', 'qwerty', 'password', 'admin'
  ];
  
  for (const pattern of commonPatterns) {
    if (password.toLowerCase().includes(pattern)) {
      score -= 10;
      feedback.push('Avoid common patterns');
      break;
    }
  }
  
  // Normalize score
  score = Math.max(0, Math.min(100, score));
  
  // Determine level and color based on score
  let level: string;
  let color: string;
  
  if (score >= 80) {
    level = 'Very Strong';
    color = '#2E7D32'; // Dark green
    feedback.push('Very strong password');
  } else if (score >= 60) {
    level = 'Strong';
    color = '#4CAF50'; // Green
    feedback.push('Strong password');
  } else if (score >= 40) {
    level = 'Moderate';
    color = '#FFA726'; // Orange
    feedback.push('Moderate password');
  } else if (score >= 20) {
    level = 'Weak';
    color = '#F44336'; // Red
    feedback.push('Weak password');
  } else {
    level = 'Very Weak';
    color = '#B71C1C'; // Dark red
    feedback.push('Very weak password');
  }
  
  return { score, feedback, color, level };
}

// Chunked file encryption for large files
export async function encryptLargeFile(
  file: File,
  password: string,
  algorithm = 'AES-GCM',
  chunkSize = 1024 * 1024, // 1MB chunks
  onProgress?: (progress: number) => void
): Promise<Blob> {
  try {
    // Generate encryption key and IV
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const passwordKey = await importPassword(password);
    const key = await deriveKey(passwordKey, salt, algorithm);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Prepare metadata
    const metadata = {
      originalName: file.name,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      lastModified: file.lastModified,
      algorithm,
      chunkSize,
      chunks: Math.ceil(file.size / chunkSize)
    };
    
    // Encrypt metadata
    const metadataBuffer = new TextEncoder().encode(JSON.stringify(metadata));
    const encryptedMetadata = await crypto.subtle.encrypt(
      { name: algorithm, iv },
      key,
      metadataBuffer
    );
    
    // Process file in chunks
    const chunks: ArrayBuffer[] = [];
    let offset = 0;
    let chunkIndex = 0;
    
    while (offset < file.size) {
      const chunk = await file.slice(offset, offset + chunkSize).arrayBuffer();
      const encryptedChunk = await crypto.subtle.encrypt(
        { name: algorithm, iv },
        key,
        chunk
      );
      
      chunks.push(encryptedChunk);
      offset += chunkSize;
      chunkIndex++;
      
      if (onProgress) {
        onProgress((offset / file.size) * 100);
      }
    }
    
    // Combine all chunks
    const totalSize = salt.byteLength + iv.byteLength + encryptedMetadata.byteLength +
      chunks.reduce((acc, chunk) => acc + chunk.byteLength, 0);
    
    const result = new Uint8Array(totalSize);
    let position = 0;
    
    result.set(salt, position);
    position += salt.byteLength;
    
    result.set(iv, position);
    position += iv.byteLength;
    
    result.set(new Uint8Array(encryptedMetadata), position);
    position += encryptedMetadata.byteLength;
    
    for (const chunk of chunks) {
      result.set(new Uint8Array(chunk), position);
      position += chunk.byteLength;
    }
    
    return new Blob([result], { type: 'application/octet-stream' });
  } catch (error) {
    const cryptoError: CryptoError = {
      code: 'ENCRYPTION_FAILED',
      message: 'Failed to encrypt file',
      details: error
    };
    throw cryptoError;
  }
}