async function login() {
    const username = document.getElementById('username').value;
    if (username) {
        try {
            // 向伺服器發送登入請求
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });
            const data = await response.json();

            // 導向到 main.html 並傳遞使用者名稱
            window.location.href = `main.html?username=${encodeURIComponent(username)}`;
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        alert("請輸入姓名");
    }
}

async function displayWelcomeMessage() {
    const username = getParameterByName('username');
    if (username) {
        // 獲取使用者登入次數
        const response = await fetch('/totalvisited');
        const data = await response.json();

        document.getElementById('welcome-message').textContent = `已成功登入 名稱為 ${username}`;
        document.getElementById('login-count').textContent = `這是您第 ${data.userLoginCount || 0} 次登入`;
        document.getElementById('total-visited').textContent = `總來訪人次：${data.totalVisited}`;
    } else {
        document.getElementById('welcome-message').textContent = `未提供姓名`;
    }
}
