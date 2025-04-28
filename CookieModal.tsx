import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookieModal: React.FC<CookieModalProps> = ({ isOpen, onClose }) => {
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
                Cookie Policy
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
                Questa Cookie Policy spiega come utilizziamo i cookie e tecnologie simili
                sul nostro sito web per migliorare la tua esperienza di navigazione.
              </p>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">Cosa sono i Cookie?</h3>
                <p>
                  I cookie sono piccoli file di testo che vengono salvati sul tuo dispositivo
                  quando visiti il nostro sito. Ci aiutano a fornire funzionalità essenziali
                  e a migliorare le prestazioni del sito.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">Tipi di Cookie che Utilizziamo</h3>
                <div className="space-y-2">
                  <div>
                    <h4 className="font-medium text-white">Cookie Essenziali</h4>
                    <p className="text-sm">
                      Necessari per il funzionamento del sito e non possono essere disattivati.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Cookie di Prestazione</h4>
                    <p className="text-sm">
                      Ci aiutano a capire come gli utenti interagiscono con il sito.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Cookie di Funzionalità</h4>
                    <p className="text-sm">
                      Permettono al sito di ricordare le tue preferenze.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">Gestione dei Cookie</h3>
                <p>
                  Puoi gestire le tue preferenze sui cookie attraverso le impostazioni del tuo browser.
                  Tieni presente che la disattivazione di alcuni cookie potrebbe influire sulla
                  funzionalità del sito.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">Cookie di Terze Parti</h3>
                <p>
                  Alcuni servizi di terze parti potrebbero installare i propri cookie.
                  Questi cookie sono gestiti dai rispettivi servizi e non sono sotto il
                  nostro controllo diretto.
                </p>
              </section>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Rifiuta tutti
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Accetta tutti
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}; 