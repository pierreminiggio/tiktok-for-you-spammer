export default class Comment {

    /** @type {string} author */
    author

    /** @type {string} content */
    content

    /**
     * @param {string} author
     * @param {string} content
     */
    constructor(author, content) {
        this.author = author
        this.content = content
    }
}