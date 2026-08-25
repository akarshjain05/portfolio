import { useIDE } from "../contexts/IDEContext";

export const THEMES = [
  { id: "akarsh-dark", name: "Akarsh Dark", icon: "💜" },
  { id: "midnight-hacker", name: "Midnight Hacker", icon: "💻" },
  { id: "crimson-forge", name: "Crimson Forge", icon: "🔥" },
  { id: "cobalt-blue", name: "Cobalt Blue", icon: "🌊" },
  { id: "amethyst", name: "Amethyst", icon: "🔮" }
];

export default function ThemePicker({ onSelect }) {
  const { theme, setTheme } = useIDE();

  return (
    <>
      {THEMES.map(t => (
        <button 
          key={t.id} 
          className={`settings-menu__item ${theme === t.id ? "active" : ""}`}
          onClick={() => { 
            setTheme(t.id); 
            if (onSelect) onSelect(); 
          }}
        >
          <div className={`theme-circle theme-circle--${t.id}`}></div>
          <span>{t.icon} {t.name}</span>
          {theme === t.id && <span className="settings-menu__check">✓</span>}
        </button>
      ))}
    </>
  );
}
