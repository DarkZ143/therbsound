// app/creations/page.tsx
"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
    Play,
    Pause,
    Music4,
    Download,

} from "lucide-react";
import Therbsound from "@/public/therbsound.png"
import { FaYoutube } from "react-icons/fa";

const categorizedTracks = {
    Tracks: [
        {
            id: 1,
            title: "Dark Tales",
            image: "/music/album1/darktales.png",
            audio: "/music/album1/dark_tales.mp3",
        },
        {
            id: 2,
            title: "The Devil's Night",
            image: "/music/album3/devilnight.png",
            audio: "/music/album3/devil_night.mp3",
        },
        {
            id: 3,
            title: "The Moon Way",
            image: "/music/album4/moonway.png",
            audio: "/music/album4/the_moon_way.mp3",
        },
        {
            id: 4,
            title: "Alone Heart",
            image: "/music/album9/aloneheart.png",
            audio: "/music/album9/alone_heart.mp3",
        },
        {
            id: 5,
            title: "Way of Wonder",
            image: "/music/album6/wayofwonder.png",
            audio: "/music/album6/way_of_wonders.mp3",
        },
        {
            id: 6,
            title: "The Hoppers",
            image: "/music/album5/thehoppers.png",
            audio: "/music/album5/the_hoppers.mp3",
        },
    ],

    Originals: [
        {
            id: 3,
            title: "Ik Baarish",
            image: "/music/album14/ikbaarish.png",
            audio: "/music/album14/Ik_baarish.mp3",
        },
        {
            id: 4,
            title: "Meri Mohabbat",
            image: "/music/album13/merimohabbat.png",
            audio: "/music/album13/Meri_mohabbat.mp3",
        },
    ],

    Covers: [
        {
            id: 5,
            title: "Ijazat Unplugged",
            image: "/music/album7/ijazatunplugged.png",
            audio: "/music/album7/ijazat_unplugged.mp3",
        },
        {
            id: 6,
            title: "Barbaad X Ishq",
            image: "/music/album16/barbaadxishq.png",
            audio: "/music/album16/barbaadxishq.mp3",
        },

    ],
};

export default function CreationsPage() {
    const [playingId, setPlayingId] = useState<number | null>(
        null
    );

    const audioRefs = useRef<
        Record<number, HTMLAudioElement | null>
    >({});

    const handlePlay = (id: number) => {
        Object.entries(audioRefs.current).forEach(
            ([trackId, audio]) => {
                if (Number(trackId) !== id && audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            }
        );

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
        <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-36 text-white">
            {/* BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden">
                {/* CYAN */}
                <motion.div
                    animate={{
                        x: [0, 120, 0],
                        y: [0, -80, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 16,
                        ease: "easeInOut",
                    }}
                    className="absolute -left-30 -top-30 h-105 w-105 rounded-full bg-cyan-500/10 blur-[140px]"
                />

                {/* PURPLE */}
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 60, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 18,
                        ease: "easeInOut",
                    }}
                    className="absolute -bottom-30 -right-30 h-105 w-105 rounded-full bg-purple-500/10 blur-[140px]"
                />

                {/* GRID */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 mx-auto max-w-7xl">
                {/* HERO */}
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mb-24 text-center"
                >
                    <div className="mb-8 flex justify-center">
                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 10,
                                ease: "linear",
                            }}
                            className="relative flex h-28 w-28 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-2xl"
                        >
                            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl" />
                            <Image src={Therbsound} alt="theRBsound" fill />

                        </motion.div>
                    </div>

                    <p className="mb-4 text-sm uppercase tracking-[0.45em] text-cyan-400">
                        theRBsound Collection
                    </p>

                    <h1 className="bg-linear-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-5xl font-black text-transparent md:text-7xl">
                        My Creations
                    </h1>

                    <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/60">
                        A collection of emotional soundtracks, cinematic originals,
                        immersive covers and musical stories created from feelings,
                        memories and late-night melodies.
                    </p>
                </motion.div>

                {/* CATEGORIZED TRACKS */}
                <div className="space-y-28">
                    {Object.entries(categorizedTracks).map(
                        ([category, categoryTracks]) => (
                            <div key={category}>
                                {/* CATEGORY TITLE */}
                                <div className="mb-12 flex items-center gap-5">
                                    <div className="h-0.5 w-16 bg-linear-to-r from-cyan-400 to-purple-500" />

                                    <h2 className="bg-linear-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-4xl font-black text-transparent md:text-5xl">
                                        {category}
                                    </h2>
                                </div>

                                {/* GRID */}
                                <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
                                    {categoryTracks.map((track, index) => (
                                        <motion.div
                                            key={track.id}
                                            initial={{ opacity: 0, y: 80 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: index * 0.12,
                                            }}
                                            whileHover={{
                                                y: -12,
                                            }}
                                            className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl"
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

                                                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

                                                {/* PLAY BUTTON */}
                                                <motion.button
                                                    whileHover={{
                                                        scale: 1.1,
                                                    }}
                                                    whileTap={{
                                                        scale: 0.9,
                                                    }}
                                                    onClick={() =>
                                                        handlePlay(track.id)
                                                    }
                                                    className="absolute bottom-5 right-5 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/20 backdrop-blur-xl"
                                                >
                                                    {playingId === track.id ? (
                                                        <Pause className="h-7 w-7 text-white" />
                                                    ) : (
                                                        <Play className="ml-1 h-7 w-7 text-white" />
                                                    )}
                                                </motion.button>

                                                {/* CATEGORY BADGE */}
                                                {/* TOP ACTIONS */}
                                                <div className="absolute left-5 top-5 right-5 flex items-center justify-between">
                                                    {/* CATEGORY */}
                                                    <div className="rounded-full border border-white/10 bg-black/40 px-5 py-2 text-xs uppercase tracking-[0.3em] backdrop-blur-xl">
                                                        {category}
                                                    </div>

                                                    {/* DOWNLOAD BUTTON */}
                                                    <a
                                                        href={track.audio}
                                                        download
                                                        className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-xl transition hover:scale-110 hover:border-cyan-400/30 hover:bg-cyan-500/20"
                                                    >
                                                        <Download className="h-5 w-5 text-white/70 transition group-hover:text-cyan-300" />
                                                    </a>
                                                </div></div>

                                            {/* CONTENT */}
                                            <div className="relative z-10 p-7">
                                                <div className="mb-3 flex items-center gap-2">
                                                    <Music4 className="h-4 w-4 text-cyan-300" />

                                                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                                                        theRBsound
                                                    </p>
                                                </div>

                                                <h2 className="text-3xl font-black text-white">
                                                    {track.title}
                                                </h2>
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
                            </div>
                        )
                    )}
                </div>
                {/* MORE BUTTON */}
                <div className="mt-16 flex justify-center">
                    <a
                        href="https://youtube.com/@rahul.bhardwaj?si=qlNjxgOZwspmoy2F"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-10 py-5 backdrop-blur-2xl transition hover:scale-105 hover:border-red-400/30"
                    >
                        {/* GLOW */}
                        <div className="absolute inset-0 bg-linear-to-r from-red-500/10 via-cyan-500/10 to-purple-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

                        <div className="relative z-10 flex items-center gap-4">
                            <FaYoutube className="h-6 w-6 text-red-400" />

                            <span className="text-sm font-bold uppercase tracking-[0.35em] text-white/80 transition group-hover:text-white">
                                Explore More On YouTube
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </main>
    );
}