// script.js

// 定義 displayWelcomeMessage 函數
function displayWelcomeMessage(username, loginCount, visitorCount) {
    document.getElementById('welcome').innerText = `${username}你好，您已登入本網站 ${loginCount} 次。`;
    document.getElementById('visitor-count').innerText = `來訪人次: ${visitorCount}`;

    // 更新使用者名稱
    document.getElementById('username-display').innerHTML = `${username} 您好`;

    // 從伺服器獲取真實的登入次數和訪客人次
    fetch('/api/visitor-data')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('login-count').innerHTML = `您已登入本網站 ${data.loginCount} 次`;
        document.getElementById('visitor-count').innerHTML = `來訪人次: ${data.visitorCount}`;
    })
    .catch(error => {
        console.error('Error fetching visitor data:', error);
    });
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
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username })
    })
    .then(response => response.json())
    .then(data => {
        // 登入成功後，進行重定向到 main.html
        window.location.href = 'https://movingmoney.vercel.app/main.html';  // 修改為完整網址
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
