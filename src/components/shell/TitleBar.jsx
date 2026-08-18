import { useState, useRef, useEffect } from "react";
import { repoName } from "../../data/portfolioData";
import { Search, X, Minus } from "lucide-react";
import { useIDE } from "../../contexts/IDEContext";

const CLOSE_MESSAGES = [
  "Nice try! You can't close a portfolio 😏",
  "I'm staying open forever! 😈",
  "Error 404: Exit button disabled 🚫",
  "No escaping the portfolio matrix 💊",
  "Denied! 🛑"
];

const MINIMIZE_MESSAGES = [
  "My code is too good to be minimized ✨",
  "Where do you think you're going? 🤨",
  "Please don't shrink me! 🥺",
  "I prefer to take up all the space 💅"
];

export default function TitleBar() {
  const { toggleCommandPalette } = useIDE();
  const [msg, setMsg] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const showMessage = (msgList) => {
    const randomMsg = msgList[Math.floor(Math.random() * msgList.length)];
    setMsg(randomMsg);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setMsg(""), 4000);
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
        <button className="titlebar__dot titlebar__dot--red" onClick={() => showMessage(CLOSE_MESSAGES)} title="Close">
          <X size={8} strokeWidth={3} />
        </button>
        <button 
          className={`titlebar__dot ${isFullscreen ? 'titlebar__dot--disabled' : 'titlebar__dot--yellow'}`} 
          onClick={!isFullscreen ? () => showMessage(MINIMIZE_MESSAGES) : undefined} 
          title="Minimize"
          disabled={isFullscreen}
        >
          {!isFullscreen && <Minus size={8} strokeWidth={3} />}
        </button>
        <button className="titlebar__dot titlebar__dot--green" onClick={toggleFullscreen} title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
          {isFullscreen ? (
            <svg width="8" height="8" viewBox="0 0 12 12" fill="currentColor">
              <path d="M1 11L5 7v4H1z" />
              <path d="M11 1L7 5V1h4z" />
            </svg>
          ) : (
            <svg width="8" height="8" viewBox="0 0 12 12" fill="currentColor">
              <path fillRule="evenodd" d="M1 1h10v10H1V1zm2 2v6l6-6H3z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        {msg && (
          <span 
            style={{ 
              position: "absolute", 
              left: "64px", 
              whiteSpace: "nowrap",
              fontSize: "10.5px", 
              color: "var(--text-muted)", 
              opacity: 0.8,
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
