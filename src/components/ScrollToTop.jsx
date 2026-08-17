import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router doesn't reset scroll position between route changes.
// Without this, navigating from the bottom of Skills to Contact would
// land you mid-page instead of at the top.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const el = document.querySelector(".content");
    if (el) el.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
