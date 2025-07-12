import Contact from "./contact/Contact";

export default function Home() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center">
        <img
          src="/logo.webp"
          alt="Open Brighton Logo"
          width={320}
          height={320}
        />
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
