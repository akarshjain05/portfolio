import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot } from "lucide-react";
import { useIDE } from "../../contexts/IDEContext";
import Markdown from "react-markdown";

export default function CopilotPanel() {
  const { copilotOpen, toggleCopilot } = useIDE();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Persist rate limit in localStorage
  const [messagesLeft, setMessagesLeft] = useState(() => {
    const saved = localStorage.getItem('copilotMessagesLeft');
    const savedDate = localStorage.getItem('copilotDate');
    const today = new Date().toDateString();
    
    if (savedDate !== today) {
      localStorage.setItem('copilotDate', today);
      localStorage.setItem('copilotMessagesLeft', '5');
      return 5;
    }
    return saved !== null ? parseInt(saved, 10) : 5;
  });

  const questionPool = [
    "What is his biggest strength?",
    "Tell me about his competitive programming stats",
    "Has he won any hackathons?",
    "Does he have any open source contributions?",
    "What is his CGPA?",
    "What is IronLog?",
    "What is the Campus Resource Sharing System?",
    "Tell me about Mini Code Judge",
    "How can I contact Akarsh?",
    "What are his favorite technologies?"
  ];

  const [currentSuggestions, setCurrentSuggestions] = useState([
    "Tell me about Akarsh?",
    "What projects has Akarsh built?",
    "What's his tech stack?"
  ]);

  useEffect(() => {
    localStorage.setItem('copilotMessagesLeft', messagesLeft.toString());
  }, [messagesLeft]);

  const scrollContainerRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    if (copilotOpen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, copilotOpen, currentSuggestions]);

  const sendMessage = async (userMsg) => {
    if (!userMsg.trim() || isLoading || messagesLeft <= 0) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
        signal: abortControllerRef.current.signal
      });

      const data = await res.json();
      
      if (!res.ok) {
        if (data.reply) {
          setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
          return;
        }
        throw new Error("Failed to fetch response");
      }

      setMessagesLeft(prev => prev - 1);
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);

      // Fisher-Yates shuffle
      const shuffled = [...questionPool];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setCurrentSuggestions(shuffled.slice(0, 3));

    } catch (err) {
      if (err.name === 'AbortError') return;
      setMessages(prev => [...prev, { role: "assistant", content: "Oops! I couldn't reach the server. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
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

      <div className="copilot-drawer__messages" ref={scrollContainerRef}>
        {messages.length === 0 ? (
          <div className="copilot-welcome">
            <div className="copilot-welcome__icon">
              <Bot size={24} color="#b794f6" />
            </div>
            <h2>Hi! I'm Akarsh's Copilot 👋</h2>
            <p>Ask me anything about his projects, skills, experience, or achievements.</p>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`copilot-msg-wrapper copilot-msg-wrapper--${m.role}`}>
              {m.role === 'assistant' && (
                <div className="copilot-msg-header">
                  <div className="copilot-msg-header__icon">
                    <Bot size={12} color="#b794f6" />
                  </div>
                  <span>Akarsh's Copilot</span>
                </div>
              )}
              <div className={`copilot-msg copilot-msg--${m.role}`}>
                <Markdown>{m.content}</Markdown>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="copilot-msg-wrapper copilot-msg-wrapper--assistant">
            <div className="copilot-msg-header">
              <div className="copilot-msg-header__icon">
                <Bot size={12} color="#b794f6" />
              </div>
              <span>Akarsh's Copilot</span>
            </div>
            <div className="copilot-msg copilot-msg--assistant">
              <span className="copilot-loading">...</span>
            </div>
          </div>
        )}

        {/* Dynamic Suggestions (only show if not loading and messages left) */}
        {!isLoading && messagesLeft > 0 && (
          <div className="copilot-suggestions">
            {currentSuggestions.map(text => (
              <button key={text} className="copilot-suggestion" onClick={() => sendMessage(text)}>
                <Sparkles size={12} color="#b794f6" style={{ flex: '0 0 auto', marginTop: 2 }} />
                <span>{text}</span>
              </button>
            ))}
          </div>
        )}

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
