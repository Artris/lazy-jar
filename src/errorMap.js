const EP1000 = 'EP1000'
const EP1001 = 'EP1001'
const EA1000 = 'EA1000'
const EA1001 = 'EA1001'
const EA1002 = 'EA1002'
const EA1003 = 'EA1003'
const EA1004 = 'EA1004'
const EA1005 = 'EA1005'
const EA1006 = 'EA1006'
const EA1007 = 'EA1007'

module.exports = new Map([
    [EP1000, 'the command did not have the correct seperators. Please try again'],
    [EP1001, 'the command did not have the correct seperators. Please try again'],
    [EA1000, 'the username you specified does not exist for the team'],
    [EA1001, 'the project specified does not exist'],
    [EA1002, 'the project specified already exists'],
    [EA1003, 'please specify a date in the format hh:mm am/pm'],
    [EA1004, 'please specify a date in the format hh:mm am/pm'],
    [EA1005, 'please specify when you want the meetings to happen eg. weekdays, everyday, Saturdays ...'],
    [EA1006, 'please specify the period in days/months/years e.g ...for 2 days']
])
