import { LOCALE } from "../../helper/constants";

/**
 * Class is representing a Workout
 */
export default class Program {
  _id = null;
  langs = [];
  content = [];
  workouts = [];
  isArchived = false;
  isPrivate = false;
  userOwner = null;
  days = 0;

  /**
   * @param {object} data Workout data object from database
   */
  constructor(data) {
    this._id = data._id;
    this.content = data.content;
    this.workouts = data.workouts;
    this.isArchived = data.isArchived;
    this.isPrivate = data.isPrivate;
    this.userOwner = data.userOwner;
    this.days = data.days;
    this.setLangs(this.content);
  }

  setLangs(contents) {
    if (!contents.length) return;

    contents.forEach((content) => {
      if (!this.langs.includes(content.lang)) {
        this.langs.push(contents.lang);
      }
    });
  }

  getTitle(lang = LOCALE.EN_US) {
    const ctt = this.content.find((content) => content.lang === lang);

    return ctt ? ctt.title : "";
  }

  getDescription(lang = LOCALE.EN_US) {
    const ctt = this.content.find((content) => content.lang === lang);

    return ctt ? ctt.description : "";
  }
}
