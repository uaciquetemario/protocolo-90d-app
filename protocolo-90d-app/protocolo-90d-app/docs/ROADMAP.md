# Roadmap de Construção

Ordem pensada para ter algo **utilizável o mais rápido possível**, mesmo incompleto, e ir adicionando por cima.

## Passo 0 — Preparar o repositório
- Criar repositório `protocolo-90d-app` no GitHub.
- Estrutura inicial:
  ```
  protocolo-90d-app/
  ├── docs/           (estes ficheiros)
  ├── src/
  ├── public/
  ├── package.json
  └── README.md
  ```
- Inicializar o projeto: `npm create vite@latest . -- --template react` (ou similar).
- Instalar Tailwind CSS.

## Passo 1 — Base de dados local
- Instalar `idb` (wrapper simples para IndexedDB).
- Criar `src/db.js` com a inicialização da base de dados e um object store por tabela de `DATABASE-SCHEMA.md`.
- Testar: gravar um registo de exemplo em `daily_entries` e conseguir lê-lo de volta.

## Passo 2 — Ecrã "Hoje" (MVP)
- Construir o formulário do dia (Ecrã 1 de `FEATURES.md`), começando só com os campos das **regras inegociáveis** (secção 18 do protocolo): apostas, tela, sono, oração, inglês, habilidade, gastos.
- Botão "Guardar dia" grava em `daily_entries`.
- Mostrar a sequência de dias sem apostar, calculada a partir de `betting_free_streak_start` e dos registos.

➡️ **Neste ponto o app já é utilizável diariamente.** Publica-se no GitHub Pages e começa a usar-se — o resto constrói-se por cima, sem perder dados.

## Passo 3 — Exportação (prioridade alta, não deixar para o fim)
- Botão de exportar CSV/JSON (`EXPORT.md`).
- Testar exportar e reimportar (garante que o backup funciona antes de confiar nele).

## Passo 4 — Painel (Dashboard)
- Cálculo de consistência semanal.
- Progresso das 10 metas-mãe.
- Gráficos simples (biblioteca `recharts`) para sono/tela/água nos últimos 30 dias.

## Passo 5 — Restantes campos do formulário diário
- Adicionar os campos que faltam de `daily_entries` (saúde, espiritualidade, relacionamentos, vida real, etc.), organizados em secções colapsáveis para não sobrecarregar o ecrã.

## Passo 6 — Finanças
- Ecrã de gastos/entradas (`expenses`) e dívidas (`debts`).
- Totais mensais.

## Passo 7 — Habilidade & Renda
- Ecrã de projetos de portfólio (`skill_projects`) e propostas enviadas (`outreach_log`).

## Passo 8 — Revisões / Checkpoints
- Formulário de revisão semanal com a reflexão estoica.
- Histórico de revisões.

## Passo 9 — PWA (instalar no telemóvel)
- Instalar `vite-plugin-pwa`.
- Configurar ícone e manifesto.
- Testar "Adicionar ao ecrã inicial" no telemóvel.

## Passo 10 — Publicar
- Configurar GitHub Pages a partir da pasta `dist/` (build do Vite), ou usar GitHub Actions para automatizar o deploy a cada push.
- Confirmar que funciona offline depois de instalado.

---

## Nota sobre usar IA para codar

Se for usar uma ferramenta de IA (Claude Code, GitHub Copilot, etc.) para escrever o código:
- Dá-lhe o `docs/DATABASE-SCHEMA.md` e `docs/FEATURES.md` como contexto logo no início.
- Peça para seguir o roadmap **passo a passo**, um passo por vez, testando antes de avançar — evita pedir "cria o app todo de uma vez", que costuma gerar código difícil de depurar.
- Depois de cada passo, testa manualmente no browser antes de pedir o próximo.
