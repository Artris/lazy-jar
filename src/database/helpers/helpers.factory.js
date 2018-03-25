module.exports = ({ State, Secret, Notification, Log }) => {
    const getState = (data) => State.find(data);
    
    
    return {
        saveSecrets: ({team_id, access_token, bot_user_id, bot_access_token}) => {
            const data   = {
                team_id,
                access_token,
                bot: {
                    bot_user_id,
                    bot_access_token
                }
            }
            return new Promise((resolve, reject) => {
                data.forEach((item) => {
                    if(!item) reject('Invalid object passed in');
                });
                Secret.findOneAndUpdate({team_id}, data, {upsert: true}, (err, doc) => {
                    if (err) {reject(err)};
                    resolve(doc);
                })
            });
        },
        returnSecrets: ({team_id}) => { 
            return Secret.find({team_id});  
        },
        saveState: ({team_id, event_id}, data) => {
             return new Promise((resolve, reject) => { 
                State.findOneAndUpdate({team_id, event_id}, data, {upsert: true}, (err, doc) => {
                    if (err) {reject(err)};
                    resolve(doc);
                });
            });
        },
        returnEventsByTeamId: (data) => {
            return new Promise((resolve, reject) => {
                getState(data).then(result => { 
                    resolve(result.map(data => data.event_id));
                })
                .catch(e => {
                 reject(e);
             });
            });
        }
     }
}