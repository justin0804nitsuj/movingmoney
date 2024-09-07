// api/visitor-data.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'GET') {
        const filePath = path.join(process.cwd(), 'count.txt');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('伺服器錯誤');
                return;
            }
            const counts = JSON.parse(data);
            res.status(200).json({
                loginCount: counts.loginCount,
                visitorCount: counts.visitorCount
            });
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}