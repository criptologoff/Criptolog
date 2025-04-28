export function encryptData(
  data: string,
  key: string,
  algorithm?: 'AES-GCM' | 'AES-CBC'
): Promise<string>;

export function decryptData(
  encryptedData: string,
  key: string,
  algorithm?: 'AES-GCM' | 'AES-CBC'
): Promise<string>;

export function generateKey(
  algorithm?: 'AES-GCM' | 'AES-CBC'
): Promise<string>;

export function evaluatePasswordStrength(password: string): {
  score: number;
  feedback: string[];
};

export function generateSecurePassword(
  length?: number,
  options?: {
    useUppercase?: boolean;
    useLowercase?: boolean;
    useNumbers?: boolean;
    useSpecial?: boolean;
  }
): string; 