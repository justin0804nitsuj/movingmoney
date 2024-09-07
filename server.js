// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// 靜態檔案服務
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// 登入路由
app.post('/login', (req, res) => {
    const { username } = req.body;

    // 讀取 count.txt 來更新登入次數和來訪人次
    fs.readFile('count.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading count.txt:', err);
            res.status(500).send('伺服器錯誤');
            return;
        }

        // 解析 count.txt 的 JSON 數據
        let counts;
        try {
            counts = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).send('伺服器錯誤');
            return;
        }

        // 增加登入次數和來訪人次
        counts.loginCount = counts.loginCount + 1 || 1;
        counts.visitorCount = counts.visitorCount + 1 || 1;

        // 將更新後的數據寫回 count.txt
        fs.writeFile('count.txt', JSON.stringify(counts), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to count.txt:', writeErr);
                res.status(500).send('伺服器錯誤');
                return;
            }

            // 返回更新後的數據
            res.json({
                loginCount: counts.loginCount,
                visitorCount: counts.visitorCount
            });
        });
    });
});

// 獲取來訪人次和登入次數
app.get('/visitor-data', (req, res) => {
    fs.readFile('count.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading count.txt:', err);
            res.status(500).send('伺服器錯誤');
            return;
        }

        // 解析 count.txt 的 JSON 數據
        let counts;
        try {
            counts = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).send('伺服器錯誤');
            return;
        }

        // 返回登入次數和來訪人次
        res.json({
            loginCount: counts.loginCount,
            visitorCount: counts.visitorCount
        });
    });
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`伺服器在 http://localhost:${port} 運行`);
});