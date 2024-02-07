module.exports = {
  CreateSnap: async (
    parent,
    { data: { user_id, text } },
    { Snap, User, pubsub }
  ) => {
    try {
      const user = await User.findById(user_id);

      if (!user) {
        throw new Error("user not found");
      }

      const response = await new Snap({ user_id, text }).save();

      pubsub.publish("snap", {
        snap: response,
      });

      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
