/**
 * Utility functions for encryption and decryption using the Web Crypto API
 */

/**
 * Encrypts data using AES-GCM or AES-CBC
 * @param data - The data to encrypt
 * @param key - The encryption key in base64 format
 * @param algorithm - The encryption algorithm to use
 * @returns The encrypted data in base64 format
 */
export async function encryptData(
  data: string,
  key: string,
  algorithm: 'AES-GCM' | 'AES-CBC' = 'AES-GCM'
): Promise<string> {
  try {
    // Convert base64 key to Uint8Array
    const keyData = Uint8Array.from(atob(key), c => c.charCodeAt(0));
    
    // Import the key
    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      keyData,
      algorithm,
      true,
      ['encrypt']
    );
    
    // Generate IV
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    
    // Encode the data
    const encodedData = new TextEncoder().encode(data);
    
    // Encrypt the data
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: algorithm,
        iv
      },
      cryptoKey,
      encodedData
    );
    
    // Format the result
    const result = {
      iv: Array.from(iv),
      data: Array.from(new Uint8Array(encryptedData))
    };
    
    // Return base64 encoded result
    return btoa(JSON.stringify(result));
  } catch (error) {
    throw new Error('Encryption failed');
  }
}

/**
 * Decrypts data using AES-GCM or AES-CBC
 * @param encryptedData - The encrypted data in base64 format
 * @param key - The decryption key in base64 format
 * @param algorithm - The decryption algorithm to use
 * @returns The decrypted data
 */
export async function decryptData(
  encryptedData: string,
  key: string,
  algorithm: 'AES-GCM' | 'AES-CBC' = 'AES-GCM'
): Promise<string> {
  try {
    // Parse the encrypted data
    const { iv, data } = JSON.parse(atob(encryptedData));
    
    // Convert base64 key to Uint8Array
    const keyData = Uint8Array.from(atob(key), c => c.charCodeAt(0));
    
    // Import the key
    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      keyData,
      algorithm,
      true,
      ['decrypt']
    );
    
    // Decrypt the data
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: algorithm,
        iv: new Uint8Array(iv)
      },
      cryptoKey,
      new Uint8Array(data)
    );
    
    // Decode and return the result
    return new TextDecoder().decode(decryptedData);
  } catch (error) {
    throw new Error('Decryption failed');
  }
}

/**
 * Generates a cryptographic key
 * @param algorithm - The algorithm to generate the key for
 * @returns The generated key in base64 format
 */
export async function generateKey(
  algorithm: 'AES-GCM' | 'AES-CBC' = 'AES-GCM'
): Promise<string> {
  try {
    // Generate the key
    const key = await window.crypto.subtle.generateKey(
      {
        name: algorithm,
        length: 256
      },
      true,
      ['encrypt', 'decrypt']
    );
    
    // Export the key
    const exportedKey = await window.crypto.subtle.exportKey('raw', key);
    
    // Return base64 encoded key
    return btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
  } catch (error) {
    throw new Error('Key generation failed');
  }
}

/**
 * Evaluates password strength
 * @param password - The password to evaluate
 * @returns An object containing the strength score and feedback
 */
export function evaluatePasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  const result = {
    score: 0,
    feedback: [] as string[]
  };

  if (!password) {
    result.feedback.push('Password is required');
    return result;
  }

  // Length check
  if (password.length < 8) {
    result.feedback.push('Password is too short');
  } else if (password.length >= 12) {
    result.score += 20;
  }

  // Character variety checks
  if (/[A-Z]/.test(password)) result.score += 20;
  if (/[a-z]/.test(password)) result.score += 20;
  if (/[0-9]/.test(password)) result.score += 20;
  if (/[^A-Za-z0-9]/.test(password)) result.score += 20;

  // Feedback based on score
  if (result.score < 40) {
    result.feedback.push('Password is weak');
  } else if (result.score < 80) {
    result.feedback.push('Password is moderate');
  } else {
    result.feedback.push('Password is strong');
  }

  return result;
}

/**
 * Generates a secure random password
 * @param length - The length of the password
 * @param options - Password generation options
 * @returns A secure random password
 */
export function generateSecurePassword(
  length: number = 16,
  options: {
    useUppercase?: boolean;
    useLowercase?: boolean;
    useNumbers?: boolean;
    useSpecial?: boolean;
  } = {
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSpecial: true
  }
): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_-+=<>?';

  let charset = '';
  let password = '';

  if (options.useUppercase) charset += uppercase;
  if (options.useLowercase) charset += lowercase;
  if (options.useNumbers) charset += numbers;
  if (options.useSpecial) charset += special;

  if (!charset) {
    throw new Error('At least one character set must be selected');
  }

  // Generate random values
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  // Generate password
  for (let i = 0; i < length; i++) {
    password += charset[randomValues[i] % charset.length];
  }

  return password;
} 