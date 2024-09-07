// api/index.js

const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    const filePath = path.join(__dirname, '../count.txt');
    
    if (req.method === 'POST') {
        const { username } = req.body;
        
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('服務器錯誤');
                return;
            }

            let counts = JSON.parse(data);
            counts.loginCount += 1;

            fs.writeFile(filePath, JSON.stringify(counts), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('服務器錯誤');
                    return;
                }
                res.json(counts);
            });
        });
    } else if (req.method === 'GET') {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('服務器錯誤');
                return;
            }

            const counts = JSON.parse(data);
            res.json(counts);
        });
    } else {
        res.status(405).send('方法不被允許');
    }
};
