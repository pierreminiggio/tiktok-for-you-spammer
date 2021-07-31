import spam from './main.js'
import fs from 'fs'

fs.readFile('./ids.json', 'utf-8', (err, data) => {
    const ids = JSON.parse(data)
    spam(
        ids.login,
        ids.password,
        async (tikTok, {comment}) => {
            await comment('Hello ' + tikTok.author + ' !')
        },
        2000,
        6000,
        null,
        true,
        (toLog) => {console.log(toLog)},
    ).then(() => console.log('Done !'))
})
