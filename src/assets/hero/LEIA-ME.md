# Fotos do carrossel principal (Hero)

✅ Concluído em 2026-07-16. `Hero.tsx` agora importa os 3 arquivos abaixo (em
vez de `public/identity/bg-carousel-1/2/3.jpg`, que eram placeholders
genéricos de banco de imagens).

| Arquivo | Legenda no Hero | Origem |
|---|---|---|
| `hero-slide-1.jpg` | "Diálogo Multiator" | Diálogo Nacional de DH e DEI — plateia cheia, abertura institucional |
| `hero-slide-2.jpg` | "Pluralidade que Constrói" | Diálogo Nacional — apresentação cultural (Congada/Maracatu) no palco |
| `hero-slide-3.jpg` | "Sustentabilidade em Ação" | Diálogo Nacional — roda de conversa em palco, plateia ao fundo |

Selecionadas de ~1460 fotos brutas que vieram das pastas `FOTOS DIÁLOGO
NACIONAL`, `Fotos Diálogo Centro-oeste`, `Fotos Diálogo Norte`, `Fotos
Diálogos Sudeste` e `Fotos Diálogos Sul` (uploadadas direto no diretório
principal do repo, **fora do controle de versão** — ver aviso abaixo).
Critério: plano aberto/paisagem, sem rosto identificável em primeiro plano
(pessoas de costas ou à distância), boa iluminação, transmite escala e
energia do evento. Comprimidas de 1.1–1.4MB para ~200–300KB cada
(redimensionadas para 2200px de largura, JPEG qualidade 74) — dentro do
orçamento de performance do site.

## ⚠️ Aviso sobre as pastas brutas

As 5 pastas com ~1460 fotos originais (6.3GB) que você enviou ficaram dentro
de `src/assets/hero/` no diretório principal do projeto (fora deste branch).
Isso **nunca deve ir para o Git** — travaria o repositório. Já adicionei essas
5 pastas ao `.gitignore` (local, ainda não commitado no `main`) para evitar
que um `git add -A` acidental suba 6.3GB.

Recomendo mover essas pastas para fora de `src/assets/hero/` — por exemplo
para o Google Drive do projeto ou uma pasta local separada — já que esse
diretório é só para os 3 arquivos finais do carrossel, não para o acervo
bruto. O restante das fotos segue disponível para curar as seções de
"eventos anteriores" (ver proposta separada sobre os Diálogos Regionais e
Nacional).

---
Nota: elaborado com apoio de IA, revisar antes de finalizar.
