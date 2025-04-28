import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Play, Pause, RotateCcw, ChevronRight, Settings, Info } from 'lucide-react';
import { simulateBB84, QuantumState, QuantumBasis } from '@/utils/quantum';
import { ToolProps } from '@/types/tools';

interface SimulationResult {
  aliceStates: QuantumState[];
  aliceBases: QuantumBasis[];
  bobBases: QuantumBasis[];
  bobMeasurements: number[];
  finalKey: string;
  qber: number;
  keyRate: number;
}

interface QuantumSimulatorProps extends ToolProps {
  // Add any additional props specific to QuantumSimulator here
}

export const QuantumSimulator: React.FC<QuantumSimulatorProps> = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [numQubits, setNumQubits] = useState(100);
  const [hasEavesdropper, setHasEavesdropper] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleStart = () => {
    setIsRunning(true);
    const result = simulateBB84(numQubits, hasEavesdropper);
    // Transform the result to match SimulationResult interface
    const transformedResult: SimulationResult = {
      aliceStates: result.aliceStates,
      aliceBases: result.aliceBases,
      bobBases: result.bobBases,
      bobMeasurements: result.bobMeasurements,
      finalKey: result.sharedKey.join(''),
      qber: result.securityCheck.errorRate,
      keyRate: result.securityCheck.secure ? result.sharedKey.length / numQubits : 0
    };
    setSimulationResult(transformedResult);
    setCurrentStep(1);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setSimulationResult(null);
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && currentStep < 4) {
      timer = setTimeout(handleNextStep, 2000 / speed);
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentStep, speed]);

  return (
    <div className="w-full space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">BB84 Quantum Key Distribution Simulator</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowInfo(!showInfo)}
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showSettings && (
        <Card className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Qubits</label>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={numQubits}
              onChange={(e) => setNumQubits(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-muted-foreground">{numQubits} qubits</span>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Simulation Speed</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-muted-foreground">{speed}x speed</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Include Eavesdropper</label>
            <input
              type="checkbox"
              checked={hasEavesdropper}
              onChange={(e) => setHasEavesdropper(e.target.checked)}
              className="ml-2"
            />
          </div>
        </Card>
      )}

      {showInfo && (
        <Card className="p-4 space-y-2">
          <h3 className="font-semibold">About BB84 Protocol</h3>
          <p className="text-sm text-muted-foreground">
            The BB84 protocol is a quantum key distribution scheme developed by Charles Bennett and Gilles Brassard in 1984.
            It allows two parties to create a shared random secret key that can be used for encrypting messages.
            The security is based on the principles of quantum mechanics, specifically the no-cloning theorem.
          </p>
        </Card>
      )}

      <div className="flex justify-center gap-4">
        <Button
          onClick={handleStart}
          disabled={isRunning}
          className="w-32"
        >
          {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span className="ml-2">{isRunning ? 'Running' : 'Start'}</span>
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="w-32"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="ml-2">Reset</span>
        </Button>
        <Button
          onClick={handleNextStep}
          disabled={!isRunning || currentStep >= 4}
          variant="outline"
          className="w-32"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="ml-2">Next Step</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Simulation Progress</h3>
            <div className="space-y-2">
              <div className={`p-2 rounded ${currentStep >= 1 ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
                1. Quantum State Preparation
              </div>
              <div className={`p-2 rounded ${currentStep >= 2 ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
                2. Quantum Transmission
              </div>
              <div className={`p-2 rounded ${currentStep >= 3 ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
                3. Measurement
              </div>
              <div className={`p-2 rounded ${currentStep >= 4 ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
                4. Key Sifting
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {simulationResult && (
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Results</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>QBER:</span>
                  <span>{(simulationResult.qber * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Key Rate:</span>
                  <span>{(simulationResult.keyRate * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Final Key Length:</span>
                  <span>{simulationResult.finalKey.length} bits</span>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};