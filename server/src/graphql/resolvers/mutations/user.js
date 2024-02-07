const bcrypt = require("bcrypt");
const token = require("../../../utils/token");

module.exports = {
  CreateUser: async (
    parent,
    { data: { username, password } },
    { User, pubsub }
  ) => {
    const user = await User.findOne({ username });

    if (user) {
      throw new Error("user already exists");
    }

    const newUser = await new User({ username, password }).save();

    pubsub.publish("user", {
      user: newUser,
    });

    return { token: token.generate(newUser, "168h") };
  },
  SignIn: async (parent, { data: { username, password } }, { User }) => {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("user not found");
    }

    const hash = await bcrypt.compare(password, user.password);

    if (!hash) {
      throw new Error("password is wrong");
    }

    return { token: token.generate(user, "168h") };
  },
};
