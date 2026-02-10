# ⚙️ FlashMind Backend – Node.js & MySQL API

Dies ist das Kraftzentrum von FlashMind. Das Backend verwaltet die persistente Speicherung deiner Lernsets in einer **MySQL-Datenbank** und stellt die REST-Schnittstelle für das Frontend bereit. 

## 🚀 Features & Architektur

Das Backend ist auf Schnelligkeit und Zuverlässigkeit ausgelegt, um eine reibungslose Synchronisation zu ermöglichen:

* **RESTful API:** Saubere Endpunkte für die Verwaltung von Sets und Karten.
* **Smart Sync:** Die `POST`-Logik erkennt bestehende IDs und ermöglicht so eine nahtlose Synchronisation zwischen Device und Cloud.
* **Relationales Design:** Dank MySQL werden Karten und Sets in einer festen Struktur verwaltet (Cascade Deletes inklusive).
* **Connection Pooling:** Effiziente Datenbankzugriffe durch optimiertes Ressourcen-Management mit `mysql2`.


## 📂 Projektstruktur (Backend)

```Plaintext
backend/
├── schema.sql        # Das "Gerüst": MySQL Tabellenstruktur
├── server.js         # Die "Schaltzentrale": Express-Server & API-Logik
├── .env              # Deine privaten Zugangsdaten (nicht committen!)
├── .env.example      # Vorlage für deine Team-Kollegen / Environment
├── package.json      # Abhängigkeiten & Scripts
└── .gitignore        # Hält node_modules und Secrets sauber
```

## ⚙️ Konfiguration
Bevor du den Server startest, richte die Umgebungsvariablen ein.Erstelle eine .env Datei im Root des Backend-Ordners:
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

## 🛠 Installation & Setup
1. **Abhängigkeiten**: `npm install`
2. **Datenbank vorbereiten**: Stelle sicher, dass MySQL läuft und importiere das Schema: ```Bash mysql -u dein_nutzer -p flashcards_db < schema.sql ```
3. **Start**: 
```bash 
node server.js
```

Zurück zum [Hauptprojekt](../README.md)