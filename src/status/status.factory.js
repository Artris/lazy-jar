const { stripIndent } = require('common-tags');


module.exports = (logProvider, stateProvider, logger) => {
    //Helper functions
    function activeMembers(events) {
        for(var i=0; i < event.length; i++){
            var obj = events.logs[i];
                if(obj.action == "Participated"){
                    return ({obj})
                }
            }
    }

    function activeEvents(events){
     for(var i=0; i < events.team_id.length; i++){
         var obj = events;
         if(obj.halted == true){
                return ({obj});
            }
        }
    }

    function happenedInPeriodUser(date, action, back){
        const alerts = ({
            notified:0,
            missed:0
        });
        const settingDate = new Date();
        settingDate.setDate(date);
        if( back != 'all')
        {
            const hasHappened = settingDate - back;
            while(hasHappened.getUTCDate() < settingDate.getUTCDate()){
                if(action == "Participated") { alerts.notified =+ 1;}
                else { alerts.missed =+ 1;}
            }
        }
        else
        {
            const hasHappened = settingDate - getFirstEvent();
            while(hasHappened.getUTCDate < settingDate.getUTCDate()){
                if(action == "Participated") { alerts.notified =+ 1;}
                else { alerts.missed =+ 1;}
            }
        }
        return alerts;
    }
    function happenedInPeriodEvent(date, events, back){
        const alerts = {};

        const settingDate = new Date();
        settingDate.setDate(date);
        if( back != 'all')
        {
            const hasHappened = settingDate - back;
            while(hasHappened.getUTCDate() < settingDate.getUTCDate()){
                alert =+ 1;
            }
        }
        else
        {
            const hasHappened = settingDate - getFirstEvent();
            while(hasHappened.getUTCDate < settingDate.getUTCDate()){
                alert =+ 1;
            }
        }
        return alerts;
    }

    //Returns user status overall
    function userLevelStatus(logs, events) {
        const userStatus = new Map(activeMembers(events).map(user_id => ([user_id, {
            lastWeek: {notified: 0, missed: 0},
            lastMonth: {notified: 0, missed: 0},
            all: {notified: 0, missed: 0}
        }])))

        logs.filter(({user_id}) => userStatus.has(user_id)).forEach(({user_id, date, action}) => {
            const wasInLastWeek = happenedInPeriodUser(date, action, 7);
            const wasInLastMonth = happenedInPeriodUser(date, action, 30);
            const wasInAll = happenedInPeriodUser(date, action, 'all'); 
            const prevStatus = userStatus.get(user_id);

            const nextStatus = ({
                lastWeek: wasInLastWeek,
                lastMonth: wasInLastMonth,
                all: wasInAll,
            })
            userStatus.set(user_id, nextStatus);
        });

        return userStatus;
    }

    // Returns the event status overall
    function eventLevelStatus(logs, events) {
        const eventStatus = new Map(activeEvents(events).map(event_id => {[event_id, {
            lastWeek: 0, 
            lastMonth: 0, 
            all: 0
        }]}))

        logs.filter(({event_id}) => eventStatus.has(event_id)).forEach(({event_id, date}) => {
            const happendInLastWeek = happenedInPeriodEvent(date, event_id, 7);
            const happendInLastMonth = happenedInPeriodEvent(date, event_id, 30);
            const happendInAll = happenedInPeriodEvent(date, time, 'all');
            const prevStatus = status.get(event_id);
    
            const nextStatus = ({
                lastWeek: happendInLastWeek,
                lastMonth: happendInLastMonth,
                all: happendInAll, 
            })
            eventStatus.set(event_id, nextStatus);
        });

        return eventStatus;

    }
    
    // Returns sorted performance per user_id 
    function groupLevelPerfomance(logs, events) {
        const obj = ({
            bestLastWeek:'',
            bestLastMonth:'',
            bestAll:'',
        })
        const group = userLevelStatus(logs,events);
        const performanceCalculate = (id) => {
            var performance = [];
            for(var i = 0; i < group.length; i++)
            {
                var user = group[i].user_id + " performance is "
                var score = Math.ceil(100 - (((logs[i].id.missed) / (logs[i].id.notified)) * 100)) + '%';
                performance.push(user + score);
            }
            return performance;
        };

        const performanceLastWeek = performanceCalculate(lastWeek);
        const performanceLastMonth = performanceCalculate(lastMonth);
        const perfomanceAll = performanceCalculate(all);


        performanceLastWeek.sort();
        performanceLastMonth.sort();
        performanceAll.sort();

        obj.bestLastWeek = performanceLastWeek;
        obj.bestLastMonth = performanceLastMonth;
        obj.performanceAll = performanceAll;
        return obj;
    }

    //Returns users with weird behaviour in the events
    function flagedUsers(logs, events) {
        const group = userLevelStatus(logs,events);
        const flaggedUsersWeekly = [];
        const flaggedUsersMonthly = [];
        const flaggedUsersAll = []
        for(var i; i < group.length; i++)
        {
           if(group[i].lastWeek.missed >= 2)
           {
               flaggedUsersWeekly.push(group[i].user_id);
           }
           if(group[i].lastMonth.missed >= 2)
           {
               flaggedUsersMonthly.push(group[i].user_id);
           }
           if(group[i].all.missed >= 2)
           {
               flaggedUsersAll.push(group[i].user_id);
           }

        }
        return notGoodUsers;
    }

    return (team_id, time) => {
        logProvider(team_id).then(logs => {
            stateProvider(team_id).then(events => {
                const userStatus  = userLevelStatus(logs, events);
                const eventStauts = eventLevelStatus(logs, events);
                const groupPerfomanceStatus = groupLevelPerfomance(logs, events);
                const flagedUsersStatus  = flagedUsers(logs, events);
                return { 
                    user: userStatus,
                    event: eventStauts,
                    performance: groupPerfomanceStatus,
                    flag: flagedUsersStatus
                }
            })
        })
        .catch(err => {
            logger.log({
              level: 'error',
              message: stripIndent`
                failed to calculat the status for
                team_id:  ${team_id}
                time:     ${time}
                error:    ${err}
              `
            })
            throw(err);
        })
    }
}
