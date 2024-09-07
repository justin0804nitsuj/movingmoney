// script.js

// 當 DOM 完全加載後執行
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    if (username) {
        fetch('/api/visitor-data')
        .then(response => response.json())
        .then(data => {
            displayWelcomeMessage(username, data.loginCount, data.visitorCount);
        })
        .catch(error => {
            console.error('Error fetching visitor data:', error);
        });
    }
});
// 定義 displayWelcomeMessage 函數
function displayWelcomeMessage(username, loginCount, visitorCount) {
    const usernameDisplayElement = document.getElementById('username-display');
    if (usernameDisplayElement) {
        usernameDisplayElement.innerText = `${username} 您好`;
    }

    const loginCountElement = document.getElementById('login-count');
    if (loginCountElement) {
        loginCountElement.innerText = `您已登入本網站 ${loginCount} 次`;
    }

    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
        visitorCountElement.innerText = `來訪人次: ${visitorCount}`;
    }
}

// 當 DOM 完全加載後執行
document.addEventListener('DOMContentLoaded', () => {
    // 如果需要其他初始化代碼，可以放在這裡
});

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
        console.log('登入次數:', data.loginCount);
        console.log('來訪人次:', data.visitorCount);

        // 重新加載 main.html 或直接在本頁面顯示
        window.location.href = 'main.html';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}