const tournaments = [
  {
    id: 1,
    title: "Cyber Clash Championship",
    game: "Valorant",
    prizePool: "$10,000",
    participants: "128 Players",
    startDate: "15 June 2026",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Battle Royale Masters",
    game: "Free Fire",
    prizePool: "$7,500",
    participants: "96 Players",
    startDate: "20 June 2026",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Legends Arena Cup",
    game: "BGMI",
    prizePool: "$15,000",
    participants: "256 Players",
    startDate: "25 June 2026",
    image:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function FeaturedTournaments() {
  return (
   <section className="relative overflow-hidden bg-black py-16 md:py-24">
  {/* Background Effects */}
  <div className="absolute inset-0">
    <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
    <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">

        <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
          Featured <span className="text-cyan-500">Tournaments</span>
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
          Compete against the best players and climb the rankings.
        </p>
      </div>

      <button
        className="
          group inline-flex items-center gap-2
          self-start  border b
          bg-cyan-500/10 px-5 py-3
          text-sm font-semibold text-cyan-400
          transition-all duration-300
          border-cyan-400
          hover:bg-cyan-500
          hover:text-black
        "
      >
        View All

        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
    </div>

    {/* Cards */}
    <div
      className="
        flex gap-5 overflow-x-auto pb-4
        md:grid md:grid-cols-3 md:overflow-visible
      "
    >
      {tournaments.map((tournament) => (
        <article
          key={tournament.id}
          className="
            group relative
            min-w-[320px]
            overflow-hidden
         
            border border-cyan-500/20
            bg-zinc-950
            transition-all duration-300
            
            hover:border-cyan-400/50
            hover:shadow-[0_0_40px_rgba(34,211,238,0.18)]
            md:min-w-0
          "
        >
          {/* Banner */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={tournament.image}
              alt={tournament.title}
              className="
                h-full w-full object-cover
                transition-transform duration-500
                group-hover:scale-110
              "
            />

            <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

            <div className="absolute left-4 top-4">
              <span
                className="
               
                  border border-cyan-400/40
                  bg-black/60
                  px-3 py-1
                  text-xs font-semibold
                  text-cyan-300
                  backdrop-blur
                "
              >
                LIVE REGISTRATION
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="mb-5 text-xl font-bold text-white">
              {tournament.title}
            </h3>

            <div className="space-y-4">
              {/* Prize Pool */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">
                  Prize Pool
                </span>

                <span className="font-semibold text-cyan-400">
                  {tournament.prizePool}
                </span>
              </div>

              {/* Participants */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">
                  Participants
                </span>

                <span className="font-semibold text-white">
                  {tournament.participants}
                </span>
              </div>

              {/* Start Date */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">
                  Start Date
                </span>

                <span className="font-semibold text-white">
                  {tournament.startDate}
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              className="
                mt-6 w-full
                
                border border-cyan-500
                bg-cyan-500
                px-4 py-3
                text-sm font-bold
                text-black
                transition-all duration-300
                hover:shadow-[0_0_25px_rgba(34,211,238,0.45)]
              "
            >
              Join Tournament
            </button>
          </div>

          {/* Border Glow */}
          <div
            className="
              pointer-events-none
              absolute inset-0
              opacity-0
              transition-opacity duration-300
              group-hover:opacity-100
              [box-shadow:inset_0_0_0_1px_rgba(34,211,238,0.5)]
            "
          />
        </article>
      ))}
    </div>

    {/* Hide Scrollbar */}
    <style>
      {`
        div::-webkit-scrollbar {
          display: none;
        }
      `}
    </style>
  </div>
</section>
  );
}