// script.js

// 登入並更新登入次數
function login() {
    const username = document.getElementById('username').value;

    if (username === "") {
        alert("請輸入使用者名稱");
        return;
    }

    // 存儲用戶名到 localStorage
    localStorage.setItem('username', username);

    // 發送登入請求
    fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    })
    .then(response => response.json())
    .then(data => {
        if (data.loginCount !== undefined && data.visitorCount !== undefined) {
            console.log('登入次數:', data.loginCount);
            console.log('來訪人次:', data.visitorCount);

            // 保存登录数据到 localStorage 供 main.html 使用
            localStorage.setItem('loginCount', data.loginCount);
            localStorage.setItem('visitorCount', data.visitorCount);

            // 重新導向到 main.html
            window.location.href = 'main.html';
        } else {
            console.error('API 返回的數據格式不正確');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// 顯示歡迎訊息和數據
function displayWelcomeMessage() {
    const username = localStorage.getItem('username');
    const loginCount = localStorage.getItem('loginCount');
    const visitorCount = localStorage.getItem('visitorCount');

    if (username && loginCount && visitorCount) {
        document.getElementById('username-display').innerText = `${username} 您好`;
        document.getElementById('login-count').innerText = `您已登入本網站 ${loginCount} 次`;
        document.getElementById('visitor-count').innerText = `來訪人次: ${visitorCount}`;
    } else {
        // 如果 localStorage 中沒有數據，顯示錯誤或提示信息
        console.error('無法從 localStorage 獲取數據');
    }
}

// 當 DOM 完全加載後執行
document.addEventListener('DOMContentLoaded', () => {
    // 如果是在 main.html 上，顯示用戶資訊
    if (window.location.pathname === '/main.html') {
        displayWelcomeMessage();
    }
});
