const user = require('./user');
const snap = require('./snap');

const Subscriptions = {
    ...snap,
    ...user,
}

module.exports = Subscriptions;