import { Link, useNavigate } from "react-router-dom";
const Logo = () => {
  const navigator = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to={"/"}>
        <img
          src="openai.png"
          alt="openai"
          width={"30px"}
          height={"30px"}
          className="image-inverted"
        />
      </Link>{" "}
      <div
        style={{
          display: window.innerWidth >= 768 ? "block" : "none",
          marginRight: "auto",
          fontWeight: 800,
          textShadow: "2px 2px 20px #000",
          cursor: "pointer",
        }}
        onClick={() => navigator("/")}
      >
        <span style={{ fontSize: "20px" }}>CHAT BOT</span>-GPT
      </div>
    </div>
  );
};

export default Logo;
