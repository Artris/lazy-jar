# lazy-jar

A slack app for scheduling remote stand-ups and tracking participation

## Commands

### Definitions

* `name` is a unique identifier for a stand-up
* `when` identifies when and how often an event should happen such as "everyday at 6:00 pm", or "every workday at 4:30 pm"
* `time range` identifies a period of time such as "1 week", or "3 days"
* `time zone` identifies the timezone corresponding to the `when` input

### Slash Commands

* #### Schedule a new stand-up with a group of hackers
    `/lj schedule [name] with [list of @hacker] [when] [timezone]`
  * e.g. "schedule artris with @dtoki and @alireza everyday at 6:00 am America/Vancouver"
  * When there is a conflict, the hacker will not be added to the new stand-up and a warning will be displayed
  * If a stand-up with the same name already exists, the user will get asked to provide a different name
  

* #### Add hackers to an existing stand-up
    `/lj add [me or list of @hacker] to [name]` 
  * e.g. "add @dtoki and @alireza to artris"
  * When there is a conflict, the hacker will not be added to the new stand-up and a warning will be displayed

* #### Remove hackers from an existing stand-up
    `/lj remove [me or a list of @hacker] from [name]`
  * e.g. "remove me from artris"
  * An error message will be displayed if the hacker does not belong to the specified stand-up

* #### Reschedule a stand-up
    `/lj move [name] to [when]`
  * e.g. "move artris to everyday at 7:00 am"
  * A warning will be displayed if the new schedule results in conflicts among participant hacker schedules

* #### Temporarily halt a stand-up
    `lj halt [name]`
  * e.g. "halt artris"

* #### resume a currently halted stand-up
    `lj resume [name]`
  * e.g. "resume artris"

* #### Terminate a stand-up
    `/lj terminate [name]`
  * e.g. "terminate artris"


* #### Notify an individual's timed break for a stand-up
    `/lj [I or @hacker] will skip [name] [time range]`

  * e.g. "I will skip artris for 2 weeks"
  * An error message will be displayed if the hacker is not part of the standup

* #### Stop notifying a hacker
    `/lj stop notifying [me or list of @hacker] for [name]`
  * The hacker is on a break and will not be counted as part of a stand-up until a corresponding 'start' command is sent
  * e.g. "stop notifying @grace for artris"
  * An error message will be displayed if the hacker is not part of the standup

* #### Start notifying a hacker 
    `/lj start notifying [me or list of@hacker] for [name]`
  * e.g. "start notifying @grace for artris"
  * An error message will be displayed if the hacker is not part of the standup

* #### Display info on all active stand-ups and member participation
    * `/lj status`


## How does it work?

A slash command goes through the following steps

1.  **Parsing**: transforms a textual command into an action (JSON representation) that is easily consumed by the other modules in the system
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
      "date": "Invocation date of the event",
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
comment :logs are used to track events

