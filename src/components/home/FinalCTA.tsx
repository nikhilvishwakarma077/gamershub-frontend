const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-24 lg:py-32">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[140px]" />
        <div className="absolute right-0 top-0 h-64 w-64 bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 bg-cyan-400/10 blur-[120px]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #22d3ee 1px, transparent 1px),
            linear-gradient(to bottom, #22d3ee 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-zinc-950/80 backdrop-blur-xl">
          {/* Border Glow */}
          <div className="absolute inset-0 rounded-3xl border border-cyan-400/10" />

          <div className="relative px-6 py-14 text-center sm:px-10 sm:py-20 lg:px-16">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              GamersHub Community
            </div>

            {/* Heading */}
            <h2 className="mx-auto max-w-4xl text-4xl font-black uppercase leading-tight text-white sm:text-5xl lg:text-6xl">
              Ready To{" "}
              <span className="text-cyan-400">
                Level Up?
              </span>
            </h2>

            {/* Subheading */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              Join thousands of gamers building their competitive identity,
              showcasing achievements, and competing in tournaments across the
              platform.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                className="group relative overflow-hidden rounded-xl bg-cyan-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400"
              >
                <span className="relative z-10">
                  Join GamersHub
                </span>

                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>

              <button
                type="button"
                className="rounded-xl border border-cyan-500/30 bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-wider text-cyan-400 transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:bg-cyan-500/10"
              >
                Explore Platform
              </button>
            </div>

            {/* Bottom Stats */}
            <div className="mt-14 grid grid-cols-2 gap-6 border-t border-cyan-500/10 pt-10 md:grid-cols-4">
              <div>
                <p className="text-2xl font-black text-cyan-400 sm:text-3xl">
                  5K+
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-zinc-500">
                  Players
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-cyan-400 sm:text-3xl">
                  500+
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-zinc-500">
                  Tournaments
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-cyan-400 sm:text-3xl">
                  20K+
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-zinc-500">
                  Matches
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-cyan-400 sm:text-3xl">
                  50+
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-zinc-500">
                  Communities
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;