import Comment from './Entity/Comment.js';
import TikTok from './Entity/TikTok.js';
import SocialStats from './Entity/SocialStats.js';
import scroll from '@pierreminiggio/puppeteer-page-scroller'

const commentCountSelector = '[title="comment"]'

/**
 * @param {import('puppeteer').Page} page
 * @param {string} tikTokLink
 * @param {number} commentScrollLength
 * @param {LogFunction} sendLog
 *
 * @return {Promise<TikTok>}
 */
export default async function getTikTokStatsAndComments(
    page,
    tikTokLink,
    commentScrollLength,
    sendLog
) {
    sendLog('Navigating to ' + tikTokLink + '...')
    await page.goto(tikTokLink)

    const author = await getElementText(page, '.author-uniqueId')
    sendLog('Author: ' + author)

    const caption = await getElementText(page, '.tt-video-meta-caption')
    sendLog('Caption: ' + caption)
    const stats = await getTikTokStats(page)
    sendLog('Stats: ' + JSON.stringify(stats))

    await page.evaluate(commentCountSelector => {
        document.querySelector(commentCountSelector).parentNode.click()
    }, commentCountSelector)

    const comments = await getTikTokComments(page, commentScrollLength)
    sendLog('Comments: ' + JSON.stringify(comments.map(comment => comment.content)))

    return new TikTok(tikTokLink, author, caption, stats, comments)
}

/**
 *
 * @param {import('puppeteer').Page} page
 *
 * @return {Promise<SocialStats>}
 */
async function getTikTokStats(page) {
    const likeCount = parseInt(await getElementText(page, '[title="like"]'))
    const commentCount = parseInt(await getElementText(page, commentCountSelector))
    const shareCount = parseInt(await getElementText(page, '[title="share"]')) ?? 0

    return new SocialStats(likeCount, commentCount, shareCount)
}

/**
 *
 * @param {import('puppeteer').Page} page
 * @param {number} commentScrollLength
 *
 * @return {Promise<Comment[]>}
 */
async function getTikTokComments(page, commentScrollLength) {
    /** @type {Comment[]} */
    const comments = [];
    const commentContainerSelector = '.comment-container'
    await scroll(page, commentScrollLength, commentContainerSelector)
    const commentElements = await page.$$(commentContainerSelector + ' .comment-item')

    for (const commentElementIndex in commentElements) {
        const commentElement = commentElements[commentElementIndex]
        const content = await commentElement.evaluate(
            commentElement => commentElement.querySelector('.comment-text>span')?.innerText
        )
        const author = await commentElement.evaluate(
            commentElement => commentElement
                .querySelector('a.user-avatar')
                .href.substr('https://www.tiktok.com/@'.length)
                .split('?')[0]
        )

        comments.push(new Comment(author, content))
    }

    return comments
}

/**
 *
 * @param {import('puppeteer').Page} page
 * @param {string} selector
 *
 * @return {Promise<string>}
 */
async function getElementText(page, selector) {
    await page.waitForSelector(selector)
    return await page.evaluate(selector => {
        return document.querySelector(selector).innerText
    }, selector)
}
