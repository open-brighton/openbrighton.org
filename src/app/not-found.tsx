import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Image
        src="/logo.webp"
        alt="OpenBrighton Logo"
        width={300}
        height={300}
        priority
      />
      <h1 className="mt-8 text-4xl font-bold">Not found</h1>
      <p className="mt-2 text-lg text-center text-[var(--foreground)]/80">Sorry, the page you are looking for does not exist.</p>
      <Link
        href="/"
        className="mt-6 px-6 py-2 rounded bg-[var(--foreground)] text-[var(--background)] font-semibold shadow hover:bg-[var(--foreground)]/90 transition-colors"
      >
        Go to Homepage
      </Link>
    </div>
  );
} 