# lazy-jar
an slack app for scheduling remote stand-ups and track participation 

## commands
`name` is a unique identifier for a stand-up

- `/lj schedule [name] with [list of @hacker] [when]`
Schedule a new stand-up with a group of hackers
  - When there is a confilict, the hacker will not be added to the new stand-up and a warning will be displayed
- `/lj add [me or @hacker] to [name]`
Add a new hacker to an existing stand-up
  - When there is a confilict, the hacker will not be added to the new stand-up and a warning will be displayed
- `/lj remove [me or @hacker] from [name]`
Remove a hacker from an existing stand-up
- `/lj move [name] to [when]`
Reschedule a stand-up
- `/lj terminate [name]`
Terminate a stand-up
- `lj halt [name] [when or a time range]`
Nofity the bot when the team is on a break
- `/lj status`
Display info about the active stand-up and how much each person owe
- `/lj [I or @hacker] will skip [name] [time range]`
Notify the bot before taking a break
  - At least 8h before the stand-up
- `/lj [I or @hacker] paid [me or @hacker] [$total]` Notify the bot when you have made a payment
  - You can't pay yourself
  - A confirmation message will be sent to the recepient
