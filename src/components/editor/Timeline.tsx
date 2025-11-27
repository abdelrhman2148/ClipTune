"use client";

import React, { useState, useRef, useEffect } from 'react';

interface TimelineProps {
    duration: number; // in seconds
    clips: Array<{ id: string; start: number; end: number; label: string }>;
    onClipChange: (id: string, start: number, end: number) => void;
}

export function Timeline({ duration, clips, onClipChange }: TimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [zoom, setZoom] = useState(1); // Pixels per second
    const [waveformHeights, setWaveformHeights] = useState<number[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                setIsPlaying(prev => !prev);
            } else if (e.code === 'ArrowLeft') {
                e.preventDefault();
                setCurrentTime(prev => Math.max(0, prev - 5));
            } else if (e.code === 'ArrowRight') {
                e.preventDefault();
                setCurrentTime(prev => Math.min(duration, prev + 5));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [duration]);

    useEffect(() => {
        // Generate random heights only on the client to avoid hydration mismatch
        setWaveformHeights(Array.from({ length: 100 }, () => Math.random() * 100));
    }, []);

    // Mock waveform generation
    const renderWaveform = () => {
        return (
            <div className="absolute inset-0 flex items-center opacity-30 pointer-events-none">
                {waveformHeights.map((height, i) => (
                    <div
                        key={i}
                        className="w-1 bg-indigo-500 mx-px rounded-full"
                        style={{ height: `${height}%` }}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="w-full bg-slate-900 border-t border-slate-800 p-4">
            <div className="flex justify-between mb-2 text-slate-400 text-xs items-center">
                <div className="flex gap-2">
                    <span>{new Date(currentTime * 1000).toISOString().substring(14, 19)}</span>
                    <span className="text-slate-600">/</span>
                    <span>{new Date(duration * 1000).toISOString().substring(14, 19)}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => setZoom(z => Math.max(0.5, z - 0.5))}
                        className="px-2 py-1 bg-slate-800 rounded hover:bg-slate-700 text-xs"
                    >
                        -
                    </button>
                    <span>Zoom: {zoom}x</span>
                    <button
                        onClick={() => setZoom(z => Math.min(5, z + 0.5))}
                        className="px-2 py-1 bg-slate-800 rounded hover:bg-slate-700 text-xs"
                    >
                        +
                    </button>
                </div>
            </div>

            <div
                ref={containerRef}
                className="relative h-32 bg-slate-800 rounded-lg overflow-hidden cursor-text select-none"
            >
                {/* Waveform Background */}
                {waveformHeights.length > 0 && renderWaveform()}

                {/* Clips */}
                {clips.map((clip) => (
                    <div
                        key={clip.id}
                        className="absolute top-2 bottom-2 bg-indigo-500/30 border-2 border-indigo-500 rounded group cursor-move"
                        style={{
                            left: `${(clip.start / duration) * 100}%`,
                            width: `${((clip.end - clip.start) / duration) * 100}%`
                        }}
                    >
                        <span className="absolute -top-6 left-0 bg-indigo-500 text-white text-[10px] px-1 rounded">
                            {clip.label}
                        </span>

                        {/* Drag Handles */}
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-indigo-400 cursor-w-resize opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-indigo-400 cursor-e-resize opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}

                {/* Playhead */}
                <div className="absolute top-0 bottom-0 w-px bg-red-500 left-1/2 pointer-events-none">
                    <div className="w-3 h-3 bg-red-500 rounded-full -ml-1.5 -mt-1.5" />
                </div>
            </div>

            <div className="mt-4 flex justify-center gap-4">
                <button className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white">
                    ⏮️
                </button>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                >
                    {isPlaying ? '⏸️' : '▶️'}
                </button>
                <button className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white">
                    ⏭️
                </button>
            </div>
        </div>
    );
}
