"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

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
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white selection:bg-purple-500/30">

      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">

        {/* Logo Section */}
        <div className="mb-8 md:mb-12 animate-float flex flex-col items-center">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 transition-transform duration-700 hover:scale-105 group">
            <Image
              src="/Transprent Vyolf Logo PNG.png"
              alt="Vyolf Logo"
              fill
              className="object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]"
              priority
            />
            {/* TM Symbol */}
            <span className="absolute top-4 -right-2 md:top-8 md:-right-4 text-[10px] md:text-xs font-light text-white/40 tracking-widest select-none">
             TM
            </span>
            {/* Shine Effect Overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                maskImage: 'url("/Transprent Vyolf Logo PNG.png")',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskImage: 'url("/Transprent Vyolf Logo PNG.png")',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
              }}
            >
              <div className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] animate-shine" />
            </div>
          </div>
          {/* Company Rights */}
          <div className="mt-2 text-[8px] md:text-[10px] tracking-[0.4em] text-white/20 uppercase font-light select-none animate-fade-in">
            &copy; All rights reserved
          </div>
        </div>

        {/* Text Content */}
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50 pb-2">
            COMING SOON
          </h1>
          <p className="text-lg sm:text-xl text-white/50 font-light tracking-wide max-w-2xl mx-auto">
            We are crafting a digital masterpiece. <br className="hidden sm:block" />
            Be the first to experience the revolution.
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

