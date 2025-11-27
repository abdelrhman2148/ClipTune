"use client";

import React, { useState } from 'react';
import { Timeline } from '@/components/editor/Timeline';

export default function EditorPage() {
    const [clips, setClips] = useState([
        { id: '1', start: 10, end: 35, label: 'Viral Moment #1' },
        { id: '2', start: 60, end: 85, label: 'Funny Outtake' },
    ]);

    const handleClipChange = (id: string, start: number, end: number) => {
        setClips(clips.map(c => c.id === id ? { ...c, start, end } : c));
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Header */}
            <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6">
                <div className="font-bold text-xl">ClipTune Editor</div>
                <button className="bg-indigo-600 px-4 py-2 rounded text-sm font-bold">Export</button>
            </header>

            {/* Main Content (Preview) */}
            <div className="flex-1 flex items-center justify-center bg-slate-900/50">
                <div className="aspect-[9/16] h-[600px] bg-black rounded-lg border border-slate-700 flex items-center justify-center">
                    <span className="text-slate-500">Video Preview</span>
                </div>
            </div>

            {/* Timeline */}
            <Timeline
                duration={120}
                clips={clips}
                onClipChange={handleClipChange}
            />
        </div>
    );
}
