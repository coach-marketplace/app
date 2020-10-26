/**
 * This is a description of the MyClass constructor function.
 * The logic is following this video:
 * https://www.youtube.com/watch?v=SdIYREbBSoo
 */
class Month {
  constructor(year, month) {
    /**
     * https://weeknumber.net/how-to/javascript
     * @return {number} Number of week
     */
    // eslint-disable-next-line no-extend-native
    Date.prototype.getWeek = function () {
      var date = new Date(this.getTime())
      date.setHours(0, 0, 0, 0)
      // Thursday in current week decides the year.
      date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
      // January 4 is always in week 1.
      var week1 = new Date(date.getFullYear(), 0, 4)
      // Adjust to Thursday in week 1 and count number of weeks from date to week1.
      return (
        1 +
        Math.round(
          ((date.getTime() - week1.getTime()) / 86400000 -
            3 +
            ((week1.getDay() + 6) % 7)) /
            7,
        )
      )
    }

    this.year = year || new Date().getFullYear()
    this.month = month || new Date().getMonth()
  }

  /**
   * Get a new cloned date
   * @param {date} dateToClone The date to clone
   * @return {date} The cloned date
   */
  cloneDate(dateToClone) {
    return new Date(dateToClone.getTime())
  }

  /**
   * Get list of days for the current month
   * @return {[object]} List of month day
   */
  getDays() {
    const days = []
    const firstDayOfMonth = new Date(this.year, this.month)
    /**
     * We first get the day from the previous month
     * We want to set the first day as monday so we do `- 1`
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
     */
    let dayOfWeek = firstDayOfMonth.getDay() - 1
    dayOfWeek === -1 && (dayOfWeek = 6)

    if (dayOfWeek > 0) {
      for (let i = dayOfWeek; i; i--) {
        const day = this.cloneDate(firstDayOfMonth)
        day.setDate(i * -1 + 1)
        days.push(day)
      }
    }

    /**
     * We get days from the current month
     */
    const lastDayOfMonth = this.cloneDate(firstDayOfMonth)
    // add one month
    lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1)
    // remove one day
    lastDayOfMonth.setDate(0)
    for (let i = 0; i < lastDayOfMonth.getDate(); ++i) {
      const day = this.cloneDate(firstDayOfMonth)
      day.setDate(i + 1)
      days.push(day)
    }

    /**
     * We get days from next month
     */
    dayOfWeek = lastDayOfMonth.getDay() - 1
    dayOfWeek === -1 && (dayOfWeek = 6)
    if (dayOfWeek < 6) {
      for (let i = 0; i < 6 - dayOfWeek; i++) {
        const day = this.cloneDate(lastDayOfMonth)
        day.setDate(lastDayOfMonth.getDate() + i + 1)
        days.push(day)
      }
    }

    return days
  }
}

export default Month
