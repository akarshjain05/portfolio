import { useState, useRef, useEffect } from "react";
import { useIDE } from "../../contexts/IDEContext";
import { X, Terminal } from "lucide-react";

export default function TerminalPanel() {
  const { terminalOpen, toggleTerminal } = useIDE();
  const [history, setHistory] = useState([
    { type: "info", text: "Welcome to Akarsh's Terminal Shell v1.0.0" },
    { type: "info", text: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    if (terminalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [terminalOpen]);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  useEffect(() => {
    const handleClear = () => setHistory([]);
    window.addEventListener('clear-terminal', handleClear);
    return () => window.removeEventListener('clear-terminal', handleClear);
  }, []);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, { type: "cmd", text: `$ ${trimmed}` }]);

    const args = trimmed.toLowerCase().split(" ");
    const command = args[0];

    setTimeout(() => {
      let output = "";
      switch (command) {
        case "help":
          output = "Available commands: help, clear, whoami, date, echo, ls";
          break;
        case "clear":
          setHistory([]);
          return;
        case "whoami":
          output = "guest_user";
          break;
        case "date":
          output = new Date().toString();
          break;
        case "echo":
          output = args.slice(1).join(" ");
          break;
        case "ls":
          output = "about.html  contact.css  home.tsx  projects.js  readme.md  skills.json";
          break;
        default:
          output = `bash: ${command}: command not found`;
      }
      setHistory((prev) => [...prev, { type: "out", text: output }]);
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  if (!terminalOpen) return null;

  return (
    <div className="terminal-panel">
      <div className="terminal-panel__header">
        <div className="terminal-panel__title">
          <Terminal size={14} /> TERMINAL
        </div>
        <div className="terminal-panel__actions">
          <X size={16} onClick={toggleTerminal} style={{ cursor: "pointer" }} />
        </div>
      </div>
      <div className="terminal-panel__content" onClick={() => inputRef.current?.focus()}>
        {history.map((line, i) => (
          <div key={i} className={`term-line term-line--${line.type}`}>
            {line.text}
          </div>
        ))}
        <div className="term-input-row">
          <span className="term-prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            className="term-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
}
