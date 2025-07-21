/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Defines most used common methods for dates and times.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-07-21
 * @file datetime.ts
 * @version 0.0.1
 */

/**
 * @description Returns the current date as ISO format.
 * @param {number} dayCount The number of day to add.
 * @function getCurrentDate
 * @type {string}
 * @public
 * @returns {string}
 */
function getCurrentDate (dayCount: number = 0): string {
  // The current date value.
  const date: Date = new Date();
  // Adds some day(s) to the current date whether needed.
  date.setDate(date.getDate() + dayCount);
  // Sends the current date as ISO format.
  return date.toISOString().split('T')[0];
}

/**
 * @description Converts a local time into string.
 * @param {Date} time The time to parse.
 * @function parseTime
 * @type {string}
 * @public
 * @returns {string}
 */
function parseTime (time: Date): string {
  // The second value.
  let second: string = time.getSeconds().toString();
  // The minute value.
  let minute: string = time.getMinutes().toString();
  // The hour value.
  let hour: string = time.getHours().toString();
  // Corrects second.
  second = (second.length < 2 ? ('0' + second) : second);
  // Corrects minute.
  minute = (minute.length < 2 ? ('0' + minute) : minute);
  // Corrects hour.
  hour = (hour.length < 2 ? ('0' + hour) : hour);
  // Sends result.
  return (hour + "h:" + minute + "min:" + second + 's');
}

/**
 * @description Converts a local date into string.
 * @param {Date} date The date to parse.
 * @function parseDate
 * @type {string}
 * @public
 * @returns {string}
 */
function parseDate (date: Date): string {
  // The year value.
  let year: string = date.getFullYear().toString();
  // The month of year.
  let month: string = date.getMonth().toString();
  // The day of month.
  let day: string = date.getDay().toString();
  // Corrects the month.
  month = (month.length < 2 ? ('0' + month) : month);
  // Corrects the year.
  year = (year.length < 2 ? ('0' + year) : year);
  // Corrects the day.
  day = (day.length < 2 ? ('0' + day) : day);
  // Sends result.
  return (day + '/' + month + '/' + year);
}

/**
 * @description Converts a raw datetime into a readable datetime.
 * @param {string} rawDatetime The datetime to convert.
 * @function getReadableDateTime
 * @type {string}
 * @public
 * @returns {string}
 */
function getReadableDateTime (rawDatetime: string): string {
  // Whether we have a datetime.
  if (rawDatetime.length > 0) {
    // Gets the UTC schema of the provided datetime.
    let utc: string = new Date(rawDatetime).toUTCString();
    // Removes the day name.
    utc = utc.split(',')[1].trim();
    // Removes the GMT.
    utc = utc.replace(" GMT", '');
    // Gets the UTC date only.
    const utcDate: string = (
      utc.match(/^\d{1,2}\s.{3,4}\s\d{4,}/) ?? ['']
    )[0];
    // Corrects the UTC date.
    utc = utc.replace(utcDate, `${utcDate},`);
    // Formats time correctly.
    const time: string = utc.split(',')[1].trim().split(':').map(
      (digit: string, index: number): string => (
        index <= 0 ? `${digit}h` :
        (index === 1 ? `${digit}min` : `${digit}s`)
      )
    ).join(':');
    // Sends the final result of conversion.
    return `${utc.split(',')[0]}, ${time}`;
  // Otherwise.
  } else return rawDatetime;
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {
  getReadableDateTime,
	getCurrentDate,
  parseDate,
  parseTime
};
