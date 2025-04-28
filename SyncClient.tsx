import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cloud, CloudOff, Smartphone, Laptop, Monitor, RefreshCw, CheckCircle2 } from 'lucide-react';
import QRCode from 'react-qr-code';

export const SyncClient: React.FC = () => {
  const { t } = useTranslation();
  const [syncMode, setSyncMode] = useState<'connect' | 'devices'>('connect');
  const [isScanning, setIsScanning] = useState(false);
  
  // Sample connected devices
  const devices = [
    { id: '1', name: 'MacBook Pro', type: 'laptop', lastSync: '2025-04-10 13:45', isActive: true },
    { id: '2', name: 'iPhone 15', type: 'mobile', lastSync: '2025-04-10 10:20', isActive: true },
    { id: '3', name: 'Work Desktop', type: 'desktop', lastSync: '2025-04-08 14:30', isActive: false },
  ];
  
  const handleStartScan = () => {
    setIsScanning(true);
    // In a real app, this would activate the device camera to scan QR code
  };
  
  const generateQRCode = () => {
    // Generate a random pairing code
    const pairingCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    // In a real app, this would contain a device ID, timestamp, and signature
    const qrContent = JSON.stringify({
      app: 'Criptolog',
      pairingCode,
      timestamp: Date.now(),
    });
    
    return qrContent;
  };
  
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'laptop':
        return <Laptop className="w-5 h-5" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'desktop':
        return <Monitor className="w-5 h-5" />;
      default:
        return <Laptop className="w-5 h-5" />;
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-200">{t('syncClient')}</h2>
        
        <div className="flex">
          <button
            onClick={() => setSyncMode('connect')}
            className={`px-4 py-2 rounded-l-lg transition-colors ${
              syncMode === 'connect'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {t('connect')}
          </button>
          <button
            onClick={() => setSyncMode('devices')}
            className={`px-4 py-2 rounded-r-lg transition-colors ${
              syncMode === 'devices'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {t('devices')}
          </button>
        </div>
      </div>
      
      {syncMode === 'connect' ? (
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
            <Cloud className="w-10 h-10 text-blue-300" />
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-2">{t('syncDevices')}</h3>
          <p className="text-gray-300 max-w-md mx-auto mb-8">{t('syncDescription')}</p>
          
          <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
            <div className="bg-gray-700/30 rounded-lg p-6 border border-gray-700">
              <h4 className="font-semibold text-white mb-4">{t('syncReceive')}</h4>
              {isScanning ? (
                <div className="text-center">
                  <div className="w-full max-w-xs mx-auto bg-white p-4 rounded-lg">
                    <div className="camera-simulator bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
                      <div className="w-48 h-48 border-2 border-blue-500 relative">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500"></div>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-px w-full bg-red-500 opacity-70 animate-scanning-line"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsScanning(false)}
                    className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    {t('cancel')}
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleStartScan}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  {t('scanQrCode')}
                </button>
              )}
            </div>
            
            <div className="bg-gray-700/30 rounded-lg p-6 border border-gray-700">
              <h4 className="font-semibold text-white mb-4">{t('syncSend')}</h4>
              <div className="bg-white p-4 rounded-lg">
                <QRCode
                  size={180}
                  value={generateQRCode()}
                  className="mx-auto"
                />
              </div>
              <p className="text-sm text-gray-400 mt-3">
                {t('scanWithPhone')}
              </p>
            </div>
          </div>
          
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            {t('syncSecurityNote')}
          </p>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">{t('connectedDevices')}</h3>
            <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <RefreshCw className="w-4 h-4 mr-1" />
              {t('syncNow')}
            </button>
          </div>
          
          {devices.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-700/50 mx-auto flex items-center justify-center">
                <CloudOff className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-300">{t('noDevicesConnected')}</h3>
              <p className="mt-2 text-gray-400">{t('connectDevice')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {devices.map((device) => (
                <div 
                  key={device.id} 
                  className={`bg-gray-700/30 rounded-lg p-4 border ${
                    device.isActive ? 'border-gray-700' : 'border-gray-800'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        device.isActive ? 'bg-blue-500/20' : 'bg-gray-700'
                      }`}>
                        {getDeviceIcon(device.type)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className={`font-medium ${device.isActive ? 'text-white' : 'text-gray-500'}`}>
                            {device.name}
                          </h3>
                          {device.isActive && (
                            <CheckCircle2 className="w-4 h-4 text-green-400 ml-2" />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs ${device.isActive ? 'text-gray-400' : 'text-gray-500'}`}>
                            {t('lastSync')}: {device.lastSync}
                          </span>
                          {device.isActive ? (
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                              {t('online')}
                            </span>
                          ) : (
                            <span className="text-xs bg-gray-600/30 text-gray-500 px-2 py-0.5 rounded-full">
                              {t('offline')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
                      {t('disconnect')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <h4 className="font-medium text-white mb-2">{t('syncStatus')}</h4>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-gray-300">{t('lastSyncComplete')}: 10 Apr 2025, 13:45</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};