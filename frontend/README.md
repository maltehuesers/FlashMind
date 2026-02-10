# 📱 FlashMind – Frontend (Mobile App)

Dieser Ordner enthält den Quellcode der FlashMind Mobilanwendung. Dank **Capacitor** läuft diese Web-App nativ auf Android und bietet ein flüssiges Benutzererlebnis mit 60 FPS Animationen.

## 🚀 Features & Architektur

Wir setzen auf eine modulare Architektur, um Wartbarkeit und Geschwindigkeit zu garantieren:

* **Zentrales State-Management:** Über Custom Hooks (`useSets.ts`) wird der Datenfluss gesteuert.
* **Design-System:** Ein zentrales Theme-System (`pageStyles.ts`) sorgt für ein einheitliches UI.
* **Swipe & Flip:** Intuitive Gestensteuerung via Framer Motion.
* **Offline-Modus:** Daten werden primär im `LocalStorage` verwaltet.

## 📂 Verzeichnis-Struktur

```Plaintext
src/
├── assets/          # App-Logo & Grafiken
├── components/      # UI-Bausteine (FlashCard.tsx & Layout-Elemente)
├── hooks/           # useSets.ts – Zentrale Logik für Sets
├── pages/           # Home, Study, Edit, Discover
├── services/        # api.ts (Backend-Anbindung) & storage.ts (lokale Daten)
├── utils/           # pageStyles.ts (Design-System) & id.ts
└── types/           # TypeScript Interfaces
```

## ⚙️ Konfiguration
Die App benötigt eine Verbindung zum FlashMind-Backend.
Erstelle eine .env Datei:

```Code-Snippet
VITE_API_URL=http://localhost:3000
VITE_API_NAME=FlashMind-Local
```

## 🛠 Entwicklung & Build
```Bash
npm install     # Abhängigkeiten installieren
npm run dev     # Browser-Vorschau starten
npm run build   # Für Produktion optimieren
npx cap sync    # Assets nach Android kopieren
```

Zurück zum [Hauptprojekt](../README.md)