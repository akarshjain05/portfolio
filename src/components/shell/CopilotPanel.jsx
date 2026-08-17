import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send } from "lucide-react";
import { useIDE } from "../../contexts/IDEContext";
import Markdown from "react-markdown";

export default function CopilotPanel() {
  const { copilotOpen, toggleCopilot } = useIDE();
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Akarsh's AI Copilot. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (copilotOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, copilotOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg })
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Oops! I couldn't reach the server. Make sure your API key is set and Vercel is connected!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`copilot-drawer ${copilotOpen ? "copilot-drawer--open" : ""}`}>
      <div className="copilot-drawer__header">
        <div className="copilot-drawer__title">
          <Sparkles size={14} color="#b794f6" />
          <span>Copilot</span>
        </div>
        <button onClick={toggleCopilot} className="copilot-drawer__close">
          <X size={16} />
        </button>
      </div>

      <div className="copilot-drawer__messages">
        {messages.map((m, i) => (
          <div key={i} className={`copilot-msg copilot-msg--${m.role}`}>
            <Markdown>{m.content}</Markdown>
          </div>
        ))}
        {isLoading && (
          <div className="copilot-msg copilot-msg--assistant">
            <span className="copilot-loading">...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form className="copilot-drawer__input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="copilot-drawer__input"
        />
        <button type="submit" disabled={!input.trim() || isLoading} className="copilot-drawer__send">
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
