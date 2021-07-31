import type from '@pierreminiggio/puppeteer-text-typer'

/**
 * @param {import('puppeteer').Page} page
 * @param {string} content
 * @param {LogFunction} sendLog
 *
 * @return {Promise}
 */
export default async function comment(page, content, sendLog) {
    sendLog('Commenting ' + content)
    const commentEditorSelector = '[contenteditable="true"]'
    await page.waitForSelector(commentEditorSelector)
    await type(page, commentEditorSelector, content, 1000)

    const postButtonSelector = '.post-container.active'
    await page.click(postButtonSelector)
    sendLog('Commented !')
}
