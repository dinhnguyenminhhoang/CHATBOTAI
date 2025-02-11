const { openai } = require("../config/openai-config.js");
const User = require("../models/User.js");
const generateChatCompletion = async (req, res, next) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    }

    // Tạo đối tượng chat của user
    const userMessage = { content: message, role: "user" };
    user.chats.push(userMessage);

    // Gửi request đến OpenAI
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    });

    // Đảm bảo response có nội dung hợp lệ
    const botReply =
      chatResponse.choices[0].message?.content || "Xin lỗi, tôi không hiểu.";

    // Push phản hồi từ bot vào `user.chats` dưới dạng object
    user.chats.push({ content: botReply, role: "assistant" });

    // Lưu vào database
    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const sendChatsToUser = async (req, res, next) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

const deleteChats = async (req, res, next) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
module.exports = {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
};
