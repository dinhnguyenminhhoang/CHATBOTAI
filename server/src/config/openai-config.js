const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET,
});
module.exports = { openai };
