import React from "react";
import { useIDE } from "../contexts/IDEContext";

export default function EmptyState() {
  const { openTab } = useIDE();

  return (
    <div className="page empty-state-wrapper">
      <img src="/react-icon.svg" alt="React Logo" width={80} className="empty-state-logo" />
      <h2 className="empty-state-title">Akarsh Jain</h2>
      <p className="empty-state-desc">Select a file from the sidebar to start</p>
      
      <div className="empty-state-shortcuts">
        <div className="empty-state-labels">
          <span>Show All Commands</span>
          <span>Go to File</span>
          <span>Toggle Terminal</span>
        </div>
        <div className="empty-state-keys">
          <span><kbd className="empty-state-kbd">Ctrl</kbd> + <kbd className="empty-state-kbd">Shift</kbd> + <kbd className="empty-state-kbd">P</kbd></span>
          <span><kbd className="empty-state-kbd">Ctrl</kbd> + <kbd className="empty-state-kbd">P</kbd></span>
          <span><kbd className="empty-state-kbd">Ctrl</kbd> + <kbd className="empty-state-kbd">`</kbd></span>
        </div>
      </div>
    </div>
  );
}
