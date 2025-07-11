"use client";

import Link from "next/link";
import { useState } from "react";
import { MdHome, MdMail, MdLightbulb } from "react-icons/md";
import { FaGithub, FaMap, FaComments } from "react-icons/fa";
import FeatureFlags from "./FeatureFlags";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative">
      {/* Hamburger/X Icon */}
      <button
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span
          className={`absolute w-8 h-0.5 bg-current transition-all duration-300 ease-in-out
            ${
              open
                ? "rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                : "top-2 left-1/2 -translate-x-1/2"
            }`}
        />
        <span
          className={`absolute w-8 h-0.5 bg-current transition-all duration-300 ease-in-out
            ${
              open
                ? "opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            }`}
        />
        <span
          className={`absolute w-8 h-0.5 bg-current transition-all duration-300 ease-in-out
            ${
              open
                ? "-rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                : "bottom-2 left-1/2 -translate-x-1/2"
            }`}
        />
      </button>

      {/* Navigation Links */}
      <ul
        className={`fixed top-0 right-0 h-full w-2/3 max-w-xs bg-[var(--background)] text-[var(--foreground)] flex flex-col gap-6 pt-20 px-6 shadow-lg z-40 transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <li>
          <Link
            href="/"
            className="hover:underline flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <MdHome className="inline-block text-lg" /> Home
          </Link>
        </li>
        {FeatureFlags.contact && (
          <li>
            <Link
              href="/contact"
              className="hover:underline flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <MdMail className="inline-block text-lg" /> Contact
            </Link>
          </li>
        )}
        {FeatureFlags.ideas && (
          <li>
            <Link
              href="/ideas"
              className="hover:underline flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <MdLightbulb className="inline-block text-lg" /> Submit an Idea
            </Link>
          </li>
        )}
        {FeatureFlags.roadmap && (
          <li>
            <Link
              href="/roadmap"
              className="hover:underline flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <FaMap className="inline-block text-lg" /> Roadmap
            </Link>
          </li>
        )}
        {FeatureFlags.map && (
          <li>
            <Link
              href="/map"
              className="hover:underline flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <FaMap className="inline-block text-lg" /> Map
            </Link>
          </li>
        )}
        {FeatureFlags.chat && (
          <li>
            <Link
              href="/chat"
              className="hover:underline flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <FaComments className="inline-block text-lg" /> Chat
            </Link>
          </li>
        )}
        <li>
          <Link
            href="https://github.com/open-brighton"
            className="hover:underline flex items-center gap-2"
            target="_blank"
            onClick={() => setOpen(false)}
          >
            <FaGithub className="inline-block text-lg" /> Github Organization
          </Link>
        </li>
      </ul>
      {/* Overlay for menu */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}
