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
spam(login, password, postScrollLength, commentScrollLength, async (tikTok, comment) => {
    await comment('whatever u want')
}).then(() => {
    // done
}).catch((err) => {
    console.log(err) // 'timed out' 
})
```
