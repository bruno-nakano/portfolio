import { Link } from "wouter";
import { PrototypesContent } from "@/components/FolderContent";

export default function Interactive() {
  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col" style={{ cursor: 'none' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
        <Link href="/">
          <a className="text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
            ← BACK
          </a>
        </Link>
        <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">
          BRUNO NAKANO — INTERACTIVE
        </span>
        <div className="w-16" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <PrototypesContent />
      </div>
    </div>
  );
}
