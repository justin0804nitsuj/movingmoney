import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const filePath = path.join(process.cwd(), 'count.txt'); // 使用 process.cwd() 獲取專案根目錄

    if (req.method === 'POST') {
        const { username } = req.body;

        try {
            // 讀取現有數據
            const data = await fs.promises.readFile(filePath, 'utf8');
            const counts = JSON.parse(data);

            // 更新登入次數
            counts.loginCount += 1;

            // 寫回更新後的數據
            await fs.promises.writeFile(filePath, JSON.stringify(counts));

            // 返回更新後的數據
            res.status(200).json(counts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: '伺服器錯誤' });
        }
    } else {
        res.status(405).json({ message: '方法不被允許' });
    }
}
