const user = require('./user');
const snap = require('./snap');

const Mutation = {
    ...user,
    ...snap,
}

module.exports = Mutation;