import { SocialIcon } from "./icons";

// `variant="pill"` -> compact icon+label pill (used on the Home page)
// `variant="card"`  -> full contact-link card with name + value (used on Contact)
export default function SocialLink({ social, variant = "pill" }) {
  const isExternal = !social.url.startsWith("mailto:");

  if (variant === "card") {
    return (
      <a
        className="contact-link"
        href={social.url}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        <span className="contact-link__icon">
          <SocialIcon name={social.icon} size={18} />
        </span>
        <span>
          <span className="contact-link__name">{social.name.toUpperCase()}</span>
          <span className="contact-link__value">
            {social.url.replace("mailto:", "").replace("https://", "")}
          </span>
        </span>
      </a>
    );
  }

  return (
    <a
      className="social-pill"
      href={social.url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <SocialIcon name={social.icon} size={15} />
      {social.name}
    </a>
  );
}
