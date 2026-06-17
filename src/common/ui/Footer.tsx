const Footer = () => {
  return (
    <footer className="border-t border-cyan-500/20 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* LOGO + COPYRIGHT */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-wide text-cyan-400">
              GamersHub
            </h2>

            <p className="max-w-sm text-sm text-zinc-400">
              Build your gaming identity, discover players, and compete in
              tournaments.
            </p>

            <p className="text-xs text-zinc-500">
               Designed for gamers. Built for competition.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-400">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-cyan-400"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/find-player"
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-cyan-400"
                >
                  Find Players
                </a>
              </li>

              <li>
                <a
                  href="/profiles"
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-cyan-400"
                >
                  Gamer Profiles
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-400">
              Contact
            </h3>

            <a
              href="mailto:contact@gamershub.com"
              className="text-sm text-zinc-400 transition-colors duration-300 hover:text-cyan-400"
            >
              nikhilvishwakarma7707@gmail.com
            </a>
          </div>

          {/* INSTAGRAM */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-400">
              Social
            </h3>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="group inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/5 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
            >
              {/* Instagram SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5 text-cyan-400 transition-transform duration-300 group-hover:scale-110"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  ry="5"
                />
                <path d="M16 11.37a4 4 0 1 1-7.75 1.26 4 4 0 0 1 7.75-1.26z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* BOTTOM LINE */}
        <div className="mt-10 border-t border-cyan-500/10 pt-6">
          <p className="text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} GamersHub. All rights reserved.
           
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;