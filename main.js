import login from '@pierreminiggio/tiktok-login'
import scroll from '@pierreminiggio/puppeteer-page-scroller'
import getTikTokInfosAndComments from './src/getTikTokInfosAndComments.js';
import comment from './src/comment.js';

/**
 * @param {string} facebookLogin
 * @param {string} facebookPassword
 * @param {number} postScrollLength
 * @param {number} commentScrollLength
 * @param {TikTokFunction} tikTokFunction
 * @param {boolean} show
 * @param {string|null} proxy
 * @param {LogFunction} sendLog
 * 
 * @returns {Promise<>}
 */
export default function spam(
    facebookLogin,
    facebookPassword,
    postScrollLength,
    commentScrollLength,
    tikTokFunction,
    proxy = null,
    show = false,
    sendLog = (toLog) => {}
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

        // Accept Cookies
        await page.evaluate(() => {
            document.querySelector('.cookie-banner button')?.click()
        })

        const browser = page.browser()

        await scroll(page, postScrollLength)

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

        for (const tikTokLinkIndex in tikTokLinks) {
            const tikTokLink = tikTokLinks[tikTokLinkIndex]
            const tikTok = await getTikTokInfosAndComments(
                page,
                tikTokLink,
                commentScrollLength,
                sendLog
            )

            await tikTokFunction(
                tikTok,
                {
                    comment: async content => await comment(page, content, sendLog)
                }
            )

            await page.waitForTimeout(3000)
        }

        resolve()
    })
}
