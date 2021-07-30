import post from './main.js'
import fs from 'fs'

fs.readFile('./ids.json', 'utf-8', (err, data) => {
    const ids = JSON.parse(data)
    post(
        ids.login,
        ids.password,
        2000,
        true,
        (toLog) => {console.log(toLog)},
        null
    ).then(() => console.log('Done !'))
})