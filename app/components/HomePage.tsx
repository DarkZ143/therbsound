/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
// app/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
    Music4,
    AudioWaveform,
    Headphones,
    Play,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Therbsound from "@/public/therbsound.png"


const pianoKeys = [
    { note: "C", key: "a", freq: 261.63, sharp: false },
    { note: "C#", key: "w", freq: 277.18, sharp: true },

    { note: "D", key: "s", freq: 293.66, sharp: false },
    { note: "D#", key: "e", freq: 311.13, sharp: true },

    { note: "E", key: "d", freq: 329.63, sharp: false },

    { note: "F", key: "f", freq: 349.23, sharp: false },
    { note: "F#", key: "t", freq: 369.99, sharp: true },

    { note: "G", key: "g", freq: 392.0, sharp: false },
    { note: "G#", key: "y", freq: 415.3, sharp: true },

    { note: "A", key: "h", freq: 440.0, sharp: false },
    { note: "A#", key: "u", freq: 466.16, sharp: true },

    { note: "B", key: "j", freq: 493.88, sharp: false },

    { note: "C5", key: "k", freq: 523.25, sharp: false },
];

export default function HomePage() {
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorsRef = useRef<
        Record<
            string,
            {
                oscillator: OscillatorNode;
                gainNode: GainNode;
            }
        >
    >({});


    useEffect(() => {
        setMounted(true);

        const handleKeyDown = (e: KeyboardEvent) => {
            const pressedKey = e.key.toLowerCase();

            // PREVENT REPEATING SOUND
            if (oscillatorsRef.current[pressedKey]) return;

            const currentKey = pianoKeys.find(
                (piano) => piano.key === pressedKey
            );

            if (!currentKey) return;

            setActiveKey(pressedKey);

            if (!audioContextRef.current) {
                audioContextRef.current = new window.AudioContext();
            }

            const ctx = audioContextRef.current;

            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.type = "triangle";
            oscillator.frequency.value = currentKey.freq;

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            // ATTACK
            gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);

            gainNode.gain.exponentialRampToValueAtTime(
                0.15,
                ctx.currentTime + 0.02
            );

            oscillator.start();

            oscillatorsRef.current[pressedKey] = {
                oscillator,
                gainNode,
            };
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const releasedKey = e.key.toLowerCase();

            const activeOscillator =
                oscillatorsRef.current[releasedKey];

            if (!activeOscillator || !audioContextRef.current) return;

            const ctx = audioContextRef.current;

            // RELEASE / SUSTAIN OFF
            activeOscillator.gainNode.gain.exponentialRampToValueAtTime(
                0.0001,
                ctx.currentTime + 0.3
            );

            activeOscillator.oscillator.stop(
                ctx.currentTime + 0.3
            );

            delete oscillatorsRef.current[releasedKey];

            setActiveKey(null);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

            window.removeEventListener(
                "keyup",
                handleKeyUp
            );
        };
    }, []);
    if (!mounted) return null;

    return (
        <main className="relative min-h-screen overflow-hidden bg-black text-white">
            {/* BACKGROUND */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,170,255,0.2),transparent_35%)]" />

            <div className="absolute bottom-0 left-0 h-100 w-100 rounded-full bg-cyan-500/20 blur-[140px]" />

            <div className="absolute right-0 top-0 h-87.5 w-87.5 rounded-full bg-purple-500/20 blur-[140px]" />

            {/* HERO */}
            <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-32 text-center">
                {/* FLOATING ICONS */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 4,
                    }}
                    className="absolute left-10 top-40 hidden rounded-full border border-white/10 bg-white/5 p-5 backdrop-blur-xl lg:block"
                >
                    <Headphones className="h-10 w-10 text-cyan-400" />
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, 20, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 5,
                    }}
                    className="absolute right-10 top-60 hidden rounded-full border border-white/10 bg-white/5 p-5 backdrop-blur-xl lg:block"
                >
                    <Music4 className="h-10 w-10 text-purple-400" />
                </motion.div>

                {/* CONTENT */}
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="relative z-10"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 4,
                        }}
                        className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-cyan-400/20 bg-white/5 shadow-[0_0_80px_rgba(0,200,255,0.35)] backdrop-blur-2xl"
                    >
                        <Image src={Therbsound} alt="theRBsound" fill />
                    </motion.div>

                    <h1 className="mb-6 text-5xl font-black leading-tight md:text-8xl">
                        <span className="bg-linear-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                            theRBsound
                        </span>
                    </h1>

                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/70 md:text-2xl">
                        Cinematic Music Producer • Emotional & Dark Composer • Dark Piano •
                        Modern Mixing & Sound Design
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                        <button className="group flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-8 py-4 text-sm uppercase tracking-[0.3em] backdrop-blur-xl transition hover:scale-105 hover:bg-cyan-500/20">
                            <Play className="h-5 w-5" />
                            Listen Now
                        </button>

                        <button className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm uppercase tracking-[0.3em] text-white/80 backdrop-blur-xl transition hover:scale-105 hover:bg-white/10">
                            Explore Studio
                        </button>
                    </div>
                </motion.div>

                {/* FL STUDIO PIANO */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="relative mt-24 w-full overflow-x-auto px-4 pb-10"
                >
                    <p className="mb-6 text-center text-sm uppercase tracking-[0.35em] text-white/40">
                        Let&apos;s Fun with Keys
                    </p>

                    <div className="relative mx-auto h-65 w-fit">
                        {/* WHITE KEYS */}
                        <div className="flex">
                            {pianoKeys
                                .filter((k) => !k.sharp)
                                .map((item) => (
                                    <motion.div
                                        key={item.key}
                                        animate={
                                            activeKey === item.key
                                                ? {
                                                    y: 4,
                                                    scale: 0.98,
                                                }
                                                : {}
                                        }
                                        className={`
                      relative flex h-60 w-17.5 flex-col items-center justify-end
                      rounded-b-2xl border border-zinc-300
                      bg-linear-to-b from-white to-zinc-200
                      shadow-[inset_0_-10px_15px_rgba(0,0,0,0.15)]
                      ${activeKey === item.key
                                                ? "from-cyan-200 to-cyan-400"
                                                : ""
                                            }
                    `}
                                    >
                                        <div className="mb-4 text-center">
                                            <p className="text-lg font-black text-black">
                                                {item.note}
                                            </p>

                                            <p className="text-xs uppercase tracking-widest text-zinc-500">
                                                {item.key}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>

                        {/* BLACK KEYS */}
                        <div className="pointer-events-none absolute left-0 top-0 flex">
                            {pianoKeys.map((item, index) => {
                                if (!item.sharp) {
                                    return (
                                        <div
                                            key={item.key}
                                            className="relative w-17.5"
                                        >
                                            {pianoKeys[index + 1]?.sharp && (
                                                <motion.div
                                                    animate={
                                                        activeKey === pianoKeys[index + 1].key
                                                            ? {
                                                                y: 4,
                                                            }
                                                            : {}
                                                    }
                                                    className={`
                absolute left-12 z-20 flex h-37.5 w-10.5
                flex-col items-center justify-end
                rounded-b-xl border border-zinc-700
                bg-linear-to-b from-zinc-800 to-black
                shadow-[0_10px_25px_rgba(0,0,0,0.8)]
                ${activeKey === pianoKeys[index + 1].key
                                                            ? "from-cyan-700 to-cyan-950"
                                                            : ""
                                                        }
              `}
                                                >
                                                    <div className="mb-3 text-center">
                                                        <p className="text-xs font-bold text-white">
                                                            {pianoKeys[index + 1].note}
                                                        </p>

                                                        <p className="text-[10px] uppercase tracking-widest text-zinc-400">
                                                            {pianoKeys[index + 1].key}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    );
                                }

                                return null;
                            })}
                        </div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}