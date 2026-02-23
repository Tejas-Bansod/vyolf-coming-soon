"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import localFont from "next/font/local";

const roadRage = localFont({
  src: "../public/road_rage/Road_Rage.otf",
  variable: "--font-road-rage",
});

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage("You have been added to our waiting list.");
        setEmail("");
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Failed to connect to the server.");
      console.error("Subscription failed", err);
    }
  };

  if (!mounted) return null;

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white selection:bg-purple-500/30 ${roadRage.variable}`}>

      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">

        {/* Logo Section */}
        <div className="flex flex-col items-center -mt-16 sm:-mt-24 md:-mt-32 lg:-mt-48 -mb-10 sm:-mb-14 md:-mb-20 lg:-mb-28">
          <div className="relative w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px]">
            <video
              src="/vyolf logo mov.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain rounded-full"
            />
            {/* TM Symbol */}
            <span className="absolute top-[25%] right-[25%] md:top-[25%] md:right-[25%] lg:top-[27%] lg:right-[26%] text-[10px] md:text-sm font-light text-white/40 tracking-widest select-none">
              TM
            </span>
          </div>
          {/* Company Rights */}

        </div>

        {/* Text Content */}
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="text-4xl sm:text-7xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50 pb-2">
            Coming Soon
          </h1>
          <p className={`${roadRage.className} text-2xl sm:text-3xl lg:text-3xl text-[#A020F0] drop-shadow-[0_0_15px_rgba(160,32,240,0.5)] tracking-wider max-w-2xl mx-auto`}>
            {/* We are crafting a masterpiece. <br className="hidden sm:block" />
            Be Bold. Be Wild. Be Revolutionary. <br className="hidden sm:block" /><br className="hidden sm:block" /> */}
            The wild doesn’t wait, it conquers!
          </p>
        </div>

        {/* Newsletter Form */}
        <div className="w-full max-w-md mt-12 animate-fade-in-up delay-200">
          <form onSubmit={handleSubmit} className="relative group">
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 ${status === 'loading' ? 'opacity-100 animate-pulse' : ''}`}></div>
            <div className="relative flex items-center bg-black/50 rounded-full border border-white/10 backdrop-blur-md p-1.5 focus-within:border-white/30 transition-colors">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-transparent text-white px-6 py-3 outline-none placeholder:text-white/30 text-sm sm:text-base font-light disabled:opacity-50"
                required
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-white text-black font-medium px-6 py-3 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-[1.02] whitespace-nowrap text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "..." : "Notify Me"}
              </button>
            </div>
          </form>

          {message && (
            <div className={`mt-4 flex items-center justify-center gap-2 text-sm font-medium animate-fade-in ${status === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
              {status === 'success' && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
              {message}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-20 text-white/20 text-xs tracking-widest uppercase">
          &copy; {new Date().getFullYear()} VYOLF INDIA. All Rights Reserved.
        </footer>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}

