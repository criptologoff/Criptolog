import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-slate-800">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <h3 className="text-lg font-medium text-slate-200">{question}</h3>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-slate-400 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Come funziona la crittografia quantistica?",
      answer: "La crittografia quantistica sfrutta i principi della meccanica quantistica per garantire una comunicazione sicura. Utilizza le proprietà quantistiche delle particelle per rilevare qualsiasi tentativo di intercettazione, rendendo la comunicazione teoricamente inviolabile."
    },
    {
      question: "Quali sono i vantaggi rispetto alla crittografia tradizionale?",
      answer: "La crittografia quantistica offre una sicurezza basata sulle leggi della fisica invece che sulla complessità matematica. È immune agli attacchi di forza bruta e resiste anche ai computer quantistici, garantendo una sicurezza a lungo termine."
    },
    {
      question: "Come posso iniziare a utilizzare questi strumenti?",
      answer: "Puoi iniziare esplorando i nostri strumenti di simulazione e crittografia. Ogni strumento è accompagnato da guide dettagliate e tutorial. Per progetti più complessi, offriamo anche consulenza e supporto personalizzato."
    },
    {
      question: "È possibile integrare questi strumenti nei sistemi esistenti?",
      answer: "Sì, i nostri strumenti sono progettati per essere facilmente integrabili con i sistemi esistenti. Offriamo API e documentazione completa per facilitare l'integrazione, oltre a supporto tecnico per assistere nel processo."
    },
    {
      question: "Quali sono i requisiti di sistema?",
      answer: "I nostri strumenti sono ottimizzati per funzionare su browser moderni e richiedono una connessione internet stabile. Per le simulazioni quantistiche più complesse, raccomandiamo un processore recente e almeno 8GB di RAM."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Domande Frequenti
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Trova le risposte alle domande più comuni sui nostri strumenti di crittografia e simulazione quantistica
          </p>
        </div>

        <div className="space-y-1">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-4">
            Non hai trovato la risposta che cercavi?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            Contattaci
          </a>
        </div>
      </div>
    </section>
  );
};