// Define an array of usernames
const usernames = [
    'tyler123',
    'sopranos23',
    'birdseed',
    'joemomma',
    'kevin7',
    'billy00',
  ];
  
  // Define an array of reactions
  const reactions = [
    "👍",
    "👎"
  ];
  
  // Define an array of thoughts
  const thoughts = [
    'The world is a butt that lives in New York'
  ];
  
  // Define a function to get an array of usernames
  function getArrayOfNames() {
    return usernames;
  }
  
  // Define a function to get an array of thoughts
  function getThoughts() {
    return thoughts;
  }
  
  // Define a function to get a random reaction
  function getReaction() {
    return reactions[Math.floor(Math.random() * reactions.length)];
  }
  
  // Export the functions for use in other modules
  module.exports = {
    getArrayOfNames,
    getThoughts,
    getReaction,
  };
  