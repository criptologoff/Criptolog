import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl rounded-xl bg-secondary-900 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-transparent">
                Privacy Policy
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4 text-gray-300">
              <p>
                La tua privacy è importante per noi. Questa Privacy Policy spiega come raccogliamo,
                utilizziamo e proteggiamo i tuoi dati personali quando utilizzi i nostri servizi.
              </p>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">Raccolta dei Dati</h3>
                <p>
                  Raccogliamo solo i dati necessari per fornire i nostri servizi di crittografia
                  e garantire la sicurezza delle tue informazioni. Non memorizziamo alcun dato
                  crittografato sui nostri server.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">Utilizzo dei Dati</h3>
                <p>
                  I dati raccolti vengono utilizzati esclusivamente per:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>Fornire i servizi di crittografia richiesti</li>
                  <li>Migliorare le prestazioni e la sicurezza</li>
                  <li>Comunicare aggiornamenti importanti</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">Protezione dei Dati</h3>
                <p>
                  Implementiamo misure di sicurezza all'avanguardia per proteggere i tuoi dati,
                  inclusa la crittografia end-to-end e l'autenticazione a due fattori dove
                  applicabile.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">I Tuoi Diritti</h3>
                <p>
                  Hai il diritto di:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>Accedere ai tuoi dati personali</li>
                  <li>Richiedere la correzione di dati inaccurati</li>
                  <li>Richiedere la cancellazione dei tuoi dati</li>
                  <li>Opporti al trattamento dei tuoi dati</li>
                </ul>
              </section>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Ho capito
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}; 