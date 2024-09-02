const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// 假設你使用一個簡單的內存儲存器來儲存登入資訊
let loginData = {
    totalVisited: 0,
    userLogins: {}
};

app.use(bodyParser.json());

// 獲取總來訪人次
app.get('/totalvisited', (req, res) => {
    res.json({ totalVisited: loginData.totalVisited });
});

// 更新使用者登入次數
app.post('/login', (req, res) => {
    const { username } = req.body;
    if (username) {
        loginData.totalVisited++;
        if (!loginData.userLogins[username]) {
            loginData.userLogins[username] = 0;
        }
        loginData.userLogins[username]++;
        res.json({ totalVisited: loginData.totalVisited, userLoginCount: loginData.userLogins[username] });
    } else {
        res.status(400).send('Username required');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
