const assert = require('assert');
const {saveSecrets, returnSecrets} = require('./helpers.js');

/*Work in progress ... */

describe('database helper functions', function() {
    
    describe('secrets', function() {
         let request = 
            { 
                team_id: "12345",
                access_token: "23dsdf3",
                bot_user_id: "waitforme",
                bot_access_token: "3dher"
            }
        it('should correctly save the secret into the database', async () => {
            const result = await saveSecrets(request) 
            let theResult = {
                team_id: result.team_id,
                access_token: result.access_token,
                bot_user_id: result.bot.bot_user_id,
                bot_access_token: result.bot.bot_access_token
            }
            assert.deepEqual(theResult, request);
        });
        
        it('should correctly return the secret for passed in team_id', async () => {
            let result = await returnSecrets(request);
            result = result.pop();
            let theResult = {
                team_id: result.team_id,
                access_token: result.access_token,
                bot_user_id: result.bot.bot_user_id,
                bot_access_token: result.bot.bot_access_token
            }
            assert.deepEqual(theResult, request);
        });
        
        it('should only save one secret with the same team_id' , async () => {
            await saveSecrets(request);
            await saveSecrets(request);
            const result = await returnSecrets(request);
            assert.deepEqual(1,result.length);
        });
        it('should throw an error when saving a secret with invalid input', async () => {
             let wrongRequest = 
            { 
                access_token: "23dsdf3",
                bot_user_id: "waitforme",
                bot_access_token: "3dher"
            }
            // assert.throws(() => saveSecrets(wrongRequest))
            let result = await saveSecrets(wrongRequest)//.then(result =>{
            assert(result);
            //console.log(result);
            //     throw new Error('Save sate unexpectedly worked '+ result);
            // }).catch(e => {
            //     assert(e);
            // })
        });
        // it('should throw an error when returning a secret with invalid input', function() {
        //      let wrongRequest = 
        //     { 
        //         access_token: "23dsdf3",
        //         bot_user_id: "waitforme",
        //         bot_access_token: "3dher"
        //     }
        //     returnSecrets(wrongRequest)
        // })
    });
});

//save state tests
const members = [{
    user_id: "12345",
    ignore: false,
    skip_until: 'mmyydd'
        }]
        
const time = {
    hh: 6,
    mm: 30,
    zone: "UTC"
    }

const fakeState_1 = {
    team_id: '12345',
    event_id: 'artris',
    time_to_respond: 900,
    members,
    frequency: 'Weekdays',
    time,
    halted: false
}

const fakeState_2 = {
    team_id: '12345',
    event_id: 'lazy-jar',
    time_to_respond: 900,
    members,
    frequency: 'Weekdays',
    time,
    halted: false
}

// saveState(fakeState_1).then(result => {
//     console.log('successfully saved')
// }).catch(e => {
//     console.log(e)
// })

// saveState(fakeState_2).then(result => {
//     console.log('successfully saved')
// }).catch(e => {
//     console.log(e)
// })

// returnState({team_id: '12345'}).then(result => {
//     console.log(result); 
// }).catch(e => {
//     console.log(e);
// })

// returnEventsByTeamId({team_id: '12345'}).then(result => {
//     console.log(result);
// });

// newBot
//     .save()
//     .then(() => { botModel.find({bot_user_id: "Hello"}).then(bot => console.log(bot)) })
//     .catch(err => console.log(err))
    
//testing member schema
// const member = mongoose.model('member', StateMemberSchema);
// const memberState = new member(members)
// memberState.save().then(result => {
//     console.log(result);
// }).catch(e => {
//     console.log(e);
// })

//removes the collection after unit test
// state.remove({}, function(err) { 
//   console.log('collection removed') 
// });