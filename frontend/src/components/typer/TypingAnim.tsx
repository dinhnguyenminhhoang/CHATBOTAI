import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        "Trò chuyện với AI của riêng bạn",
        1000,
        "Xây dựng với OpenAI 🤖",
        2000,
        "ChatGPT tuỳ chỉnh theo ý bạn 💻",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "60px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
