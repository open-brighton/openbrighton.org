"use client";

import Contact from "./contact/Contact";
import Player from "lottie-react";
import logoLottieAnimation from "../../public/logo-lottie/animations/animation.json";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat();

export default function Home() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div style={{ width: 320, height: 320 }}>
            <Player
              animationData={logoLottieAnimation}
              autoplay
              loop
              style={{ width: "100%", height: "100%" }}
              aria-label="Open Brighton Lottie Animation"
            />
          </div>
          <h1
            className={`text-[2.8rem] font-extrabold text-[#F1DFB5] tracking-tight drop-shadow-md ${montserrat.className}`}
          >
            Open Brighton
          </h1>
        </div>
      </section>
      <section className="py-12 flex flex-col items-center justify-center gap-y-8 bg-[var(--background)] text-[var(--foreground)]">
        <h2 className="text-3xl font-bold text-center">Mission</h2>
        <p className="max-w-xl text-lg text-center opacity-80">
          To empower the Town of Brighton to lead in transparent, efficient, and
          responsive local government by leveraging cutting-edge technology,
          open data, and intuitive digital tools.
        </p>
        <h2 className="text-3xl font-bold text-center">Vision</h2>
        <p className="max-w-xl text-lg text-center opacity-80">
          A future-ready Brighton that sets the standard for modern municipal
          innovation—where technology drives smarter decisions, deeper civic
          engagement, and more effective public service.
        </p>
      </section>
      <section className="py-16 flex flex-col items-center justify-center gap-y-8 bg-[var(--background)] text-[var(--foreground)]">
        <Contact />
      </section>
    </>
  );
}
