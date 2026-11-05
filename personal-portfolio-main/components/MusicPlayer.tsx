"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, Disc3, Music2, Pause, Play, SkipBack, SkipForward } from "lucide-react";

const tracks = [
  { title: "love.", artist: "wave to earth", src: "/music/love.mp3" },
  { title: "Scott Street", artist: "Phoebe Bridgers", src: "/music/scott-street.mp3" },
  { title: "I'd Rather Pretend", artist: "Bryant Barnes", src: "/music/id-rather-pretend.mp3" },
];

// Keep one audio instance while the locale layout remounts during client navigation.
let sharedAudio: HTMLAudioElement | null = null;

function getSharedAudio(): HTMLAudioElement {
  if (!sharedAudio) {
    sharedAudio = new Audio(tracks[0].src);
    sharedAudio.preload = "none";
  }
  return sharedAudio;
}

function getTrackIndex(audio: HTMLAudioElement) {
  return tracks.findIndex((item) => new URL(item.src, window.location.origin).href === audio.src);
}

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const audio = getSharedAudio();
    const syncState = () => {
      setIsPlaying(!audio.paused);
      const index = getTrackIndex(audio);
      if (index >= 0) setCurrentTrack(index);
    };
    const playNext = () => {
      const nextIndex = (getTrackIndex(audio) + 1) % tracks.length;
      audio.src = tracks[nextIndex].src;
      audio.load();
      setCurrentTrack(nextIndex);
      void audio.play().catch(() => setIsPlaying(false));
    };

    audio.addEventListener("play", syncState);
    audio.addEventListener("pause", syncState);
    audio.addEventListener("ended", playNext);
    syncState();

    return () => {
      audio.removeEventListener("play", syncState);
      audio.removeEventListener("pause", syncState);
      audio.removeEventListener("ended", playNext);
    };
  }, []);

  async function togglePlayback() {
    const audio = getSharedAudio();
    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function selectTrack(index: number) {
    setIsMenuOpen(false);
    const audio = getSharedAudio();
    if (index === currentTrack) {
      if (audio.paused) void togglePlayback();
      return;
    }

    setCurrentTrack(index);
    audio.pause();
    audio.src = tracks[index].src;
    audio.load();
    setIsPlaying(false);
    void audio.play().then(
      () => setIsPlaying(true),
      () => setIsPlaying(false),
    );
  }

  function skipTrack(direction: -1 | 1) {
    selectTrack((currentTrack + direction + tracks.length) % tracks.length);
  }

  const track = tracks[currentTrack];

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-1.5 rounded-full border border-white/70 bg-white/90 p-2 shadow-xl shadow-brand-purple/15 backdrop-blur-md">
      <div className="relative">
        {isMenuOpen && (
          <div id="music-playlist" className="absolute bottom-full right-0 mb-3 w-72 max-w-[calc(100vw-2.5rem)] rounded-3xl border border-white/70 bg-white/95 p-3 shadow-2xl shadow-slate-900/15 backdrop-blur-xl">
            <div className="flex items-center justify-between px-3 pb-2 pt-1">
              <div>
                <p className="text-sm font-extrabold text-brand-text">Daftar lagu</p>
                <p className="text-xs font-medium text-brand-text/50">Pilih yang ingin didengar</p>
              </div>
              <Disc3 aria-hidden="true" className="h-5 w-5 text-brand-purple" />
            </div>
            <div className="space-y-1">
              {tracks.map((item, index) => {
                const isSelected = index === currentTrack;
                return (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => selectTrack(index)}
                    aria-current={isSelected ? "true" : undefined}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition ${isSelected ? "bg-brand-purple/10 text-brand-purple" : "text-brand-text hover:bg-slate-100"}`}
                  >
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${isSelected ? "bg-brand-purple text-white" : "bg-slate-100 text-brand-text/60"}`}>
                      {isSelected && isPlaying ? <Music2 aria-hidden="true" className="h-4 w-4" /> : isSelected ? <Play aria-hidden="true" className="ml-0.5 h-4 w-4 fill-current" /> : <Music2 aria-hidden="true" className="h-4 w-4" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold">{item.title}</span>
                      <span className="block truncate text-xs font-medium opacity-60">{item.artist}</span>
                    </span>
                    {isSelected && <Check aria-hidden="true" className="h-4 w-4 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={`Pilih lagu, lagu saat ini ${track.title}`}
          aria-expanded={isMenuOpen}
          aria-controls="music-playlist"
          className="flex max-w-44 items-center gap-2 rounded-full px-3 py-2 text-left text-brand-text transition hover:bg-brand-purple/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
        >
          <Music2 aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-purple" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-extrabold">{track.title}</span>
            <span className="block truncate text-[10px] font-semibold text-brand-text/50">{track.artist}</span>
          </span>
          <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 text-brand-text/50 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      <button type="button" onClick={() => skipTrack(-1)} aria-label="Lagu sebelumnya" title="Lagu sebelumnya" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-brand-text/70 transition hover:bg-brand-purple/10 hover:text-brand-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple">
        <SkipBack aria-hidden="true" className="h-4 w-4 fill-current" />
      </button>
      <button type="button" onClick={togglePlayback} aria-label={isPlaying ? "Jeda musik" : "Putar musik"} title={isPlaying ? "Jeda musik" : "Putar musik"} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white transition hover:bg-brand-purple/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2">
        {isPlaying ? <Pause aria-hidden="true" className="h-4 w-4 fill-current" /> : <Play aria-hidden="true" className="ml-0.5 h-4 w-4 fill-current" />}
      </button>
      <button type="button" onClick={() => skipTrack(1)} aria-label="Lagu berikutnya" title="Lagu berikutnya" className="mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-brand-text/70 transition hover:bg-brand-purple/10 hover:text-brand-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple">
        <SkipForward aria-hidden="true" className="h-4 w-4 fill-current" />
      </button>
    </div>
  );
}