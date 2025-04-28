/**
 * Quantum cryptography simulation utilities
 * 
 * This module provides functions for simulating quantum key distribution
 * protocols like BB84 and quantum-resistant encryption methods.
 */

// Quantum basis types
export enum QuantumBasis {
  Rectilinear = 'rectilinear', // |0⟩, |1⟩ basis (Z basis)
  Diagonal = 'diagonal'        // |+⟩, |-⟩ basis (X basis)
}

// Quantum states
export enum QuantumState {
  Zero = 0,  // |0⟩ in rectilinear basis, corresponds to 0
  One = 1,   // |1⟩ in rectilinear basis, corresponds to 1
  Plus = 2,  // |+⟩ in diagonal basis, corresponds to 0
  Minus = 3  // |-⟩ in diagonal basis, corresponds to 1
}

// Mapping between quantum states and classical bits
export function quantumStateToBit(state: QuantumState): number {
  return state === QuantumState.Zero || state === QuantumState.Plus ? 0 : 1;
}

// Determine if a measurement will be correct based on bases
export function measurementIsCorrect(
  stateBasis: QuantumBasis,
  measurementBasis: QuantumBasis
): boolean {
  return stateBasis === measurementBasis;
}

// Simulate quantum measurement
export function measureQuantumState(
  state: QuantumState,
  basis: QuantumBasis
): number {
  const stateBasis = state === QuantumState.Zero || state === QuantumState.One 
    ? QuantumBasis.Rectilinear 
    : QuantumBasis.Diagonal;
  
  if (measurementIsCorrect(stateBasis, basis)) {
    // Correct basis, deterministic result
    return quantumStateToBit(state);
  } else {
    // Wrong basis, random result
    return Math.random() < 0.5 ? 0 : 1;
  }
}

// Generate a random quantum state
export function generateRandomState(): QuantumState {
  const randomValue = Math.floor(Math.random() * 4);
  return randomValue as QuantumState;
}

// Generate a random basis
export function generateRandomBasis(): QuantumBasis {
  return Math.random() < 0.5 ? QuantumBasis.Rectilinear : QuantumBasis.Diagonal;
}

// Simulate the BB84 quantum key distribution protocol
export function simulateBB84(
  numBits: number,
  eveIsActive: boolean = false
): {
  aliceStates: QuantumState[];
  aliceBases: QuantumBasis[];
  bobBases: QuantumBasis[];
  bobMeasurements: number[];
  eveBases?: QuantumBasis[];
  eveMeasurements?: number[];
  sharedKey: number[];
  matchingBases: boolean[];
  securityCheck: {
    bitsToCheck: number[];
    aliceBits: number[];
    bobBits: number[];
    errorRate: number;
    secure: boolean;
  };
} {
  // Alice generates random quantum states and bases
  const aliceStates: QuantumState[] = [];
  const aliceBases: QuantumBasis[] = [];
  
  for (let i = 0; i < numBits; i++) {
    aliceStates.push(generateRandomState());
    aliceBases.push(generateRandomBasis());
  }
  
  // Eve's interception (if active)
  let eveBases: QuantumBasis[] | undefined;
  let eveMeasurements: number[] | undefined;
  let transmittedStates = [...aliceStates];
  
  if (eveIsActive) {
    eveBases = [];
    eveMeasurements = [];
    
    for (let i = 0; i < numBits; i++) {
      const eveBasis = generateRandomBasis();
      eveBases.push(eveBasis);
      
      const eveMeasurement = measureQuantumState(aliceStates[i], eveBasis);
      eveMeasurements.push(eveMeasurement);
      
      // Eve resends a new state based on her measurement
      const newState = eveMeasurement === 0
        ? (eveBasis === QuantumBasis.Rectilinear ? QuantumState.Zero : QuantumState.Plus)
        : (eveBasis === QuantumBasis.Rectilinear ? QuantumState.One : QuantumState.Minus);
      
      transmittedStates[i] = newState;
    }
  }
  
  // Bob measures the received states
  const bobBases: QuantumBasis[] = [];
  const bobMeasurements: number[] = [];
  
  for (let i = 0; i < numBits; i++) {
    const bobBasis = generateRandomBasis();
    bobBases.push(bobBasis);
    
    const measurement = measureQuantumState(transmittedStates[i], bobBasis);
    bobMeasurements.push(measurement);
  }
  
  // Alice and Bob compare bases and keep only matching ones
  const matchingBases: boolean[] = [];
  const sharedKey: number[] = [];
  
  for (let i = 0; i < numBits; i++) {
    const basesMatch = aliceBases[i] === bobBases[i];
    matchingBases.push(basesMatch);
    
    if (basesMatch) {
      sharedKey.push(bobMeasurements[i]);
    }
  }
  
  // Security check (QBER - Quantum Bit Error Rate)
  // Alice and Bob sacrifice some bits to check for eavesdropping
  const securityCheckSize = Math.min(Math.floor(sharedKey.length * 0.2), 10);
  const bitsToCheck: number[] = [];
  const aliceBits: number[] = [];
  const bobBits: number[] = [];
  
  // Select random bits for security check
  const availableIndices = matchingBases
    .map((matches, index) => matches ? index : -1)
    .filter(index => index !== -1);
  
  for (let i = 0; i < securityCheckSize && availableIndices.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const bitIndex = availableIndices[randomIndex];
    
    bitsToCheck.push(bitIndex);
    aliceBits.push(quantumStateToBit(aliceStates[bitIndex]));
    bobBits.push(bobMeasurements[bitIndex]);
    
    // Remove this index to avoid duplicates
    availableIndices.splice(randomIndex, 1);
  }
  
  // Calculate error rate
  let errors = 0;
  for (let i = 0; i < aliceBits.length; i++) {
    if (aliceBits[i] !== bobBits[i]) {
      errors++;
    }
  }
  
  const errorRate = aliceBits.length > 0 ? errors / aliceBits.length : 0;
  const secure = errorRate < 0.15; // Typically, error rates above 11-15% indicate eavesdropping
  
  return {
    aliceStates,
    aliceBases,
    bobBases,
    bobMeasurements,
    eveBases,
    eveMeasurements,
    sharedKey,
    matchingBases,
    securityCheck: {
      bitsToCheck,
      aliceBits,
      bobBits,
      errorRate,
      secure
    }
  };
}

// Simulate quantum-resistant encryption (post-quantum cryptography)
// This is a simplified simulation for educational purposes
export function quantumResistantEncrypt(
  data: Uint8Array,
  key: Uint8Array
): Uint8Array {
  // In a real implementation, this would use lattice-based, hash-based,
  // or other quantum-resistant algorithms
  
  // For demonstration, we'll use a simple XOR with key expansion
  const result = new Uint8Array(data.length);
  
  for (let i = 0; i < data.length; i++) {
    // Use a hash-like function to expand the key
    const keyIndex = i % key.length;
    const expandedKey = (key[keyIndex] + i * 7) % 256;
    
    // XOR with expanded key
    result[i] = data[i] ^ expandedKey;
  }
  
  return result;
}

// Quantum-resistant decryption (same as encryption for XOR)
export function quantumResistantDecrypt(
  encryptedData: Uint8Array,
  key: Uint8Array
): Uint8Array {
  // For XOR-based encryption, decryption is the same operation
  return quantumResistantEncrypt(encryptedData, key);
}

// Convert a string to a quantum-safe key
export function stringToQuantumKey(input: string): Uint8Array {
  // In a real implementation, this would use a quantum-resistant KDF
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  
  // Simple key derivation (for demonstration only)
  const key = new Uint8Array(32); // 256-bit key
  
  for (let i = 0; i < data.length; i++) {
    key[i % key.length] = (key[i % key.length] + data[i]) % 256;
  }
  
  return key;
}