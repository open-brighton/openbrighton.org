"use client";

import Player from "lottie-react";
import logoLottieAnimation from "../../public/logo-lottie/animations/animation.json";
import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-6">
      <div style={{ width: 280, height: 280 }}>
        <Player
          animationData={logoLottieAnimation}
          autoplay
          loop
          style={{ width: "100%", height: "100%" }}
          aria-label="Open Brighton logo"
        />
      </div>

      <h1
        className={`text-[2.8rem] font-extrabold text-[#F1DFB5] tracking-tight drop-shadow-md ${montserrat.className}`}
      >
        Open Brighton
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
        <a href="#" aria-label="Download on the App Store">
          <Image
            src="/badge-app-store.svg"
            alt="Download on the App Store"
            width={160}
            height={53}
            priority
          />
        </a>

        <a href="#" aria-label="Get it on Google Play">
          <Image
            src="/badge-google-play.png"
            alt="Get it on Google Play"
            width={180}
            height={53}
            priority
          />
        </a>
      </div>
    </main>
  );
}
