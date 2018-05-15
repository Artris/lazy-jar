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
const EA1008 = 'EA1008'

const errorMap = new Map([
    [EP1000, ':confused: Oops, I could not understand your command. Please make sure the command has the correct syntax.'],
    [EP1001, ':confused: Oops, I could not understand your command. Please make sure the command has the correct syntax.'],
    [EA1000, ':face_with_head_bandage: A username you specified does not exist for the team name. Make sure you spelled the username correctly or add the username to the team.'],
    [EA1001, ':boom: Oh-oh! The team you specified does not exist. Make sure you spelled the team name correctly or schedule the team first.'],
    [EA1002, ':boom: Oh-oh! There already exists a team in the database with the same team name. Try using a different team name.'],
    [EA1003, 'Oops! :face_with_head_bandage: Looks like you entered a time in the incorrect format. The correct format is : hh:mm am/pm.'],
    [EA1004, 'Oops! :face_with_head_bandage: Looks like you entered a time in the incorrect format. The correct format is : hh:mm am/pm.'],
    [EA1005, 'Oops! :face_with_head_bandage: I did not catch how often you want the meetings to happen. Please resend the command with a frequency such as Weekends, Saturdays, Everyday ...'],
    [EA1006, 'Oh-oh! :confused: I could not interpret the period. Periods are specified in days, months or years e.g ... for 2 days.'],
    [EA1007, ':confused: I could not interpret the timezone you entered. Try looking up the correct timezone for your area.'],
    [EA1008, ':boom: Oops! You never specified a timezone. Please resend the command with the timezone of your area.']
])

module.exports = {
    EP1000,
    EP1001,
    EA1000,
    EA1001,
    EA1002,
    EA1003,
    EA1004,
    EA1005,
    EA1006,
    EA1007,
    EA1008,
    errorMap
}
