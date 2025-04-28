// Additional translations for new features
export const additionalTranslations = {
  it: {
    // User Vault
    userVault: "Vault Personale",
    userVaultDesc: "Memorizza in sicurezza i tuoi dati cifrati",
    unlockVaultDescription: "Inserisci la password master per accedere ai tuoi dati criptati",
    masterPassword: "Password Master",
    enterMasterPassword: "Inserisci la password master",
    unlockVault: "Sblocca Vault",
    firstTimeVaultUser: "Prima volta che usi il Vault?",
    setupVault: "Configura il tuo Vault",
    secureStorage: "Archiviazione Sicura",
    savedItems: "Elementi Salvati",
    settings: "Impostazioni",
    lockVault: "Blocca Vault",
    encryptedStorageNotice: "Tutti i dati sono criptati localmente e non lasciano mai il tuo dispositivo",
    allItems: "Tutti gli Elementi",
    files: "File",
    textNotes: "Note di Testo",
    passwords: "Password",
    noSavedItems: "Nessun elemento salvato",
    startByEncrypting: "Inizia criptando un file o una password",
    vaultSettings: "Impostazioni Vault",
    changeMasterPassword: "Cambia Password Master",
    currentPassword: "Password Attuale",
    newPassword: "Nuova Password",
    confirmNewPassword: "Conferma Nuova Password",
    updatePassword: "Aggiorna Password",
    dataManagement: "Gestione Dati",
    exportVaultData: "Esporta Dati del Vault",
    exportVaultDescription: "Esporta tutti i dati in un file criptato",
    export: "Esporta",
    clearAllData: "Cancella Tutti i Dati",
    clearDataWarning: "Questa operazione non può essere annullata",
    
    // Private Notes
    "privateNotes": {
      "title": "Note Private",
      "description": "Scrivi note con crittografia end-to-end",
      "titlePlaceholder": "Titolo della nota",
      "contentPlaceholder": "Scrivi il contenuto della tua nota qui...",
      "tags": "Tag",
      "addTag": "Aggiungi un tag...",
      "encryptionNote": "Le note sono criptate end-to-end e possono essere accessibili solo da te.",
      "draftSaved": "Bozza salvata automaticamente",
      "unsaved": "Non salvato",
      "needTitle": "Inserisci un titolo per la tua nota",
      "saved": "Nota salvata con successo"
    },
    
    // Sync Client
    "syncClient": "Sincronizzazione Dispositivi",
    "syncClientDesc": "Sincronizza dati tra i tuoi dispositivi",
    "connect": "Connetti",
    "devices": "Dispositivi",
    "syncDevices": "Sincronizza i Tuoi Dispositivi",
    "syncDescription": "Sincronizza in modo sicuro i tuoi dati crittografati tra dispositivi diversi utilizzando codici QR",
    "syncReceive": "Ricevi da un altro dispositivo",
    "scanQrCode": "Scansiona Codice QR",
    "syncSend": "Invia a un altro dispositivo",
    "scanWithPhone": "Scansiona questo codice con l'app Criptolog sul tuo telefono",
    "syncSecurityNote": "Le chiavi di sincronizzazione sono protette end-to-end e mai inviate al server",
    "connectedDevices": "Dispositivi Connessi",
    "syncNow": "Sincronizza Ora",
    "noDevicesConnected": "Nessun dispositivo connesso",
    "connectDevice": "Connetti un nuovo dispositivo",
    "lastSync": "Ultima sincronizzazione",
    "online": "Online",
    "offline": "Offline",
    "disconnect": "Disconnetti",
    "syncStatus": "Stato Sincronizzazione",
    "lastSyncComplete": "Ultima sincronizzazione completata",
    
    // Security Audit
    "securityAudit": {
      "title": "Audit di Sicurezza",
      "shortDesc": "Verifica la sicurezza delle tue password",
      "description": "Analizza la tua sicurezza digitale, identifica le vulnerabilità e ottieni consigli personalizzati",
      "scanning": "Scansione in corso...",
      "scanningDescription": "Stiamo analizzando la sicurezza delle tue password",
      "startScan": "Avvia Scansione di Sicurezza",
      "startDescription": "Identifica password deboli, riutilizzate o obsolete per migliorare la tua sicurezza online",
      "scanNow": "Scansiona Ora",
      "securityScore": "Punteggio di Sicurezza",
      "lastScan": "Ultima scansione",
      "rescan": "Ripeti scansione",
      "weakPasswords": "Password Deboli",
      "weakPasswordsFound": "Alcune password sono troppo semplici o comuni",
      "noWeakPasswords": "Nessuna password debole trovata",
      "reusedPasswords": "Password Riutilizzate",
      "reusedPasswordsFound": "Alcune password sono usate su più siti",
      "noReusedPasswords": "Nessuna password riutilizzata",
      "oldPasswords": "Password Obsolete",
      "oldPasswordsFound": "Alcune password non vengono cambiate da più di 6 mesi",
      "noOldPasswords": "Tutte le password sono recenti",
      "issuesFound": "Problemi rilevati",
      "strengthen": "Rafforza",
      "change": "Cambia",
      "update": "Aggiorna",
      "lastChanged": "Ultima modifica"
    },
    
    // Auto-Delete
    "autoDelete": {
      "title": "Auto-Eliminazione",
      "description": "Imposta un periodo di tempo dopo il quale i dati crittografati verranno eliminati automaticamente",
      "1hour": "1 ora",
      "24hours": "24 ore",
      "7days": "7 giorni",
      "30days": "30 giorni",
      "never": "Mai",
      "warning": "Una volta impostata l'auto-eliminazione, i dati verranno eliminati permanentemente dopo il periodo specificato e non potranno essere recuperati."
    },
    
    // Secure Share
    "secureShare": {
      "title": "Condivisione Sicura",
      "descriptionFile": "Condividi in modo sicuro il tuo file crittografato con altri",
      "descriptionText": "Condividi in modo sicuro il tuo messaggio crittografato con altri",
      "password": "Password di Accesso",
      "passwordPlaceholder": "Password per chi riceve",
      "passwordWarning": "Condividi questa password attraverso un canale sicuro diverso",
      "expiry": "Scadenza",
      "1hour": "1 ora",
      "24hours": "24 ore",
      "3days": "3 giorni",
      "7days": "7 giorni",
      "maxDownloads": "Download massimi",
      "unlimited": "Illimitati",
      "generating": "Generazione in corso...",
      "generateLink": "Genera link di condivisione",
      "shareLink": "Link di condivisione",
      "sendByEmail": "Invia via email",
      "emailSubjectFile": "Condivisione sicura: {fileName}",
      "emailSubjectText": "Messaggio sicuro condiviso",
      "emailBody": "Ho condiviso con te un file crittografato.\n\nLink: {url}\n\nPassword: {password}\n\nIl link scadrà presto, scarica il file il prima possibile."
    },
    
    // General
    "copy": "Copia",
    "copied": "Copiato",
    "show": "Mostra",
    "hide": "Nascondi",
    "generate": "Genera",
    "edit": "Modifica",
    "delete": "Elimina",
    "update": "Aggiorna",
    "add": "Aggiungi",
    "done": "Fatto",
    "linkCopied": "Link copiato negli appunti",
    "copyFailed": "Copia negli appunti fallita",
    "advancedFeatures": "Funzionalità Avanzate",
    "advancedFeaturesDesc": "Strumenti potenti per la gestione sicura dei tuoi dati sensibili",
    "tools": {
      "title": "Strumenti di Sicurezza",
      "subtitle": "Una suite completa di strumenti per proteggere i tuoi dati con crittografia di livello militare",
      "selectTool": "Seleziona uno Strumento",
      "selectToolDescription": "Scegli uno strumento dalla barra di navigazione qui sopra per iniziare",
      "groups": {
        "encryption": "Crittografia & Decrittografia",
        "generators": "Generatori",
        "advanced": "Strumenti Avanzati"
      },
      "textEncryption": {
        "title": "Crittografia Testo",
        "description": "Cripta i tuoi messaggi sensibili",
        "encrypt": "Cripta Testo",
        "decrypt": "Decripta Testo",
        "inputEncrypt": "Testo da Crittografare",
        "inputDecrypt": "Testo da Decrittografare",
        "inputEncryptPlaceholder": "Inserisci il testo da crittografare...",
        "inputDecryptPlaceholder": "Inserisci il testo da decrittografare...",
        "password": "Password",
        "passwordPlaceholder": "Inserisci la password per la crittografia",
        "showAdvanced": "Mostra Opzioni Avanzate",
        "hideAdvanced": "Nascondi Opzioni Avanzate",
        "passwordLength": "Lunghezza Password",
        "encryptDescription": "Cripta il tuo testo con crittografia avanzata",
        "decryptDescription": "Decripta il testo precedentemente crittografato"
      },
      "fileEncryption": {
        "title": "Crittografia File",
        "description": "Proteggi i tuoi file con crittografia avanzata",
        "encrypt": "Cripta File",
        "decrypt": "Decripta File"
      },
      "generators": {
        "title": "Generatori Crittografici",
        "description": "Genera elementi crittografici sicuri",
        "hash": {
          "title": "Generatore Hash",
          "description": "Genera e verifica hash sicuri",
          "generate": "Genera Hash",
          "verify": "Verifica Hash"
        },
        "key": {
          "title": "Generatore Chiavi",
          "description": "Genera chiavi crittografiche",
          "generate": "Genera Chiave"
        },
        "password": {
          "title": "Generatore Password",
          "description": "Genera password sicure",
          "generate": "Genera Password"
        }
      },
      "chaosEncryption": {
        "title": "Crittografia Caotica",
        "description": "Protezione immagini con teoria del caos",
        "encrypt": "Cripta Immagine",
        "decrypt": "Decripta Immagine"
      },
      "quantumSimulator": {
        "title": "Simulatore Quantistico",
        "description": "Distribuzione chiavi quantistiche",
        "simulate": "Avvia Simulazione"
      },
      "hashGenerator": {
        "input": "Testo di Input",
        "inputPlaceholder": "Inserisci il testo da cui generare l'hash...",
        "algorithm": "Algoritmo Hash",
        "selectAlgorithm": "Seleziona un algoritmo",
        "generate": "Genera Hash",
        "result": "Hash Risultante"
      },
      "keyGenerator": {
        "keyType": "Tipo di Chiave",
        "selectKeyType": "Seleziona il tipo di chiave",
        "keyLength": "Lunghezza Chiave",
        "selectKeyLength": "Seleziona la lunghezza della chiave",
        "generate": "Genera Chiave",
        "result": "Chiave Generata"
      }
    },
    "chatbot": {
      "title": "Assistente Crittografico",
      "welcome": "Ciao! Sono il tuo assistente per la crittografia. Come posso aiutarti oggi?",
      "defaultResponse": "Mi dispiace, non ho capito. Potresti riformulare la tua domanda?",
      "openChat": "Apri chat con l'assistente",
      "closeChat": "Chiudi chat",
      "inputPlaceholder": "Scrivi un messaggio...",
      "send": "Invia"
    },
    "encryption": {
      "missingInputs": "Per favore inserisci sia il testo che la password",
      "success": "Operazione completata con successo",
      "processingError": "Si è verificato un errore durante l'elaborazione",
      "copied": "Copiato negli appunti",
      "copyError": "Errore durante la copia negli appunti",
      "passwordGenerated": "Nuova password generata"
    },
    "errors": {
      "fileTooLarge": "Il file è troppo grande (massimo {{size}})",
      "unsupportedFileType": "Questo tipo di file non è supportato per motivi di sicurezza",
      "encryptionFailed": "Crittografia fallita. Riprova."
    }
  },
  en: {
    // User Vault
    userVault: "Personal Vault",
    userVaultDesc: "Securely store your encrypted data",
    unlockVaultDescription: "Enter your master password to access your encrypted data",
    masterPassword: "Master Password",
    enterMasterPassword: "Enter your master password",
    unlockVault: "Unlock Vault",
    firstTimeVaultUser: "First time using the Vault?",
    setupVault: "Set up your Vault",
    secureStorage: "Secure Storage",
    savedItems: "Saved Items",
    settings: "Settings",
    lockVault: "Lock Vault",
    encryptedStorageNotice: "All data is encrypted locally and never leaves your device",
    allItems: "All Items",
    files: "Files",
    textNotes: "Text Notes",
    passwords: "Passwords",
    noSavedItems: "No saved items",
    startByEncrypting: "Start by encrypting a file or password",
    vaultSettings: "Vault Settings",
    changeMasterPassword: "Change Master Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    updatePassword: "Update Password",
    dataManagement: "Data Management",
    exportVaultData: "Export Vault Data",
    exportVaultDescription: "Export all data to an encrypted file",
    export: "Export",
    clearAllData: "Clear All Data",
    clearDataWarning: "This action cannot be undone",
    
    // Private Notes
    "privateNotes": {
      "title": "Private Notes",
      "description": "Write notes with end-to-end encryption",
      "titlePlaceholder": "Note title",
      "contentPlaceholder": "Write your note content here...",
      "tags": "Tags",
      "addTag": "Add a tag...",
      "encryptionNote": "Notes are end-to-end encrypted and can only be accessed by you.",
      "draftSaved": "Draft automatically saved",
      "unsaved": "Unsaved",
      "needTitle": "Please enter a title for your note",
      "saved": "Note saved successfully"
    },
    
    // Sync Client
    "syncClient": "Device Sync",
    "syncClientDesc": "Sync data between your devices",
    "connect": "Connect",
    "devices": "Devices",
    "syncDevices": "Sync Your Devices",
    "syncDescription": "Securely sync your encrypted data between different devices using QR codes",
    "syncReceive": "Receive from another device",
    "scanQrCode": "Scan QR Code",
    "syncSend": "Send to another device",
    "scanWithPhone": "Scan this code with the Criptolog app on your phone",
    "syncSecurityNote": "Sync keys are end-to-end protected and never sent to the server",
    "connectedDevices": "Connected Devices",
    "syncNow": "Sync Now",
    "noDevicesConnected": "No devices connected",
    "connectDevice": "Connect a new device",
    "lastSync": "Last sync",
    "online": "Online",
    "offline": "Offline",
    "disconnect": "Disconnect",
    "syncStatus": "Sync Status",
    "lastSyncComplete": "Last sync completed",
    
    // Security Audit
    "securityAudit": {
      "title": "Security Audit",
      "shortDesc": "Check your password security",
      "description": "Analyze your digital security, identify vulnerabilities, and get personalized advice",
      "scanning": "Scanning...",
      "scanningDescription": "We're analyzing the security of your passwords",
      "startScan": "Start Security Scan",
      "startDescription": "Identify weak, reused, or outdated passwords to improve your online security",
      "scanNow": "Scan Now",
      "securityScore": "Security Score",
      "lastScan": "Last scan",
      "rescan": "Rescan",
      "weakPasswords": "Weak Passwords",
      "weakPasswordsFound": "Some passwords are too simple or common",
      "noWeakPasswords": "No weak passwords found",
      "reusedPasswords": "Reused Passwords",
      "reusedPasswordsFound": "Some passwords are used across multiple sites",
      "noReusedPasswords": "No reused passwords",
      "oldPasswords": "Outdated Passwords",
      "oldPasswordsFound": "Some passwords haven't been changed in over 6 months",
      "noOldPasswords": "All passwords are recent",
      "issuesFound": "Issues Found",
      "strengthen": "Strengthen",
      "change": "Change",
      "update": "Update",
      "lastChanged": "Last changed"
    },
    
    // Auto-Delete
    "autoDelete": {
      "title": "Auto-Delete",
      "description": "Set a time period after which encrypted data will be automatically deleted",
      "1hour": "1 hour",
      "24hours": "24 hours",
      "7days": "7 days",
      "30days": "30 days",
      "never": "Never",
      "warning": "Once auto-delete is set, data will be permanently deleted after the specified period and cannot be recovered."
    },
    
    // Secure Share
    "secureShare": {
      "title": "Secure Sharing",
      "descriptionFile": "Securely share your encrypted file with others",
      "descriptionText": "Securely share your encrypted message with others",
      "password": "Access Password",
      "passwordPlaceholder": "Password for recipient",
      "passwordWarning": "Share this password through a different secure channel",
      "expiry": "Expiry",
      "1hour": "1 hour",
      "24hours": "24 hours",
      "3days": "3 days",
      "7days": "7 days",
      "maxDownloads": "Maximum downloads",
      "unlimited": "Unlimited",
      "generating": "Generating...",
      "generateLink": "Generate sharing link",
      "shareLink": "Sharing link",
      "sendByEmail": "Send by email",
      "emailSubjectFile": "Secure share: {fileName}",
      "emailSubjectText": "Secure message shared",
      "emailBody": "I've shared an encrypted file with you.\n\nLink: {url}\n\nPassword: {password}\n\nThe link will expire soon, please download the file as soon as possible."
    },
    
    // General
    "copy": "Copy",
    "copied": "Copied",
    "show": "Show",
    "hide": "Hide",
    "generate": "Generate",
    "edit": "Edit",
    "delete": "Delete",
    "update": "Update",
    "add": "Add",
    "done": "Done",
    "linkCopied": "Link copied to clipboard",
    "copyFailed": "Failed to copy to clipboard",
    "advancedFeatures": "Advanced Features",
    "advancedFeaturesDesc": "Powerful tools for secure management of your sensitive data",
    "tools": {
      "title": "Encryption Tools",
      "subtitle": "Choose the right tool for your needs",
      "selectTool": "Select a Tool",
      "selectToolDescription": "Choose a tool from the navigation bar above to get started",
      "groups": {
        "encryption": "Encryption & Decryption",
        "generators": "Generators",
        "advanced": "Advanced Tools"
      },
      "textEncryption": {
        "title": "Text Encryption",
        "description": "Encrypt your sensitive messages",
        "encrypt": "Encrypt Text",
        "decrypt": "Decrypt Text"
      },
      "fileEncryption": {
        "title": "File Encryption",
        "description": "Protect your files with advanced encryption",
        "encrypt": "Encrypt File",
        "decrypt": "Decrypt File"
      },
      "generators": {
        "title": "Cryptographic Generators",
        "description": "Generate secure cryptographic elements",
        "hash": {
          "title": "Hash Generator",
          "description": "Generate and verify secure hashes",
          "generate": "Generate Hash",
          "verify": "Verify Hash"
        },
        "key": {
          "title": "Key Generator",
          "description": "Generate cryptographic keys",
          "generate": "Generate Key"
        },
        "password": {
          "title": "Password Generator",
          "description": "Generate strong passwords",
          "generate": "Generate Password"
        }
      },
      "chaosEncryption": {
        "title": "Chaos Encryption",
        "description": "Image protection with chaos theory",
        "encrypt": "Encrypt Image",
        "decrypt": "Decrypt Image"
      },
      "quantumSimulator": {
        "title": "Quantum Simulator",
        "description": "Quantum key distribution",
        "simulate": "Start Simulation"
      },
      "hashGenerator": {
        "input": "Testo di Input",
        "inputPlaceholder": "Inserisci il testo da cui generare l'hash...",
        "algorithm": "Algoritmo Hash",
        "selectAlgorithm": "Seleziona un algoritmo",
        "generate": "Genera Hash",
        "result": "Hash Risultante"
      },
      "keyGenerator": {
        "keyType": "Tipo di Chiave",
        "selectKeyType": "Seleziona il tipo di chiave",
        "keyLength": "Lunghezza Chiave",
        "selectKeyLength": "Seleziona la lunghezza della chiave",
        "generate": "Genera Chiave",
        "result": "Chiave Generata"
      }
    },
    "chatbot": {
      "title": "Assistente Crittografico",
      "welcome": "Ciao! Sono il tuo assistente per la crittografia. Come posso aiutarti oggi?",
      "defaultResponse": "Mi dispiace, non ho capito. Potresti riformulare la tua domanda?",
      "openChat": "Apri chat con l'assistente",
      "closeChat": "Chiudi chat",
      "inputPlaceholder": "Scrivi un messaggio...",
      "send": "Invia"
    },
    "encryption": {
      "missingInputs": "Per favore inserisci sia il testo che la password",
      "success": "Operazione completata con successo",
      "processingError": "Si è verificato un errore durante l'elaborazione",
      "copied": "Copiato negli appunti",
      "copyError": "Errore durante la copia negli appunti",
      "passwordGenerated": "Nuova password generata"
    },
    "errors": {
      "fileTooLarge": "Il file è troppo grande (massimo {{size}})",
      "unsupportedFileType": "Questo tipo di file non è supportato per motivi di sicurezza",
      "encryptionFailed": "Crittografia fallita. Riprova."
    }
  }
};