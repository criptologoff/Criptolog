import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SecurityState {
  isVaultLocked: boolean;
  securityScore: number;
  autoDeleteEnabled: boolean;
  autoDeleteDuration: number | null;
  lastAudit: string | null;
  securityIssues: SecurityIssue[];
}

interface SecurityIssue {
  type: 'weak' | 'reused' | 'old';
  count: number;
}

interface SecurityContextType extends SecurityState {
  toggleVaultLock: (status?: boolean) => void;
  configureAutoDelete: (enabled: boolean, duration?: number | null) => void;
  updateSecurityScore: (score: number, issues?: SecurityIssue[]) => void;
  runSecurityAudit: () => Promise<number>;
}

// Initial state
const initialState: SecurityState = {
  isVaultLocked: true,
  securityScore: 0,
  autoDeleteEnabled: false,
  autoDeleteDuration: 86400, // 24 hours in seconds
  lastAudit: null,
  securityIssues: []
};

// Create context
const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

interface SecurityProviderProps {
  children: ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const [state, setState] = useState<SecurityState>(() => {
    // Try to load state from localStorage
    const savedState = localStorage.getItem('securityState');
    if (savedState) {
      try {
        return { ...initialState, ...JSON.parse(savedState) };
      } catch (error) {
        console.error('Failed to parse security state:', error);
      }
    }
    return initialState;
  });

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('securityState', JSON.stringify({
      autoDeleteEnabled: state.autoDeleteEnabled,
      autoDeleteDuration: state.autoDeleteDuration,
      lastAudit: state.lastAudit
    }));
  }, [state.autoDeleteEnabled, state.autoDeleteDuration, state.lastAudit]);

  // Toggle vault lock status
  const toggleVaultLock = (status?: boolean) => {
    setState(prev => ({
      ...prev,
      isVaultLocked: status !== undefined ? status : !prev.isVaultLocked
    }));
  };

  // Configure auto-delete settings
  const configureAutoDelete = (enabled: boolean, duration?: number | null) => {
    setState(prev => ({
      ...prev,
      autoDeleteEnabled: enabled,
      autoDeleteDuration: duration !== undefined ? duration : prev.autoDeleteDuration
    }));
  };

  // Update security score
  const updateSecurityScore = (score: number, issues: SecurityIssue[] = []) => {
    setState(prev => ({
      ...prev,
      securityScore: score,
      securityIssues: issues,
      lastAudit: new Date().toISOString()
    }));
    return score;
  };

  // Run security audit
  const runSecurityAudit = async (): Promise<number> => {
    // This would be much more comprehensive in a real application
    // Here we're just simulating a basic audit
    
    // Simulate API call or crypto processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Sample issues
    const weakPasswords = Math.floor(Math.random() * 3); // 0-2 weak passwords
    const reusedPasswords = Math.floor(Math.random() * 2); // 0-1 reused passwords
    const oldPasswords = Math.floor(Math.random() * 4); // 0-3 old passwords
    
    const issues: SecurityIssue[] = [];
    if (weakPasswords) issues.push({ type: 'weak', count: weakPasswords });
    if (reusedPasswords) issues.push({ type: 'reused', count: reusedPasswords });
    if (oldPasswords) issues.push({ type: 'old', count: oldPasswords });
    
    // Calculate score based on issues
    const baseScore = 100;
    const deductions = (weakPasswords * 15) + (reusedPasswords * 20) + (oldPasswords * 5);
    const score = Math.max(0, Math.min(100, baseScore - deductions));
    
    // Update state
    updateSecurityScore(score, issues);
    
    return score;
  };

  // Context value
  const value: SecurityContextType = {
    ...state,
    toggleVaultLock,
    configureAutoDelete,
    updateSecurityScore,
    runSecurityAudit
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};

// Custom hook to use the security context
export const useSecurity = (): SecurityContextType => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};

export default SecurityContext;