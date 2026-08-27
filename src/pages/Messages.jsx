import { useState, useEffect } from "react";
import { Inbox, RefreshCw, Mail, Trash2 } from "lucide-react";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();
      setMessages(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 className="page-title" style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <Inbox size={24} /> Inbox
        </h1>
        <button 
          onClick={fetchMessages} 
          disabled={loading}
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
        >
          <RefreshCw size={14} className={loading ? "spin" : ""} /> Refresh
        </button>
      </div>
      
      <p style={{ color: "var(--text-muted)", fontSize: 13.5, marginBottom: 24 }}>
        // Local inbox for contact form submissions. Data resets on Vercel cold boot.
      </p>

      {error && (
        <div style={{ color: "var(--pink)", padding: "12px", border: "1px solid var(--pink)", borderRadius: 6, marginBottom: 20 }}>
          {error}
        </div>
      )}

      {loading && messages.length === 0 ? (
        <div style={{ color: "var(--text-muted)", padding: 40, textAlign: "center" }}>Loading messages...</div>
      ) : messages.length === 0 ? (
        <div style={{ color: "var(--text-muted)", padding: 40, textAlign: "center", border: "1px dashed var(--border)", borderRadius: 8 }}>
          No messages yet.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: 16
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, borderBottom: "1px solid var(--border-soft)", paddingBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 15, marginBottom: 4 }}>{msg.subject || 'No Subject'}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-secondary)", fontSize: 13 }}>
                    <Mail size={12} /> <a href={`mailto:${msg.email}`} style={{ color: "var(--blue)", textDecoration: "none" }}>{msg.name} &lt;{msg.email}&gt;</a>
                  </div>
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
                  {new Date(msg.date).toLocaleString()}
                </div>
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: 14, whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
