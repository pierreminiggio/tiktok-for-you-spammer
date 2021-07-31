export default class SocialStats {

    /** @type {number} */
    likeCount

    /** @type {number} */
    commentCount

    /** @type {number} */
    shareCount

    /**
     * @param {number} likeCount
     * @param {number} commentCount
     * @param {number} shareCount
     */
    constructor(likeCount, commentCount, shareCount) {
        this.likeCount = likeCount
        this.commentCount = commentCount
        this.shareCount = shareCount
    }
}
