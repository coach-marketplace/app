/**
 * Class representing a conversation
 */
export default class Conversation {
  /**
   * @param {object} conversation Conversation data object from database
   */
  constructor(conversation) {
    this._id = conversation._id
    this.participants = conversation.participants
  }

  /**
   * The function will return all the participants from the conversation
   * except the current user base on the ID passed as argument
   *
   * @param {string} currentUserId Id of the current user
   * @return {string} A string containing all participant's names
   */
  getParticipantsNames(currentUserId) {
    if (!currentUserId) throw new Error('Current user ID is required')

    const participants = this.participants.filter(
      (participant) => participant.user._id !== currentUserId,
    )

    return participants.reduce((name, participant) => {
      let fullName = ''
      if (participant.user.firstName) {
        fullName += participant.user.firstName
      }
      if (participant.user.lastName) {
        fullName && (fullName += ' ')
        fullName += participant.user.lastName
      }
      if (!fullName) {
        return name
      }

      return name ? name + `, ${fullName}` : fullName
    }, '')
  }

  /**
   * The function will return all the participants from the conversation
   * except the current user base on the ID passed as argument as an array
   *
   * @param {string} currentUserId Id of the current user
   * @return {array} An array containing all participant's names
   */
  getParticipantsNamesArray(currentUserId) {
    if (!currentUserId) throw new Error('Current user ID is required')

    const participants = this.participants.filter(
      (participant) => participant.user._id !== currentUserId,
    )

    return participants.map((participant) => {
      let fullName = ''
      if (participant.user.firstName) {
        fullName += participant.user.firstName
      }
      if (participant.user.lastName) {
        fullName && (fullName += ' ')
        fullName += participant.user.lastName
      }

      return fullName
    })
  }
}
