const Session = require('../account/session');
const AccountTable = require('../account/table');
const {hash} = require('../account/helper');

const setSession = ({username, res, sessionId}) => {

    return new Promise((resolve, reject) => {
        let session, sessionString;
        if (sessionId) {
            sessionString = Session.sessionString({username, id: sessionId});
            setSessionCookie({sessionString, res});
            resolve({message: 'Session restored'});
        } else {
            console.log('Creating new Session Id');
            session = new Session({username});
            sessionString = session.toString();
            AccountTable.updateSessionId({
                sessionId: session.id,
                usernameHash: hash(username)
            })
                .then(() => {
                    setSessionCookie({sessionString, res});
                    resolve({message: 'Session created'});
                })
                .catch(error => reject(error));
        }
    })
}

const setSessionCookie = ({sessionString, res}) => {
    res.cookie('sessionString', sessionString, {
        expire: Date.now() + 3600000,
        httpOnly: true,
        // secure: true // Should be used for https
    });
}

const authenticatedAccount = ({sessionString}) => {
    return new Promise((resolve, reject) => {
        if (!sessionString || !Session.verify(sessionString)) {
            const error = new Error('Invalid Session');
            error.status = 400;
            return reject(error);
        } else {
            const {username, id} = Session.parse(sessionString);
            AccountTable.getAccount({usernameHash: hash(username)})
                .then(({account}) => {
                    const authenticated = account.sessionId === id;
                    resolve({account, authenticated, username});
                })
                .catch(error => reject(error));
        }
    })
}

module.exports = {setSession, authenticatedAccount};

