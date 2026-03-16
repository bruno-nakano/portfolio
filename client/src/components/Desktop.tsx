/**
 * Desktop Component
 * Design: Brutalist Digital Minimalism - asymmetric icon placement, teal gradient bg
 * Latest version: INDEX button bottom-left, black windows, red dashed folder icons
 */
import { useState, useEffect } from 'react';
import Window from './Window';
import DraggableIcon from './DraggableIcon';
import MouseTrail from './MouseTrail';
import TagFilter from './TagFilter';
import { PrototypesContent, SocialContent, DesignContent, CampaignContent, BrandContent, EventsContent, PotteryContent, AboutContent, WebcamChatContent, IndexContent } from './FolderContent';

function ClockDisplay() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const ptTime = new Date(time.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  const hours = ptTime.getHours().toString().padStart(2, '0');
  const minutes = ptTime.getMinutes().toString().padStart(2, '0');
  return <span>{hours}:{minutes} PT</span>;
}

export interface FolderData {
  id: string;
  label: string;
  position: { x: number; y: number };
  contentComponent: React.ComponentType<{ searchTerm?: string; activeTags?: string[]; onTagClick?: (tag: string) => void; initialExpandedProject?: string }>;
  color?: string;
}

const FOLDERS: FolderData[] = [
  {
    id: 'prototypes',
    label: 'Interactive',
    position: { x: 80, y: 120 },
    contentComponent: PrototypesContent,
  },
  {
    id: 'social',
    label: 'Social and PR',
    position: { x: 240, y: 280 },
    contentComponent: SocialContent,
  },
  {
    id: 'design',
    label: 'Design and Illustration',
    position: { x: 120, y: 440 },
    contentComponent: DesignContent,
  },
  {
    id: 'campaign',
    label: 'Campaign',
    position: { x: 280, y: 160 },
    contentComponent: CampaignContent,
  },
  {
    id: 'brand',
    label: 'Brand and Identity',
    position: { x: 400, y: 120 },
    contentComponent: BrandContent,
  },
  {
    id: 'events',
    label: 'Events and Activations',
    position: { x: 520, y: 280 },
    contentComponent: EventsContent,
  },
  {
    id: 'pottery',
    label: 'Pottery and Furniture',
    position: { x: 680, y: 160 },
    contentComponent: PotteryContent,
  },
  {
    id: 'about',
    label: 'About',
    position: { x: 1100, y: 280 },
    contentComponent: AboutContent,
  },
  {
    id: 'webcam',
    label: '💬',
    position: { x: 1050, y: 350 },
    contentComponent: WebcamChatContent,
  },
];

interface DesktopProps {
  gradientColor?: string;
}

export default function Desktop({ gradientColor }: DesktopProps) {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [allWindowsMinimized, setAllWindowsMinimized] = useState(false);
  const [windowPositions, setWindowPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [windowSizes, setWindowSizes] = useState<Record<string, { width: number; height: number }>>({});
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [showIndex, setShowIndex] = useState(false);
  const [folderInitialProject, setFolderInitialProject] = useState<Record<string, string>>({});

  const handleIconClick = (folderId: string) => {
    if (!openWindows.includes(folderId)) {
      setOpenWindows([...openWindows, folderId]);
      setActiveWindow(folderId);
    } else {
      setActiveWindow(folderId);
    }
  };

  const handleCloseWindow = (folderId: string) => {
    setOpenWindows(openWindows.filter(id => id !== folderId));
    if (activeWindow === folderId) {
      setActiveWindow(openWindows[openWindows.length - 2] || null);
    }
  };

  const handleWindowClick = (folderId: string) => {
    setActiveWindow(folderId);
  };

  const handleTagClick = (tag: string) => {
    setActiveTags(prev => {
      const tagLower = tag.toLowerCase();
      const exists = prev.some(t => t.toLowerCase() === tagLower);
      if (exists) {
        return prev.filter(t => t.toLowerCase() !== tagLower);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleClearAllTags = () => {
    setActiveTags([]);
  };

  const hasContentWindow = openWindows.filter(id => id !== 'webcam').length > 0;

  const handleBackgroundClick = () => {
    setOpenWindows([]);
    setActiveWindow(null);
    setShowIndex(false);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Mouse trail — active unless a content window (non-webcam) is open */}
      <MouseTrail hasOpenWindow={hasContentWindow} />

      {/* Transparent background — clicking it closes all windows */}
      {(openWindows.length > 0 || showIndex) && (
        <div
          className="fixed inset-0 z-[35] pointer-events-auto"
          onClick={handleBackgroundClick}
        />
      )}

      {/* Tag Filter */}
      <TagFilter
        activeTags={activeTags}
        onTagToggle={handleTagClick}
        onClearAll={handleClearAllTags}
      />

      {/* INDEX Button (bottom-left) */}
      <button
        onClick={() => setShowIndex(true)}
        className="fixed bottom-12 left-6 z-[200] bg-transparent border-0 px-2 py-1 text-[11px] font-bold uppercase pointer-events-auto cursor-pointer hover:bg-black hover:text-white transition-colors outline-none focus:outline-none"
      >
        INDEX
      </button>

      {/* INDEX Window (full overlay) */}
      {showIndex && (
        <Window
          key="index"
          id="index"
          title="INDEX"
          isActive={true}
          onClose={() => setShowIndex(false)}
          onClick={() => {}}
          initialPosition={{ x: Math.max(20, (window.innerWidth - 900) / 2), y: 90 }}
          initialSize={{ width: Math.min(900, window.innerWidth - 40), height: window.innerHeight - 150 }}
        >
          <IndexContent onProjectClick={(sectionId, projectId) => {
            // Map INDEX section IDs to Desktop folder IDs
            const sectionToFolder: Record<string, string> = {
              interactive: 'prototypes',
              social: 'social',
              design: 'design',
              campaign: 'campaign',
              brand: 'brand',
              events: 'events',
              pottery: 'pottery',
            };
            const folderId = sectionToFolder[sectionId] || sectionId;
            if (projectId) {
              setFolderInitialProject(prev => ({ ...prev, [folderId]: projectId }));
            }
            setShowIndex(false);
            handleIconClick(folderId);
          }} />
        </Window>
      )}

      {/* Desktop Icons */}
      <div className="absolute inset-0 p-8 z-10 pointer-events-none">
        {FOLDERS.map((folder) => (
          <DraggableIcon
            key={folder.id}
            id={folder.id}
            label={folder.label}
            initialPosition={folder.position}
            onClick={() => handleIconClick(folder.id)}
            color={folder.color}
          />
        ))}
      </div>

      {/* Windows */}
      {!allWindowsMinimized && openWindows.map((folderId) => {
        const folder = FOLDERS.find(f => f.id === folderId);
        if (!folder) return null;
        const ContentComponent = folder.contentComponent;
        const isWebcam = folderId === 'webcam';
        const webcamWidth = 580;
        const webcamHeight = 300;
        const webcamInitialPos = windowPositions[folderId] || {
          x: window.innerWidth - webcamWidth - 16,
          y: window.innerHeight - webcamHeight - 160,
        };
        const webcamInitialSize = windowSizes[folderId] || { width: webcamWidth, height: webcamHeight };
        return (
          <Window
            key={folderId}
            id={folderId}
            title={folderId === 'webcam' ? '💬' : folder.label}
            isActive={activeWindow === folderId}
            onClose={() => handleCloseWindow(folderId)}
            onClick={() => handleWindowClick(folderId)}
            color={folder.color}
            initialPosition={isWebcam ? webcamInitialPos : windowPositions[folderId]}
            initialSize={isWebcam ? webcamInitialSize : windowSizes[folderId]}
          >
            <ContentComponent
              activeTags={activeTags}
              onTagClick={handleTagClick}
              initialExpandedProject={folderInitialProject[folderId]}
            />
          </Window>
        );
      })}
    </div>
  );
}
