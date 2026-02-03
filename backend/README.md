# 🚀 FlashMind Backend – Node.js API

Dies ist das Backend für die FlashMind App. Es stellt eine REST-API bereit, um Lernsets in einer MySQL-Datenbank zu speichern und zu synchronisieren.

## 🛠 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express
* **Datenbank:** MySQL 8.0+
* **Library:** `mysql2` (mit Connection Pooling)


## ⚙️ Installation & Setup

### 1. Abhängigkeiten installieren
```bash
npm install
```

### 2. Datenbank-Schema importierenStelle sicher, dass dein MySQL-Server läuft. Importiere die Tabellenstruktur mit der vorhandenen schema.sql Datei:
```Bash
mysql -u dein_nutzer -p flashcards_db < schema.sql
```
Alternativ kannst du den Inhalt der schema.sql kopieren und in einem Tool wie MySQL Workbench oder phpMyAdmin ausführen.

### 3. Umgebungsvariablen (.env)
Erstelle eine .env Datei im Root-Verzeichnis des Backends:
```Code-Snippet
PORT=12345
DB_HOST=localhost
DB_USER=dein_nutzer
DB_PASSWORD=dein_passwort
DB_NAME=flashcards_db
```

## 📡 API Endpunkte
| Methode | Pfad | Beschreibung |
| :--- | :--- | :--- |
| **GET** | `/sets` | Ruft alle Sets ab (inkl. verschachtelter Karten-Objekte). |
| **POST** | `/sets` | Speichert ein Set. Bestehende IDs werden überschrieben (Sync-Logic). |
| **DELETE** | `/sets/:id` | Löscht ein Set und alle zugehörigen Karten permanent. |

## 📂 Projektstruktur (Backend)
```Plaintext.
├── schema.sql        # MySQL Datenbank-Schema
├── server.js          # Hauptanwendung (Express Logic)
├── .env               # Private Konfiguration (nicht committen!)
├── .env.example       # Vorlage für Umgebungsvariablen
├── package.json       # Node.js Abhängigkeiten
└── .gitignore         # Schließt node_modules und .env aus
```

## 🚀 Server starten

```Bash
# Startet den Server auf dem konfigurierten Port (Standard: 12345)
node server.js
```

> [!TIP]
> Während der Entwicklung kannst du nodemon verwenden, damit der Server bei Änderungen automatisch neu startet: npx nodemon server.js.