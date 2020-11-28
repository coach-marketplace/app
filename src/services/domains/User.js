/**
 * Class is representing a User
 */
export class User {
  _id = null
  accounts = []
  avatar = ''
  createdAt = null
  email = ''
  phone = ''
  firstName = ''
  lastName = ''
  gender = ''
  dateOfBirth = ''
  isAdmin = false
  isArchived = false
  isCoach = false
  isEmailVerified = false
  isOnline = false

  /**
   * @param {object} data User data object from database
   */
  constructor(data) {
    this._id = data._id
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.email = data.email
    this.phone = data.phone
    this.dateOfBirth = data.dateOfBirth
    this.gender = data.gender
    this.isArchived = data.isArchived
    this.isCoach = data.isCoach
    this.isAdmin = data.isAdmin
    this.isOnline = data.isOnline
    this.isEmailVerified = data.isEmailVerified
    this.createdAt = data.createdAt
    this.accounts = data.accounts
    this.setAvatar(data)
  }

  get subscriptionDate() {
    const date = new Date(this.createdAt)

    return date.toDateString()
  }

  get fullName() {
    let fullName = ''
    fullName += this.firstName ? `${this.firstName} ` : '? '
    fullName += this.lastName ? `${this.lastName} ` : '?'

    return fullName
  }

  setAvatar(data) {
    const { accounts } = data

    if (!accounts || !accounts.length) return

    const SSOAccount = accounts.find((account) => account.type !== 'local')

    if (!SSOAccount) return

    this.avatar = SSOAccount.avatar
  }
}
