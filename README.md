# tiktok-for-you-spammer

Prérequis :
Ceux de Puppeteer : https://github.com/puppeteer/puppeteer

Installation :
```
npm install pierreminiggio/tiktok-for-you-spammer
```

Utilisation : 
```javascript
const post = require('@pierreminiggio/tiktok-for-you-spammer')
post(login, password).then(() => {
    // done
}).catch((err) => {
    console.log(err) // 'timed out' 
})
```
