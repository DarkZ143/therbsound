/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { tracks } from "@/data/tracks";

export default function LatestCreations() {
    const [playingId, setPlayingId] = useState<number | null>(null);

    const audioRefs = useRef<Record<number, HTMLAudioElement | null>>({});

    const [randomTracks, setRandomTracks] = useState<typeof tracks>([]);

    useEffect(() => {
        const shuffled = [...tracks].sort(
            () => Math.random() - 0.5
        );

        setRandomTracks(shuffled.slice(0, 4));
    }, []);
    const handlePlay = (id: number) => {
        Object.entries(audioRefs.current).forEach(([trackId, audio]) => {
            if (Number(trackId) !== id && audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        });

        const currentAudio = audioRefs.current[id];

        if (!currentAudio) return;

        if (playingId === id) {
            currentAudio.pause();
            setPlayingId(null);
        } else {
            currentAudio.play();
            setPlayingId(id);
        }
    };

    return (
        <section className="relative z-10 mx-auto mt-32 max-w-7xl overflow-hidden rounded-[3rem] border border-white/10 bg-black/40 px-6 pb-24 pt-20 backdrop-blur-3xl">
            {/* ANIMATED BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden">
                {/* CYAN GLOW */}
                <motion.div
                    animate={{
                        x: [0, 80, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 12,
                        ease: "easeInOut",
                    }}
                    className="absolute -left-30 -top-30 h-100 w-100 rounded-full bg-cyan-500/20 blur-[120px]"
                />

                {/* PURPLE GLOW */}
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 60, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 14,
                        ease: "easeInOut",
                    }}
                    className="absolute -bottom-30 -right-30 h-100 w-100 rounded-full bg-purple-500/20 blur-[120px]"
                />

                {/* CENTER GLOW */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 8,
                        ease: "easeInOut",
                    }}
                    className="absolute left-1/2 top-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]"
                />

                {/* GRID OVERLAY */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]" />
            </div>
            {/* TITLE */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 mb-16 text-center"
            >
                <p className="mb-4 text-sm uppercase tracking-[0.4em] text-cyan-400">
                    Latest Creations
                </p>

                <h2 className="bg-linear-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-4xl font-black text-transparent md:text-6xl">
                    Featured Sounds
                </h2>
            </motion.div>

            {/* GRID */}
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                {randomTracks.map((track, index) => (
                    <motion.div
                        key={track.id}
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ y: -12 }}
                        className="group relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 backdrop-blur-2xl"
                    >
                        {/* GLOW */}
                        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

                        {/* IMAGE */}
                        <div className="relative aspect-square overflow-hidden">
                            <Image
                                src={track.image}
                                alt={track.title}
                                fill
                                className="object-cover transition duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                            {/* PLAY BUTTON */}
                            <button
                                onClick={() => handlePlay(track.id)}
                                className="absolute bottom-5 right-5 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/20 backdrop-blur-xl transition hover:scale-110 hover:bg-cyan-500/40"
                            >
                                {playingId === track.id ? (
                                    <Pause className="h-7 w-7 text-white" />
                                ) : (
                                    <Play className="ml-1 h-7 w-7 text-white" />
                                )}
                            </button>
                        </div>
                        {/* CONTENT */}
                        <div className="relative z-10 p-6">
                            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-cyan-300">
                                theRBsound
                            </p>

                            <h3 className="text-2xl font-black text-white">
                                {track.title}
                            </h3>
                        </div>

                        {/* AUDIO */}
                        <audio
                            ref={(el) => {
                                audioRefs.current[track.id] = el;
                            }}
                            src={track.audio}
                            onEnded={() => setPlayingId(null)}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}