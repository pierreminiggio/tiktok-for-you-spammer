import login from '@pierreminiggio/tiktok-login'
import scroll from '@pierreminiggio/puppeteer-page-scroller'

/**
 * @typedef {Function} LogFunction
 * @property {string} toLog
 */

/**
 * @param {string} facebookLogin
 * @param {string} facebookPassword
 * @param {number} scrollLength
 * @param {boolean} show
 * @param {LogFunction} sendLog
 * @param {string|null} proxy
 * 
 * @returns {Promise<>}
 */
export default function post(
    facebookLogin,
    facebookPassword,
    scrollLength,
    show = false,
    sendLog = (toLog) => {},
    proxy = null
) {
    return new Promise(async (resolve, rejects) => {

        let page
        try {
            page = await login(
                facebookLogin,
                facebookPassword,
                show,
                sendLog,
                proxy
            )
        } catch (loginError) {
            rejects(loginError)

            return
        }

        const browser = page.browser()

        await scroll(page, scrollLength)

        const tikTokLinks = await page.evaluate(() => {

            const tikTokLinks = []
            const tikTokUrl = 'https://www.tiktok.com/'

            document.querySelectorAll('a').forEach(linkElement => {
                const href = linkElement.href

                if (! href.startsWith(tikTokUrl)) {
                    return
                }
                const splitUrl = href.substring(tikTokUrl.length).split('/')

                if (splitUrl.length < 3) {
                    return
                }

                const path1 = splitUrl[0]
                if (path1.substring(0, 1) !== '@') {
                    return
                }

                if (splitUrl[1] !== 'video') {
                    return
                }

                const path3 = splitUrl[2]
                tikTokLinks.push('https://www.tiktok.com/' + path1 + '/video/' + path3)
            })

            return tikTokLinks
        })

        console.log(tikTokLinks)

        resolve()
    })
}
