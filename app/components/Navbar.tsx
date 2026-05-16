/* eslint-disable react-hooks/purity */
// components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Menu } from "lucide-react";
import Image from "next/image";
import Therbsound from "@/public/therbsound.png"
import Link from "next/link";



export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navItems = [
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
       
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // LOCK SCROLL WHEN MENU OPEN
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    const bars = Array.from({ length: 30 });

    return (
        <>
            {/* NAVBAR */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className={`fixed top-0 left-0 z-100 w-full transition-all duration-500 ${scrolled
                    ? "border-b border-white/10 bg-black/60 backdrop-blur-2xl"
                    : "bg-transparent"
                    }`}
            >
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8 lg:px-10">
                    {/* LOGO */}
                    <div className="flex items-center gap-4">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Infinity,
                                duration: 8,
                                ease: "linear",
                            }}
                            className="relative flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10"
                        >
                            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl" />

                            <Image src={Therbsound} alt="theRBsound" fill />
                        </motion.div>
                        <div>
                            <h1 className="bg-linear-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-2xl font-black tracking-wider text-transparent">
                                theRBsound
                            </h1>

                            <p className="text-[10px] uppercase tracking-[0.45em] text-white/40">
                                Music Portfolio
                            </p>
                        </div>
                    </div>

                    {/* DESKTOP NAV */}
                    <div className="hidden items-center gap-10 lg:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group relative overflow-hidden text-sm uppercase tracking-[0.3em] text-white/70 transition hover:text-white"
                            >
                                <span>{item.name}</span>

                                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />

                                <span className="absolute inset-0 -z-10 rounded-full bg-cyan-400/10 opacity-0 blur-xl transition duration-300 group-hover:opacity-100" />
                            </Link>
                        ))}
                    </div>

                    {/* WAVEFORM */}
                    <div className="hidden items-end gap-0.75 xl:flex">
                        {bars.map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    height: [
                                        `${Math.random() * 8 + 8}px`,
                                        `${Math.random() * 35 + 18}px`,
                                        `${Math.random() * 8 + 8}px`,
                                    ],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1 + Math.random(),
                                }}
                                className="w-1 rounded-full bg-linear-to-t from-cyan-400 via-blue-500 to-purple-500"
                            />
                        ))}
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setOpen(!open)}
                        className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-xl lg:hidden"
                    >
                        <div className="absolute inset-0 bg-cyan-400/10 blur-xl" />

                        {open ? (
                            <X className="relative z-10 h-6 w-6 text-white" />
                        ) : (
                            <Menu className="relative z-10 h-6 w-6 text-white" />
                        )}
                    </motion.button>
                </div>
            </motion.nav>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="fixed inset-0 z-90 flex min-h-screen flex-col overflow-hidden bg-black/95 backdrop-blur-3xl lg:hidden"
                    >
                        {/* BACKGROUND GLOW */}
                        <div className="absolute -left-25 -top-25 h-75 w-75 rounded-full bg-cyan-500/20 blur-[120px]" />

                        <div className="absolute -bottom-25 -right-25 h-75 w-75 rounded-full bg-purple-500/20 blur-[120px]" />

                        {/* MENU CONTENT */}
                        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-10 px-6">
                            {navItems.map((item, index) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: index * 0.1,
                                        }}
                                        className="group relative text-3xl font-black uppercase tracking-[0.35em] text-white/70 transition hover:text-cyan-300 md:text-5xl"
                                    >
                                        {item.name}

                                        <span className="absolute -bottom-3 left-0 h-0.75 w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                                    </motion.div>
                                </Link>
                            ))}
                        </div>

                        {/* BOTTOM TEXT */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="relative z-10 pb-10 text-center"
                        >
                            <p className="text-xs uppercase tracking-[0.5em] text-white/30">
                                Feel The Sound • theRBsound
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}