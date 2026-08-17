import React from "react";
import { useIDE } from "../contexts/IDEContext";

export default function EmptyState() {
  const { openTab } = useIDE();

  return (
    <div className="page" style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", marginTop: "10vh" }}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" width={80} style={{ opacity: 0.1, marginBottom: 20 }} />
      <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "8px", color: "var(--text-secondary)" }}>Akarsh Jain</h2>
      <p style={{ fontSize: "14px", marginBottom: "32px" }}>Select a file from the sidebar to start</p>
      
      <div style={{ display: "flex", gap: "24px", fontSize: "13px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-end" }}>
          <span>Show All Commands</span>
          <span>Go to File</span>
          <span>Toggle Terminal</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", color: "var(--text-secondary)" }}>
          <span><kbd style={{ background: "var(--bg-hover)", padding: "2px 6px", borderRadius: "4px", border: "1px solid var(--border)" }}>Ctrl</kbd> + <kbd style={{ background: "var(--bg-hover)", padding: "2px 6px", borderRadius: "4px", border: "1px solid var(--border)" }}>Shift</kbd> + <kbd style={{ background: "var(--bg-hover)", padding: "2px 6px", borderRadius: "4px", border: "1px solid var(--border)" }}>P</kbd></span>
          <span><kbd style={{ background: "var(--bg-hover)", padding: "2px 6px", borderRadius: "4px", border: "1px solid var(--border)" }}>Ctrl</kbd> + <kbd style={{ background: "var(--bg-hover)", padding: "2px 6px", borderRadius: "4px", border: "1px solid var(--border)" }}>P</kbd></span>
          <span><kbd style={{ background: "var(--bg-hover)", padding: "2px 6px", borderRadius: "4px", border: "1px solid var(--border)" }}>Ctrl</kbd> + <kbd style={{ background: "var(--bg-hover)", padding: "2px 6px", borderRadius: "4px", border: "1px solid var(--border)" }}>`</kbd></span>
        </div>
      </div>
    </div>
  );
}
