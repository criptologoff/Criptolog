import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
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
                Termini di Servizio
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
                Utilizzando i nostri servizi, accetti di essere vincolato dai seguenti termini e condizioni.
                Ti preghiamo di leggerli attentamente prima di utilizzare la piattaforma.
              </p>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">1. Utilizzo del Servizio</h3>
                <p>
                  I nostri strumenti di crittografia sono forniti "così come sono" e devono essere
                  utilizzati in conformità con tutte le leggi e i regolamenti applicabili. Non siamo
                  responsabili per l'uso improprio dei nostri servizi.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">2. Responsabilità dell'Utente</h3>
                <p>
                  L'utente è responsabile di:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>Mantenere sicure le proprie credenziali</li>
                  <li>Utilizzare il servizio in modo legale ed etico</li>
                  <li>Non tentare di compromettere la sicurezza del sistema</li>
                  <li>Non condividere contenuti illegali o dannosi</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">3. Limitazioni di Responsabilità</h3>
                <p>
                  Non siamo responsabili per:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>Perdita di dati dovuta a errori dell'utente</li>
                  <li>Interruzioni temporanee del servizio</li>
                  <li>Danni indiretti o consequenziali</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">4. Modifiche ai Termini</h3>
                <p>
                  Ci riserviamo il diritto di modificare questi termini in qualsiasi momento.
                  Le modifiche saranno effettive immediatamente dopo la pubblicazione sul sito.
                  L'uso continuato del servizio costituisce l'accettazione dei nuovi termini.
                </p>
              </section>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Accetto
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}; 