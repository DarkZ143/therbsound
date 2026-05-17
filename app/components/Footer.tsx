/* eslint-disable react-hooks/purity */
// components/Footer.tsx
"use client";
import {
    Mail,
    ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Therbsound from "@/public/therbsound.png"
import {
    FaInstagram,
    FaYoutube,
    FaSpotify,
    FaHeadphones,
} from "react-icons/fa";
import Link from "next/link";


import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-black px-6 pb-10 pt-28">
            {/* BACKGROUND GLOW */}
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

                {/* CENTER */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 10,
                    }}
                    className="absolute left-1/2 top-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]"
                />

                {/* GRID */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 mx-auto max-w-7xl">
                {/* TOP */}
                <div className="grid gap-16 lg:grid-cols-2">
                    {/* LEFT */}
                    <div>
                        {/* LOGO */}
                        <div className="mb-8 flex items-center gap-5">
                            <motion.div
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 10,
                                    ease: "linear",
                                }}
                                className="relative flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10"
                            >
                                <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl" />
                                <Image src={Therbsound} alt="theRBsound" fill />

                            </motion.div>

                            <div>
                                <h2 className="bg-linear-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-5xl font-black text-transparent">
                                    theRBsound
                                </h2>

                                <p className="mt-2 text-sm uppercase tracking-[0.4em] text-white/40">
                                    Music Producer & Composer 
                                </p>
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <p className="max-w-2xl text-lg leading-relaxed text-white/60">
                            Emotional melodies, cinematic soundscapes, dark piano,
                            orchestral feelings and modern music production blended into a
                            universe of sound.
                        </p>

                        {/* SOCIALS */}
                        {/* SOCIALS */}
                        <div className="mt-10 flex flex-wrap gap-5">
                            {[
                                {
                                    icon: FaInstagram,
                                    name: "Instagram",
                                    link: "https://instagram.com/rstarbhardwaj",
                                },
                                {
                                    icon: FaYoutube,
                                    name: "YouTube",
                                    link: "https://youtube.com/@rahul.bhardwaj?si=qlNjxgOZwspmoy2F",
                                },
                                {
                                    icon: FaSpotify,
                                    name: "Spotify",
                                    link: "https://open.spotify.com/track/40U3x54V9j6oXod9zA2NYz?si=694189cd8660476b",
                                },
                                {
                                    icon: FaHeadphones,
                                    name: "Pixabay Audio",
                                    link: "https://pixabay.com/users/rahulbhardwaj603-24310012/",
                                },
                                {
                                    icon: Mail,
                                    name: "Email",
                                    link: "mailto:rahulbhardwajthestar58@gmail.com",
                                },
                            ].map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{
                                        y: -5,
                                        scale: 1.05,
                                    }}
                                    whileTap={{
                                        scale: 0.95,
                                    }}
                                    className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl transition"
                                >
                                    {/* HOVER GLOW */}
                                    <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 to-purple-500/20 opacity-0 transition duration-500 group-hover:opacity-100" />

                                    <item.icon className="relative z-10 h-7 w-7 text-white/70 transition group-hover:text-white" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="grid gap-10 md:grid-cols-2">
                        {/* QUICK LINKS */}
                        <div>
                            <h3 className="mb-6 text-xl font-black text-white">
                                Navigation
                            </h3>

                            <div className="space-y-5">
                                {[
                                    {
                                        name: "Home",
                                        href: "/",
                                    },
                                    {
                                        name: "Creations",
                                        href: "/Creations",
                                    },
                                    {
                                        name: "About",
                                        href: "/About",
                                    },
                                    {
                                        name: "Contact",
                                        href: "/About",
                                    },
                                ].map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                    >
                                        <motion.div
                                            whileHover={{
                                                x: 8,
                                            }}
                                            className="group flex items-center gap-3 text-lg text-white/60 transition hover:text-cyan-300"
                                        >
                                            {item.name}

                                            <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* QUOTE */}
                        <div>
                            <h3 className="mb-6 text-xl font-black text-white">
                                Signature
                            </h3>

                            <div className="rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
                                <p className="text-lg leading-relaxed text-white/70">
                                    “Music became the language for feelings that words could
                                    never explain.”
                                </p>

                                <div className="mt-6 h-0.5 w-20 rounded-full bg-linear-to-r from-cyan-400 to-purple-500" />

                                <p className="mt-5 text-sm uppercase tracking-[0.3em] text-cyan-300">
                                    theRBsound
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="my-16 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />

                {/* BOTTOM */}
                <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row">
                    <p className="text-sm text-white/40">
                        © 2026 theRBsound. All rights reserved.
                    </p>


                    <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                        Crafted With Emotion
                    </p>
                </div>
            </div>
        </footer>
    );
}