export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t" style={{ borderColor: "#D8D4C7", background: "var(--color-dhe-navy)" }}>
      <div className="dhe-container py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img
              src="/identity/logo-evento.png"
              alt="Encontro DH&E Brasil 2026"
              width={625}
              height={429}
              className="h-10 w-auto object-contain opacity-95"
              style={{ filter: "brightness(0) invert(1)" }} /* Inverte para branco sobre fundo escuro */
            />
          </div>

          {/* Info */}
          <div className="text-center sm:text-right text-dhe-bg">
            <p className="text-xs font-bold mb-1">
              04 de agosto de 2026 · Cinemateca Brasileira, São Paulo
            </p>
            <p className="text-xs opacity-75">
              Realização: ADHE & Pacto Global — Rede Brasil
            </p>
          </div>
        </div>

        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-t"
          style={{ borderColor: "rgba(250, 249, 246, 0.15)", color: "rgba(250, 249, 246, 0.6)" }}
        >
          <p>© {year} Pacto Global — Rede Brasil. Todos os direitos reservados.</p>
          <div className="flex gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-dhe-magenta)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-dhe-maroon)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-dhe-green)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-dhe-coral)]" />
          </div>
          <a
            href="https://www.pactoglobal.org.br"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            pactoglobal.org.br
          </a>
        </div>
      </div>
    </footer>
  );
}
