import { useState } from "react";
import { repoName } from "../../data/portfolioData";
import { Search } from "lucide-react";
import { useIDE } from "../../contexts/IDEContext";

const FUNNY_MESSAGES = [
  "Nice try! You can't close a portfolio 😏",
  "I'm staying open forever! 😈",
  "Error 404: Exit button disabled 🚫",
  "Where do you think you're going? 🤨",
  "My code is too good to be minimized ✨",
  "No escaping the portfolio matrix 💊",
  "Are you not entertained? 🤺",
  "Denied! 🛑"
];

export default function TitleBar() {
  const { toggleCommandPalette } = useIDE();
  const [msg, setMsg] = useState("");

  const handleBlock = () => {
    const randomMsg = FUNNY_MESSAGES[Math.floor(Math.random() * FUNNY_MESSAGES.length)];
    setMsg(randomMsg);
    setTimeout(() => setMsg(""), 3000);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="titlebar">
      <div className="titlebar__dots" style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <button className="titlebar__dot titlebar__dot--red" onClick={handleBlock} title="Close" />
        <button className="titlebar__dot titlebar__dot--yellow" onClick={handleBlock} title="Minimize" />
        <button className="titlebar__dot titlebar__dot--green" onClick={toggleFullscreen} title="Maximize" />
        {msg && (
          <span 
            style={{ 
              position: "absolute", 
              left: "45px", 
              whiteSpace: "nowrap",
              fontSize: "12px", 
              color: "var(--text-secondary)", 
              animation: "fadein 0.2s ease" 
            }}
          >
            {msg}
          </span>
        )}
      </div>
      <div className="titlebar__search-container" onClick={toggleCommandPalette}>
        <Search size={13} />
        <span>{repoName} :portfolio</span>
        <span className="titlebar__kbd">
          <kbd>Ctrl</kbd>
          <kbd>P</kbd>
        </span>
      </div>
      <div className="titlebar__spacer" />
    </div>
  );
}
