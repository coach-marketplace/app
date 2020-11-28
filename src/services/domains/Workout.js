import { LOCALE } from '../../helper/constants'

/**
 * Class is representing a Workout
 */
export default class Workout {
  _id = null
  langs = []
  content = []
  exercises = []
  isArchived = false
  isPrivate = false
  userOwner = null

  /**
   * @param {object} data Workout data object from database
   */
  constructor(data) {
    this._id = data._id
    this.content = data.content
    this.exercises = data.exercises
    this.isArchived = data.isArchived
    this.isPrivate = data.isPrivate
    this.userOwner = data.userOwner
    this.setLangs(this.content)
  }

  setLangs(contents) {
    if (!contents.length) return

    contents.forEach((content) => {
      if (!this.langs.includes(content.lang)) {
        this.langs.push(contents.lang)
      }
    })
  }

  getTitle(lang = LOCALE.EN_US) {
    const ctt = this.content.find((content) => content.lang === lang)

    return ctt ? ctt.title : ''
  }

  getInstructions(lang = LOCALE.EN_US) {
    const ctt = this.content.find((content) => content.lang === lang)

    return ctt ? ctt.instructions : ''
  }
}
