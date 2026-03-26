/**
 * DraggableIcon Component
 * Design: Brutalist Digital Minimalism
 * - Folder: solid black straight-line SVG, section name label below
 * - About: headshot photo
 * - Chat: 💬 bubble emoji
 */
import { useState, useRef, useEffect } from 'react';

interface DraggableIconProps {
  id: string;
  label: string;
  initialPosition: { x: number; y: number };
  onClick: () => void;
  color?: string;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export default function DraggableIcon({ id, label, initialPosition, onClick, onDragStart, onDragEnd }: DraggableIconProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const iconRef = useRef<HTMLDivElement>(null);
  const moveThreshold = 5;
  const startPosRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startPosRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    setHasMoved(false);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - startPosRef.current.x;
        const dy = e.clientY - startPosRef.current.y;
        if (!hasMoved && Math.sqrt(dx * dx + dy * dy) > moveThreshold) {
          setHasMoved(true);
          onDragStart?.();
        }
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (hasMoved) onDragEnd?.();
      }
    };
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, hasMoved, onDragStart, onDragEnd]);

  const handleClick = () => {
    if (!hasMoved) onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const isChat = id === 'webcam';
  const isAbout = id === 'about';

  return (
    <div
      ref={iconRef}
      className="absolute pointer-events-auto"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isDragging ? 200 : 10,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Open ${label} folder`}
    >
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          background: 'transparent',
        }}
      >
        {/* Icon */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isAbout ? (
            /* About: ? emoji */
            <span style={{ fontSize: '40px', lineHeight: 1, display: 'block' }}>?</span>
          ) : isChat ? (
            /* Chat: speech bubble emoji */
            <span style={{ fontSize: '38px', lineHeight: 1, display: 'block' }}>💬</span>
          ) : (
            /* Folder: refined outline SVG with rounded corners and tab */
            <svg width="54" height="46" viewBox="0 0 54 46" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
              {/* Folder tab — wider, gently curved top-right corner */}
              <path d="M4 13 L4 9 Q4 7 6 7 L20 7 Q22 7 23 9 L25 13" />
              {/* Folder body with rounded corners */}
              <rect x="2" y="13" width="50" height="29" rx="2" ry="2" />
              {/* Subtle inner shelf line */}
              <line x1="2" y1="19" x2="52" y2="19" strokeWidth="0.75" strokeOpacity="0.35" />
            </svg>
          )}
        </div>

        {/* Section name label below icon */}
        {!isChat && (
          <div
            style={{
              fontFamily: '"Arial Narrow", Arial, sans-serif',
              fontSize: '8px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              textAlign: 'center',
              color: '#000000',
              lineHeight: 1.2,
              letterSpacing: '0.05em',
              maxWidth: '72px',
              wordBreak: 'break-word',
            }}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  );
}
