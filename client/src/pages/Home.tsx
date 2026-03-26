/**
 * Home Page
 * Design: Brutalist Digital Minimalism - browser-styled portfolio with OS-like interface
 * - Chat window closed by default
 * - INDEX button visible in ALL modes (folders, physics, balloon)
 * - SWITCH NAV moved to bottom-6 (lower)
 * - Random color gradient: solid color block at BOTTOM fading to white at TOP
 * - Color changes on each page load and each mode switch
 */
import { useState, useEffect, useCallback } from 'react';
import Desktop from "@/components/Desktop";
import MobileView from "@/components/MobileView";
import PhysicsBalls from "@/components/PhysicsBalls";
import RotatingCarousel from "@/components/RotatingCarousel";
import Window from "@/components/Window";
import { PrototypesContent, SocialContent, DesignContent, CampaignContent, BrandContent, EventsContent, PotteryContent, AboutContent, WebcamChatContent, IndexContent } from "@/components/FolderContent";

function ClockDisplay() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const ptTime = new Date(time.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  const hours = ptTime.getHours().toString().padStart(2, '0');
  const minutes = ptTime.getMinutes().toString().padStart(2, '0');
  return <span>{hours}:{minutes} PT</span>;
}

// Curated palette of vivid, saturated colors (like the yellow reference image)
const GRADIENT_COLORS = [
  '#FFE600', // yellow
  '#FF3B3B', // red
  '#FF6B00', // orange
  '#00C2FF', // cyan
  '#00D084', // mint green
  '#FF2D78', // hot pink
  '#7B2FFF', // purple
  '#00B4D8', // sky blue
  '#FF9500', // amber
  '#39FF14', // neon green
  '#FF007F', // rose
  '#00FFCC', // aqua
];

function getRandomColor(exclude?: string): string {
  const available = exclude ? GRADIENT_COLORS.filter(c => c !== exclude) : GRADIENT_COLORS;
  return available[Math.floor(Math.random() * available.length)];
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [experience, setExperience] = useState<'folders' | 'physics' | 'balloon'>('folders');
  const [openFolders, setOpenFolders] = useState<string[]>([]);
  const [showIndex, setShowIndex] = useState(false);
  const [gradientColor, setGradientColor] = useState<string>(() => getRandomColor());
  const [folderInitialProject, setFolderInitialProject] = useState<Record<string, string>>({});

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setOpenFolders(prev => {
      if (prev.includes(sectionId)) return prev;
      return [...prev, sectionId];
    });
  };

  const handleCloseFolder = (folderId: string) => {
    setOpenFolders(prev => prev.filter(id => id !== folderId));
  };

  const handleOpenAll = () => {
    const allIds = Object.keys(sectionMap);
    setOpenFolders(allIds);
  };

  const handleCloseAll = () => {
    setOpenFolders([]);
  };

  // Map section IDs to content components and labels
  const sectionMap: Record<string, { label: string; component: React.ComponentType<any> }> = {
    interactive: { label: 'Interactive', component: PrototypesContent },
    social: { label: 'Social and PR', component: SocialContent },
    design: { label: 'Design and Illustration', component: DesignContent },
    campaign: { label: 'Campaign', component: CampaignContent },
    brand: { label: 'Brand and Identity', component: BrandContent },
    events: { label: 'Events and Activations', component: EventsContent },
    pottery: { label: 'Pottery and Furniture', component: PotteryContent },
    about: { label: 'About', component: AboutContent },
    webcam: { label: '💬', component: WebcamChatContent },
  };

  const toggleExperience = useCallback(() => {
    setExperience(prev => {
      if (prev === 'folders') return 'physics';
      if (prev === 'physics') return 'balloon';
      return 'folders';
    });
    // Change gradient color on every mode switch
    setGradientColor(prev => getRandomColor(prev));
  }, []);

  const hasContentWindowBC = openFolders.filter(id => id !== 'webcam').length > 0;

  // Gradient: white at top, single color at bottom, starts fading around 60% down
  const backgroundStyle = {
    background: `linear-gradient(to bottom, #ffffff 0%, #ffffff 45%, ${gradientColor} 100%)`,
  };

  return (
    <div className="min-h-screen flex flex-col relative" style={backgroundStyle}>
      {/* Top header layout - contact info on sides, name in center */}
      <div className="fixed top-6 left-6 z-[60] text-[13px] leading-relaxed" style={{fontFamily:"'Inter','Helvetica Neue',Helvetica,Arial,sans-serif",letterSpacing:'-0.01em'}}>
        <div className="font-medium">Creative Director</div>
        <div className="font-medium">CEO Communications | Meta</div>
        <div><a href="mailto:hello@brunonakano.com" className="hover:underline font-medium">hello@brunonakano.com</a></div>
      </div>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60]">
        <h1 className="text-[13px] font-semibold" style={{fontFamily:"'Inter','Helvetica Neue',Helvetica,Arial,sans-serif",letterSpacing:'-0.02em'}}>(Bruno Nakano)</h1>
      </div>
      <div className="fixed top-6 right-6 z-[60] text-[13px] leading-relaxed text-right" style={{fontFamily:"'Inter','Helvetica Neue',Helvetica,Arial,sans-serif",letterSpacing:'-0.01em'}}>
        <div className="font-medium">SAO / MAD / SYD / NYC / SF / LA</div>
        <div>Los Angeles, CA</div>
        <div><ClockDisplay /></div>
      </div>

      {/* Background blur overlay for Mode B and C when windows open */}
      {experience !== 'folders' && hasContentWindowBC && (
        <div
          className="fixed inset-0 z-[40]"
          style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          onClick={() => { setOpenFolders([]); setShowIndex(false); }}
        />
      )}

      {/* Click-outside overlay for folders mode (no blur) */}
      {experience === 'folders' && (openFolders.length > 0 || showIndex) && (
        <div
          className="fixed inset-0 z-[40]"
          onClick={() => { setOpenFolders([]); setShowIndex(false); }}
        />
      )}

      {/* SWITCH NAV button - always visible, bottom-right, lower */}
      <button
        onClick={toggleExperience}
        className="fixed bottom-12 right-6 z-[200] bg-transparent border-0 px-3 py-2 text-[13px] font-medium gradient-text hover:bg-black hover:text-white transition-all outline-none focus:outline-none" style={{fontFamily:"'Inter','Helvetica Neue',Helvetica,Arial,sans-serif",letterSpacing:'-0.01em'}}
      >
        SWITCH NAV
      </button>

      {/* INDEX button - always visible in ALL modes, bottom-left, lower */}
      {experience !== 'folders' && (
        <>
          <button
            onClick={() => setShowIndex(true)}
            className="fixed bottom-12 left-6 z-[200] bg-transparent border-0 px-2 py-1 text-[13px] font-medium pointer-events-auto cursor-pointer hover:bg-black hover:text-white transition-colors outline-none focus:outline-none" style={{fontFamily:"'Inter','Helvetica Neue',Helvetica,Arial,sans-serif",letterSpacing:'-0.01em'}}
          >
            INDEX
          </button>
          {showIndex && (
            <Window
              key="index"
              id="index"
              title="INDEX"
              isActive={true}
              onClose={() => setShowIndex(false)}
              onClick={() => {}}
              initialPosition={{ x: Math.max(20, (window.innerWidth - 900) / 2), y: 60 }}
              initialSize={{ width: Math.min(900, window.innerWidth - 40), height: window.innerHeight - 120 }}
            >
              <IndexContent onProjectClick={(sectionId, projectId) => {
                if (projectId) {
                  setFolderInitialProject(prev => ({ ...prev, [sectionId]: projectId }));
                }
                setShowIndex(false);
                handleSectionClick(sectionId);
              }} />
            </Window>
          )}
        </>
      )}

      {isMobile ? (
        <MobileView />
      ) : experience === 'folders' ? (
        <Desktop gradientColor={gradientColor} />
      ) : experience === 'physics' ? (
        <>
          <PhysicsBalls onSectionClick={handleSectionClick} />
          {openFolders.map((folderId, index) => {
            if (!sectionMap[folderId]) return null;
            const isWebcam = folderId === 'webcam';
            const webcamW = 580, webcamH = 300;
            return (
              <Window
                key={folderId}
                id={folderId}
                title={sectionMap[folderId].label}
                isActive={index === openFolders.length - 1}
                onClose={() => handleCloseFolder(folderId)}
                onClick={() => {}}
                initialPosition={isWebcam ? { x: window.innerWidth - webcamW - 16, y: window.innerHeight - webcamH - 160 } : undefined}
                initialSize={isWebcam ? { width: webcamW, height: webcamH } : undefined}
              >
                {(() => {
                  const ContentComponent = sectionMap[folderId].component;
                  return <ContentComponent initialExpandedProject={folderInitialProject[folderId]} />;
                })()}
              </Window>
            );
          })}
        </>
      ) : (
        <>
          <RotatingCarousel
            onSectionClick={handleSectionClick}
            onOpenAll={handleOpenAll}
            onCloseAll={handleCloseAll}
            openFoldersCount={openFolders.length}
          />
          {openFolders.map((folderId, index) => {
            if (!sectionMap[folderId]) return null;
            const isWebcam = folderId === 'webcam';
            const webcamW = 580, webcamH = 300;
            return (
              <Window
                key={folderId}
                id={folderId}
                title={sectionMap[folderId].label}
                isActive={index === openFolders.length - 1}
                onClose={() => handleCloseFolder(folderId)}
                onClick={() => {}}
                initialPosition={isWebcam ? { x: window.innerWidth - webcamW - 16, y: window.innerHeight - webcamH - 160 } : undefined}
                initialSize={isWebcam ? { width: webcamW, height: webcamH } : undefined}
              >
                {(() => {
                  const ContentComponent = sectionMap[folderId].component;
                  return <ContentComponent initialExpandedProject={folderInitialProject[folderId]} />;
                })()}
              </Window>
            );
          })}
        </>
      )}
    </div>
  );
}
