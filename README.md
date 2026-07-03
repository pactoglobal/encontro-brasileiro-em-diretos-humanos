# I Encontro Brasileiro de Direitos Humanos e Empresas

**"Pluralidade que Constrói"** — 04 de agosto de 2026 · Cinemateca Brasileira, São Paulo

Landing page oficial do I Fórum Brasileiro DH&E — evento gratuito organizado pela ADHE e Pacto Global — Rede Brasil.

---

## Stack

| Tecnologia | Versão | Papel |
|---|---|---|
| React | 19 | UI |
| TypeScript | 6 | Tipagem |
| Vite | 8 | Build / Dev server |
| Tailwind CSS | 4 | Estilos |
| Framer Motion | 12 | Animações spring |
| Lucide React | latest | Ícones |

## Design System

- **Fonte Display**: Flama (Basic · Bold · Black) — hospedada localmente em `src/assets/fonts/`
- **Cores Oficiais**: Magenta `#E8187A` · Verde `#4A8C3F` · Coral `#E05A3A` · Maroon `#7B2D1E` · Navy `#0C2540`
- **Identidade**: Key Visual em `public/identity/` — KV, logos e co-realização

## Comandos

```bash
npm install       # Instalar dependências
npm run dev       # Servidor local (http://localhost:5173)
npm run build     # Build de produção
npm run lint      # Oxlint (0 erros esperados)
```

## Deploy

Repositório: [`pactoglobal/encontro-brasileiro-em-diretos-humanos`](https://github.com/pactoglobal/encontro-brasileiro-em-diretos-humanos)

Deploy contínuo via **Vercel** (conta da organização Pacto Global) a partir do branch `main`.

## Estrutura

```
src/
  components/   # Seções da página (Hero, Agenda, Speakers, ...)
  hooks/        # useInView para scroll-triggered animations
  assets/fonts/ # Flama Basic, Bold e Black (woff2)
public/
  identity/     # KV, logos do evento e organizadores
```
