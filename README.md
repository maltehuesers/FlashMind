# 🗂️ FlashMind Project

Willkommen beim **FlashMind** Projekt! Dies ist eine Fullstack-Anwendung zum Erstellen und Lernen von Flashcards. Das Projekt ist in zwei Hauptbereiche unterteilt: Mobile App (Frontend) und API-Service (Backend).

## 🏗️ Projektstruktur

Hier findest du die beiden Kernkomponenten des Systems. Klicke auf die Links, um zu den detaillierten Anleitungen und Setups zu gelangen:

### [📱 Frontend (Mobile App)](./frontend)
Das Frontend ist eine hybride Mobile-App für Android.
* **Tech:** React, TypeScript, Tailwind CSS, Capacitor.
* **Features:** Lokales Lernen, Offline-Modus, Sets hoch- und herunterladen.
* 👉 [**Zur Frontend-Anleitung**](./frontend/README.md)

### [⚙️ Backend (API Service)](./backend)
Der Server, der die Synchronisation und Speicherung übernimmt.
* **Tech:** Node.js, Express, MySQL.
* **Features:** REST-API, Datenbank-Anbindung, Set-Management.
* 👉 [**Zur Backend-Anleitung**](./backend/README.md)

## 🚀 Schnelleinstieg (Grobübersicht)

Um das gesamte Projekt lokal zum Laufen zu bringen, folge diesen Schritten:

1. **Repository klonen:**
   ```bash
   git clone [https://github.com/maltehuesers/flashmind.git](https://github.com/maltehuesers/flashmind.git)
   cd flashmind
   ```
2. Backend starten: Gehe in den /backend Ordner, installiere die Abhängigkeiten und konfiguriere die .env.
3. Frontend starten: Gehe in den /frontend Ordner, installiere die Abhängigkeiten und verbinde die App mit der Backend-URL.

## 🛠️ Voraussetzungen
* Node.js (v18 oder höher)
* MySQL (lokal oder via Docker)
* Android Studio (für das Mobile-Deployment)

## 📝 Lizenz
Privates Lernprojekt – Malte Huesers
