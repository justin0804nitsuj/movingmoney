// server.js

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// 設定靜態文件夾
app.use(express.static(path.join(__dirname, 'public')));

// 解析 JSON 請求
app.use(express.json());

// 處理根路徑，指向 index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 處理登入請求
app.post('/login', (req, res) => {
    const { username } = req.body;
    // 假設這裡會處理登入邏輯
    // 模擬的登入次數和來訪人數
    res.json({
        loginCount: 5,
        visitorCount: 100
    });
});

// 讀取 count.txt 文件來獲取人數和訪客數
app.get('/visitor-data', (req, res) => {
    fs.readFile('count.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('伺服器錯誤');
            return;
        }
        const counts = JSON.parse(data); // 假設 count.txt 中存儲的是 JSON 格式的數據
        res.json({
            loginCount: counts.loginCount,   // 真實的登入次數
            visitorCount: counts.visitorCount // 真實的訪客數
        });
    });
});

app.listen(port, () => {
    console.log(`伺服器在 http://localhost:${port} 運行`);
});
