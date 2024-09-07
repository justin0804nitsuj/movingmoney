// api/login.js

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username } = req.body;
        // 在這裡處理登入邏輯，例如記錄登入次數
        res.status(200).json({
            loginCount: 5,  // 模擬的登入次數
            visitorCount: 100  // 模擬的來訪人次
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}