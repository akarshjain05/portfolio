const ITEMS = ["File", "Edit", "View", "Go", "Run", "Terminal", "Help"];

// Purely atmospheric — like the reference site, this row exists to sell
// the "code editor" theme. The real navigation lives in the sidebar and
// tab bar just below.
export default function MenuBar() {
  return (
    <div className="menubar">
      {ITEMS.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
