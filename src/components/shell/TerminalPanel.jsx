import { useState, useRef, useEffect } from "react";
import { useIDE } from "../../contexts/IDEContext";
import { X, Terminal } from "lucide-react";
import { files } from "../../data/portfolioData";

export default function TerminalPanel() {
  const { terminalOpen, toggleTerminal, openTab } = useIDE();
  const [history, setHistory] = useState([
    { type: "info", text: "Welcome to Akarsh's Terminal Shell v1.0.0" },
    { type: "info", text: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState("");
  const [pwdState, setPwdState] = useState("~/portfolio");
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

    setHistory((prev) => [...prev, { type: "cmd", text: `${pwdState} $ ${trimmed}` }]);

    const args = trimmed.split(" ").filter(Boolean);
    const command = args[0].toLowerCase();
    
    // Some commands like 'echo' need the original casing for arguments
    const originalArgs = trimmed.split(" ").slice(1);

    setTimeout(() => {
      let outputLines = [];
      switch (command) {
        case "help":
          outputLines = [
            "Available commands:",
            "ls — list files in current directory",
            "pwd — print working directory",
            "cd <dir> — change directory (cd .. to go up)",
            "cat <file> — view / open a file in the editor",
            "open <file> — same as cat",
            "whoami — who am I?",
            "echo <text> — print text",
            "date — show current date & time",
            "git log — show recent commits",
            "python — show Python version (use --version)",
            "clear — clear the terminal"
          ];
          break;
        case "clear":
          setHistory([]);
          return;
        case "whoami":
          outputLines = ["guest_user"];
          break;
        case "date":
          outputLines = [new Date().toString()];
          break;
        case "echo":
          outputLines = [originalArgs.join(" ")];
          break;
        case "pwd":
          outputLines = [pwdState];
          break;
        case "cd":
          if (!args[1]) {
            setPwdState("~");
          } else if (args[1] === "..") {
            const parts = pwdState.split("/");
            if (parts.length > 1) {
              parts.pop();
              setPwdState(parts.join("/"));
            } else if (pwdState === "~/portfolio") {
              setPwdState("~");
            }
          } else if (args[1] === "portfolio" && pwdState === "~") {
            setPwdState("~/portfolio");
          } else if (pwdState === "~/portfolio" && files.some(f => f.label === args[1])) {
             outputLines = [`bash: cd: ${args[1]}: Not a directory`];
          } else {
             outputLines = [`bash: cd: ${args[1]}: No such file or directory`];
          }
          break;
        case "ls":
          if (pwdState === "~/portfolio") {
            outputLines = [files.map(f => f.label).join("  ")];
          } else if (pwdState === "~") {
            outputLines = ["portfolio"];
          } else {
            outputLines = [""];
          }
          break;
        case "cat":
        case "open":
          if (pwdState !== "~/portfolio") {
            outputLines = [`cat: ${args[1] || ''}: No such file or directory`];
          } else if (!args[1]) {
            outputLines = [`${command}: missing file operand`];
          } else {
            // Check original casing first, fallback to lowercase match
            let targetFile = files.find(f => f.label === args[1]) || files.find(f => f.label.toLowerCase() === args[1].toLowerCase());
            if (targetFile) {
              if (targetFile.isDownload) {
                window.open(targetFile.downloadUrl, '_blank');
                outputLines = [`Opening ${targetFile.label}...`];
              } else {
                openTab(targetFile.path);
                outputLines = [`Opening ${targetFile.label} in editor...`];
              }
            } else {
              outputLines = [`${command}: ${args[1]}: No such file or directory`];
            }
          }
          break;
        case "git":
          if (args[1] === "log") {
            outputLines = [
              "commit f85cb39 (HEAD -> main, origin/main)",
              "Author: Akarsh Jain <akarshjain2006@gmail.com>",
              "Date:   " + new Date().toDateString(),
              "",
              "    feat: update terminal with requested commands",
              "",
              "commit f3bd489",
              "Author: Akarsh Jain <akarshjain2006@gmail.com>",
              "Date:   " + new Date(Date.now() - 86400000).toDateString(),
              "",
              "    feat: restructure Go menu to match File explorer"
            ];
          } else {
            outputLines = [`git: '${args[1] || ''}' is not a git command. See 'git --help'.`];
          }
          break;
        case "python":
          if (args[1] === "--version") {
            outputLines = ["Python 3.10.12"];
          } else {
            outputLines = ["Python 3.10.12 (main, ...)", "Type \"help\", \"copyright\", \"credits\" or \"license\" for more information.", ">>> "];
          }
          break;
        default:
          outputLines = [`bash: ${command}: command not found`];
      }
      
      if (outputLines.length > 0) {
        setHistory((prev) => [
          ...prev, 
          ...outputLines.map(text => ({ type: "out", text }))
        ]);
      }
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
