const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getArrayOfNames, getThoughts, getReaction } = require("./data");

async function main() {
  try {
    await connection.on("error", (err) => err);
    await connection.once("open", async () => {
      console.log("connected");

      // Delete existing users and thoughts
      await Promise.all([User.deleteMany({}), Thought.deleteMany({})]);

      // Create users
      const arrayOfNames = getArrayOfNames();
      const users = arrayOfNames.map((username) => ({
        username,
        email: `${username}@gmail.com`,
        thoughts: [],
        friends: [],
      }));

      // Insert users into the database
      await User.collection.insertMany(users);

      // Create thoughts
      const messages = getThoughts();
      for (let i = 0; i < messages.length; i++) {
        // Get a random user
        const user = await User.aggregate([{ $sample: { size: 1 } }])[0];

        // Create thought fields values
        const thoughtText = messages[i];

        // Create reaction fields values
        const reactions = [];
        const reactionAmt = Math.floor(Math.random() * 20) + 1;
        for (let i = 0; i < reactionAmt; i++) {
          const reactionBody = getReaction();
          const reactionUsername = await User.aggregate([
            { $match: { _id: { $ne: user._id } } },
            { $sample: { size: 1 } },
          ])[0];
          reactions.push({
            reactionBody: reactionBody,
            username: reactionUsername.username,
          });
        }

        // Insert new thought
        const thought = {
          thoughtText,
          username: user.username,
          reactions,
        };
        const newThought = await Thought.collection.insertOne(thought);

        // Update user with thought and friends
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          {
            $push: {
              thoughts: [newThought.insertedId],
              friends: [reactionUsername._id],
            },
          },
          { new: true }
        );
      }

      console.log("done");
      process.exit(0);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
