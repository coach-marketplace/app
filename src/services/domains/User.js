const ACCEPTED_GENDER = ["male", "female", "other", "not-say"];

// WIP
// TODO: create and use that class if it's really needed

/**
 * Class is representing a User
 */
export default class User {
  _id = null;
  createdAt = null;
  email = null;
  firstName = null;
  lastName = null;
  phone = null;
  dateOfBirth = null;
  gender = null;
  isArchived = false;
  isCoach = false;
  isAdmin = false;
  isEmailVerified = false;
  isOnline = false;

  /**
   * @param {object} messageData Message data object from database
   */
  constructor(userData) {
    this.setId(userData._id);
  }

  setId(value) {
    this._id = value;
  }

  getId() {
    return this._id;
  }

  setIsArchived(value) {
    this.isArchived = value;
  }

  getIsArchived() {
    return this.isArchived;
  }

  setCreatedAt(value) {
    this.createdAt = value;
  }

  getCreatedAt() {
    return this.createdAt;
  }
}
