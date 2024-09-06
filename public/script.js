// script.js

// 登入並更新登入次數
function login() {
    const username = document.getElementById('username').value;

    if (username === "") {
        alert("請輸入使用者名稱");
        return;
    }

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
        // 將使用者名稱存儲到 localStorage
        localStorage.setItem('username', username);

        // 登入成功後，重定向到 main.html
        window.location.href = 'main.html';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
