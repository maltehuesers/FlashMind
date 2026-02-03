# 📱 FlashMind – Flashcard App

FlashMind ist eine moderne, mobile Lern-App für Android, entwickelt mit **React**, **TypeScript** und **Capacitor**. Sie kombiniert die Geschwindigkeit einer Web-App mit der Power nativer Mobilfunktionen.


## ✨ Features

* **📚 Flashcard Management:** Erstellen, Bearbeiten und Organisieren von Lernsets.
* **💾 Offline First:** Lokale Speicherung direkt auf dem Gerät (Device Storage).
* **🌐 Cloud Sync:** Optionale Synchronisation mit einem Backend.
* **📤 Community Content:** Öffentliche Sets suchen und herunterladen.
* **📱 Native Android:** Voll funktionsfähige Android-App dank Capacitor.


## 🛠 Tech Stack

| Bereich | Technologie |
| :--- | :--- |
| **Frontend** | React, TypeScript, Vite |
| **Styling** | Tailwind CSS |
| **Mobile Bridge** | Capacitor |
| **Backend** (optional) | Node.js, Express, SQL |


## 🔐 Environment Variables

Um die Sicherheit zu gewährleisten, sind API-URLs und Keys nicht im Quellcode enthalten.

### Einrichtung
1. Erstelle eine `.env` Datei im Projekt-Root.
2. Nutze die folgende Struktur (siehe auch `.env.example`):

```env
VITE_API_URL=[https://deine-backend-url.de](https://deine-backend-url.de)
VITE_API_NAME=FlashMind-API
```

> [!CAUTION]
> **Sicherheitshinweis:** Committe niemals die `.env` Datei! 
> 
> Alle Variablen müssen zwingend mit **`VITE_`** präfixiert sein, damit sie von Vite erkannt und über `import.meta.env` geladen werden können.

## 🚀 Erste Schritte
1. Installation
```Bash
npm install
```
2. Entwicklung (Browser)
```Bash
npm run dev
```
3. Build & Android Deployment
```Bash
# Web-Assets bauen
npm run build

# Synchronisation mit Android-Projekt
npx cap sync

# Android Studio öffnen
npx cap open android
```

## 📂 Projektstruktur
```Plaintext
.
├── android/                 # Natives Android-Studio Projekt
├── src/                     # React + TypeScript Quellcode
│   ├── components/          # UI-Komponenten
│   │   └── FlashCard.tsx
│   ├── services/            # Logik & Datenzugriff
│   │   ├── api.ts           # Backend-Kommunikation
│   │   └── storage.ts       # Lokale Speicherung
│   ├── types/               # TypeScript Definitionen
│   │   └── index.ts
│   ├── App.tsx              # Hauptkomponente
│   ├── config.ts            # Zentrale App- & Env-Konfiguration
│   ├── index.css            # Globales CSS
│   ├── index.tsx            # React Entry Point
│   ├── styles.css           # Zusätzliche Styles
│   └── vite-env.d.ts  
├── .env.example             # Env-Beispiel Datei
├── capacitor.config.json    # Capacitor Konfiguration
├── index.html               # Einstiegsseite
├── metadata.json            # App-Metadaten
├── package.json             # Abhängigkeiten & Skripte
├── package-lock.json        # Lockfile
├── postcss.config.js        # PostCSS Konfiguration
├── tailwind.config.js       # Tailwind CSS Konfiguration
└── vite.config.ts           # Vite Konfiguration
```

## 📝 Lizenz
Dieses Projekt ist für private Lernzwecke gedacht.