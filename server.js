const express = require('express');
const path = require('path');
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
    // 模擬的登入次數和來訪人數
    res.json({
      loginCount: 5,
      visitorCount: 100
    });
  });
  
  // 處理來訪人數更新請求
  app.get('/update-visitor-count', (req, res) => {
    // 返回模擬的來訪人數
    res.json({
      visitorCount: 100
    });
  });

app.listen(port, () => {
  console.log(`伺服器在 http://localhost:${port} 運行`);
});