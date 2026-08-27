import { Routes, Route } from "react-router-dom";
import EditorShell from "./components/shell/EditorShell";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Readme from "./pages/Readme";
import NotFound from "./pages/NotFound";
import EmptyState from "./pages/EmptyState";
import { IDEProvider } from "./contexts/IDEContext";

export default function App() {
  return (
    <IDEProvider>
      <Routes>
        <Route element={<EditorShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/readme" element={<Readme />} />
        <Route path="/empty" element={<EmptyState />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </IDEProvider>
  );
}
