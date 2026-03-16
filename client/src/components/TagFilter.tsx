/**
 * TagFilter Component
 * Design: Brutalist Digital Minimalism - clickable tag pills with neon green active state
 */

interface TagFilterProps {
  activeTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

export default function TagFilter({ activeTags, onTagToggle, onClearAll }: TagFilterProps) {
  if (activeTags.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-20 pointer-events-auto max-w-xs">
      <div className="border-[1px] border-[#2C2C2C] bg-[#ffffff] p-3">
        <div className="flex items-center justify-between mb-2">
          <span className=" text-[10px] uppercase font-bold">
            Active Filters ({activeTags.length})
          </span>
          <button
            onClick={onClearAll}
            className=" text-[9px] uppercase px-2 py-1 border-[1px] border-[#2C2C2C] bg-[#ffffff] hover:bg-[#2C2C2C] hover:text-[#ffffff]"
          >
            Clear All
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {activeTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className=" text-[10px] uppercase px-2 py-1 border-[1px] border-[#2C2C2C] bg-[#00FF00] hover:bg-[#2C2C2C] hover:text-[#ffffff]"
            >
              {tag} ×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
