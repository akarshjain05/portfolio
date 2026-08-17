import {
  Component,
  FileCode2,
  Braces,
  FileJson,
  Palette,
  FileText,
  Mail,
  Phone,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";

// file-tree / tab / breadcrumb icons, keyed by portfolioData.js `icon`
const FILE_ICONS = {
  component: Component,
  html: FileCode2,
  js: Braces,
  json: FileJson,
  css: Palette,
  markdown: FileText,
};

const FILE_COLORS = {
  component: "#5eead4",
  html: "#fb923c",
  js: "#fbbf24",
  json: "#b794f6",
  css: "#60a5fa",
  markdown: "#9a9aa6",
};

export function FileTypeIcon({ type, size = 15 }) {
  const Icon = FILE_ICONS[type] || FileText;
  return <Icon size={size} color={FILE_COLORS[type]} strokeWidth={2} />;
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
