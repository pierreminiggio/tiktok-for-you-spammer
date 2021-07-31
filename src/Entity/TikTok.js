export default class TikTok {

    /** @type {string} */
    link

    /** @type {string} */
    author

    /** @type {string} */
    caption

    /** @type {SocialStats} */
    infos

    /** @type {Comment[]} */
    comments

    /**
     * @param {string} link
     * @param {string} author
     * @param {string} caption
     * @param {SocialStats} infos
     * @param {Comment[]} comments
     */
    constructor(link, author, caption, infos, comments) {
        this.link = link
        this.author = author
        this.caption = caption
        this.infos = infos
        this.comments = comments
    }
}
