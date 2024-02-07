module.exports = {
  snaps: async (parent, args, { Snap }) => {
    return await Snap.find({user_id: parent._id});
  },
};
