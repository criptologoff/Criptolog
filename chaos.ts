/**
 * Chaos-based cryptography utilities
 * 
 * This module provides functions for chaos-based encryption and decryption
 * using various chaotic maps like Logistic Map, Henon Map, and others.
 */

// Logistic Map: x_{n+1} = r * x_n * (1 - x_n)
export function logisticMap(x: number, r: number): number {
  return r * x * (1 - x);
}

// Henon Map: x_{n+1} = 1 - a * x_n^2 + b * y_n, y_{n+1} = x_n
export function henonMap(x: number, y: number, a: number = 1.4, b: number = 0.3): [number, number] {
  const newX = 1 - a * x * x + b * y;
  const newY = x;
  return [newX, newY];
}

// Tent Map: x_{n+1} = r * min(x_n, 1 - x_n)
export function tentMap(x: number, r: number = 1.99): number {
  return r * Math.min(x, 1 - x);
}

// Generate a chaotic sequence using the Logistic Map
export function generateChaosSequence(seed: number, length: number, r: number = 3.99): number[] {
  const sequence = [seed];
  let currentValue = seed;
  
  for (let i = 1; i < length; i++) {
    currentValue = logisticMap(currentValue, r);
    sequence.push(currentValue);
  }
  
  return sequence;
}

// Generate a chaotic key stream for encryption
export function generateChaosKeyStream(seed: number, length: number): Uint8Array {
  const chaosSequence = generateChaosSequence(seed, length);
  const keyStream = new Uint8Array(length);
  
  for (let i = 0; i < length; i++) {
    // Map the chaos value (0-1) to a byte value (0-255)
    keyStream[i] = Math.floor(chaosSequence[i] * 256) % 256;
  }
  
  return keyStream;
}

// Encrypt an image using chaos-based encryption
export function encryptImageWithChaos(
  imageData: Uint8ClampedArray, 
  seed: number
): Uint8ClampedArray {
  const keyStream = generateChaosKeyStream(seed, imageData.length);
  const encryptedData = new Uint8ClampedArray(imageData.length);
  
  for (let i = 0; i < imageData.length; i++) {
    // XOR operation for encryption
    encryptedData[i] = imageData[i] ^ keyStream[i % keyStream.length];
  }
  
  return encryptedData;
}

// Decrypt an image using chaos-based encryption (same operation as encryption due to XOR properties)
export function decryptImageWithChaos(
  encryptedData: Uint8ClampedArray, 
  seed: number
): Uint8ClampedArray {
  // For XOR-based encryption, decryption is the same operation
  return encryptImageWithChaos(encryptedData, seed);
}

// Perform pixel shuffling based on chaotic map
export function shufflePixels(
  imageData: Uint8ClampedArray, 
  width: number, 
  height: number, 
  seed: number
): Uint8ClampedArray {
  const totalPixels = width * height;
  const shuffledIndices = new Array(totalPixels);
  
  // Initialize indices
  for (let i = 0; i < totalPixels; i++) {
    shuffledIndices[i] = i;
  }
  
  // Generate chaotic sequence
  const chaosSequence = generateChaosSequence(seed, totalPixels);
  
  // Fisher-Yates shuffle based on chaotic sequence
  for (let i = totalPixels - 1; i > 0; i--) {
    const j = Math.floor(chaosSequence[i] * (i + 1));
    [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
  }
  
  // Create shuffled image data
  const shuffledData = new Uint8ClampedArray(imageData.length);
  
  for (let i = 0; i < totalPixels; i++) {
    const srcIdx = shuffledIndices[i] * 4;
    const destIdx = i * 4;
    
    shuffledData[destIdx] = imageData[srcIdx];
    shuffledData[destIdx + 1] = imageData[srcIdx + 1];
    shuffledData[destIdx + 2] = imageData[srcIdx + 2];
    shuffledData[destIdx + 3] = imageData[srcIdx + 3];
  }
  
  return shuffledData;
}

// Advanced chaos-based image encryption
export function advancedChaosEncryption(
  imageData: Uint8ClampedArray,
  width: number,
  height: number,
  seed: number,
  iterations: number = 3
): Uint8ClampedArray {
  let processedData = new Uint8ClampedArray(imageData);
  
  // Multiple iterations of encryption for stronger security
  for (let i = 0; i < iterations; i++) {
    // Different seed for each iteration
    const iterationSeed = seed + (i * 0.01);
    
    // First shuffle pixels
    processedData = shufflePixels(processedData, width, height, iterationSeed);
    
    // Then apply XOR encryption
    processedData = encryptImageWithChaos(processedData, iterationSeed + 0.5);
  }
  
  return processedData;
}

// Advanced chaos-based image decryption
export function advancedChaosDecryption(
  encryptedData: Uint8ClampedArray,
  width: number,
  height: number,
  seed: number,
  iterations: number = 3
): Uint8ClampedArray {
  let processedData = new Uint8ClampedArray(encryptedData);
  
  // Apply decryption in reverse order
  for (let i = iterations - 1; i >= 0; i--) {
    const iterationSeed = seed + (i * 0.01);
    
    // First decrypt with XOR (same as encrypt due to XOR properties)
    processedData = encryptImageWithChaos(processedData, iterationSeed + 0.5);
    
    // TODO: Implement inverse pixel shuffling for proper decryption
    // For now, this is a simplified version that won't fully recover the original
  }
  
  return processedData;
}