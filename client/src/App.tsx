import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "@/pages/Home";
import Interactive from "@/pages/Interactive";
import { useState, useEffect } from "react";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/interactive" component={Interactive} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function isDarkBackground(el: HTMLElement | null): boolean {
  // Walk up the DOM to find the first element with a non-transparent background
  let current = el;
  while (current && current !== document.body) {
    const bg = window.getComputedStyle(current).backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
      // Parse rgb/rgba
      const match = bg.match(/(\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        // Luminance check: dark if < 80
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        return luminance < 80;
      }
    }
    current = current.parentElement;
  }
  return false;
}

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isOnDarkBg, setIsOnDarkBg] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isLink = target.tagName === 'A' ||
                     target.tagName === 'BUTTON' ||
                     target.closest('a') !== null ||
                     target.closest('button') !== null ||
                     target.style.cursor === 'pointer' ||
                     window.getComputedStyle(target).cursor === 'pointer';
      setIsHoveringLink(isLink);

      // Check if on dark background (inside black windows)
      setIsOnDarkBg(isDarkBackground(target));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          {/* Global custom cursor */}
          <div
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              transform: 'translate(-50%, -50%)',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: isHoveringLink ? (isOnDarkBg ? '#000000' : '#FFFFFF') : (isOnDarkBg ? '#FFFFFF' : '#000000'),
              border: isHoveringLink ? (isOnDarkBg ? '2px solid #FFFFFF' : '2px solid #000000') : 'none',
              transition: 'background-color 0.2s ease, border 0.2s ease, width 0.2s ease, height 0.2s ease',
            }}
          />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
