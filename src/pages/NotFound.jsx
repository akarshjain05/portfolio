import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home as HomeIcon } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 ⚡ Akarsh Jain";
  }, []);

  return (
    <div className="page notfound">
      <div className="notfound__code">404</div>
      <p className="notfound__msg">// this file doesn&rsquo;t exist in this repo</p>
      <Link to="/" className="btn btn--primary" style={{ display: "inline-flex" }}>
        <HomeIcon size={16} />
        Back to home.jsx
      </Link>
    </div>
  );
}
