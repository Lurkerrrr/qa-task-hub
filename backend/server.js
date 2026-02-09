const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- 1. Подключение к SQLite ---
// Файл базы данных создастся сам
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('❌ Ошибка открытия БД:', err.message);
    } else {
        console.log('✅ База данных SQLite подключена.');

        // Создаем таблицу, если её нет
        db.run(`CREATE TABLE IF NOT EXISTS bugs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            priority TEXT,
            severity TEXT,
            assignee TEXT,
            status TEXT,
            description TEXT,
            steps TEXT,
            date TEXT
        )`);
    }
});

// --- 2. API Маршруты ---

// GET: Получить все баги
app.get('/bugs', (req, res) => {
    db.all("SELECT * FROM bugs ORDER BY id DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// POST: Создать баг
app.post('/bugs', (req, res) => {
    const { title, priority, severity, assignee, status, description, steps, date } = req.body;
    const sql = `INSERT INTO bugs (title, priority, severity, assignee, status, description, steps, date) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [title, priority, severity, assignee, status, description, steps, date];

    db.run(sql, params, function (err) {
        if (err) return res.status(400).json({ error: err.message });
        // Возвращаем созданный объект (важно вернуть id!)
        res.json({
            id: this.lastID,
            title, priority, severity, assignee, status, description, steps, date
        });
    });
});

// PUT: Обновить статус
app.put('/bugs/:id', (req, res) => {
    const { status, title, priority, severity, assignee, description, steps, date } = req.body;

    // Универсальное обновление (можно обновить всё или только статус)
    const sql = `UPDATE bugs SET 
                 status = COALESCE(?, status),
                 title = COALESCE(?, title),
                 priority = COALESCE(?, priority),
                 severity = COALESCE(?, severity),
                 assignee = COALESCE(?, assignee),
                 description = COALESCE(?, description),
                 steps = COALESCE(?, steps)
                 WHERE id = ?`;

    const params = [status, title, priority, severity, assignee, description, steps, req.params.id];

    db.run(sql, params, function (err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "Updated", changes: this.changes });
    });
});

// DELETE: Удалить
app.delete('/bugs/:id', (req, res) => {
    db.run("DELETE FROM bugs WHERE id = ?", req.params.id, function (err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "Deleted", changes: this.changes });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер SQLite запущен на http://localhost:${PORT}`);
});