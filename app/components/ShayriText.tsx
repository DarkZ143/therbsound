// components/ShayriSection.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Languages, Quote } from "lucide-react";
import { useState } from "react";

export default function ShayriSection() {
    const [english, setEnglish] = useState(false);

    return (
        <section className="relative overflow-hidden px-6 py-24 md:py-32">
            {/* BACKGROUND GLOW */}
            <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

            <div className="absolute right-0 top-0 h-75 w-75 rounded-full bg-purple-500/10 blur-[120px]" />

            {/* CONTENT */}
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative z-10 mx-auto max-w-6xl text-center"
            >
                {/* QUOTE ICON */}
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 4,
                    }}
                    className="mb-10 flex justify-center"
                >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,255,255,0.2)] md:h-24 md:w-24">
                        <Quote className="h-8 w-8 text-cyan-300 md:h-10 md:w-10" />
                    </div>
                </motion.div>

                {/* TRANSLATE BUTTON */}
                <motion.button
                    whileHover={{
                        scale: 1.05,
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                    onClick={() => setEnglish(!english)}
                    className="group relative mx-auto mb-12 flex items-center gap-3 rounded-full border border-cyan-400/20 bg-white/5 px-6 py-3 text-xs uppercase tracking-[0.3em] text-white/80 backdrop-blur-2xl transition hover:border-cyan-400/40 hover:bg-cyan-500/10 md:px-8 md:py-4 md:text-sm"
                >
                    <Languages className="h-5 w-5 text-cyan-300" />

                    {english ? "Hindi Version" : "English Translation"}

                    <div className="absolute inset-0 rounded-full bg-cyan-400/5 opacity-0 blur-xl transition duration-300 group-hover:opacity-100" />
                </motion.button>

                {/* SHAYRI CONTENT */}
                <AnimatePresence mode="wait">
                    {!english ? (
                        <motion.div
                            key="hindi"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4 md:space-y-6"
                        >
                            <h2 className="text-2xl font-black leading-relaxed md:text-5xl md:leading-[1.4] xl:text-6xl">
                                <span className="bg-linear-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                                    Diya tha jo dard usne ,
                                </span>
                            </h2>

                            <h2 className="text-2xl font-black leading-relaxed md:text-5xl md:leading-[1.4] xl:text-6xl">
                                <span className="bg-linear-to-r from-cyan-200 via-white to-cyan-300 bg-clip-text text-transparent">
                                    Wo kabhi mita na saka ,
                                </span>
                            </h2>

                            <h2 className="text-2xl font-black leading-relaxed md:text-5xl md:leading-[1.4] xl:text-6xl">
                                <span className="bg-linear-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
                                    Sangeet me doob gaya mai ,
                                </span>
                            </h2>

                            <h2 className="text-2xl font-black leading-relaxed md:text-5xl md:leading-[1.4] xl:text-6xl">
                                <span className="bg-linear-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent">
                                    Jisko kabhi bhula na saka
                                </span>
                            </h2>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="english"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4 md:space-y-6"
                        >
                            <h2 className="text-2xl font-black leading-relaxed md:text-5xl md:leading-[1.4] xl:text-6xl">
                                <span className="bg-linear-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                                    The pain she gave me ,
                                </span>
                            </h2>

                            <h2 className="text-2xl font-black leading-relaxed md:text-5xl md:leading-[1.4] xl:text-6xl">
                                <span className="bg-linear-to-r from-cyan-200 via-white to-cyan-300 bg-clip-text text-transparent">
                                    Could never fade away ,
                                </span>
                            </h2>

                            <h2 className="text-2xl font-black leading-relaxed md:text-5xl md:leading-[1.4] xl:text-6xl">
                                <span className="bg-linear-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
                                    Music became my escape ,
                                </span>
                            </h2>

                            <h2 className="text-2xl font-black leading-relaxed md:text-5xl md:leading-[1.4] xl:text-6xl">
                                <span className="bg-linear-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent">
                                    From memories that chose to stay
                                </span>
                            </h2>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* BOTTOM LINE */}
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "220px" }}
                    transition={{
                        duration: 1,
                        delay: 1,
                    }}
                    className="mx-auto mt-14 h-0.5 rounded-full bg-linear-to-r from-transparent via-cyan-400 to-transparent"
                />
            </motion.div>
        </section>
    );
}