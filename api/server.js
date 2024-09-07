const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/login', (req, res) => {  // 修改為 /api/login
    const { username } = req.body;
    res.json({
        loginCount: 5,
        visitorCount: 100
    });
});

app.get('/api/visitor-data', (req, res) => {  // 修改為 /api/visitor-data
    const filePath = path.join(__dirname, 'count.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('伺服器錯誤');
            return;
        }
        const counts = JSON.parse(data);
        res.json({
            loginCount: counts.loginCount,
            visitorCount: counts.visitorCount
        });
    });
});

app.listen(port, () => {
    console.log(`伺服器在 http://localhost:${port} 運行`);
});