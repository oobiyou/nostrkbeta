if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/nostrkbeta/sw.js', { scope: '/nostrkbeta/' })})}