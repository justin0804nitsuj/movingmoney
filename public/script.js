// script.js

// 當 DOM 完全加載後執行
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username') || '訪客'; // 假設你使用 localStorage 存儲用戶名

    // 更新使用者名稱
    document.getElementById('username-display').innerHTML = `${username} 您好`;

    // 從伺服器獲取真實的登入次數和訪客人次
    fetch('/visitor-data')
        .then(response => response.json())
        .then(data => {
            // 更新登入次數和訪客人次
            document.getElementById('login-count').innerHTML = `您已登入本網站 ${data.loginCount} 次`;
            document.getElementById('visitor-count').innerHTML = `來訪人次: ${data.visitorCount}`;
        })
        .catch(error => {
            console.error('Error fetching visitor data:', error);
        });
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
              // 登入成功後，進行重定向
              window.location.href = '/main.html';
          })
          .catch(error => {
              console.error('Error:', error);
          });
      }