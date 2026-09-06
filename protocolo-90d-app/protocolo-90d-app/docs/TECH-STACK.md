# Stack Técnica

## Contexto que define a escolha

- Uso pessoal (1 utilizadora), não precisa de servidor com múltiplos utilizadores.
- Orçamento é zero — a stack não pode exigir hospedagem paga.
- Precisa funcionar bem no telemóvel, inclusive com ligação instável (deslocamento longo).
- Precisa de "base de dados" real (não apenas texto solto) e exportação de dados.
- Vai ser publicado a partir de um repositório GitHub.

## Recomendação: App estático + base de dados local (Opção A)

**Frontend:** HTML + JavaScript puro, ou React (Vite), com Tailwind para o visual.

**Base de dados:** [SQLite compilado para o browser via `sql.js` ou `wa-sqlite`], guardado no dispositivo com **IndexedDB** através de uma biblioteca como `absurd-sql` ou `sql.js` + persistência manual. Alternativa mais simples para começar: **IndexedDB diretamente** (via a biblioteca `idb`), com uma tabela por "entidade" (ver `DATABASE-SCHEMA.md`).

**Hospedagem:** **GitHub Pages** — gratuito, publica diretamente do repositório, funciona bem como PWA (dá para "instalar" no ecrã inicial do telemóvel e usar offline).

**Exportação:** botão no app que gera um ficheiro `.csv` e `.json` a partir dos dados guardados e faz download — sem precisar de backend.

### Porquê esta opção
- Zero custo de hospedagem ou servidor.
- Funciona offline (essencial durante as ~4h diárias de deslocamento).
- Os dados nunca saem do teu dispositivo — privacidade total.
- Pode ser instalado como PWA (ícone no ecrã inicial, como uma app nativa).
- GitHub Pages publica automaticamente a cada `git push`.

### Limitação a aceitar
- Os dados ficam **no dispositivo/browser onde foste usando o app**. Se limpares os dados do browser ou trocares de telemóvel sem exportar/importar, perdes o histórico. Por isso a funcionalidade de exportação (`EXPORT.md`) é obrigatória desde o dia 1, e deve ser fácil de fazer backup regularmente (ex.: exportar 1x por semana para o Google Drive).

## Alternativa (Opção B) — se no futuro quiseres aceder de vários dispositivos

**Backend:** Supabase (tem plano gratuito, usa PostgreSQL de verdade, dá login e sincronização entre dispositivos).
**Frontend:** o mesmo (React/Vite).
**Hospedagem do frontend:** GitHub Pages ou Vercel (grátis).

Esta opção resolve o problema de "um dispositivo só", mas exige criar uma conta externa (Supabase) e gerir uma ligação à internet para gravar dados — menos robusto durante o deslocamento sem internet.

**Recomendação:** começar pela Opção A. Se depois de 30–60 dias de uso sentires falta de sincronizar entre telemóvel e computador, migra-se para a Opção B — o esquema da base de dados (`DATABASE-SCHEMA.md`) foi desenhado para funcionar em ambas.

## Resumo da stack (Opção A, ponto de partida)

| Camada | Tecnologia |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Base de dados | IndexedDB (via biblioteca `idb`) |
| Gráficos/análise dentro do app | `recharts` (opcional, para ver tendências) |
| Exportação | geração de CSV/JSON no browser, download direto |
| Hospedagem | GitHub Pages |
| PWA (instalar no telemóvel) | `vite-plugin-pwa` |
