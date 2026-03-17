/**
 * FolderContent Components
 * Design: Brutalist Digital Minimalism - structured content layouts with thick borders
 */

import { useState, useEffect, useRef } from 'react';
import { trpc } from '@/lib/trpc';

interface ContentProps {
  activeTags?: string[];
  onTagClick?: (tag: string) => void;
  initialExpandedProject?: string;
}

// Prototypes, Digital Experiences and Experiments
export function PrototypesContent({ activeTags = [], onTagClick, initialExpandedProject }: ContentProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(initialExpandedProject ?? null);
  const [modalVideoUrl, setModalVideoUrl] = useState<string | null>(null);
  const [hoverImage, setHoverImage] = useState<{ show: boolean; x: number; y: number; projectId?: string }>({ show: false, x: 0, y: 0 });
  const [carouselIndex, setCarouselIndex] = useState<{ [key: string]: number }>({});
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // No auto-scroll animation - videos are static with hover effects

  const interactiveProjects = [
    {
      id: 'samsung-diplo',
      title: "(01) Samsung x Diplo [Can't Stop]",
      tagline: "THE MIX THAT ONLY PLAYS WHEN YOU MOVE",
      description: "Introducing \"Can't Stop\" by Grammy-winning DJ/Producer Diplo, an exclusive 30-minute mix with a catch: you have to move to play it. Your phone's GPS and accelerometer detect movement to play the mix, which is composed of new, unreleased content. Run, jump, dance, pogo - the app doesn't discriminate. Just don't stop.",
      agency: 'Agency: R/GA NY',
      production: 'Production: R/GA Studios NY-BA',
      tags: ['Interactive', 'Music', 'Mobile'],
      media: [
        { type: 'video', url: 'https://vimeo.com/217188315', videoWidth: 'min(520px, 60vw)' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/uGdlSKPSGtBQrFuE.jpg' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/FaGpapXCNhQUaRcm.jpg' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/xXvnNMChIHQzGOdH.gif' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/CPXWQSYjyWAXGKdw.gif' },
      ]
    },
    {
      id: 'mcdonalds-emlings',
      title: "(02) McDonald's [Emlings]",
      tagline: "HELPING MCDONALD'S FIND ITS MISSING MAGIC",
      description: "Emlings is a digital toy that brings the Happy Meal to life, reinvigorating the brand for a new generation.",
      agency: 'Agency: Leo Burnett Sydney',
      production: 'Production Company: North Kingdom',
      tags: ['Branding', 'Digital', 'Social'],
      media: [
        { type: 'video', url: 'https://player.vimeo.com/video/334615998?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/oVYCfdUVvdIIWyny.png' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/yzspyztZdyAMXtUk.png' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/BmylwDPzFqnMlzuH.gif' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/iHHNQmahOnbwGonZ.gif' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/UWdVTsqwqOIcdarH.jpg' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/eNuJomcvUcIPIuJx.gif' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/ZlHYGShdCcShGHIU.jpg' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/TNZWkPVBhCIAWaPU.gif' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/ARIgZOhyWOqEOluJ.jpg' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/QCjxNORjawpCXsbI.gif' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/pzGXxSviSBJQYmzC.jpg' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/SeyKZQNIxVxyJiPq.jpg' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/DTYsCwDNViReJDFZ.jpg' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/kPMNzsnBlFMmQzAL.jpg' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/zcfVhFNQhvYMxnla.jpg' },
      ]
    },
    {
      id: 'samsung-s-drive',
      title: "(03) Samsung [S-Drive]",
      tagline: "REWARDING SAFE DRIVING",
      description: "Samsung S-Drive was created to turn one of the biggest distractions on the road into a life saver.",
      agency: 'Agency: Leo Burnett Sydney',
      production: '',
      tags: ['AI', 'Mobile', 'Automotive'],
      media: [
        { type: 'video', url: 'https://vimeo.com/343710550', videoWidth: 'min(640px, 70vw)' },
        { type: 'video', url: 'https://vimeo.com/219596551', videoWidth: 'min(640px, 70vw)' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/49424455075641.5d4132e539b75_4c6ca02e.gif' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/36c4d655075641.5d4135ab84f41_5dd89a8f.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/2d5f0255075641.5d4132e58d3c0_ae3590eb.jpeg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/aaaaaa-2(1)_b2083aae.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/s-02-2000x1519-1(1)_c9c5863c.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/posters_3d5cb432.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/s1(1)_d6038a28.gif' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/S-Drive-Design-Case-Study1(1)_b5a95fcf.gif' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/vS-Drive-Design-Case-Study_3020c507.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/ezgif-6-b8629a5cef27_02f09d4c.gif' },
      ]
    },
  ];

  const LOVE_METER_IMG = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/FqZUEkFKBDsqgrMJ.gif';
  const WHOOPEE_IMG = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/pZAmffwXWzvtAGVp.gif';
  const MOOD_CAL_IMG = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/BohndpCczayUhLRz.webp';
  const INSTAGRAM_UNLOCK_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/Screenshot2026-03-12at8.53.47PM_a3120d72.webp';

  const experiments = [
    {
      id: 'mood-calendar',
      title: '(04) Mood Calendar',
      tagline: 'TRACK YOUR EMOTIONS VISUALLY',
      description: 'A vibe-coding experiment that visualizes your daily mood patterns through generative art.',
      tags: ['Creative Coding', 'Data Viz'],
      hoverImg: MOOD_CAL_IMG,
      media: [
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/BohndpCczayUhLRz.webp', maxWidth: 'min(500px, 80vw)' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/eTLpEhXQdCMMsErK.png', maxWidth: 'min(400px, 70vw)' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/gehppVuuZNgkbJhJ.png', maxWidth: 'min(400px, 70vw)' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/YYedkQnLKbLlcwVh.png', maxWidth: 'min(400px, 70vw)' },
      ] as { type: string; url: string; [key: string]: any }[]
    },
    {
      id: 'love-meter',
      title: '(05) Love-O-Meter',
      tagline: 'HOW MUCH DOES BRUNO LOVE JOCELYN?',
      description: 'A vibe-coded love meter that answers the most important question.',
      tags: ['Fun', 'Personal'],
      hoverImg: LOVE_METER_IMG,
      media: [
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/FqZUEkFKBDsqgrMJ.gif', maxWidth: 'min(500px, 80vw)' },
      ] as { type: string; url: string; [key: string]: any }[]
    },
    {
      id: 'poster-3d',
      title: '(06) Poster.3D',
      tagline: 'TURN ANY IMAGE INTO A 3D ROTATING ANIMATION',
      description: 'Browser-based tool that takes any static image (JPEG, PNG, or WebP) and instantly transforms it into a 3D rotating animation — rendered in real-time using WebGL (Three.js). No server, no upload to any cloud, no account needed. Everything runs entirely in your browser.',
      tags: ['Creative Coding', 'WebGL', 'Tool'],
      hoverImg: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/pAQzwsyJJllvdawh.gif',
      linkHref: 'https://poster3d-cseabzsj.manus.space/',
      linkText: 'Try it at poster3d-cseabzsj.manus.space',
      media: [
        { type: 'video', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/TbXMAtuGNhKslUEa.mov' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/pAQzwsyJJllvdawh.gif', maxWidth: 'min(600px, 90vw)' },
      ] as { type: string; url: string; [key: string]: any }[]
    },
    {
      id: 'whoopee-cushion',
      title: '(07) The Whoopinator',
      tagline: 'DIGITAL PRANKS REIMAGINED',
      description: 'A playful web experiment bringing classic pranks into the digital age.',
      tags: ['Fun', 'Audio'],
      hoverImg: WHOOPEE_IMG,
      media: [
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/pZAmffwXWzvtAGVp.gif', maxWidth: 'min(600px, 90vw)' },
      ] as { type: string; url: string; [key: string]: any }[]
    },
    {
      id: 'instagram-unlocker',
      title: '(08) Learn to Unlock',
      tagline: 'EARN YOUR SCREEN TIME',
      description: 'Answer trivia questions to unlock Instagram for 10 minutes. A quiz-gated social media timer.',
      tags: ['Social Media', 'Tool'],
      hoverImg: INSTAGRAM_UNLOCK_IMG,
      media: [] as { type: string; url: string }[]
    },
  ];

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <div className="p-6 h-full overflow-y-auto" style={{background:"#000000",color:"#ffffff"}}>
      {/* Interactive Experiences Section */}
      <h2 className="text-[11px] font-bold uppercase mb-4 text-center">INTERACTIVE</h2>
      <div>
        {interactiveProjects.map((project) => (
          <div key={project.id}>
            <button
              onClick={() => toggleProject(project.id)}
              onMouseEnter={() => (project.id === 'samsung-diplo' || project.id === 'mcdonalds-emlings' || project.id === 'samsung-s-drive') && setHoverImage({ show: true, x: 0, y: 0, projectId: project.id })}
              onMouseLeave={() => (project.id === 'samsung-diplo' || project.id === 'mcdonalds-emlings' || project.id === 'samsung-s-drive') && setHoverImage({ show: false, x: 0, y: 0 })}
              onMouseMove={(e) => {
                if (project.id === 'samsung-diplo' || project.id === 'mcdonalds-emlings' || project.id === 'samsung-s-drive') {
                  setHoverImage({ show: true, x: e.clientX, y: e.clientY, projectId: project.id });
                }
              }}
              className="w-full text-left py-2 flex items-baseline group relative outline-none focus:outline-none"
            >
              <span className={`text-[11px] font-bold uppercase transition-colors flex-shrink-0 ${
                expandedProject === project.id 
                  ? 'bg-[#ffffff] text-[#000000] px-1' 
                  : 'group-hover:bg-[#ffffff] group-hover:text-[#000000] group-hover:px-1'
              }`}>
                {project.title.replace(/^\(\d+\)\s*/, '')}
              </span>
              <span className="flex-1 border-b-[2px] border-dotted border-[#ffffff] mx-2"></span>
              <span className="text-[11px] font-bold uppercase flex-shrink-0">
                {project.title.match(/^\((\d+)\)/)?.[0] || ''}
              </span>
            </button>
            
            {expandedProject === project.id && (
              <div className="pb-6" style={{background:"#000000",color:"#ffffff"}}>
                <p className="text-[11px] font-bold uppercase mb-2">{project.tagline}</p>
                <p className="text-[11px] mb-2">{project.description}</p>
                {((project as any).agency || (project as any).production) && (
                  <p className="text-[9px] uppercase mb-6 opacity-70 tracking-wide">
                    {(project as any).agency && <span>[{(project as any).agency}]</span>}
                    {(project as any).agency && (project as any).production && ' '}
                    {(project as any).production && <span>[{(project as any).production}]</span>}
                  </p>
                )}

                {/* Flat Carousel with Arrow Navigation */}
                {project.media.length > 0 && (() => {
                  const currentIndex = carouselIndex[project.id] || 0;
                  const totalItems = project.media.length;
                  
                  const nextSlide = () => {
                    if (carouselRefs.current[project.id]) {
                      carouselRefs.current[project.id]!.scrollBy({ left: 320, behavior: 'smooth' });
                    }
                  };
                  
                  const prevSlide = () => {
                    if (carouselRefs.current[project.id]) {
                      carouselRefs.current[project.id]!.scrollBy({ left: -320, behavior: 'smooth' });
                    }
                  };
                  
                  return (
                    <div>
                      {/* Two-row grid layout */}
                      <div className="flex flex-wrap gap-6">
                          {project.media.map((item, idx) => {
                            const videoId = item.url ? `${project.id}-${idx}` : '';
                            const isLoaded = loadedVideos.has(videoId);
                            
                            return (
                            <div key={idx} className="flex flex-col gap-2">
                              <div
                                className="relative"
                                style={{ 
                                  backgroundColor: (
                    (project.id === 'mcdonalds-emlings' && (idx === 0 || idx === 1 || item.url?.includes('yzspyztZdyAMXtUk'))) 
                  ) ? 'transparent' : '#2C2C2C',
                  width: project.id === 'mcdonalds-emlings' 
                    ? (idx === 0 ? 'min(640px, 70vw)' : idx === 1 ? 'min(220px, 28vw)' : idx === 2 ? 'min(320px, 40vw)' : (item.url?.endsWith('.gif') ? 'min(250px, 30vw)' : 'min(200px, 25vw)'))
                    : project.id === 'samsung-diplo'
                      ? (item.type === 'video' && 'videoWidth' in item ? String(item.videoWidth) : (item.url?.endsWith('.gif') ? 'min(160px, 20vw)' : 'min(320px, 40vw)'))
                    : 'min(320px, 40vw)',
                  aspectRatio: project.id === 'mcdonalds-emlings'
                    ? (idx === 0 ? '16/9' : idx === 1 ? 'auto' : '16/9')
                    : '16/9',
                  height: (project.id === 'mcdonalds-emlings' && idx === 1) ? 'auto' : undefined 
                                }}
                              >
                                {item.url ? (
                                  <>
                                    {item.type === 'video' ? (
                                      <>
                                        {!isLoaded && (
                                          <div className="absolute inset-0 flex items-center justify-center pixelated-loading">
                                            <div className="w-full h-full" style={{
                                              backgroundImage: `
                                                repeating-linear-gradient(
                                                  0deg,
                                                  #000000 0px,
                                                  #000000 16px,
                                                  #ffffff 16px,
                                                  #ffffff 32px
                                                ),
                                                repeating-linear-gradient(
                                                  90deg,
                                                  #000000 0px,
                                                  #000000 16px,
                                                  #ffffff 16px,
                                                  #ffffff 32px
                                                )
                                              `,
                                              backgroundSize: '32px 32px',
                                              animation: 'pixelate 1.5s infinite'
                                            }} />
                                          </div>
                                        )}
                                        <iframe
                                          src={`https://player.vimeo.com/video/${item.url.split('/').pop()}`}
                                          className={`w-full h-full ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
                                          frameBorder="0"
                                          allow="autoplay; fullscreen; picture-in-picture"
                                          allowFullScreen
                                          onLoad={() => {
                                            setLoadedVideos(prev => new Set(prev).add(videoId));
                                          }}
                                        />
                                      </>
                                    ) : (
                                      <img
                                        src={item.url}
                                        alt="Project media"
                                        className="w-full h-full object-cover animate-fade-in"
                                        onLoad={() => {
                                          setLoadedVideos(prev => new Set(prev).add(videoId));
                                        }}
                                      />
                                    )}
                                  </>
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-xs font-bold" style={{ color: '#FF1493' }}>
                                      {'placeholder' in item ? String(item.placeholder) : 'MEDIA HERE'}
                                    </span>
                                  </div>
                                )}
                              </div>
                              {item.url && isLoaded && (
                                <button
                                  onClick={() => {
                                    if (item.type === 'video') {
                                      const videoId = item.url.split('/').pop();
                                      setModalVideoUrl(`https://player.vimeo.com/video/${videoId}?autoplay=1`);
                                    } else {
                                      setModalVideoUrl(item.url);
                                    }
                                  }}
                                  className="text-[9px] font-bold uppercase hover:underline cursor-pointer"
                                >
                                  [Enlarge]
                                </button>
                              )}
                            </div>
                          );
                          })}
                        </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Experiments Section */}
      <h2 className="text-[11px] font-bold uppercase mb-4 mt-8 text-center">EXPERIMENTS [VIBE-CODING]</h2>
      <div>
        {experiments.map((project) => (
          <div key={project.id}>
            <button
              onClick={() => toggleProject(project.id)}
              onMouseEnter={(e) => project.hoverImg && setHoverImage({ show: true, x: e.clientX, y: e.clientY, projectId: project.id })}
              onMouseLeave={() => setHoverImage({ show: false, x: 0, y: 0 })}
              onMouseMove={(e) => project.hoverImg && setHoverImage({ show: true, x: e.clientX, y: e.clientY, projectId: project.id })}
              className="w-full text-left py-2 flex items-baseline group relative outline-none focus:outline-none"
            >
              <span className={`text-[11px] font-bold uppercase transition-colors flex-shrink-0 ${
                expandedProject === project.id 
                  ? 'bg-[#ffffff] text-[#000000] px-1' 
                  : 'group-hover:bg-[#ffffff] group-hover:text-[#000000] group-hover:px-1'
              }`}>
                {project.title.replace(/^\(\d+\)\s*/, '')}
              </span>
              <span className="flex-1 border-b-[2px] border-dotted border-[#ffffff] mx-2"></span>
              <span className="text-[11px] font-bold uppercase flex-shrink-0">
                {project.title.match(/^\((\d+)\)/)?.[0] || ''}
              </span>
            </button>
            
            {expandedProject === project.id && (
              <div className="pb-6" style={{background:"#000000",color:"#ffffff"}}>
                <p className="text-[11px] font-bold uppercase mb-2">{project.tagline}</p>
                <p className="text-[11px] mb-2">{project.description}</p>
                {(project as any).linkHref && (
                  <p className="text-[11px] mb-4">
                    <a href={(project as any).linkHref} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                      {(project as any).linkText || (project as any).linkHref}
                    </a>
                  </p>
                )}
                {((project as any).agency || (project as any).production) && (
                  <p className="text-[9px] uppercase mb-6 opacity-70 tracking-wide">
                    {(project as any).agency && <span>[{(project as any).agency}]</span>}
                    {(project as any).agency && (project as any).production && ' '}
                    {(project as any).production && <span>[{(project as any).production}]</span>}
                  </p>
                )}
                {(project as any).media && (project as any).media.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-4">
                    {(project as any).media.map((item: any, idx: number) => (
                      <div key={idx}>
                        {(item.type === 'mp4' || item.type === 'mov') ? (
                          <video
                            src={item.url}
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                            style={{ width: item.videoWidth || 'min(400px, 70vw)', aspectRatio: item.aspectRatio || '9/16' }}
                          />
                        ) : item.type === 'image' ? (
                          <img src={item.url} alt="" style={{ maxWidth: item.maxWidth || '400px' }} />
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Video Modal Overlay */}
      {modalVideoUrl && (
        <div
          className="fixed inset-0 flex flex-col items-end justify-start z-[200] p-4" style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setModalVideoUrl(null)}
        >
          <button onClick={() => setModalVideoUrl(null)} className="text-[11px] font-bold uppercase hover:underline px-2 py-1 text-white mb-2 flex-shrink-0">[CLOSE]</button>
          <div className="flex-1 w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {modalVideoUrl.includes('vimeo.com') ? (
              <div style={{ width: 'min(90vw, 1200px)', aspectRatio: '16/9' }}>
                <iframe src={modalVideoUrl} className="w-full h-full" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              </div>
            ) : (
              <img src={modalVideoUrl} alt="Enlarged media" style={{ maxWidth: '90vw', maxHeight: 'calc(100vh - 60px)', display: 'block' }} className="object-contain" />
            )}
          </div>
        </div>
      )}

      {/* Mouse-following hover image */}
      {hoverImage.show && (() => {
        const experimentHoverImg = experiments.find(e => e.id === hoverImage.projectId)?.hoverImg;
        const interactiveHoverImg = hoverImage.projectId === 'mcdonalds-emlings'
          ? 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/TNZWkPVBhCIAWaPU.gif'
          : hoverImage.projectId === 'samsung-s-drive'
          ? 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/49424455075641.5d4132e539b75_4c6ca02e.gif'
          : 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/LnEmDtMqVIVPRBLC.gif';
        const mediaSrc = experimentHoverImg || interactiveHoverImg;
        const isExperiment = !!experimentHoverImg;
        const isVideo = mediaSrc.endsWith('.mov') || mediaSrc.endsWith('.mp4');
        return (
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: `${hoverImage.x + 20}px`,
              top: `${hoverImage.y + 20}px`,
              transform: 'translate(0, 0)'
            }}
          >
            {isVideo ? (
              <video
                src={mediaSrc}
                autoPlay
                loop
                muted
                playsInline
                className={isExperiment ? 'w-[160px] h-auto' : 'w-[120px] h-auto'}
              />
            ) : (
              <img
                src={mediaSrc}
                alt="Project preview"
                className={isExperiment ? 'w-[160px] h-auto' : 'w-[120px] h-auto'}
              />
            )}
          </div>
        );
      })()}
    </div>
  );
}

// Social and PR
export function SocialContent({ activeTags = [], onTagClick, initialExpandedProject }: ContentProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(initialExpandedProject ?? null);
  const [modalVideoUrl, setModalVideoUrl] = useState<string | null>(null);
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const [hoverImage, setHoverImage] = useState<{ show: boolean; x: number; y: number; projectId?: string }>({ show: false, x: 0, y: 0 });
  const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const projects = [
    {
      id: 'social-01',
      title: '(01) @Zuck',
      tagline: '',
      description: '',
      tags: ['Social', 'PR'],
      hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/download(8)_c34ba657.jpeg',
      media: [] as { type: string; url: string }[]
    },
    {
      id: 'social-02',
      title: '(02) Facebook (I Wanna Rock)',
      tagline: 'WHATEVER YOU ROCK, THERE\'S A FACEBOOK GROUP FOR YOU',
      description: 'This campaign seeks to show the diversity of Facebook Groups through the lens of Rock. Whether you like to paint on rocks, collect rock crystals or rock out with 80\'s rock stars — there\'s a Facebook group for you.',
      agency: 'Agency: Meta Creative X',
      production: 'Production Company: Iconoclast',
      tags: ['Social', 'Facebook'],
      hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/ezgif-6-525ea5da065d(1)_4b841a17.gif',
      media: [
        { type: 'vimeo', url: 'https://player.vimeo.com/video/435655934?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/435655396?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/435655053?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/435654761?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/mood-2000x1251_5c73fc1f.jpg' },
      ] as { type: string; url: string; aspectRatio?: string }[]
    },
    {
      id: 'social-03',
      title: '(03) Facebook (House of Horrors)',
      tagline: 'HALLOWEEN TIPS FROM HALLOWEEN EXPERTS',
      description: 'With Halloween being one of the biggest and busiest moments on the platform, the community is always eager for tips and tricks. So we thought who better to give Halloween advice and inspiration, than Facebook "Halloween" Groups?\n\nWe brought together Halloween themed Groups, and under one roof, to share their tips, tricks and insights from the Wonderful House of Horrors.',
      agency: 'Agency: Meta Creative X',
      production: 'Production Company: Scholar',
      tags: ['Social', 'Facebook'],
      hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/ezgif-80d9ca958b65d964_9784c73e.gif',
      media: [
        { type: 'vimeo', url: 'https://player.vimeo.com/video/371704647?badge=0&autopause=0&player_id=0&app_id=58479', aspectRatio: '4/5' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/371744962?badge=0&autopause=0&player_id=0&app_id=58479', aspectRatio: '4/5' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/371704689?badge=0&autopause=0&player_id=0&app_id=58479', aspectRatio: '4/5' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/371704672?badge=0&autopause=0&player_id=0&app_id=58479', aspectRatio: '4/5' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/jjh-copy-1-2000x2501_2b1bad90.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/fb_halloween_hauntedhouse_interior_v1_001-1535x1920(1)_d20c9b0a.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/jjh-2000x2501(1)_c3875392.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_dining_food-1920x1500_e9071cea.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_dining_table_set-1920x1500_5bea1b1c.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_lab_vials-1920x1500_a7cd8d42.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_lab_tank_cabinet-1920x1500_1919cd0c.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_attic_stairs_detail-1920x1500_cca3aae6.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_attic_lights-1920x1500_c7724193.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_study_mgk_sheet01-1920x1500(1)_c06ad717.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_study_sheet04_astronomyroom-1920x1500_f37680c4.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/int_all_windows-1920x1500(1)_80ef703e.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/mouth_mask1-1-2000x1125(1)_bcaa547f.jpg' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/371745605?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/371745632?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/371745670?badge=0&autopause=0&player_id=0&app_id=58479' },
      ] as { type: string; url: string; aspectRatio?: string }[]
    },

    {
      id: 'facebook-mindfull',
      title: '(04) Facebook (Mindfull)',
      tagline: 'FIND YOUR CALM AND FOCUS',
      description: 'The arrival of COVID19 has created a heightened amount of fear, stress and anxiety for everyone. Increasingly, people are looking to their community for help and support as we continue to weather this storm together. In response, we felt it was important to create a content series about well-being and mental health to help our community get through the pressures of being inside and at home.',
      agency: 'Agency: Meta Creative X',
      production: 'Production Company: Buck',
      tags: ['Social', 'Facebook'],
      hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/ezgif-6-9da134f664ea(1)_bb4e7901.gif',
      media: [
        { type: 'vimeo', url: 'https://player.vimeo.com/video/429384060?badge=0&autopause=0&player_id=0&app_id=58479', aspectRatio: '4/5' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/432946376?badge=0&autopause=0&player_id=0&app_id=58479', aspectRatio: '4/5' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/429384778?badge=0&autopause=0&player_id=0&app_id=58479', aspectRatio: '4/5' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/432946669?badge=0&autopause=0&player_id=0&app_id=58479', aspectRatio: '4/5' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/432945889?badge=0&autopause=0&player_id=0&app_id=58479', aspectRatio: '4/5' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/429385150?badge=0&autopause=0&player_id=0&app_id=58479', aspectRatio: '4/5' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/432948234?badge=0&autopause=0&player_id=0&app_id=58479', aspectRatio: '4/5' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/everything-2000x1235_b21af245.png', maxWidth: '480px' },
      ] as { type: string; url: string; aspectRatio?: string }[]
    },
  ];

  return (
    <div className="p-6 h-full overflow-y-auto relative" style={{background:"#000000",color:"#ffffff"}}>
      {projects.map((project) => (
        <div key={project.id}>
          <button
            onClick={() => toggleProject(project.id)}
            onMouseEnter={(e) => project.hoverImg && setHoverImage({ show: true, x: e.clientX, y: e.clientY, projectId: project.id })}
            onMouseLeave={() => setHoverImage({ show: false, x: 0, y: 0 })}
            onMouseMove={(e) => project.hoverImg && setHoverImage({ show: true, x: e.clientX, y: e.clientY, projectId: project.id })}
            className="w-full text-left py-2 flex items-baseline group relative outline-none focus:outline-none"
          >
            <span className={`text-[11px] font-bold uppercase transition-colors flex-shrink-0 ${
              expandedProject === project.id
                ? 'bg-[#ffffff] text-[#000000] px-1'
                : 'group-hover:bg-[#ffffff] group-hover:text-[#000000] group-hover:px-1'
            }`}>
              {project.title.replace(/^\(\d+\)\s*/, '')}
            </span>
            <span className="flex-1 border-b-[2px] border-dotted border-[#ffffff] mx-2"></span>
            <span className="text-[11px] font-bold uppercase flex-shrink-0">
              {project.title.match(/^\((\d+)\)/)?.[0] || ''}
            </span>
          </button>
          {expandedProject === project.id && (
            <div className="pb-6" style={{background:"#000000",color:"#ffffff"}}>
              <p className="text-[11px] font-bold uppercase mb-2">{project.tagline}</p>
              <p className="text-[11px] mb-4">{project.description}</p>
              {((project as any).agency || (project as any).production) && (
                <p className="text-[9px] uppercase mb-6 opacity-70 tracking-wide">
                  {(project as any).agency && <span>[{(project as any).agency}]</span>}
                  {(project as any).agency && (project as any).production && ' '}
                  {(project as any).production && <span>[{(project as any).production}]</span>}
                </p>
              )}
              {project.media.length > 0 ? (
                <div className="flex flex-wrap gap-6 mt-4 items-start">
                  {project.media.map((item, idx) => {
                    const vid = `${project.id}-${idx}`;
                    const isLoaded = loadedVideos.has(vid);
                    const isImage = item.type === 'image';
                    const ar = (item as any).aspectRatio || '16/9';
                    const isPortrait = ar === '4/5';
                    return (
                      <div key={idx} className="flex flex-col gap-2">
                        {isImage ? (
                          <img
                            src={item.url}
                            alt=""
                            className="animate-fade-in block"
                            style={{ maxWidth: (item as any).maxWidth || 'min(480px, 55vw)', height: 'auto' }}
                            onLoad={() => setLoadedVideos(prev => new Set(prev).add(vid))}
                          />
                        ) : (
                          <div
                            className="relative overflow-hidden"
                            style={{ width: (item as any).videoWidth || (isPortrait ? 'min(340px, 38vw)' : 'min(480px, 55vw)'), aspectRatio: ar, background: 'transparent' }}
                          >
                            {!isLoaded && <div className="absolute inset-0 z-10" style={{ background: 'var(--background)' }} />}
                            {item.type === 'mp4' ? (
                              <video
                                src={item.url}
                                className={`w-full h-full ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
                                controls
                                playsInline
                                onLoadedData={() => setLoadedVideos(prev => new Set(prev).add(vid))}
                              />
                            ) : item.type === 'video' ? (
                              <iframe src={`https://player.vimeo.com/video/${item.url.split('/').pop()}`} className={`w-full h-full ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen onLoad={() => setLoadedVideos(prev => new Set(prev).add(vid))} />
                            ) : (
                              <iframe src={item.url} className={`w-full h-full ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen onLoad={() => setLoadedVideos(prev => new Set(prev).add(vid))} />
                            )}
                          </div>
                        )}
                        {isLoaded && (
                          <button onClick={() => setModalVideoUrl(isImage ? item.url : item.type === 'video' ? `https://player.vimeo.com/video/${item.url.split('/').pop()}?autoplay=1` : item.url)} className="text-[9px] font-bold uppercase hover:underline cursor-pointer">[Enlarge]</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-4 p-4 border-2 border-[#2C2C2C] bg-[#f5f5f5]"><p className="text-[11px] text-center">Media coming soon</p></div>
              )}
            </div>
          )}
        </div>
      ))}
      {modalVideoUrl && (
        <div className="fixed inset-0 flex flex-col items-end justify-start z-[200] p-4" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setModalVideoUrl(null)}>
          <button onClick={() => setModalVideoUrl(null)} className="text-[11px] font-bold uppercase hover:underline px-2 py-1 text-white mb-2 flex-shrink-0">[CLOSE]</button>
          <div className="flex-1 w-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            {modalVideoUrl.includes('vimeo.com') ? (
              <div style={{ width: 'min(90vw, 1200px)', aspectRatio: '16/9' }}>
                <iframe src={modalVideoUrl} className="w-full h-full" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              </div>
            ) : (
              <img src={modalVideoUrl} alt="Enlarged media" style={{ maxWidth: '90vw', maxHeight: 'calc(100vh - 60px)', display: 'block' }} className="object-contain" />
            )}
          </div>
        </div>
      )}
      {hoverImage.show && (
        <div className="fixed pointer-events-none z-50" style={{ left: `${hoverImage.x + 20}px`, top: `${hoverImage.y + 20}px` }}>
          <img src={projects.find(p => p.id === hoverImage.projectId)?.hoverImg || ''} alt="" className="w-[120px] h-auto" />
        </div>
      )}
    </div>
  );
}

// Shared image lists — used by both the content components and the INDEX carousel
export const DESIGN_IMAGES: string[] = [
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/GKOKBBEWJWOgIKmz.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/cZcqAGSLyHGmMNHg.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/DdGJGfqxUWJTHCvJ.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/FyqHMqmvjjxhqjPy.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/TfvUmqLWOOlhEAjb.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/nqTQwxGwGYLVJlON.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/BbTEqojjjMwOmlrL.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/YHDCxKvJYJPpCLqe.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/iqYBonZqmWxPRXeK.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/RoGZHllrZKhhPmSx.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/ikAEFvAhwNtlZcUf.jpeg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/HRfADZuRkpVAIRGF.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/xYjFuxxSfaVexjhu.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/jWVmacDwViOFVnxz.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/qcZpOlDZLQWvFJnn.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/ylxlgfUwjglHIWKx.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/mHYCQEIhOwEJJpDX.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/pyILPYBNnXORNCvT.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/BaENksRKniPOriHn.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/aGTRTXAxeDnLPHEl.png',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/lYHYUpYCrcJIZtnJ.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/SbhaBiaNdqDpeSkX.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/DyQZWqbNeMUFxnql.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/EjYehCMBdEQIISbw.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/sZieRfucMNfLovHe.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/oYkNTsngBDsfIDxJ.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/vAlWXNZMuZUgZUDK.png',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/raCCxjgejvWNkygi.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/QwUNGkfWmZnbjzHE.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/blGqQqSbJZykJATN.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/dTVTvaBJUkupfEca.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/VdrQzKcjgmKUQWrJ.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/PKpRbGZalSdjpDhV.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/PjXYupTrGcMYIpav.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/IELgILuOprsxNGEo.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/JolHiwkJPGeyUKEf.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/OVjPGatNixMKTYkH.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/dOiFgqyjhmKFNQpt.png',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/esmAKHGtUYkvULqj.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/DKGnTbLeIrXkpTuN.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/KCuqdrPubDFsBPgb.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/WeIwaIsaFJGhHxcH.jpg',
];

export const POTTERY_IMAGES: string[] = [
  'https://freight.cargo.site/w/500/i/3edd9d13ab40d8b9251b0f8b2092f15e6275719ddb82f6928d74a63a6022d684/KODAK-200-5-of-38.jpg',
  'https://freight.cargo.site/w/500/i/730242274cf178eface26d4fb439c57537af10bcbd3af48039d33551c41cce90/03.JPG',
  'https://freight.cargo.site/w/500/i/8fb8013f9ac3931bd8f1681e4e9b43be6e2992eb44563c2ad1c1a6e9c09841ff/Snapinsta.app_367361112_794386825749845_3041882079062117529_n_1080.jpg',
  'https://freight.cargo.site/w/500/i/2a1a960ae5ffa6ecbd63182ee2da9411eeb6cff17fd80148678c7096c104ec02/DSC08677.jpg',
  'https://freight.cargo.site/w/500/i/58b30479bcf45ac1221a93f0fb1e4228f206c814ced2e60c0e5858ae0489edec/Snapinsta.app_367037634_756500866249869_6481214663538332849_n_1080.jpg',
  'https://freight.cargo.site/w/500/i/22d7622a7bdcc2257e016aca9a9cd0e06187382beda9d2c3425b282c86ce09c4/Made-this-wooden-chair-with-Marcio--a-craftsman-based-in-Paraty--Rio-de-Janeiro.-For-generations-3.jpg',
  'https://freight.cargo.site/w/500/i/2fb8c2ede2d8491e21ba6bb6fb1b6de624228fad78dc921311ec31af564248b5/mezcal.jpg',
  'https://freight.cargo.site/w/500/i/dccc9d9bb3e5d3751176612270054eb4a180fe9d90441efd4a6883b585f5e773/Snapinsta.app_407575311_1093064738276849_3352866088452037380_n_1080.jpg',
  'https://freight.cargo.site/w/500/i/43f4eed731eef37fbfff7430215f9adcac8a985b7c787059464013e9000b4aff/studiomano05-1.jpg',
  'https://freight.cargo.site/w/500/i/fb7a7309aa40df37fa7969a0477beafc6f8a8d3a02896f92edbe6411a1609f05/website_0006_Layer-135.jpg',
  'https://freight.cargo.site/w/500/i/b4941930de5ea3d103017e20fdaaa3d4b4959d2bbbb7eec8d333a7e678d99b81/tile02low.jpg',
  'https://freight.cargo.site/w/500/i/761488590145548fef4ac9dff40d9f04515614b4bb3a279a1c93042c0ad47b1c/website_0005_Layer-133.jpg',
  'https://freight.cargo.site/w/500/i/b71a014b5e1cfa04c3122779182a98ed046508f3b936a05ce0aa40b730611e22/website_0006_Group-1.jpg',
  'https://freight.cargo.site/w/500/i/502e142d3aceb7fbd1dfbfe5b6ba3873e435fc9910e82d2e2c7867155bffb111/toro01.jpg',
  'https://freight.cargo.site/w/500/i/a53b7b9b1b39245bb2dde62fd84480df43e0e374a933ad84e8ae1d01e0b2690d/Snapinsta.app_397128198_2699441313565605_7136852584015873761_n_1080.jpg',
  'https://freight.cargo.site/w/500/i/799637ce2408014b0ee98e21c48d6e1fa8a3a82b203fdcd265576256f389a248/4x5_01.jpg',
  'https://freight.cargo.site/w/500/i/1aaf13e6244c7ac09aa9e1a72ddb425523713a7dd522c400a78dde0ac4eb1d2b/IMG_02332.jpg',
  'https://freight.cargo.site/w/500/i/e2c0022ea8ae941088a456c257311c17ff553b2e53b2267f8f98e287ad4b6159/tile-copy.jpg',
  'https://freight.cargo.site/w/500/i/0077bdcfcc8ed92a26220099fb1f1fcad87a401ea8b2a39bb2b73d0faaed610f/LADW_0004_Group-3-copy.jpg',
  'https://freight.cargo.site/w/500/i/a1d33fed935abe8e1cd5e27dd7b6436c026b0c7ec4845f149baa4e3272ab911d/This-is-America_Studio-Mano_The-Climate-Refugees_Credit-Jonathan-Hokklo-copy.jpeg',
  'https://freight.cargo.site/w/500/i/b6b1c0adb68600a937b70d513cf004b7674033cbda543a09896a0ef95c8c12e7/Made-this-wooden-chair-with-Marcio--a-craftsman-based-in-Paraty--Rio-de-Janeiro.-For-generations-2.jpg',
  'https://freight.cargo.site/w/500/i/1c10105eddbd80c356e553ac818fdb63973d360d1da951c1ee184eb49405e493/tile03low.jpg',
  'https://freight.cargo.site/w/500/i/def30a285bf58bcd42cfbf0ecf62e73eeccb03b9af744dbe9be4fbe2409fe367/Made-this-wooden-chair-with-Marcio--a-craftsman-based-in-Paraty--Rio-de-Janeiro.-For-generations-1.jpg',
  'https://freight.cargo.site/w/500/i/146a7c6591bffd8c0d6e94ff5d7921986f2c906cab8498a7cbb95d843cd5943e/promez.jpg',
  'https://freight.cargo.site/w/500/i/f7f3480e98058d9a8377b8e8b5b3448bc2f4f1eefad3f1add201bd13d916b1e4/oncapintada.jpg',
  'https://freight.cargo.site/w/500/i/59c154a0641aca34a26a1c3acdbb5878d9361995a1f3c87b9ee4d728be976710/DSCF0333-copy.jpg',
  'https://freight.cargo.site/w/500/i/116b60476db46ad340c025614023c6a92f9414212a93827108deb4d8c78eda46/toro03.jpg',
  'https://freight.cargo.site/w/500/i/488ca56b8d9f557005a398a72ceaa5937a3bfddf8484de084e2a4be82fb47ea1/Snapinsta.app_396567091_873442487563577_4738128618748587376_n_1080.jpg',
];

// Design and Illustration
export function DesignContent({ activeTags = [], onTagClick }: ContentProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const columnRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  // Randomize images on mount
  const [shuffledImages] = useState(() => {
    const imageArray = [
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/GKOKBBEWJWOgIKmz.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/cZcqAGSLyHGmMNHg.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/DdGJGfqxUWJTHCvJ.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/FyqHMqmvjjxhqjPy.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/TfvUmqLWOOlhEAjb.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/nqTQwxGwGYLVJlON.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/BbTEqojjjMwOmlrL.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/YHDCxKvJYJPpCLqe.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/iqYBonZqmWxPRXeK.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/RoGZHllrZKhhPmSx.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/ikAEFvAhwNtlZcUf.jpeg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/HRfADZuRkpVAIRGF.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/xYjFuxxSfaVexjhu.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/jWVmacDwViOFVnxz.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/qcZpOlDZLQWvFJnn.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/ylxlgfUwjglHIWKx.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/mHYCQEIhOwEJJpDX.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/pyILPYBNnXORNCvT.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/BaENksRKniPOriHn.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/aGTRTXAxeDnLPHEl.png',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/lYHYUpYCrcJIZtnJ.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/SbhaBiaNdqDpeSkX.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/DyQZWqbNeMUFxnql.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/EjYehCMBdEQIISbw.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/sZieRfucMNfLovHe.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/oYkNTsngBDsfIDxJ.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/vAlWXNZMuZUgZUDK.png',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/raCCxjgejvWNkygi.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/QwUNGkfWmZnbjzHE.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/blGqQqSbJZykJATN.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/dTVTvaBJUkupfEca.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/VdrQzKcjgmKUQWrJ.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/PKpRbGZalSdjpDhV.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/PjXYupTrGcMYIpav.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/IELgILuOprsxNGEo.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/JolHiwkJPGeyUKEf.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/OVjPGatNixMKTYkH.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/dOiFgqyjhmKFNQpt.png',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/esmAKHGtUYkvULqj.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/DKGnTbLeIrXkpTuN.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/KCuqdrPubDFsBPgb.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/WeIwaIsaFJGhHxcH.jpg',
    ];
    // Fisher-Yates shuffle
    for (let i = imageArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imageArray[i], imageArray[j]] = [imageArray[j], imageArray[i]];
    }
    return imageArray;
  });

  // Auto-scroll columns continuously
  useEffect(() => {
    const scrollSpeeds = [0.3, -0.4, 0.35]; // Different speeds, opposite directions
    const intervals: NodeJS.Timeout[] = [];

    columnRefs.forEach((ref, colIdx) => {
      if (ref.current) {
        const interval = setInterval(() => {
          if (ref.current) {
            ref.current.scrollTop += scrollSpeeds[colIdx];
            // Loop back to top/bottom
            if (scrollSpeeds[colIdx] > 0 && ref.current.scrollTop >= ref.current.scrollHeight - ref.current.clientHeight) {
              ref.current.scrollTop = 0;
            } else if (scrollSpeeds[colIdx] < 0 && ref.current.scrollTop <= 0) {
              ref.current.scrollTop = ref.current.scrollHeight;
            }
          }
        }, 16); // ~60fps
        intervals.push(interval);
      }
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const images = shuffledImages;

  return (
    <>
      <div className="p-4 overflow-visible">
        <div className="flex gap-8">
          {/* Column 1 */}
          <div ref={columnRefs[0]} className="flex-1 space-y-4 overflow-y-auto h-[80vh]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {images.filter((_, idx) => idx % 3 === 0).map((img, originalIdx) => {
              const idx = images.findIndex(i => i === img);
              return (
                <div
                  key={idx}
                  className="cursor-pointer" style={{ background:"#000000", marginTop: originalIdx % 3 === 0 ? '0' : originalIdx % 3 === 1 ? '80px' : '40px', transform: 'scale(0.7)' }}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`Design ${idx + 1}`}
                    className="w-full h-auto block"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Column 2 */}
          <div ref={columnRefs[1]} className="flex-1 space-y-4 overflow-y-auto h-[80vh]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {images.filter((_, idx) => idx % 3 === 1).map((img, originalIdx) => {
              const idx = images.findIndex(i => i === img);
              return (
                <div
                  key={idx}
                  className="cursor-pointer" style={{ background:"#000000", marginTop: originalIdx % 3 === 0 ? '120px' : originalIdx % 3 === 1 ? '0' : '60px', transform: 'scale(0.7)' }}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`Design ${idx + 1}`}
                    className="w-full h-auto block"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Column 3 */}
          <div ref={columnRefs[2]} className="flex-1 space-y-4 overflow-y-auto h-[80vh]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {images.filter((_, idx) => idx % 3 === 2).map((img, originalIdx) => {
              const idx = images.findIndex(i => i === img);
              return (
                <div
                  key={idx}
                  className="cursor-pointer" style={{ background:"#000000", marginTop: originalIdx % 3 === 0 ? '60px' : originalIdx % 3 === 1 ? '100px' : '20px', transform: 'scale(0.7)' }}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`Design ${idx + 1}`}
                    className="w-full h-auto block"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-end justify-start p-4" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="text-[11px] font-bold uppercase hover:underline px-2 py-1 text-white mb-2 flex-shrink-0"
          >
            [CLOSE]
          </button>
          <div className="flex-1 w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Full size"
              className="object-contain"
              style={{ maxWidth: '90vw', maxHeight: 'calc(100vh - 60px)' }}
            />
          </div>
        </div>
      )}
    </>
  );
}



// Campaign
export function CampaignContent({ activeTags = [], onTagClick, initialExpandedProject }: ContentProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(initialExpandedProject ?? null);
  const [modalVideoUrl, setModalVideoUrl] = useState<string | null>(null);
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const [hoverImage, setHoverImage] = useState<{ show: boolean; x: number; y: number; projectId?: string }>({ show: false, x: 0, y: 0 });
  const [carouselIndex, setCarouselIndex] = useState<{ [key: string]: number }>({});
  const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const campaigns = [
    {
      id: 'facebook-eoy',
      title: "(01) Facebook [End of the Year]",
      tagline: "A YEAR TO REMEMBER, AND A YEAR TO FORGET",
      description: "At the end of 2020, we created a film that showed how we will never forget the ways people showed up for each other and their communities throughout the year, helping us find comfort in discomfort and strength in one another.",
      agency: "In-House Agency: Meta Creative X",
      production: "Production Company: Stink LA",
      tags: ['Campaign', 'Social', 'Video'],
      hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/11111_ac2b5ad0.jpg',
      media: [
        { type: 'vimeo', url: 'https://player.vimeo.com/video/508194471?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/Adweek-01_1340_c_b06a9bd0.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/Adweek-02_1340_c_d5b3494c.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/Adweek-03_1340_c_d840ea73.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/Adweek-04_1340_c_cf29b955.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/Adweek-05_1340_c_d6f710bc.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/Hivemind_new_1000_9ec57d71.jpg' },
      ]
    },
    {
      id: 'libero-football',
      title: '(02) Libero Magazine [Football Analogies]',
      tagline: 'A CAMPAIGN WHERE WOMEN EXPLAIN TO MEN EVERY DAY SITUATIONS THROUGH FOOTBALL ANALOGIES',
      description: '"If they explain it to you with football, you get it" is the concept created by the agency to put across the message that Líbero is not just a football magazine, but also one that uses the world\'s most popular sport to talk about other topics such as culture, art and style, among others.',
      agency: 'Agency: Lola Madrid',
      production: 'Production Company: Blur',
      tags: ['Campaign', 'Film', 'Football'],
      hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/football-analogies-libero-magazine-1_0f1359f7.gif',
      media: [
        { type: 'vimeo', url: 'https://player.vimeo.com/video/1170568733?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/1170568802?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/1170568786?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/1170568766?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/screen-shot-2018-05-17-at-10.46.07-pm-copy-2000x1707_d3076bcf.jpg' },
      ]
    },
    {
      id: 'levis-vote',
      title: "(03) Levi's [Use Your Vote]",
      tagline: 'VOTING LOOKS GOOD ON EVERYONE',
      description: "We mashed up what feels like a National Geographic documentary with a music video to remind Americans that voting isn't just a chore, but a powerful form of self-expression.\n\nBut we didn't just make a film. We also turned stores into registration centers, made custom clothes, got employers to give employees time off to vote, and a whole bunch more—all to actually make a difference and get people to express themselves on election day.",
      agency: 'Agency: FCB West',
      production: 'Production Company: Radical Media',
      tags: ['Campaign', 'Social Impact', 'Brand'],
      hoverImg: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/iNGsyYpiapxyHSKi.webp',
      media: [
        { type: 'vimeo', url: 'https://player.vimeo.com/video/1170893097?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/306292196?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/p01-1158x1637_cb835cf8.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/p02-1158x1637_dfe756f3.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/p05-1158x1637_faed9496.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/p07-1158x1637_2f0314d4.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/mooood_dbed463e.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/tweeet-2000x996_53e8e0f9.png' },
      ]
    },
    {
      id: 'samsung-unbox',
      title: '(04) Samsung [Unbox your Phone]',
      tagline: 'S8 LAUNCH CAMPAIGN',
      description: "The new Galaxy S8 has the world's first Infinity Screen – an expansive display that stretches all the way to the edges of the device and makes everything feel more immersive.\n\nTo capture this feeling, the launch campaign features a series of tranquil nature scenes that begin within the confines of a traditional phone screen, but then break free from these barriers",
      agency: 'Agency: R/GA NY',
      production: 'Production Company: Radical Media',
      vfx: 'VFX: The Mill',
      tags: ['Campaign', 'Product', 'Digital'],
      hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/ezgif-6-93a9b73094d5(1)_cb611700.gif',
      media: [
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/aaaa-2000x1380_8746a43f.jpg' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/217187282?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/KV-MOTORCYCLE-0328_a4c47c47.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/image-asset-3_9dc34a40.jpeg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/image-asset_8ae1229d.png' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/image-asset-2_250d46ed.jpeg' },
      ] as { type: string; url: string }[]
    },
    {
      id: 'wwf-just',
      title: '(05) WWF [Just*]',
      tagline: 'WHAT YOU NEED, NATURALLY',
      description: 'just* is a WWF initiative created to show that there are often simple and natural alternatives to many of the products we use every day - products that require packaging that uses up resources and often end up as landfill.\n\nA few simple steps are all it takes to make small changes that, when done by many, can help create a cleaner and more sustainable future.',
      agency: 'Agency: Leo Burnett Sydney',
      production: 'Production Company: Rapid Films',
      tags: ['Campaign', 'Film', 'Sustainability'],
      hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/Screenshot2026-03-14at7.25.46PM_d7268fba.webp',
      media: [
        { type: 'vimeo', url: 'https://player.vimeo.com/video/286728221?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/286728178?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/286728142?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/286728073?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/286727955?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/286727917?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/286727866?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/286727786?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/286727709?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/286727673?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/286727603?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/286727384?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/ezgif-6-adf1265cdcd1_838c0a00.gif' },
      ]
    },
    {
      id: 'facebook-real-story',
      title: '(06) Facebook (A Real Facebook Story)',
      tagline: 'REAL STORIES. TOLD AUTHENTICALLY 👩🏽🧑🏼‍🦱🧓🏻👱🏾‍♀️',
      description: 'From the seemingly small, to the powerfully poignant, everyone has a Facebook Story. As we uncovered them, we found stories of life, stories of healing, stories of love, and stories of progress. But always stories centered around community and how others help you go further.',
      agency: 'Agency: Meta Creative X',
      production: 'Production Company: Park Pictures',
      tags: ['Campaign', 'Facebook'],
      hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/akosua_b00f2ded.gif',
      media: [
        { type: 'vimeo', url: 'https://player.vimeo.com/video/1170574267?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/1170574311?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/1170574333?badge=0&autopause=0&player_id=0&app_id=58479' },
      ]
    },
  ];

  const scrollCarousel = (projectId: string, dir: number) => {
    const ref = carouselRefs.current[projectId];
    if (ref) ref.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  return (
    <div className="p-6 h-full overflow-y-auto relative"
      style={{background:"#000000",color:"#ffffff"}}
      onMouseMove={(e) => setHoverImage(prev => prev.show ? { ...prev, x: e.clientX, y: e.clientY } : prev)}
    >
      {campaigns.map((project) => (
        <div key={project.id}>
          <button
            onClick={() => toggleProject(project.id)}
            onMouseEnter={(e) => (project as any).hoverImg && setHoverImage({ show: true, x: e.clientX, y: e.clientY, projectId: project.id })}
            onMouseLeave={() => setHoverImage({ show: false, x: 0, y: 0 })}
            onMouseMove={(e) => (project as any).hoverImg && setHoverImage({ show: true, x: e.clientX, y: e.clientY, projectId: project.id })}
            className="w-full text-left py-2 flex items-baseline group relative outline-none focus:outline-none"
          >
            <span className={`text-[11px] font-bold uppercase transition-colors flex-shrink-0 ${
              expandedProject === project.id
                ? 'bg-[#ffffff] text-[#000000] px-1'
                : 'group-hover:bg-[#ffffff] group-hover:text-[#000000] group-hover:px-1'
            }`}>
              {project.title.replace(/^\(\d+\)\s*/, '')}
            </span>
            <span className="flex-1 border-b-[2px] border-dotted border-[#ffffff] mx-2"></span>
            <span className="text-[11px] font-bold uppercase flex-shrink-0">
              {project.title.match(/^\((\d+)\)/)?.[0] || ''}
            </span>
          </button>

          {expandedProject === project.id && (
            <div className="py-4">
              <p className="text-[11px] font-bold uppercase mb-2">{project.tagline}</p>
              <p className="text-[11px] mb-4">{project.description}</p>
              {((project as any).agency || (project as any).production || (project as any).vfx) && (
                <p className="text-[9px] uppercase mb-6 opacity-70 tracking-wide">
                  {(project as any).agency && <span>[{(project as any).agency}]</span>}
                  {(project as any).agency && (project as any).production && ' '}
                  {(project as any).production && <span>[{(project as any).production}]</span>}
                  {(project as any).vfx && ((project as any).agency || (project as any).production) && ' '}
                  {(project as any).vfx && <span>[{(project as any).vfx}]</span>}
                </p>
              )}
              {project.media.length > 0 ? (
                <div className="flex flex-wrap gap-6 mt-4">
                  {project.media.map((item: any, idx: number) => {
                    const vid = `${project.id}-${idx}`;
                    const isLoaded = loadedVideos.has(vid);
                    return (
                      <div key={idx} className="flex flex-col gap-2">
                        <div className="relative bg-[#2C2C2C]" style={{ width: 'min(320px, 40vw)', aspectRatio: '16/9' }}>
                          {item.type === 'vimeo' ? (
                            <iframe src={item.url} className={`w-full h-full ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen onLoad={() => setLoadedVideos(prev => new Set(prev).add(vid))} />
                          ) : (
                            <img src={item.url} alt="" className="w-full h-full object-cover animate-fade-in" onLoad={() => setLoadedVideos(prev => new Set(prev).add(vid))} />
                          )}
                        </div>
                        {isLoaded && (
                          <button onClick={() => setModalVideoUrl(item.type === 'vimeo' ? item.url : item.url)} className="text-[9px] font-bold uppercase hover:underline cursor-pointer">[Enlarge]</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-4 p-4 border-2 border-[#2C2C2C] bg-[#f5f5f5]">
                  <p className="text-[11px] text-center">Media coming soon</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Enlarge modal */}
      {modalVideoUrl && (
        <div
          className="fixed inset-0 flex flex-col items-end justify-start z-[200] p-4" style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setModalVideoUrl(null)}
        >
          <button onClick={() => setModalVideoUrl(null)} className="text-[11px] font-bold uppercase hover:underline px-2 py-1 text-white mb-2 flex-shrink-0">[CLOSE]</button>
          <div className="flex-1 w-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            {modalVideoUrl.includes('vimeo') ? (
              <div style={{ width: 'min(90vw, 1200px)', aspectRatio: '16/9' }}>
                <iframe src={modalVideoUrl} className="w-full h-full" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              </div>
            ) : (
              <img src={modalVideoUrl} alt="" style={{ maxWidth: '90vw', maxHeight: 'calc(100vh - 60px)', display: 'block' }} className="object-contain" />
            )}
          </div>
        </div>
      )}

      {/* Mouse-following hover image */}
      {hoverImage.show && (
        <div
          className="fixed pointer-events-none z-50"
          style={{ left: `${hoverImage.x + 20}px`, top: `${hoverImage.y + 20}px` }}
        >
          <img
            src={campaigns.find(c => c.id === hoverImage.projectId)?.hoverImg || ''}
            alt=""
            className={hoverImage.projectId === 'facebook-real-story' ? 'w-[220px] h-auto' : hoverImage.projectId === 'wwf-just' ? 'w-[200px] h-auto' : 'w-[120px] h-auto'}
          />
        </div>
      )}
    </div>
  );
}

// Brand and Identity
export function BrandContent({ activeTags = [], onTagClick, initialExpandedProject }: ContentProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(initialExpandedProject ?? null);
  const [modalVideoUrl, setModalVideoUrl] = useState<string | null>(null);
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const [hoverImage, setHoverImage] = useState<{ show: boolean; x: number; y: number; projectId?: string }>({ show: false, x: 0, y: 0 });
  const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const brandProjects = [
    {
      id: 'wwf-just-brand',
      title: '(01) WWF [Just*]',
      tagline: 'PACKAGING DESIGNED TO ELIMINATE PACKAGING',
      description: "Everyday we buy millions of household products that are essentially chemicals in plastic bottles. And every one of them puts more pressure on our already fragile environment.\n\nSo we got rid of the plastic and the chemicals by creating a range of natural, alternative products for WWF called just*. Each was 100% natural and packaged using recyclable and biodegradable materials.",
      italic: '"Using packaging to change perception our product design reflected the simple, natural and organic nature of our idea and educated people on how to make the switch to a more sustainable alternative."',
      linkText: "Click here to read the One Show's article about just*.",
      linkHref: 'http://www.oneclub.org/articles/-view/just',
      agency: 'Agency: Leo Burnett Sydney',
      production: '',
      tags: ['Brand', 'Identity', 'Sustainability'],
      hoverImg: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/CFPgqAIsIykasLty.jpg',
      media: [
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/oLbmjUPUMWJrGWMO.jpg', maxWidth: '640px' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/CFPgqAIsIykasLty.jpg', maxWidth: '500px' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/yQgxQEFMfbaJXknc.jpg', maxWidth: '500px' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/ucPOkqJsCaxnZUMU.jpg', maxWidth: '500px' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/rmaoShGYBzogksqG.jpg', maxWidth: '500px' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/ogNzsSdcHxamGKja.jpg', maxWidth: '500px' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/mMsoyexyObTDkdTl.jpg', maxWidth: '500px' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/YvnarBzOvYueLGuU.gif', maxWidth: '500px' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/QKNljSyKJUUDdcNW.gif', maxWidth: '500px' },
        { type: 'image', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/tAvomcXyyvCSjbYG.gif', maxWidth: '500px' },
      ] as { type: string; url: string; [key: string]: any }[]
    },
    {
      id: 'studio-mano',
      title: '(02) Studio Mano',
      tagline: 'STUDIO MANO DESIGN IDENTITY',
      description: 'HANDMADE OBJECTS, HANDMADE IDENTITY.\n\nDesign identity for Studio Mano, my own personal pottery and furniture project. The idea was to reflect the process behind the work. Since the pieces are handmade, the design is also built by hand, using illustrations, stamps, letters, and scanned textures.',
      linkText: 'Know more at studio-mano.co',
      linkHref: 'https://studio-mano.co',
      linkText2: '@studiomanoceramics',
      linkHref2: 'https://instagram.com/studiomanoceramics',
      agency: '',
      production: '',
      tags: ['Brand', 'Identity', 'Studio'],
      hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/sm-mezcal-1_13a71f69.jpg',
      media: [
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/sm-mezcal-1_13a71f69.jpg', maxWidth: '420px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/sm-mezcal-3_82234393.jpg', maxWidth: '420px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/sm-mezcal-4_8698e3dd.jpg', maxWidth: '420px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/sm-mezcal-2_f7864d2a.jpg', maxWidth: '420px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/sm-mezcal-5_0b03d4a3.jpg', maxWidth: '640px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/sm-toro01_8a78e6e1.jpg', maxWidth: '640px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/sm-toro04_4cf122e4.jpg', maxWidth: '420px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/sm-lamp-1_40dbd8aa.jpg', maxWidth: '420px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/sm-lamp-4_e5c4b093.png', maxWidth: '640px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/sm-lamp-2_d76fe089.png', maxWidth: '420px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/sm-lamp-3_80dec66c.png', maxWidth: '420px' },
      ] as { type: string; url: string; [key: string]: any }[]
    },
    {
      id: 'facebook-rebrand',
      title: '(03) Facebook [Re-Branding]',
      tagline: 'ILLUSTRATION DIRECTION AND TONE OF VOICE',
      description: "Marketing consultant for Facebook's rebrand, co-leading illustration direction and ensuring a consistent tone of voice, look, and feel across product, brand, and marketing.",
      agency: '',
      production: '',
      tags: ['Brand', 'Identity', 'Facebook'],
      hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/fb-rebrand-thumb_d2c892e3.avif',
      media: [
        { type: 'vimeo', url: 'https://player.vimeo.com/video/1173696908?badge=0&autopause=0&player_id=0&app_id=58479' },
        { type: 'mp4', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/fb-rebrand-video1_78e76c26.mp4' },
        { type: 'mp4', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/fb-rebrand-video2_35c7c0d3.mp4' },
        { type: 'mp4', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/fb-rebrand-video3_94dd6167.mp4' },
      ] as { type: string; url: string }[]
    },
    {
      id: 'bundaberg-rum',
      title: '(04) Bundaberg Rum [Blending Kit]',
      tagline: 'PACKAGING AS THE EXPERIENCE',
      description: 'As a premium offering created for Bundaberg Rum connoisseurs, every element of the limited edition Blending Kit was designed to reflect the craft that goes into making Australia\'s most famous rum, from the wood of the barrels through to the copper of the stills.',
      agency: 'Leo Burnett Sydney',
      production: '',
      tags: ['Brand', 'Identity', 'Packaging'],
      hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/bundaberg-label_37e928ed.jpg',
      media: [
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/bundaberg-kit_14f77af0.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/bundaberg-bottles_c2e818a2.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/bundaberg-spread_dcd6c551.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/bundaberg-label_37e928ed.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/bundaberg-notebook_7b1fb135.jpg' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/bundaberg-top_d07bbd9a.jpg' },
      ] as { type: string; url: string }[]
    },
  ];

  return (
    <div className="p-6 h-full overflow-y-auto relative" style={{background:"#000000",color:"#ffffff"}}>
      {brandProjects.map((project) => (
        <div key={project.id}>
          <button
            onClick={() => toggleProject(project.id)}
            onMouseEnter={(e) => project.hoverImg && setHoverImage({ show: true, x: e.clientX, y: e.clientY, projectId: project.id })}
            onMouseLeave={() => setHoverImage({ show: false, x: 0, y: 0 })}
            onMouseMove={(e) => project.hoverImg && setHoverImage({ show: true, x: e.clientX, y: e.clientY, projectId: project.id })}
            className="w-full text-left py-2 flex items-baseline group relative outline-none focus:outline-none"
          >
            <span className={`text-[11px] font-bold uppercase transition-colors flex-shrink-0 ${
              expandedProject === project.id
                ? 'bg-[#ffffff] text-[#000000] px-1'
                : 'group-hover:bg-[#ffffff] group-hover:text-[#000000] group-hover:px-1'
            }`}>
              {project.title.replace(/^\(\d+\)\s*/, '')}
            </span>
            <span className="flex-1 border-b-[2px] border-dotted border-[#ffffff] mx-2"></span>
            <span className="text-[11px] font-bold uppercase flex-shrink-0">
              {project.title.match(/^\((\d+)\)/)?.[0] || ''}
            </span>
          </button>
          {expandedProject === project.id && (
            <div className="pb-6" style={{background:"#000000",color:"#ffffff"}}>
              <p className="text-[11px] font-bold uppercase mb-2">{project.tagline}</p>
              {project.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-[11px] mb-3">{para}</p>
              ))}
              {(project as any).italic && (
                <p className="text-[11px] italic mb-3 opacity-80">{(project as any).italic}</p>
              )}
              {(project as any).linkHref && (
                <p className="text-[11px] mb-4">
                  {project.id === 'studio-mano' ? (
                    <>
                      Know more at <a href={(project as any).linkHref} target="_blank" rel="noopener noreferrer" className="underline font-bold">studio-mano.co</a>
                      {(project as any).linkHref2 && (
                        <> and <a href={(project as any).linkHref2} target="_blank" rel="noopener noreferrer" className="underline font-bold">{(project as any).linkText2}</a></>  
                      )}
                    </>
                  ) : (
                    <>Click <a href={(project as any).linkHref} target="_blank" rel="noopener noreferrer" className="underline font-bold">here</a> to read the One Show&apos;s article about just*.</>
                  )}
                </p>
              )}
              {((project as any).agency || (project as any).production) && (
                <p className="text-[9px] uppercase mb-6 opacity-70 tracking-wide">
                  {(project as any).agency && <span>[{(project as any).agency}]</span>}
                  {(project as any).agency && (project as any).production && ' '}
                  {(project as any).production && <span>[{(project as any).production}]</span>}
                </p>
              )}
              {project.media.length > 0 ? (
                <div className="flex flex-wrap gap-6 mt-4 items-start">
                  {project.media.map((item, idx) => {
                    const vid = `${project.id}-${idx}`;
                    const isLoaded = loadedVideos.has(vid);
                    const isImage = item.type === 'image';
                    const ar = (item as any).aspectRatio || '16/9';
                    const isPortrait = ar === '4/5';
                    return (
                      <div key={idx} className="flex flex-col gap-2">
                        {isImage ? (
                          <img
                            src={item.url}
                            alt=""
                            className="animate-fade-in block"
                            style={{ maxWidth: (item as any).maxWidth || 'min(480px, 55vw)', height: 'auto' }}
                            onLoad={() => setLoadedVideos(prev => new Set(prev).add(vid))}
                          />
                        ) : (
                          <div
                            className="relative overflow-hidden"
                            style={{ width: (item as any).videoWidth || (isPortrait ? 'min(340px, 38vw)' : 'min(480px, 55vw)'), aspectRatio: ar, background: 'transparent' }}
                          >
                            {!isLoaded && <div className="absolute inset-0 z-10" style={{ background: 'var(--background)' }} />}
                            {item.type === 'mp4' ? (
                              <video
                                src={item.url}
                                className={`w-full h-full ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
                                controls
                                playsInline
                                onLoadedData={() => setLoadedVideos(prev => new Set(prev).add(vid))}
                              />
                            ) : item.type === 'video' ? (
                              <iframe src={`https://player.vimeo.com/video/${item.url.split('/').pop()}`} className={`w-full h-full ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen onLoad={() => setLoadedVideos(prev => new Set(prev).add(vid))} />
                            ) : (
                              <iframe src={item.url} className={`w-full h-full ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen onLoad={() => setLoadedVideos(prev => new Set(prev).add(vid))} />
                            )}
                          </div>
                        )}
                        {isLoaded && (
                          <button onClick={() => setModalVideoUrl(isImage ? item.url : item.type === 'video' ? `https://player.vimeo.com/video/${item.url.split('/').pop()}?autoplay=1` : item.url)} className="text-[9px] font-bold uppercase hover:underline cursor-pointer">[Enlarge]</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-4 p-4 border-2 border-[#2C2C2C] bg-[#f5f5f5]"><p className="text-[11px] text-center">Media coming soon</p></div>
              )}
            </div>
          )}
        </div>
      ))}
      {modalVideoUrl && (
        <div className="fixed inset-0 flex flex-col items-end justify-start z-[200] p-4" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setModalVideoUrl(null)}>
          <button onClick={() => setModalVideoUrl(null)} className="text-[11px] font-bold uppercase hover:underline px-2 py-1 text-white mb-2 flex-shrink-0">[CLOSE]</button>
          <div className="flex-1 w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {modalVideoUrl.includes('vimeo.com') ? (
              <div style={{ width: 'min(90vw, 1200px)', aspectRatio: '16/9' }}>
                <iframe src={modalVideoUrl} className="w-full h-full" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              </div>
            ) : (
              <img src={modalVideoUrl} alt="Enlarged media" style={{ maxWidth: '90vw', maxHeight: 'calc(100vh - 60px)', display: 'block' }} className="object-contain" />
            )}
          </div>
        </div>
      )}
      {hoverImage.show && (
        <div className="fixed pointer-events-none z-50" style={{ left: `${hoverImage.x + 20}px`, top: `${hoverImage.y + 20}px` }}>
          <img src={brandProjects.find(p => p.id === hoverImage.projectId)?.hoverImg || ''} alt="" className="w-[120px] h-auto" />
        </div>
      )}
    </div>
  );
}

// Events and Activations
export function EventsContent({ activeTags = [], onTagClick, initialExpandedProject }: ContentProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(initialExpandedProject ?? null);
  const [modalVideoUrl, setModalVideoUrl] = useState<string | null>(null);
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const [hoverImage, setHoverImage] = useState<{ show: boolean; x: number; y: number; projectId?: string }>({ show: false, x: 0, y: 0 });
  const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const eventsProjects = [
    {
      id: 'meta-connect-2025',
      title: '(01) Meta [Connect 2025]',
      tagline: "META'S BIGGEST ANNUAL MIXED REALITY & AI EVENT",
      description: "Meta Connect is Meta's biggest annual event where the company shares the latest developments in mixed reality, AI and wearables.",
      agency: '',
      production: '',
      tags: ['Events', 'Activation', 'Meta'],
      hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/mc2025-stage_4e7dd518.webp',
      media: [
        { type: 'vimeo', url: 'https://player.vimeo.com/video/1173692006?badge=0&autopause=0&player_id=0&app_id=58479', videoWidth: 'min(640px, 70vw)', aspectRatio: '16/9' },
        { type: 'vimeo', url: 'https://player.vimeo.com/video/1173696951?badge=0&autopause=0&player_id=0&app_id=58479', videoWidth: 'min(640px, 70vw)', aspectRatio: '16/9' },
        { type: 'mp4', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/mc2025-v1_1c2ba021.mp4', videoWidth: 'min(640px, 70vw)', aspectRatio: '16/9' },
        { type: 'mp4', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/mc2025-v2_6df7957e.mp4', videoWidth: 'min(640px, 70vw)', aspectRatio: '16/9' },
        { type: 'mp4', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/mc2025-v3_8c61815a.mp4', videoWidth: 'min(640px, 70vw)', aspectRatio: '16/9' },
        { type: 'mp4', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/mc2025-v4_2e18c0b2.mp4', videoWidth: 'min(340px, 38vw)', aspectRatio: '4/5' },
        { type: 'mp4', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/mc2025-v5_2d9b6a6f.mp4', videoWidth: 'min(640px, 70vw)', aspectRatio: '16/9' },
        { type: 'mp4', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/mc2025-v6_2485b4c2.mp4', videoWidth: 'min(640px, 70vw)', aspectRatio: '16/9' },
        { type: 'mp4', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/mc2025-v7_2effee1d.mp4', videoWidth: 'min(340px, 38vw)', aspectRatio: '4/5' },
        { type: 'mp4', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/mc2025-v8_c021aded.mp4', videoWidth: 'min(640px, 70vw)', aspectRatio: '16/9' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/mc2025-stage_4e7dd518.webp', maxWidth: '640px' },
      ] as { type: string; url: string; [key: string]: any }[]
    },
    {
      id: 'meta-connect-2024',
      title: '(02) Meta [Connect 2024]',
      tagline: "META'S BIGGEST ANNUAL MIXED REALITY & AI EVENT",
      description: "Meta Connect is Meta's biggest annual event where the company shares the latest developments in mixed reality, AI and wearables.",
      agency: '',
      production: '',
      tags: ['Events', 'Activation', 'Meta'],
      hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/meta-connect-zuck-orion_a980dc7c.jpg',
      media: [
        { type: 'youtube', url: 'https://www.youtube.com/embed/I7JyydkqDeI?start=2454', videoWidth: 'min(640px, 70vw)', aspectRatio: '16/9' },
        { type: 'mp4', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/meta-connect-2024-video_fdc53507.mp4', videoWidth: 'min(640px, 70vw)', aspectRatio: '16/9' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/meta-connect-2024-1_18ddc230.gif', maxWidth: '500px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/meta-connect-2024-2_61d2b181.gif', maxWidth: '500px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/meta-connect-zuck-orion_a980dc7c.jpg', maxWidth: '500px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/meta-connect-glasses-stage_692dfd46.jpg', maxWidth: '500px' },
      ] as { type: string; url: string; [key: string]: any }[]
    },
    {
      id: 'mr-lee',
      title: '(03) Playstation [Mr. Lee Tailor Shop]',
      tagline: 'TAILOR SHOP TO SUPERHEROES AND VILLAINS',
      description: "In the new Playstation game, DC Universe Online, you can create your own superhero or villain by choosing powers, abilities and your custom suit.\n\nMr. Lee's Tailor Shop specializes in handcrafting custom suits for heroes and villains. So you can make your suit a reality and can live the same experience as the game in the offline world.\n\nThe live experience began deciding whether to be a hero or villain, fill out a questionnaire, and get measurements taken. The custom suit was first created within the game and then an illustrator drew a sketch and gave it to the client together with an estimate.",
      agency: 'Agency: Leo Burnett Iberia',
      production: '',
      tags: ['Events', 'Activation', 'Experiential'],
      hoverImg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/playstation-mr-lee-tailor-shop(1)_d915f8ea.gif',
      media: [
        { type: 'vimeo', url: 'https://player.vimeo.com/video/435860958?badge=0&autopause=0&player_id=0&app_id=58479', videoWidth: 'min(640px, 70vw)', aspectRatio: '4/3' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/01-2000x1254(1)_3dec4caa.jpg', maxWidth: '400px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/mktdirecto02-2000x1012_7d9d238c.jpg', maxWidth: '400px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/02-2000x1333(1)_b8281d10.jpg', maxWidth: '200px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/03-2000x1333(2)_941e377b.jpg', maxWidth: '200px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/04-2000x1400_7e12b80f.jpg', maxWidth: '200px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/05-2000x1400_a9e6a18c.jpg', maxWidth: '200px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/06-2000x1333(1)_0bf74c2a.jpg', maxWidth: '200px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/07-2000x1333_050f519e.jpg', maxWidth: '200px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/close04-2000x1333(1)_9f897b34.jpg', maxWidth: '200px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/close05-2000x1333(1)_58624dfb.jpg', maxWidth: '200px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/close06-2000x1333_868f1e4d.jpg', maxWidth: '200px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/close07-2000x1333_3ed755cf.jpg', maxWidth: '200px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/img_2556-2000x1333_a3fdc0c9.jpg', maxWidth: '200px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/batman-2000x2796(1)_18724cf4.jpg', maxWidth: '160px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/greenlantern-2000x2796_05e4d8a1.jpg', maxWidth: '160px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/flash-2000x2796_8462f3f3.jpg', maxWidth: '160px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/superman-2000x2796(1)_78368180.jpg', maxWidth: '160px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/hawke-2000x2796_60f16f5b.jpg', maxWidth: '160px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/sandman-2000x2796_457180a4.jpg', maxWidth: '160px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/poster01-2000x3143(1)_03b9c54a.jpg', maxWidth: '160px' },
        { type: 'image', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/poster02-2000x3143_f670d0fc.jpg', maxWidth: '160px' },
      ] as { type: string; url: string; [key: string]: any }[]
    },
  ];

  return (
    <div className="p-6 h-full overflow-y-auto relative" style={{background:"#000000",color:"#ffffff"}}>
      {eventsProjects.map((project) => (
        <div key={project.id}>
          <button
            onClick={() => toggleProject(project.id)}
            onMouseEnter={(e) => project.hoverImg && setHoverImage({ show: true, x: e.clientX, y: e.clientY, projectId: project.id })}
            onMouseLeave={() => setHoverImage({ show: false, x: 0, y: 0 })}
            onMouseMove={(e) => project.hoverImg && setHoverImage({ show: true, x: e.clientX, y: e.clientY, projectId: project.id })}
            className="w-full text-left py-2 flex items-baseline group relative outline-none focus:outline-none"
          >
            <span className={`text-[11px] font-bold uppercase transition-colors flex-shrink-0 ${
              expandedProject === project.id
                ? 'bg-[#ffffff] text-[#000000] px-1'
                : 'group-hover:bg-[#ffffff] group-hover:text-[#000000] group-hover:px-1'
            }`}>
              {project.title.replace(/^\(\d+\)\s*/, '')}
            </span>
            <span className="flex-1 border-b-[2px] border-dotted border-[#ffffff] mx-2"></span>
            <span className="text-[11px] font-bold uppercase flex-shrink-0">
              {project.title.match(/^\((\d+)\)/)?.[0] || ''}
            </span>
          </button>
          {expandedProject === project.id && (
            <div className="pb-6" style={{background:"#000000",color:"#ffffff"}}>
              <p className="text-[11px] font-bold uppercase mb-2">{project.tagline}</p>
              <p className="text-[11px] mb-4">{project.description}</p>
              {((project as any).agency || (project as any).production) && (
                <p className="text-[9px] uppercase mb-6 opacity-70 tracking-wide">
                  {(project as any).agency && <span>[{(project as any).agency}]</span>}
                  {(project as any).agency && (project as any).production && ' '}
                  {(project as any).production && <span>[{(project as any).production}]</span>}
                </p>
              )}
              {project.media.length > 0 ? (
                <div className="flex flex-wrap gap-6 mt-4 items-start">
                  {project.media.map((item, idx) => {
                    const vid = `${project.id}-${idx}`;
                    const isLoaded = loadedVideos.has(vid);
                    const isImage = item.type === 'image';
                    const ar = (item as any).aspectRatio || '16/9';
                    const isPortrait = ar === '4/5';
                    return (
                      <div key={idx} className="flex flex-col gap-2">
                        {isImage ? (
                          <img
                            src={item.url}
                            alt=""
                            className="animate-fade-in block"
                            style={{ maxWidth: (item as any).maxWidth || 'min(480px, 55vw)', height: 'auto' }}
                            onLoad={() => setLoadedVideos(prev => new Set(prev).add(vid))}
                          />
                        ) : (
                          <div
                            className="relative overflow-hidden"
                            style={{ width: (item as any).videoWidth || (isPortrait ? 'min(340px, 38vw)' : 'min(480px, 55vw)'), aspectRatio: ar, background: 'transparent' }}
                          >
                            {!isLoaded && <div className="absolute inset-0 z-10" style={{ background: 'var(--background)' }} />}
                            {item.type === 'mp4' ? (
                              <video
                                src={item.url}
                                className={`w-full h-full ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
                                controls
                                playsInline
                                onLoadedData={() => setLoadedVideos(prev => new Set(prev).add(vid))}
                              />
                            ) : item.type === 'video' ? (
                              <iframe src={`https://player.vimeo.com/video/${item.url.split('/').pop()}`} className={`w-full h-full ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen onLoad={() => setLoadedVideos(prev => new Set(prev).add(vid))} />
                            ) : (
                              <iframe src={item.url} className={`w-full h-full ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen onLoad={() => setLoadedVideos(prev => new Set(prev).add(vid))} />
                            )}
                          </div>
                        )}
                        {isLoaded && (
                          <button onClick={() => setModalVideoUrl(isImage ? item.url : item.type === 'video' ? `https://player.vimeo.com/video/${item.url.split('/').pop()}?autoplay=1` : item.url)} className="text-[9px] font-bold uppercase hover:underline cursor-pointer">[Enlarge]</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-4 p-4 border-2 border-[#2C2C2C] bg-[#f5f5f5]"><p className="text-[11px] text-center">Media coming soon</p></div>
              )}
            </div>
          )}
        </div>
      ))}
      {modalVideoUrl && (
        <div className="fixed inset-0 flex flex-col items-end justify-start z-[200] p-4" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setModalVideoUrl(null)}>
          <button onClick={() => setModalVideoUrl(null)} className="text-[11px] font-bold uppercase hover:underline px-2 py-1 text-white mb-2 flex-shrink-0">[CLOSE]</button>
          <div className="flex-1 w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {modalVideoUrl.includes('vimeo.com') ? (
              <div style={{ width: 'min(90vw, 1200px)', aspectRatio: '16/9' }}>
                <iframe src={modalVideoUrl} className="w-full h-full" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              </div>
            ) : (
              <img src={modalVideoUrl} alt="Enlarged media" style={{ maxWidth: '90vw', maxHeight: 'calc(100vh - 60px)', display: 'block' }} className="object-contain" />
            )}
          </div>
        </div>
      )}
      {hoverImage.show && (
        <div className="fixed pointer-events-none z-50" style={{ left: `${hoverImage.x + 20}px`, top: `${hoverImage.y + 20}px` }}>
          <img src={eventsProjects.find(p => p.id === hoverImage.projectId)?.hoverImg || ''} alt="" className="w-[120px] h-auto" />
        </div>
      )}
    </div>
  );
}

// About
export function AboutContent() {

  return (
    <div className="p-6 space-y-6">
      <div className="border-[1px] border-[#2C2C2C] p-4 bg-[#ffffff]">
        <h3 className="text-sm font-bold uppercase mb-3">About Bruno Nakano</h3>
        <p className="text-sm mb-3">
          Creative technologist and designer specializing in interactive experiences, 
          digital campaigns, and experimental prototypes. I blend technology with 
          creative storytelling to push boundaries and create memorable digital moments.
        </p>
        <p className="text-sm mb-3">
          <strong>Skills:</strong> WebGL, React, Three.js, Creative Coding, 3D, Motion Design, 
          Interactive Installations, Campaign Strategy
        </p>
        <p className="text-sm">
          <strong>Contact:</strong> hello@brunonakano.com
        </p>
      </div>

    </div>
  );
}


// Webcam + AI Chat
export function WebcamChatContent() {
  const [messages, setMessages] = useState<{id: number; text: string; sender: 'user'|'ai'; timestamp: Date}[]>([
    { id: 1, text: "hi! 👋\n\nI can chat in english, portuguese or spanish. your pick.", sender: 'ai', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const conversationHistoryRef = useRef<{role: 'user'|'assistant'; content: string}[]>([]);
  const chatMutation = trpc.chat.send.useMutation();
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;
    const userText = inputValue.trim();
    const userMessage = { id: Date.now(), text: userText, sender: 'user' as const, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    conversationHistoryRef.current.push({ role: 'user', content: userText });
    try {
      const result = await chatMutation.mutateAsync({
        messages: conversationHistoryRef.current,
      });
      const aiText = typeof result.text === 'string' ? result.text : 'Sorry, I could not respond right now. You can always reach me at hello@brunonakano.com!';
      conversationHistoryRef.current.push({ role: 'assistant', content: aiText });
      if (conversationHistoryRef.current.length > 20) {
        conversationHistoryRef.current = conversationHistoryRef.current.slice(-20);
      }
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: aiText, sender: 'ai', timestamp: new Date() }]);
    } catch (err) {
      console.error('Chat error:', err);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Sorry, something went wrong. You can always reach me at hello@brunonakano.com!", sender: 'ai', timestamp: new Date() }]);
    }
  };

  return (
    <div className="flex" style={{ height: '100%', minHeight: 0, overflow: 'hidden' }}>
      {/* Chat - full width */}
      <div className="bg-[#000000]" style={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {/* Chat Messages - scrollable, takes remaining space */}
        <div style={{ flex: '1 1 0', overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', minHeight: 0 }}>
          {messages.map((message) => (
            <div key={message.id} className="text-[11px] leading-relaxed" style={{ color: '#ffffff' }}>
              <span className="font-bold" style={{ color: '#ffffff' }}>{message.sender === 'ai' ? 'Bruno' : 'You'}:</span>
              {' '}
              <span style={{ whiteSpace: 'pre-wrap' }}>{message.text}</span>
            </div>
          ))}
          {isTyping && (
            <div className="text-[11px] leading-relaxed italic" style={{ color: '#ffffff' }}>
              <span className="font-bold" style={{ color: '#ffffff' }}>Bruno:</span> typing...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area - always pinned at bottom, never shrinks */}
        <div className="border-t-[2px] border-[#333333] p-3" style={{ flexShrink: 0 }}>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSend(); }}
              placeholder="Type message..."
              className="flex-1 px-2 py-1 border-[1px] border-[#555555] bg-[#111111] text-[#ffffff] text-[11px] focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={isTyping}
              className="px-3 py-1 bg-[#ffffff] text-[#000000] hover:bg-[#cccccc] text-[11px] uppercase font-bold disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Pottery and Furniture
export function PotteryContent({ activeTags = [], onTagClick }: ContentProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const colRef0 = useRef<HTMLDivElement>(null);
  const colRef1 = useRef<HTMLDivElement>(null);
  const colRef2 = useRef<HTMLDivElement>(null);
  const columnRefs = [colRef0, colRef1, colRef2];

  const [shuffledImages] = useState(() => {
    const imageArray = [
      'https://freight.cargo.site/w/500/i/3edd9d13ab40d8b9251b0f8b2092f15e6275719ddb82f6928d74a63a6022d684/KODAK-200-5-of-38.jpg',
      'https://freight.cargo.site/w/500/i/730242274cf178eface26d4fb439c57537af10bcbd3af48039d33551c41cce90/03.JPG',
      'https://freight.cargo.site/w/500/i/8fb8013f9ac3931bd8f1681e4e9b43be6e2992eb44563c2ad1c1a6e9c09841ff/Snapinsta.app_367361112_794386825749845_3041882079062117529_n_1080.jpg',
      'https://freight.cargo.site/w/500/i/2a1a960ae5ffa6ecbd63182ee2da9411eeb6cff17fd80148678c7096c104ec02/DSC08677.jpg',
      'https://freight.cargo.site/w/500/i/58b30479bcf45ac1221a93f0fb1e4228f206c814ced2e60c0e5858ae0489edec/Snapinsta.app_367037634_756500866249869_6481214663538332849_n_1080.jpg',
      'https://freight.cargo.site/w/500/i/22d7622a7bdcc2257e016aca9a9cd0e06187382beda9d2c3425b282c86ce09c4/Made-this-wooden-chair-with-Marcio--a-craftsman-based-in-Paraty--Rio-de-Janeiro.-For-generations-3.jpg',
      'https://freight.cargo.site/w/500/i/2fb8c2ede2d8491e21ba6bb6fb1b6de624228fad78dc921311ec31af564248b5/mezcal.jpg',
      'https://freight.cargo.site/w/500/i/dccc9d9bb3e5d3751176612270054eb4a180fe9d90441efd4a6883b585f5e773/Snapinsta.app_407575311_1093064738276849_3352866088452037380_n_1080.jpg',
      'https://freight.cargo.site/w/500/i/43f4eed731eef37fbfff7430215f9adcac8a985b7c787059464013e9000b4aff/studiomano05-1.jpg',
      'https://freight.cargo.site/w/500/i/fb7a7309aa40df37fa7969a0477beafc6f8a8d3a02896f92edbe6411a1609f05/website_0006_Layer-135.jpg',
      'https://freight.cargo.site/w/500/i/b4941930de5ea3d103017e20fdaaa3d4b4959d2bbbb7eec8d333a7e678d99b81/tile02low.jpg',
      'https://freight.cargo.site/w/500/i/761488590145548fef4ac9dff40d9f04515614b4bb3a279a1c93042c0ad47b1c/website_0005_Layer-133.jpg',
      'https://freight.cargo.site/w/500/i/b71a014b5e1cfa04c3122779182a98ed046508f3b936a05ce0aa40b730611e22/website_0006_Group-1.jpg',
      'https://freight.cargo.site/w/500/i/502e142d3aceb7fbd1dfbfe5b6ba3873e435fc9910e82d2e2c7867155bffb111/toro01.jpg',
      'https://freight.cargo.site/w/500/i/a53b7b9b1b39245bb2dde62fd84480df43e0e374a933ad84e8ae1d01e0b2690d/Snapinsta.app_397128198_2699441313565605_7136852584015873761_n_1080.jpg',
      'https://freight.cargo.site/w/500/i/799637ce2408014b0ee98e21c48d6e1fa8a3a82b203fdcd265576256f389a248/4x5_01.jpg',
      'https://freight.cargo.site/w/500/i/1aaf13e6244c7ac09aa9e1a72ddb425523713a7dd522c400a78dde0ac4eb1d2b/IMG_02332.jpg',
      'https://freight.cargo.site/w/500/i/e2c0022ea8ae941088a456c257311c17ff553b2e53b2267f8f98e287ad4b6159/tile-copy.jpg',
      'https://freight.cargo.site/w/500/i/0077bdcfcc8ed92a26220099fb1f1fcad87a401ea8b2a39bb2b73d0faaed610f/LADW_0004_Group-3-copy.jpg',
      'https://freight.cargo.site/w/500/i/a1d33fed935abe8e1cd5e27dd7b6436c026b0c7ec4845f149baa4e3272ab911d/This-is-America_Studio-Mano_The-Climate-Refugees_Credit-Jonathan-Hokklo-copy.jpeg',
      'https://freight.cargo.site/w/500/i/b6b1c0adb68600a937b70d513cf004b7674033cbda543a09896a0ef95c8c12e7/Made-this-wooden-chair-with-Marcio--a-craftsman-based-in-Paraty--Rio-de-Janeiro.-For-generations-2.jpg',
      'https://freight.cargo.site/w/500/i/1c10105eddbd80c356e553ac818fdb63973d360d1da951c1ee184eb49405e493/tile03low.jpg',
      'https://freight.cargo.site/w/500/i/def30a285bf58bcd42cfbf0ecf62e73eeccb03b9af744dbe9be4fbe2409fe367/Made-this-wooden-chair-with-Marcio--a-craftsman-based-in-Paraty--Rio-de-Janeiro.-For-generations-1.jpg',
      'https://freight.cargo.site/w/500/i/146a7c6591bffd8c0d6e94ff5d7921986f2c906cab8498a7cbb95d843cd5943e/promez.jpg',
      'https://freight.cargo.site/w/500/i/f7f3480e98058d9a8377b8e8b5b3448bc2f4f1eefad3f1add201bd13d916b1e4/oncapintada.jpg',
      'https://freight.cargo.site/w/500/i/59c154a0641aca34a26a1c3acdbb5878d9361995a1f3c87b9ee4d728be976710/DSCF0333-copy.jpg',
      'https://freight.cargo.site/w/500/i/116b60476db46ad340c025614023c6a92f9414212a93827108deb4d8c78eda46/toro03.jpg',
      'https://freight.cargo.site/w/500/i/488ca56b8d9f557005a398a72ceaa5937a3bfddf8484de084e2a4be82fb47ea1/Snapinsta.app_396567091_873442487563577_4738128618748587376_n_1080.jpg',
    ];
    for (let i = imageArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imageArray[i], imageArray[j]] = [imageArray[j], imageArray[i]];
    }
    return imageArray;
  });

  useEffect(() => {
    const scrollSpeeds = [0.3, -0.4, 0.35];
    const intervals: NodeJS.Timeout[] = [];
    columnRefs.forEach((ref, colIdx) => {
      if (ref.current) {
        const interval = setInterval(() => {
          if (ref.current) {
            ref.current.scrollTop += scrollSpeeds[colIdx];
            if (scrollSpeeds[colIdx] > 0 && ref.current.scrollTop >= ref.current.scrollHeight - ref.current.clientHeight) {
              ref.current.scrollTop = 0;
            } else if (scrollSpeeds[colIdx] < 0 && ref.current.scrollTop <= 0) {
              ref.current.scrollTop = ref.current.scrollHeight;
            }
          }
        }, 16);
        intervals.push(interval);
      }
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  const images = shuffledImages;

  const col1 = images.filter((_, i) => i % 3 === 0);
  const col2 = images.filter((_, i) => i % 3 === 1);
  const col3 = images.filter((_, i) => i % 3 === 2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#000000', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '12px 16px 8px', fontFamily: 'Arial Narrow, Arial, sans-serif', fontSize: '11px', color: '#ffffff', lineHeight: 1.6, flexShrink: 0, borderBottom: '1px solid #222' }}>
        <span style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Studio Mano</span>
        {' — '}
        <a href="https://studio-mano.co" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'underline' }}>studio-mano.co</a>
        {' / '}
        <a href="https://instagram.com/studiomanoceramics" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'underline' }}>@studiomanoceramics</a>
      </div>
      {/* Scrolling columns */}
      <div style={{ display: 'flex', flex: 1, gap: '12px', padding: '12px', overflow: 'hidden' }}>
        {[col1, col2, col3].map((col, colIdx) => (
          <div
            key={colIdx}
            ref={columnRefs[colIdx]}
            style={{
              flex: 1,
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Duplicate images for seamless loop */}
            {[...col, ...col].map((src, imgIdx) => (
              <img
                key={imgIdx}
                src={src}
                alt=""
                onClick={() => setSelectedImage(src)}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            ))}
          </div>
        ))}
      </div>
      {/* Lightbox */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
          }}
        >
          <img
            src={selectedImage}
            alt=""
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  );
}

// ============================================================
// INDEX CONTENT - Shows all projects grouped by category
// ============================================================
// Map each project ID to its parent section folder ID
const PROJECT_TO_SECTION: Record<string, string> = {
  // Interactive
  'samsung-diplo': 'interactive',
  'mcdonalds-emlings': 'interactive',
  'samsung-s-drive': 'interactive',
  'mood-calendar': 'interactive',
  'love-meter': 'interactive',
  'poster-3d': 'interactive',
  'whoopee-cushion': 'interactive',
  'instagram-unlocker': 'interactive',
  // Social
  'social-01': 'social',
  'social-02': 'social',
  'social-03': 'social',
  'facebook-mindfull': 'social',
  // Campaign
  'facebook-eoy': 'campaign',
  'libero-football': 'campaign',
  'levis-vote': 'campaign',
  'samsung-unbox': 'campaign',
  'wwf-just': 'campaign',
  'facebook-real-story': 'campaign',
  // Brand & Identity
  'wwf-just-brand': 'brand',
  'studio-mano': 'brand',
  'facebook-rebrand': 'brand',
  'bundaberg-rum': 'brand',
  // Events
  'mr-lee': 'events',
  'meta-connect-2024': 'events',
  'meta-connect-2025': 'events',
};

export function IndexContent({ onProjectClick }: { onProjectClick?: (sectionId: string, projectId?: string) => void }) {
  const allSections = [
    {
      label: 'INTERACTIVE',
      projects: [
        { id: 'samsung-diplo', title: "SAMSUNG X DIPLO [CAN'T STOP]", thumb: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/xXvnNMChIHQzGOdH.gif' },
        { id: 'mcdonalds-emlings', title: "McDONALD'S [EMLINGS]", thumb: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/BmylwDPzFqnMlzuH.gif' },
        { id: 'samsung-s-drive', title: 'SAMSUNG [S-DRIVE]', thumb: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/49424455075641.5d4132e539b75_4c6ca02e.gif' },
        { id: 'mood-calendar', title: 'MOOD CALENDAR', thumb: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/BohndpCczayUhLRz.webp' },
        { id: 'love-meter', title: 'LOVE-O-METER', thumb: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/FqZUEkFKBDsqgrMJ.gif' },
        { id: 'poster-3d', title: 'POSTER.3D', thumb: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/pAQzwsyJJllvdawh.gif' },
        { id: 'whoopee-cushion', title: 'THE WHOOPINATOR', thumb: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/pZAmffwXWzvtAGVp.gif' },
        { id: 'instagram-unlocker', title: 'LEARN TO UNLOCK', thumb: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/Screenshot2026-03-12at8.53.47PM_a3120d72.webp' },
      ]
    },
    {
      label: 'SOCIAL AND PR',
      projects: [
        { id: 'social-01', title: '@ZUCK', thumb: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/download(8)_c34ba657.jpeg' },
        { id: 'social-02', title: 'FACEBOOK (I WANNA ROCK)', thumb: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/ezgif-6-525ea5da065d(1)_4b841a17.gif' },
        { id: 'social-03', title: 'FACEBOOK (HOUSE OF HORRORS)', thumb: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/ezgif-80d9ca958b65d964_9784c73e.gif' },
        { id: 'facebook-mindfull', title: 'FACEBOOK (MINDFULL)', thumb: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/ezgif-6-9da134f664ea(1)_bb4e7901.gif' },
      ]
    },
    {
      label: 'CAMPAIGN',
      projects: [
        { id: 'facebook-eoy', title: 'FACEBOOK [END OF THE YEAR]', thumb: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/11111_ac2b5ad0.jpg' },
        { id: 'libero-football', title: 'LIBERO MAGAZINE [FOOTBALL ANALOGIES]', thumb: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/football-analogies-libero-magazine-1_0f1359f7.gif' },
        { id: 'levis-vote', title: "LEVI'S [USE YOUR VOTE]", thumb: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/iNGsyYpiapxyHSKi.webp' },
        { id: 'samsung-unbox', title: 'SAMSUNG [UNBOX YOUR PHONE]', thumb: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/ezgif-6-93a9b73094d5(1)_cb611700.gif' },
        { id: 'wwf-just', title: 'WWF [JUST*]', thumb: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/Screenshot2026-03-14at7.25.46PM_d7268fba.webp' },
        { id: 'facebook-real-story', title: 'FACEBOOK (A REAL FACEBOOK STORY)', thumb: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/akosua_b00f2ded.gif' },
      ]
    },
    {
      label: 'BRAND AND IDENTITY',
      projects: [
        { id: 'wwf-just-brand', title: 'WWF [JUST*]', thumb: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663345609769/CFPgqAIsIykasLty.jpg' },
        { id: 'studio-mano', title: 'STUDIO MANO', thumb: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/sm-mezcal-1_13a71f69.jpg' },
        { id: 'facebook-rebrand', title: 'FACEBOOK [RE-BRANDING]', thumb: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/fb-rebrand-thumb_d2c892e3.avif' },
        { id: 'bundaberg-rum', title: 'BUNDABERG RUM [BLENDING KIT]', thumb: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/bundaberg-label_37e928ed.jpg' },
      ]
    },
    {
      label: 'EVENTS AND ACTIVATIONS',
      projects: [
        { id: 'meta-connect-2025', title: 'META [CONNECT 2025]', thumb: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/mc2025-stage_4e7dd518.webp' },
        { id: 'meta-connect-2024', title: 'META [CONNECT 2024]', thumb: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/meta-connect-zuck-orion_a980dc7c.jpg' },
        { id: 'mr-lee', title: 'PLAYSTATION [MR. LEE TAILOR SHOP]', thumb: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/cYAURdpDEAqYwgnUsFrt8S/playstation-mr-lee-tailor-shop(1)_d915f8ea.gif' },
      ]
    },
    {
      label: 'DESIGN AND ILLUSTRATION',
      // carousel — images pulled from the same list as DesignContent
      projects: DESIGN_IMAGES.map((url, i) => ({ id: `design-${i}`, title: '', thumb: url }))
    },
    {
      label: 'POTTERY AND FURNITURE',
      // carousel — images pulled from the same list as PotteryContent
      projects: POTTERY_IMAGES.map((url, i) => ({ id: `pottery-${i}`, title: '', thumb: url }))
    },
  ];

  // Carousel sections that scroll horizontally without labels
  const carouselSectionLabels = new Set(['DESIGN AND ILLUSTRATION', 'POTTERY AND FURNITURE']);

  return (
    <div className="p-6 overflow-y-auto h-full" style={{ background: '#000000', color: '#ffffff' }}>
      {allSections.map((section) => (
        <div key={section.label} className="mb-8">
          <h2 style={{ fontFamily: 'Arial Narrow, Arial, sans-serif', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '12px', color: '#ffffff', letterSpacing: '0.05em' }}>
            {section.label}
          </h2>
          {carouselSectionLabels.has(section.label) ? (
            <CarouselRow images={section.projects.map(p => p.thumb).filter(Boolean) as string[]} />
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {section.projects.map((project) => {
                const sectionId = PROJECT_TO_SECTION[project.id];
                const isClickable = !!sectionId && !!onProjectClick;
                return (
                  <div
                    key={project.id}
                    onClick={isClickable ? () => onProjectClick!(sectionId, project.id) : undefined}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      width: '160px',
                      cursor: isClickable ? 'pointer' : 'default',
                    }}
                  >
                    <div
                      style={{
                        width: '160px',
                        height: '120px',
                        border: 'none',
                        background: '#111111',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'opacity 0.15s',
                      }}
                      onMouseEnter={e => { if (isClickable) (e.currentTarget as HTMLDivElement).style.opacity = '0.75'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.opacity = '1'; }}
                    >
                      {project.thumb ? (
                        <img
                          src={project.thumb}
                          alt={project.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : null}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Arial Narrow, Arial, sans-serif',
                        fontSize: '9px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        color: isClickable ? '#ffffff' : '#666666',
                        lineHeight: 1.3,
                        letterSpacing: '0.03em',
                        textDecoration: isClickable ? 'underline' : 'none',
                        textUnderlineOffset: '2px',
                      }}
                    >
                      {project.title}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Horizontal auto-scrolling carousel — no labels, seamless loop
function CarouselRow({ images }: { images: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    const speed = 0.5;
    const step = () => {
      pos += speed;
      // Reset when first half scrolled past
      if (track.scrollWidth > 0 && pos >= track.scrollWidth / 2) {
        pos = 0;
      }
      track.style.transform = `translateX(-${pos}px)`;
      rafId = requestAnimationFrame(step);
    };
    let rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Duplicate images for seamless loop
  const doubled = [...images, ...images];

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '12px',
          willChange: 'transform',
          width: 'max-content',
        }}
      >
        {doubled.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            style={{
              height: '160px',
              width: 'auto',
              objectFit: 'cover',
              flexShrink: 0,
              display: 'block',
            }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        ))}
      </div>
    </div>
  );
}
