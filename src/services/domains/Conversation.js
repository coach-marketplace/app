import { capitalize } from "../../helper/utils";

/**
 * Class representing a conversation
 */
export default class Conversation {
  /**
   * @param {object} conversation Conversation data object from database
   */
  constructor(conversation) {
    Object.keys(conversation).forEach((key) => {
      const formattedKey = capitalize(key.replace("_", ""));
      const methodName = `set${formattedKey}`;
      if (this[methodName]) {
        this[methodName](conversation[key]);
      }
    });
  }

  setId(value) {
    this._id = value;
  }

  getId() {
    return this._id;
  }

  setParticipants(value) {
    this.participants = value;
  }

  /**
   * The function will return all the participants from the conversation
   * except the current user base on the ID passed as argument
   *
   * @param {string} currentUserId Id of the current user
   * @return {string} A string containing all participant's names
   */
  getParticipantsNames(currentUserId) {
    if (!currentUserId) throw new Error("Current user ID is required");

    const participants = this.participants.filter(
      (participant) => participant.user._id !== currentUserId
    );

    return participants.reduce((name, participant) => {
      let fullName = "";
      if (participant.user.firstName) {
        fullName += participant.user.firstName;
      }
      if (participant.user.lastName) {
        fullName && (fullName += " ");
        fullName += participant.user.lastName;
      }
      if (!fullName) {
        return name;
      }

      return name ? name + `, ${fullName}` : fullName;
    }, "");
  }
}
