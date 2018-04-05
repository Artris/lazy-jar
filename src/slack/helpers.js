module.exports = ({ config, fetch, winston, url }) => {
    const {
        slack_im_list,
        slack_user_list,
        slack_message_channel
    } = config;
    async function createUsernameToIdMap(team_token) {
        let params = {
            token: team_token,
            scope: 'bot'
        }
        let urlRequest = url.format({
            pathname: slack_user_list,
            query: params
        });
        //Get list of users and return map of userName => userId
        try {
            const response = await fetch(urlRequest);
            const jsonResp = await response.json();
            return new Map(jsonResp.members.map(item => ['@' + item.name, item.id]));

        }
        catch (e) {
            winston.error(`An error occured while fetching user.list from slack: ${e}`);
            throw e;
        }
    }

    async function createUserIdToImId(team_token) {
        let params = {
            token: team_token,
            scope: 'bot'
        }
        let urlRequest = url.format({
            pathname: slack_im_list,
            query: params
        });
        //Get list of users and return map of userId => userIm Id
        try {
            const response = await fetch(urlRequest);
            const jsonResp = await response.json();
            return new Map(jsonResp.ims.map(item => [item.user, item.id]));
        }
        catch (e) {
            winston.error(`An error occured while fetching im.list from slack: ${e}`);
            throw e;
        }
    }

    async function sendDirectMessage(imId, team_token, message) {
        let params = {
            token: team_token,
            scope: 'bot',
            channel: imId,
            text: message
        }
        let urlRequest = url.format({
            pathname: slack_message_channel,
            query: params
        });
        try {
            const response = await fetch(urlRequest, {
                method: 'POST'
            })
            const jsonResp = await response.json();
            console.log(jsonResp);
        }
        catch (e) {
            winston.error(`An error occured while posting a message to the user chat.postMessage : ${e}`);
            throw e;
        }
    }

    async function notifyUsers(team_token, activeMembers, eventName, eventUrl) {
        const message = "Construct some message";
        return Promise.all(activeMembers.map(member => sendDirectMessage(member.user_im_id, team_token, message)));
    }

    return {
        notifyUsers,
        createUserIdToImId,
        createUsernameToIdMap
    }
}
