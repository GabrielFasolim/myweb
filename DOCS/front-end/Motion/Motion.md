# Motion

## Proposito
Camada de animacao da landing (GSAP + ScrollTrigger) inspirada na linguagem visual do site da GSAP, mantendo a paleta preto e branco do DESIGN.MD. Nao altera conteudo — apenas apresentacao.

## Arquitetura
- presentation — `landing/src/animations/`
  - `gsap.js`: registro unico de plugins (`ScrollTrigger`, `useGSAP`) e reexport
  - `constants.js`: media queries de movimento, easing, brackets `{ }` e `formatIndex`
  - `hooks.js`: hooks de animacao consumidos pelos componentes em `App.jsx`
- Estilos da camada em `landing/src/index.css` (secao "Motion layer")

## Dependencias
- `gsap`, `@gsap/react`
- `components/ui/story-scroll.jsx` (FlowArt) — coexiste; os pins dele usam `pinSpacing: false`

## Subfluxos
- `useScrollProgress` — barra branca de 2px no topo, scrub de `0` a `max`; usa `refreshPriority: -1` para ser recalculada depois do pin da Skills
- `useVelocitySkew` — skew nas palavras da Editorial proporcional a velocidade do scroll (`[data-skew]`)
- `useHorizontalScroll` — secao Editorial (FINTECH / BLOCKCHAIN / IoT) fixada (pin) e rolando para o lado, um painel por palavra com `{ 01 }` e descricao; itens `[data-h-reveal]` fora da tela entram via `containerAnimation`
- `useRevealBatch` — reveal `y: 40, opacity: 0 -> 1` (power4.out, 1.2s, stagger) para `[data-reveal]` (Education)

## Comportamentos Esperados
- Todas as animacoes rodam apenas com `prefers-reduced-motion: no-preference`; com reduce, Skills vira lista vertical e nada e animado
- Sem cores: somente branco, cinzas e `#050505`
- Sem overflow horizontal da pagina (inclusive mobile)
- Ordem da pagina: Hero, Stats, Flow (Achievements, WhyMe, Experience `#work`), Editorial (horizontal), Skills, Education, Footer
- Editorial e uma secao independente, fora do Flow — nao pode ficar dentro de um FlowSection (pin aninhado com pai `flex` e transformado quebra o fluxo)
- Skills voltou ao grid original
- Hero permanece com a animacao original (CSS), sem camada GSAP
- Footer nao usa reveal: fica no fim da pagina e o gatilho pode nunca ser alcancado
- Elementos dentro das secoes do FlowArt (rotacionadas) nao recebem `data-reveal` para evitar gatilhos deslocados

## Historico de Mudancas
- 2026-09-22 — Criacao da camada de motion (progress bar, skew do marquee, Skills horizontal, reveals)
- 2026-09-22 — Removidos os blobs do hero; corrigidos progress bar (ordem de refresh) e reveal do footer
- 2026-09-22 — Scroll horizontal movido de Skills para Editorial; Editorial saiu do FlowArt para corrigir salto apos o ultimo painel
- 2026-09-22 — Removida a linha de progresso da secao Editorial
- 2026-09-22 — Reordenacao: Achievements logo apos Stats, WhyMe antes de Experience, Editorial apos o Flow; removido `anticipatePin`
