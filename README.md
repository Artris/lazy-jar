# lazy-jar

an slack app for scheduling remote stand-ups and track participation

## commands

### definitions

* `name` is a unique identifier for a stand-up
* `when` identifies when and how often an event should happen such as "everyday at 6pm", or "every workday at 4:30pm"
* `time range` identifies a period of time such as "1 week", or "3 days"

### slash commands

* `/lj schedule [name] with [list of @hacker] [when]`
  Schedule a new stand-up with a group of hackers
  * e.g. "schedule artris with @dtoki, and @alireza everyday at 6am"
  * When there is a confilict, the hacker will not be added to the new stand-up and a warning will be displayed
* `/lj add [me or list of @hacker] to [name]`
  Add hackers to an existing stand-up
  * e.g. "add @dtoki, and @alireza to artris"
  * When there is a confilict, the hacker will not be added to the new stand-up and a warning will be displayed
* `/lj remove [me or a list @hacker] from [name]`
  Remove hackers from an existing stand-up
  * e.g. "remove me from artris"
* `/lj move [name] to [when]`
  Reschedule a stand-up
  * e.g. "move artris to 7am"
* `/lj terminate [name]`
  Terminate a stand-up
  * e.g. "terminate artris"
* `lj halt [name]`
  Nofity the bot when the team is on a break
  * e.g. "halt artris"
* `lj resume [name]`
  Nofity the bot when you want to restart the stand-ups
  * e.g. "resume artris"
* `/lj status`
  Display info about the active stand-ups and member participation
* `/lj [I or @hacker] will skip [name] [time range]`
  Notify the bot before taking a break
  * At least 8h before the stand-up
  * e.g. "I will skip artris for 2 weeks"
* `/lj start notifying [username] for [name]`
  Notify the bot that the hacker will start attending a stand-up again after a 'stop' or 'skip' command has been sent
  * e.g. "start notifying @grace for artris"
* `/lj stop notifying [username] for [name]`
  The hacker is on a break and will not be counted as part of a stand-up until the 'start' command is sent

  * e.g. "stop notifying @grace for artris"

## how does it work?

A slash command goes through the following steps

1.  **Pasring**: transforms a textual command into an action (JSON representation) that is easily consumed by the other modules in the system
2.  **Action**: validates an action and transform its properties to create an action
3.  **Reducer**: given the current state for a team and a valid action, returns the next state

## Database

```json
{
  "secrets": [
    {
      "team_id": "XXXXXXXXXX",
      "access_token": "xoxp-XXXXXXXX-XXXXXXXX-XXXXX",
      "bot": {
        "bot_user_id": "UTTTTTTTTTTR",
        "bot_access_token": "xoxb-XXXXXXXXXXXX-TTTTTTTTTTTTTT"
      }
    }
  ],
  "states": [
    {
      "team_id": "XXXXXXXXXX",
      "event_id": "artris",
      "time_to_respond": "1800",
      "members": [
        {
          "user_id": "XXXXXXXXXX",
          "user_im_id": "XXXXXXXXXX",
          "ignore": false,
          "skip_until":
            "the date for the next invocation of the meeting for the user"
        }
      ],
      "frequency": "WEEKDAYS",
      "time": {
        "hh": 6,
        "mm": 30,
        "zone": "UTC"
      },
      "halted": false
    }
  ],
  "logs": [
    {
      "team_id": "XXXXXXXXXX",
      "event_id": "XXXXXXXXXX",
      "user_id": "XXXXXXXXXX",
      "date": "Invocation date of the evnet",
      "action": "Participated"
    },
    {
      "team_id": "XXXXXXXXXX",
      "event_id": "XXXXXXXXXX",
      "user_id": "XXXXXXXXXX",
      "date": "Invocation date of the evnet",
      "action": "Notified"
    }
  ],
  "last_notification": {
    "team_id": "XXXXXXXXXX",
    "event_id": "XXXXXXXXXX",
    "user_id": "XXXXXXXXXX",
    "date": "",
    "action": "Participated"
  }
}
```
