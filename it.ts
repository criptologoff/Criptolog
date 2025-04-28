export default {
  nav: {
    home: 'Home',
    features: 'Funzionalità',
    tools: 'Strumenti',
    faq: 'FAQ',
    contact: 'Contattaci'
  },
  modals: {
    contact: {
      title: 'Contattaci',
      description: 'Hai una domanda o un feedback? Ci piacerebbe sentirti!',
      form: {
        name: 'Nome e Cognome',
        email: 'Indirizzo Email',
        subject: 'Oggetto',
        message: 'Il tuo messaggio',
        submit: 'Invia Messaggio',
        sending: 'Invio in corso...',
        cancel: 'Annulla',
        success: 'Grazie per il tuo messaggio! Ti risponderemo al più presto.',
        error: 'Si è verificato un errore durante l\'invio del messaggio. Riprova più tardi.'
      }
    },
    privacy: {
      title: 'Informativa sulla Privacy',
      sections: [
        {
          title: 'Informazioni che Raccogliamo',
          content: 'Raccogliamo le informazioni che ci fornisci direttamente quando utilizzi i nostri servizi.',
          items: [
            'Nome e informazioni di contatto',
            'Dati di utilizzo e preferenze',
            'Informazioni sul dispositivo e browser'
          ]
        },
        {
          title: 'Come Utilizziamo le tue Informazioni',
          content: 'Utilizziamo le informazioni raccolte per fornire e migliorare i nostri servizi.',
          items: [
            'Per fornire e mantenere i nostri servizi',
            'Per informarti sulle modifiche ai nostri servizi',
            'Per fornire assistenza clienti'
          ]
        },
        {
          title: 'Sicurezza dei Dati',
          content: 'Implementiamo misure di sicurezza appropriate per proteggere le tue informazioni personali.'
        }
      ]
    },
    terms: {
      title: 'Termini di Servizio',
      sections: [
        {
          title: 'Accettazione dei Termini',
          content: 'Accedendo e utilizzando i nostri servizi, accetti e ti impegni a rispettare questi Termini.'
        },
        {
          title: 'Responsabilità dell\'Utente',
          content: 'Sei responsabile della riservatezza del tuo account.',
          items: [
            'Fornire informazioni accurate',
            'Proteggere la tua password',
            'Segnalare accessi non autorizzati'
          ]
        },
        {
          title: 'Modifiche al Servizio',
          content: 'Ci riserviamo il diritto di modificare o interrompere i nostri servizi in qualsiasi momento.'
        }
      ]
    },
    cookies: {
      title: 'Politica dei Cookie',
      sections: [
        {
          title: 'Cosa Sono i Cookie',
          content: 'I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti il nostro sito web.'
        },
        {
          title: 'Come Utilizziamo i Cookie',
          content: 'Utilizziamo i cookie per migliorare la tua esperienza di navigazione e fornire servizi personalizzati.',
          items: [
            'Cookie essenziali per la funzionalità del sito',
            'Cookie analitici per comprendere l\'utilizzo',
            'Cookie di preferenza per ricordare le tue impostazioni'
          ]
        },
        {
          title: 'Gestione dei Cookie',
          content: 'Puoi controllare e/o eliminare i cookie come desideri attraverso le impostazioni del tuo browser.'
        }
      ]
    }
  }
}; 