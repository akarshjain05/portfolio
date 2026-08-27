import { useState, useEffect } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { socials } from "../data/portfolioData";
import SocialLink from "../components/SocialLink";

const emailSocial = socials.find((s) => s.icon === "mail");
const MAILTO_TARGET = emailSocial ? emailSocial.url.replace("mailto:", "") : "";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!status) return;
    const id = setTimeout(() => setStatus(null), 6000);
    return () => clearTimeout(id);
  }, [status]);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus({ type: "sending" });

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${MAILTO_TARGET}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _subject: form.subject.trim() || `Portfolio message from ${form.name}`,
          message: form.message
        })
      });

      const data = await res.json();

      if (res.ok && data.success === "true") {
        setStatus({ type: "ok" });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", message: data.message || "Something went wrong." });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Network error or blocked by an extension. Please try again." });
    }
  }

  return (
    <div className="page">
      <span className="comment">// contact.css — let&rsquo;s build something</span>
      <h1 className="page-title" style={{ marginBottom: 10 }}>
        Contact
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: 13.5, marginBottom: 36 }}>
        // open to work, collabs &amp; good conversations
      </p>

      <div className="contact-grid">
        <div>
          <h2 className="skill-group__title">FIND ME ON</h2>
          {socials.map((s) => (
            <SocialLink social={s} variant="card" key={s.name} />
          ))}
        </div>

        <div>
          <h2 className="skill-group__title">SEND A MESSAGE</h2>
          <form onSubmit={handleSubmit} noValidate={false}>
            <div className="field">
              <label className="field__label" htmlFor="name">
                YOUR_NAME <span className="req">*</span>
              </label>
              <input
                id="name"
                className="field__input"
                placeholder="string"
                required
                value={form.name}
                onChange={update("name")}
              />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="email">
                YOUR_EMAIL <span className="req">*</span>
              </label>
              <input
                id="email"
                type="email"
                className="field__input"
                placeholder="string"
                required
                value={form.email}
                onChange={update("email")}
              />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="subject">
                SUBJECT
              </label>
              <input
                id="subject"
                className="field__input"
                placeholder="string"
                value={form.subject}
                onChange={update("subject")}
              />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="message">
                MESSAGE <span className="req">*</span>
              </label>
              <textarea
                id="message"
                className="field__textarea"
                placeholder="'''your message'''"
                required
                value={form.message}
                onChange={update("message")}
              />
            </div>

            <button type="submit" className="send-btn" disabled={status?.type === "sending"}>
              <Send size={15} />
              {status?.type === "sending" ? "sending..." : "send_message()"}
            </button>

            {status?.type === "ok" && (
              <div className="form-status form-status--ok">
                <CheckCircle2 size={13} style={{ display: "inline", marginRight: 6, verticalAlign: -2 }} />
                Message successfully sent! I&rsquo;ll get back to you soon.
              </div>
            )}
            {status?.type === "error" && (
              <div className="form-status" style={{ color: "var(--pink)", marginTop: "12px", fontSize: "13px" }}>
                {status.message}
              </div>
            )}

            <p className="form-note">
              // powered by FormSubmit — your message goes straight to my inbox!
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
