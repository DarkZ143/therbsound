// app/about/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Loader2,
    Music4,
    AudioWaveform,
    Headphones,
    Sparkles,
} from "lucide-react";

import Rbimage from "./rbimage.jpg";
import Therbsound from "@/public/therbsound.png";
const About = () => {
    const [isContactOpen, setContactOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    // HANDLE INPUT
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // SEND EMAIL VIA NODEMAILER API ROUTE
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setResponseMessage("🎉 Message sent successfully!");
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });
            } else {
                setResponseMessage("❌ Failed to send message.");
            }
        } catch (error) {
            console.error(error);
            setResponseMessage("❌ Failed to send message.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-36 text-white md:px-16">
                {/* BACKGROUND */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* CYAN */}
                    <motion.div
                        animate={{ x: [0, 120, 0], y: [0, -80, 0] }}
                        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
                        className="absolute -left-30 -top-30 h-105 w-105 rounded-full bg-cyan-500/10 blur-[140px]"
                    />

                    {/* PURPLE */}
                    <motion.div
                        animate={{ x: [0, -100, 0], y: [0, 60, 0] }}
                        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
                        className="absolute -bottom-30 -right-30 h-105 w-105 rounded-full bg-purple-500/10 blur-[140px]"
                    />

                    {/* CENTER */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ repeat: Infinity, duration: 10 }}
                        className="absolute left-1/2 top-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]"
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
                        {/* ICON */}
                        <div className="mb-8 flex justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                                className="relative flex h-28 w-28 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-2xl"
                            >
                                <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl" />
                                <Image src={Therbsound} alt="theRBsound" fill />
                            </motion.div>
                        </div>

                        <p className="mb-4 text-sm uppercase tracking-[0.45em] text-cyan-400">
                            theRBsound Story
                        </p>

                        <h1 className="bg-linear-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-5xl font-black text-transparent md:text-7xl">
                            About Me
                        </h1>

                        <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/60">
                            I create emotional soundscapes, cinematic melodies and modern
                            music experiences through creativity, technology and storytelling.
                        </p>
                    </motion.div>

                    {/* MAIN SECTION */}
                    <div className="grid items-center gap-20 lg:grid-cols-2">
                        {/* IMAGE */}
                        <motion.div
                            initial={{ opacity: 0, x: -80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="flex justify-center"
                        >
                            <div className="relative h-105 w-[320px] overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 shadow-[0_0_80px_rgba(0,255,255,0.15)] backdrop-blur-3xl">
                                <Image
                                    src={Rbimage}
                                    alt="theRBsound"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

                                {/* FLOATING BADGE */}
                                <motion.div
                                    animate={{ y: [0, -12, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                    className="absolute bottom-6 left-6 rounded-2xl border border-white/10 bg-black/40 px-5 py-3 backdrop-blur-2xl"
                                >
                                    <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
                                        Music Producer
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* CONTENT */}
                        <motion.div
                            initial={{ opacity: 0, x: 80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="space-y-8"
                        >
                            <div className="space-y-6 text-lg leading-relaxed text-white/70">
                                <p>
                                    I specialize in creating emotional music using{" "}
                                    <span className="text-cyan-300">FL Studio</span> and modern production techniques.
                                </p>
                                <p>
                                    My workflow includes composing melodies, arranging orchestral layers,
                                    recording vocals and designing cinematic sound experiences.
                                </p>
                                <p>
                                    I focus heavily on{" "}
                                    <span className="text-purple-300">sound design</span>,{" "}
                                    <span className="text-cyan-300">mixing</span> and{" "}
                                    <span className="text-pink-300">mastering</span> to deliver polished,
                                    immersive music.
                                </p>
                                <p>
                                    Every project I create is a fusion of emotion, storytelling and futuristic
                                    production aesthetics.
                                </p>
                            </div>

                            {/* SKILLS */}
                            <div>
                                <h3 className="mb-6 text-2xl font-black text-white">Skills & Expertise</h3>
                                <div className="grid gap-4">
                                    {[
                                        { icon: Music4, text: "Music Production (FL Studio)" },
                                        { icon: AudioWaveform, text: "Mixing & Mastering" },
                                        { icon: Headphones, text: "Sound Design & Synth Programming" },
                                        { icon: Sparkles, text: "Vocal Editing & Creative Processing" },
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ x: 8 }}
                                            className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-2xl"
                                        >
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">
                                                <item.icon className="h-7 w-7 text-cyan-300" />
                                            </div>
                                            <p className="text-white/70">{item.text}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* BUTTONS */}
                            <div className="flex flex-wrap gap-5 pt-6">
                                <button
                                    onClick={() => setContactOpen(true)}
                                    className="group relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-10 py-5 font-bold uppercase tracking-[0.3em] text-white backdrop-blur-2xl transition hover:scale-105"
                                >
                                    <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-purple-500/20 opacity-0 transition duration-500 group-hover:opacity-100" />
                                    <span className="relative z-10">Contact Me</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* CONTACT MODAL */}
            <AnimatePresence>
                {isContactOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/70 p-8 shadow-[0_0_80px_rgba(0,255,255,0.15)] backdrop-blur-3xl"
                        >
                            {/* GLOW */}
                            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-purple-500/10" />

                            <div className="relative z-10">
                                <h2 className="mb-8 bg-linear-to-r from-cyan-300 to-purple-400 bg-clip-text text-4xl font-black text-transparent">
                                    Contact Me
                                </h2>

                                {/* FORM */}
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        required
                                        className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none backdrop-blur-xl transition focus:border-cyan-400/30"
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Your Email"
                                        required
                                        className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none backdrop-blur-xl transition focus:border-cyan-400/30"
                                    />

                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Your Message"
                                        rows={5}
                                        required
                                        className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none backdrop-blur-xl transition focus:border-cyan-400/30"
                                    />

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex w-full items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 py-5 font-bold uppercase tracking-[0.3em] text-white backdrop-blur-2xl transition hover:scale-[1.02]"
                                    >
                                        {loading ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            "Send Message"
                                        )}
                                    </button>
                                </form>

                                {/* RESPONSE */}
                                {responseMessage && (
                                    <p className="mt-5 text-center text-sm text-white/70">
                                        {responseMessage}
                                    </p>
                                )}

                                {/* CLOSE */}
                                <button
                                    onClick={() => setContactOpen(false)}
                                    className="absolute right-0 top-0 text-xl text-white/40 transition hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default About;