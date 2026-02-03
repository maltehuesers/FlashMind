const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Datenbank-Pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

db.query('SELECT 1', (err) => {
    if (err) console.error('DB Verbindungsfehler:', err);
    else console.log('MySQL Pool bereit!');
});

// 2. GET: Sets laden
app.get('/sets', (req, res) => {
    db.query("SELECT * FROM sets", (err, sets) => {
        if (err) return res.status(500).json(err);
        db.query("SELECT * FROM cards", (err, cards) => {
            if (err) return res.status(500).json(err);
            const results = sets.map(s => ({
                ...s,
                cards: cards.filter(c => c.set_id === s.id)
            }));
            res.json(results);
        });
    });
});

// 3. POST: Upload (Sicher und mit Logs)
app.post('/sets', (req, res) => {
    const { id, title, description, createdAt, cards } = req.body;
    console.log(`>>> Upload-Start: ${title} (${id})`);

    const sqlSet = "REPLACE INTO sets (id, title, description, createdAt) VALUES (?, ?, ?, ?)";

    db.query(sqlSet, [id, title, description, createdAt], (err) => {
        if (err) {
            console.error("!!! Fehler bei sets Table:", err.message);
            return res.status(500).json(err);
        }
        console.log(">>> Set-Basisdaten gespeichert.");

        if (cards && cards.length > 0) {
            db.query("DELETE FROM cards WHERE set_id = ?", [id], (delErr) => {
                if (delErr) {
                    console.error("!!! Fehler bei DELETE cards:", delErr.message);
                    return res.status(500).json(delErr);
                }
                console.log(`>>> ${cards.length} alte Karten gelöscht.`);

                const cardValues = cards.map(c => [id, c.question, c.answer]);
                const sqlCards = "INSERT INTO cards (set_id, question, answer) VALUES ?";

                db.query(sqlCards, [cardValues], (insErr) => {
                    if (insErr) {
                        console.error("!!! Fehler bei INSERT cards:", insErr.message);
                        return res.status(500).json(insErr);
                    }
                    console.log(">>> Erfolg: Alle Karten gespeichert.");
                    res.sendStatus(200);
                });
            });
        } else {
            console.log(">>> Erfolg: Set ohne Karten gespeichert.");
            res.sendStatus(200);
        }
    });
});

// 4. DELETE: Löschen
app.delete('/sets/:id', (req, res) => {
    db.query("DELETE FROM sets WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.sendStatus(200);
    });
});

// 5. Start
const PORT = process.env.PORT || 12345;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});

process.on('SIGINT', () => {
    db.end();
    process.exit();
});