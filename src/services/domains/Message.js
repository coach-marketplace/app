/**
 * Class representing a Message
 */
export default class Message {
  _id = null
  conversationId = null
  userId = null
  text = null
  isArchived = null
  createdAt = null

  /**
   * @param {object} messageData Message data object from database
   */
  constructor(messageData) {
    this.setId(messageData._id)
    this.setConversationId(messageData.conversation._id)
    this.setUserId(messageData.user._id)
    this.setText(messageData.text)
    this.setIsArchived(messageData.isArchived)
    this.setCreatedAt(messageData.createdAt)
  }

  setId(value) {
    this._id = value
  }

  getId() {
    return this._id
  }

  setConversationId(value) {
    this.conversationId = value
  }

  getConversationId() {
    return this.conversationId
  }

  setUserId(value) {
    this.userId = value
  }

  getUserId() {
    return this.userId
  }

  setText(value) {
    this.text = value
  }

  getText() {
    return this.text
  }

  setIsArchived(value) {
    this.isArchived = value
  }

  getIsArchived() {
    return this.isArchived
  }

  setCreatedAt(value) {
    this.createdAt = value
  }

  getCreatedAt() {
    return this.createdAt
  }
}
