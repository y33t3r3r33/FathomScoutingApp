const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors())

// Serve static files (HTML, JS, CSS) from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Connect to SQLite DB
const db = new sqlite3.Database('scouting.db');

// API endpoint to save scouting data
app.post('/api/scouting', (req, res) => {
    const {
        teamNumber, matchNumber,
        L4, L3, L2, L1, Processor, Barge, notes
    } = req.body;

    if (
        teamNumber === undefined ||
        matchNumber === undefined
    ) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }

    const stmt = db.prepare(`
        INSERT INTO scouting_entries
        (team_number, match_number, L4, L3, L2, L1, Processor, Barge, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
        teamNumber, matchNumber, L4, L3, L2, L1, Processor, Barge, notes,
        function (err) {
            if (err) {
                res.status(500).json({ error: "Database error" });
            } else {
                res.status(200).json({ message: "Saved!", id: this.lastID });
            }
        }
    );
    stmt.finalize();
});

// Optional: GET endpoint to view data (for testing)
app.get('/api/scouting', (req, res) => {
    db.all("SELECT * FROM scouting_entries ORDER BY created_at DESC", (err, rows) => {
        if (err) {
            res.status(500).json({ error: "Database error" });
        } else {
            res.json(rows);
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Scouting API running at http://localhost:${PORT}/`);
});