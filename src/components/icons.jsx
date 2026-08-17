import {
  Mail,
  Phone,
  FileText
} from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaReact, FaHtml5, FaCss3Alt, FaMarkdown } from "react-icons/fa6";
import { SiLeetcode, SiCodeforces, SiCodechef, SiJavascript, SiTypescript } from "react-icons/si";
import { VscJson } from "react-icons/vsc";

// file-tree / tab / breadcrumb icons, keyed by portfolioData.js `icon`
const FILE_ICONS = {
  component: FaReact,
  html: FaHtml5,
  js: SiJavascript,
  json: VscJson,
  css: FaCss3Alt,
  markdown: FaMarkdown,
};

const FILE_COLORS = {
  component: "#5eead4",
  html: "#fb923c",
  js: "#fbbf24",
  json: "#b794f6",
  css: "#60a5fa",
  markdown: "#60a5fa", // Changed to match the blue markdown icon in image
};

export function FileTypeIcon({ type, size = 15 }) {
  const Icon = FILE_ICONS[type] || FileText;
  return <Icon size={size} color={FILE_COLORS[type]} />;
}

// social / brand icons, keyed by portfolioData.js `icon`
const SOCIAL_ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  leetcode: SiLeetcode,
  codeforces: SiCodeforces,
  codechef: SiCodechef,
  instagram: FaInstagram,
  mail: Mail,
  phone: Phone,
};

export function SocialIcon({ name, size = 17 }) {
  const Icon = SOCIAL_ICONS[name] || Mail;
  return <Icon size={size} />;
}
