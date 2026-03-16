/**
 * MobileView Component
 * Design: Brutalist Digital Minimalism - stacked folder list for mobile
 */

import { useState } from 'react';
import { PrototypesContent, SocialContent, DesignContent, CampaignContent, BrandContent, EventsContent } from './FolderContent';

interface Folder {
  id: string;
  label: string;
  content: React.ReactNode;
}

const FOLDERS: Folder[] = [
  {
    id: 'prototypes',
    label: 'Interactive',
    content: <PrototypesContent />,
  },
  {
    id: 'social',
    label: 'Social and PR',
    content: <SocialContent />,
  },
  {
    id: 'design',
    label: 'Design and Illustration',
    content: <DesignContent />,
  },
  {
    id: 'campaign',
    label: 'Campaign',
    content: <CampaignContent />,
  },
  {
    id: 'brand',
    label: 'Brand and Identity',
    content: <BrandContent />,
  },
  {
    id: 'events',
    label: 'Events and Activations',
    content: <EventsContent />,
  },
];

export default function MobileView() {
  const [openFolder, setOpenFolder] = useState<string | null>(null);

  const handleFolderClick = (folderId: string) => {
    setOpenFolder(openFolder === folderId ? null : folderId);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] pt-[40px]">
      <div className="p-4 space-y-2">
        {FOLDERS.map((folder) => (
          <div key={folder.id} className="border-[1px] border-[#2C2C2C]">
            {/* Folder Header */}
            <button
              className="w-full p-4 flex items-center justify-between bg-[#ffffff] hover:bg-[#2C2C2C] hover:text-[#ffffff]"
              onClick={() => handleFolderClick(folder.id)}
            >
              <div className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 8h10l2 3h12v15H4V8z" />
                  <path d="M4 11h24" />
                </svg>
                <span className=" text-[11px] font-medium uppercase tracking-wide text-left">
                  {folder.label}
                </span>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  transform: openFolder === folder.id ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>

            {/* Folder Content */}
            {openFolder === folder.id && (
              <div className="border-t-[2px] border-[#2C2C2C] bg-[#ffffff]">
                {folder.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
