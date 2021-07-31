export default class TikTokFunction extends Function {

    /** @type {TikTok} */
    tikTok

    /**
     * @typedef {Object} CommentAPI
     * @property {string} content
     */

    /**
     * @typedef {Object} TikTokAPI
     * @property {CommentAPI} comment
     */

    /** @type {TikTokAPI} */
    api
}
