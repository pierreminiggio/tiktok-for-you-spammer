import spam from './main.js'
import fs from 'fs'

fs.readFile('./ids.json', 'utf-8', (err, data) => {
    const ids = JSON.parse(data)
    spam(
        ids.login,
        ids.password,
        2000,
        6000,
        async (tikTok, {comment}) => {
            console.log('TikTok :')
            console.log(tikTok)
            await comment('Test comment ! :D')
        },
        null,
        true,
        (toLog) => {console.log(toLog)},
    ).then(() => console.log('Done !'))
})
