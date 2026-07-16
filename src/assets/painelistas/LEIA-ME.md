# Fotos de painelistas

Salve cada foto com o nome de arquivo exato abaixo (retrato, fundo neutro).
Fotos com ✅ já foram baixadas da planilha de confirmação de palestrantes
(https://docs.google.com/spreadsheets/d/1RD2P_u5tYnvh_MLlHCEhjMuoHROrSgt7pxBUufq58aM)
em 2026-07-16. As demais ainda usam iniciais coloridas (Speakers) ou fotos
genéricas do Unsplash (Agenda) até serem enviadas pela pessoa ou fotografadas.

| Status | Arquivo | Nome | Organização/Papel | Onde aparece |
|---|---|---|---|---|
| | `fernanda-hopenhaym.jpg` | Fernanda Hopenhaym | UN Working Group on Business and Human Rights | Speakers (destaque) + Agenda |
| | `vinicius-pinheiro.jpg` | Vinicius Pinheiro | OIT no Brasil | Speakers + Agenda |
| | `adriana-marcolino.jpg` | Adriana Marcolino | DIEESE | Speakers + Agenda |
| ✅ | `camila-zelezoglo.jpg` | Camila Zelezoglo | ABIT | Speakers + Agenda |
| ✅ | `jandyra-uehara.jpg` | Jandyra Uehara | CUT | Speakers + Agenda |
| | `juliana-neiva.jpg` | Juliana Neiva | Conectas | Speakers + Agenda |
| | `andrea-bolzon.jpg` | Andrea Bolzon | PNUD | Speakers + Agenda — respondeu o formulário mas **não anexou foto** (linha "Andréa Bolzon" na planilha, coluna de foto vazia) |
| ✅ | `luiz-henrique-ramos.jpg` | Luiz Henrique Ramos | Ministério do Trabalho | Speakers + Agenda — planilha usa "Luiz Henrique **Ramos Lopes**", confirmar se é o mesmo nome a padronizar |
| | `gabriela-almeida.jpg` | Gabriela Almeida | Pacto Global – Rede Brasil | Speakers + Agenda |
| ✅ | `josefa-camara.jpg` | Josefa Camara | Conselho Ribeirinho | Speakers + Agenda — **grafia corrigida**: era `josefa-oliveira.jpg`, a planilha confirma "Josefa Camara" (igual ao que já estava em `Agenda.tsx`) |
| ✅ | `gilson-camboim.jpg` | Gilson Camboim | Fecomin (planilha) / Coogavepe (site) — confirmar organização atual | Speakers + Agenda |
| ✅ | `larissa-rodrigues.jpg` | Larissa Rodrigues | Instituto Escolhas | Speakers (não aparece na Agenda) |
| | `miguel-castro-riberos.jpg` | Miguel Castro-Riberos | OCDE | Speakers + Agenda |
| ⚠️ | `hernan-coronado.jpg` | Hernán Coronado | OIT | Speakers + Agenda — **a pessoa anexou um `.docx` no lugar da foto** no formulário; não deu para usar. Precisa pedir a foto de novo. |
| ✅ | `thalita-silva.jpg` | Thalita Silva | Defensoria Pública do Estado de SP | Speakers + Agenda — **grafia corrigida**: era `thalita-v-goncalves.jpg`, a planilha confirma "Thalita Silva" (igual ao que já estava em `Agenda.tsx`) |
| | `flavia-scabin.jpg` | Flávia Scabin | FGV | Speakers + Agenda |
| ✅ | `gabriel-bezerra.jpg` | Gabriel Bezerra | CONTAR | Agenda |
| | `guilherme-xavier.jpg` | Guilherme Xavier | Pacto Global Rede Brasil | Agenda |
| | `igor-garafulic.jpg` | Igor Garafulic | ONU Brasil | Agenda |
| ✅ | `irina-bacci.png` | Irina Bacci | PADF | Agenda |
| ✅ | `joao-marcos-pires-camargo.jpg` | João Marcos Pires Camargo | MME | Agenda |
| | `juliana-ramalho.jpg` | Juliana Ramalho | Mattos Filho / Pacto Global | Agenda |
| ✅ | `marcos-antonio-matos.jpg` | Marcos Antônio Matos | Cecafe — planilha usa só "Marcos Matos" | Agenda |
| ✅ | `maryellen-crisostomo.jpg` | Maryellen Crisóstomo | CONAQ | Agenda |
| ✅ | `pedro-villela.jpg` | Pedro Villela | Axia Energia | Agenda |
| ✅ | `simone-rocha.jpg` | Simone Rocha | ERM América Latina | Agenda |
| | `sue-wolter.jpg` | Sue Wolter | Petrobras | Agenda |
| ✅ | `uine-lopes.jpg` | Uine Lopes | Movimento dos Pescadores Artesanais | Agenda |
| | `angela-pires.jpg` | Ângela Pires | ACNUDH | Agenda |
| ✅ | `victoriana-leonora-c-gonzaga.png` | Victoriana Leonora C. Gonzaga | ESG Novas Gerações | **Pessoa nova — ainda não existe em `Speakers.tsx` nem `Agenda.tsx`.** Confirmar em qual painel ela entra antes de adicionar ao site. |

**16 fotos recebidas e salvas** de 18 respostas no formulário (uma é linha de
teste "TESTE", ignorada). Faltam ainda ~13 painelistas do roster atual do site
que não responderam o formulário — as fotos deles continuam pendentes.

## Pendências que precisam de decisão humana

1. **Hernán Coronado** enviou um arquivo Word em vez de foto — pedir reenvio.
2. **Andréa Bolzon** respondeu o formulário mas não anexou foto — pedir reenvio.
3. **Victoriana Leonora C. Gonzaga** é um nome novo, fora do roster atual do
   site — confirmar se ela substitui alguém ou é uma adição à Agenda.
4. Pequenas diferenças de grafia/organização entre a planilha e o código
   (`Luiz Henrique Ramos` vs `Luiz Henrique Ramos Lopes`, `Gilson Camboim`:
   Coogavepe vs Fecomin, `Marcos Antônio Matos` vs `Marcos Matos`) — decidir
   qual versão vira oficial antes de eu ajustar `Speakers.tsx`/`Agenda.tsx`.

As duas correções de grafia já resolvidas (Josefa Camara, Thalita Silva)
confirmam que `Agenda.tsx` estava certo e `Speakers.tsx` estava desatualizado
nesses dois casos — ainda não corrigi `Speakers.tsx`, é uma edição de código
separada desta tarefa de fotos.

---
Nota: elaborado com apoio de IA, revisar antes de finalizar.
