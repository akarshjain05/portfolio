import { useLocation } from 'react-router-dom';
import { files } from '../data/portfolioData';

export function useActiveFile() {
  const { pathname } = useLocation();
  const activeFile = files.find(f => 
    f.path === "/" ? pathname === "/" : pathname.startsWith(f.path)
  ) || files[0];
  return { activeFile, pathname };
}
