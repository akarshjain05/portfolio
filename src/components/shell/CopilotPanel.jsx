import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot } from "lucide-react";
import { useIDE } from "../../contexts/IDEContext";
import Markdown from "react-markdown";

export default function CopilotPanel() {
  const { copilotOpen, toggleCopilot } = useIDE();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messagesLeft, setMessagesLeft] = useState(1);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (copilotOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, copilotOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || messagesLeft <= 0) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);
    setMessagesLeft(prev => prev - 1);

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
        {messages.length === 0 ? (
          <div className="copilot-welcome">
            <div className="copilot-welcome__icon">
              <Bot size={24} color="#b794f6" />
            </div>
            <h2>Hi! I'm Akarsh's Copilot 👋</h2>
            <p>Ask me anything about his projects, skills, experience, or achievements.</p>
            <div className="copilot-suggestions">
              {[
                "Tell me about Akarsh?",
                "What projects has Akarsh built?",
                "Tell me about his work experience",
                "What's his tech stack?",
                "How can I contact Akarsh?",
                "How can I support Akarsh?"
              ].map(text => (
                <button key={text} className="copilot-suggestion" onClick={() => setInput(text)}>
                  <Sparkles size={12} color="#b794f6" style={{ flex: '0 0 auto', marginTop: 2 }} />
                  <span>{text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`copilot-msg copilot-msg--${m.role}`}>
              <Markdown>{m.content}</Markdown>
            </div>
          ))
        )}
        {isLoading && (
          <div className="copilot-msg copilot-msg--assistant">
            <span className="copilot-loading">...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="copilot-drawer__footer">
        <form className="copilot-drawer__input-wrapper" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ask about Akarsh's projects, experience, ..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="copilot-drawer__input"
            disabled={messagesLeft <= 0}
          />
          <div className="copilot-drawer__input-bottom">
            <span className="copilot-limit">{messagesLeft} msg left</span>
            <button type="submit" disabled={!input.trim() || isLoading || messagesLeft <= 0} className="copilot-drawer__send">
              <Send size={14} />
            </button>
          </div>
        </form>
        <div className="copilot-disclaimer">
          AI can make mistakes · Contact Akarsh directly for important info
        </div>
      </div>
    </div>
  );
}
