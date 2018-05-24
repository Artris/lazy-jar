const moment = require('moment');
  
function occuredWithinCurrentWeek(now, date) {
      /*TODO: add timezone*/

    const then = moment(date, "YYYYMMDD");
    return now.format("W") === then.format("W") &&
    (now.format("YY") === then.format("YY"));
}
 
function occuredWithinCurrentMonth(now, date) {
    /*TODO: add timezone*/

    const then = moment(date, "YYYYMMDD");
    return (now.format("M") === then.format("M")) &&
    (now.format("YY") === then.format("YY"));
}
 
module.exports = {
    occuredWithinCurrentWeek,
    occuredWithinCurrentMonth
}