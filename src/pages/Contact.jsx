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

  function handleSubmit(e) {
    e.preventDefault();

    const subject = form.subject.trim() || `Portfolio message from ${form.name}`;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    const mailto = `mailto:${MAILTO_TARGET}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setStatus("ok");
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

            <button type="submit" className="send-btn">
              <Send size={15} />
              send_message()
            </button>

            {status === "ok" && (
              <div className="form-status form-status--ok">
                <CheckCircle2 size={13} style={{ display: "inline", marginRight: 6, verticalAlign: -2 }} />
                Opening your email client with this filled in — hit send there to reach me.
              </div>
            )}

            <p className="form-note">
              // opens your email client — swap in a service like Formspree or EmailJS
              in Contact.jsx if you&rsquo;d rather receive these directly
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
