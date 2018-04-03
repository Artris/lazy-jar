module.exports = ({
    State,
    Secret,
    Notification,
    Log
}) => {
    return {
        saveSecrets,
        returnSecrets,
        saveState,
        returnEventsByTeamId,
        returnState
    }
    
    function saveSecrets({team_id, access_token, bot_user_id, bot_access_token}) {
        const data = {
            team_id,
            access_token,
            bot: {
                bot_user_id,
                bot_access_token
            }
        }
        
        return Secret.findOneAndUpdate({ team_id }, data, {
            'new': true,
            upsert: true
        })
    }

    function returnSecrets({team_id}){
        return Secret.find({ team_id });
    }
    
    function saveState(data){
        const {
            team_id,
            event_id
        } = data
        
        return State.findOneAndUpdate({
            team_id,
            event_id
            }, data, {
                'new': true,
                upsert: true
            }
        );
    }
    
    function returnEventsByTeamId(data){
        return State.find(data).then(res => res.map(data => data.event_id))
    }
    
    function returnState(data){
        return State.find(data);
    }
}