/**
 * MouseTrail Component
 * Canvas-based trail — no React state updates during animation, zero re-renders.
 */
import { useEffect, useRef } from 'react';

const ALL_PROJECT_IMAGES = [
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/36c4d655075641.5d4135ab84f41_5dd89a8f.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/2d5f0255075641.5d4132e58d3c0_ae3590eb.jpeg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/aaaaaa-2(1)_b2083aae.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/s-02-2000x1519-1(1)_c9c5863c.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/vS-Drive-Design-Case-Study_3020c507.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/posters_3d5cb432.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/jjh-copy-1-2000x2501_2b1bad90.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/fb_halloween_hauntedhouse_interior_v1_001-1535x1920(1)_d20c9b0a.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_dining_food-1920x1500_e9071cea.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_attic_lights-1920x1500_c7724193.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/mouth_mask1-1-2000x1125(1)_bcaa547f.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/everything-2000x1235_b21af245.png',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/01-2000x1254(1)_3dec4caa.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/mktdirecto02-2000x1012_7d9d238c.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/Adweek-01_1340_c_b06a9bd0.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/Adweek-03_1340_c_d840ea73.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/Hivemind_new_1000_9ec57d71.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/p01-1158x1637_cb835cf8.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/p02-1158x1637_dfe756f3.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/mooood_dbed463e.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/tweeet-2000x996_53e8e0f9.png',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/aaaa-2000x1380_8746a43f.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/KV-MOTORCYCLE-0328_a4c47c47.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/image-asset-3_9dc34a40.jpeg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/image-asset-2_250d46ed.jpeg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/batman-2000x2796(1)_18724cf4.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/greenlantern-2000x2796_05e4d8a1.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/superman-2000x2796(1)_78368180.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/screen-shot-2018-05-17-at-10.46.07-pm-copy-2000x1707_d3076bcf.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/close04-2000x1333(1)_9f897b34.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/img_2556-2000x1333_a3fdc0c9.jpg',
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PORTFOLIO_IMAGES = shuffle(ALL_PROJECT_IMAGES);
const MAX_SIZE = 70;
const FADE_MS = 1200;
const THROTTLE_MS = 130;
const MIN_PX = 28;

interface TrailItem {
  x: number; y: number;
  img: HTMLImageElement;
  w: number; h: number;
  born: number;
}

interface MouseTrailProps {
  hasOpenWindow?: boolean;
}

export default function MouseTrail({ hasOpenWindow = false }: MouseTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // All mutable state lives in refs — no React re-renders during animation
  const trailsRef = useRef<TrailItem[]>([]);
  const imgIndexRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);
  const isDraggingRef = useRef(false);
  const openWindowRef = useRef(hasOpenWindow);
  const rafRef = useRef(0);
  const loadedRef = useRef<Map<string, HTMLImageElement>>(new Map());

  // Sync prop → ref without triggering effects
  useEffect(() => {
    openWindowRef.current = hasOpenWindow;
    if (hasOpenWindow) trailsRef.current = [];
  }, [hasOpenWindow]);

  // Preload images once
  useEffect(() => {
    PORTFOLIO_IMAGES.forEach(src => {
      if (loadedRef.current.has(src)) return;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => loadedRef.current.set(src, img);
      img.src = src;
    });
  }, []);

  // Canvas render loop — completely outside React
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const frame = () => {
      rafRef.current = requestAnimationFrame(frame);
      const now = Date.now();
      trailsRef.current = trailsRef.current.filter(t => now - t.born < FADE_MS);
      if (trailsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const t of trailsRef.current) {
        const alpha = Math.max(0, 1 - (now - t.born) / FADE_MS);
        ctx.globalAlpha = alpha;
        ctx.drawImage(t.img, t.x - t.w / 2, t.y - t.h / 2, t.w, t.h);
      }
      ctx.globalAlpha = 1;
    };
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Mouse / drag listeners — no React state touched
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (isDraggingRef.current || openWindowRef.current) return;
      const now = Date.now();
      if (now - lastTimeRef.current < THROTTLE_MS) return;
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      if (Math.sqrt(dx * dx + dy * dy) < MIN_PX) return;
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      lastTimeRef.current = now;

      const src = PORTFOLIO_IMAGES[imgIndexRef.current % PORTFOLIO_IMAGES.length];
      imgIndexRef.current++;
      const img = loadedRef.current.get(src);
      if (!img) return;

      const ar = img.naturalWidth / img.naturalHeight;
      const w = ar >= 1 ? MAX_SIZE : MAX_SIZE * ar;
      const h = ar >= 1 ? MAX_SIZE / ar : MAX_SIZE;

      trailsRef.current.push({ x: e.clientX, y: e.clientY, img, w, h, born: now });
      if (trailsRef.current.length > 30) trailsRef.current.shift();
    };

    const onDown = () => { isDraggingRef.current = true; };
    const onUp   = () => { isDraggingRef.current = false; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ display: 'block' }}
    />
  );
}
