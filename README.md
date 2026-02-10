# 🧠 FlashMind – Die Fullstack Karteikarten-Plattform

FlashMind ist eine ganzheitliche Lernlösung, bestehend aus einer mobilen **Android-App** und einem leistungsstarken **REST-Backend**. Das Ziel ist es, Wissen effizient zu verwalten, offline zu lernen und Sets über die Cloud zu teilen.

## 🏗 Projekt-Struktur

Das Repository ist in zwei Hauptbereiche unterteilt:

* **`frontend/`**: Die mobile App (React, TypeScript, Capacitor). [Zum Frontend-Guide](./frontend/README.md)
* **`backend/`**: Die Server-Logik und Datenbankanbindung (Node.js, Express). [Zum Backend-Guide](./backend/README.md)

---

## 🌟 Kern-Konzept

FlashMind nutzt das Prinzip der **Spaced Repetition**. Während die App lokal auf dem Smartphone funktioniert (Offline-First), ermöglicht das Backend den Austausch von Lernsets innerhalb der Community.

---

## 🛠 Gesamter Tech-Stack

| Bereich | Technologien |
| :--- | :--- |
| **Mobile App** | React, Vite, Tailwind CSS, Framer Motion |
| **Native Bridge** | Capacitor (für Android Deployment) |
| **Server/API** | Node.js, Express, TypeScript |
| **Datenbank** | SQL / LocalStorage (Hybrid-Ansatz) |

---

## 🚀 Schnellstart (Gesamtprojekt)

1.  **Repository klonen:**
    ```bash
    git clone [https://github.com/maltehuesers/FlashMind.git](https://github.com/maltehuesers/FlashMind.git)
    cd FlashMind
    ```

2.  **Backend starten:**
    Folge den Anweisungen in `/backend/README.md`, um den Server und die Datenbank einzurichten.

3.  **Frontend starten:**
    Folge den Anweisungen in `/frontend/README.md`, um die App im Browser oder auf Android zu starten.

---

## 📝 Lizenz
Dieses Projekt wurde als **Lernprojekt** entwickelt, um die Integration von mobilen Frontends mit Cloud-Backends zu demonstrieren.