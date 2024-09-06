// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/login', (req, res) => {
    const { username } = req.body;
    // 在這裡可以處理登入邏輯，比如記錄登入次數
    res.json({
        loginCount: 5,  // 模擬的登入次數
        visitorCount: 100  // 模擬的來訪人次
    });
});

app.get('/visitor-data', (req, res) => {
    fs.readFile('count.txt', 'utf8', (err, data) => {
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
