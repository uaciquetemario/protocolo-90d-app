# Funcionalidades do App

## Ecrã 1 — Hoje (ecrã principal)

- Data de hoje + número do dia do protocolo (ex.: "Dia 14 de 90") + fase atual.
- Sequência de dias sem apostar em destaque (grande, no topo — é a "primeira grande vitória").
- Formulário rápido do dia (baseado em `daily_entries`), organizado por secções colapsáveis:
  - Sono / Água / Exercício / Alimentação
  - Espiritualidade (Bíblia, oração, terço, gratidão, caridade)
  - Inglês / Habilidade profissional / Leitura / Escrita / Meditação
  - Disciplina digital (tela, regras de celular)
  - Apostas (toggle simples: "não apostei hoje" + campo de vontade/gatilho se houver)
  - Relacionamento / vida social / experiência de vida
  - Finanças (atalho para registar gasto — abre o Ecrã 4)
  - Tipo de dia (normal / corrido / ruim) + nota do dia
- Botão "Guardar dia" — calcula e mostra a pontuação do dia (`day_score`).
- Indicação do "mínimo viável" quando o utilizador marca o dia como "ruim" (mostra só os itens obrigatórios da secção 19 do protocolo).

## Ecrã 2 — Painel (Dashboard)

- Índice de Consistência 90D (semana atual + média geral).
- Progresso das 10 metas-mãe, cada uma com barra de progresso (valor atual / valor-alvo).
- Gráficos simples (linha ou barra) dos últimos 30 dias: sono, tela, água.
- Sequência sem apostar (streak) em destaque.
- Fase atual e dias restantes até ao próximo checkpoint (D7, D14, D30...).

## Ecrã 3 — Finanças

- Lista de gastos/entradas (`expenses`), com filtro por categoria e por mês.
- Total gasto no mês vs. total recebido.
- Lista de dívidas (`debts`) com progresso de pagamento.
- Botão de adicionar gasto/entrada rapidamente.

## Ecrã 4 — Habilidade & Renda

- Lista de projetos de portfólio (`skill_projects`) com estado (planeado/em progresso/concluído/oferecido).
- Registo de propostas enviadas (`outreach_log`) com contador semanal (útil na fase D76–90).
- Contador de horas totais investidas na habilidade (soma de `skill_minutes`).

## Ecrã 5 — Revisões (Checkpoints)

- Formulário de revisão semanal/checkpoint (`weekly_reviews`), com as perguntas da secção 23 do protocolo, incluindo a reflexão estoica.
- Histórico de revisões anteriores, para reler.

## Ecrã 6 — Exportar

- Botão para exportar todos os dados em CSV (uma tabela por ficheiro) e em JSON (tudo junto).
- Botão para importar um backup JSON anterior (recuperação de dados).
- Ver `EXPORT.md` para detalhes técnicos.

## Ecrã 7 — Definições

- Data de início do protocolo (`protocol_start_date`).
- Data de início da sequência sem apostar (`betting_free_streak_start`) — para já entrar com os ~30 dias já cumpridos.
- Edição das metas-mãe (valores-alvo), caso queira ajustar.

---

## Prioridade de construção (MVP primeiro)

1. **MVP:** Ecrã 1 (registo diário) + base de dados local + Ecrã 6 (exportar). Já é suficiente para começar a usar todos os dias.
2. **V2:** Ecrã 2 (painel/dashboard) com cálculo de consistência e streak de apostas.
3. **V3:** Ecrã 3 (finanças) e Ecrã 4 (habilidade/renda) com mais detalhe.
4. **V4:** Ecrã 5 (revisões) e Ecrã 7 (definições/PWA/instalar no telemóvel).

Isto está detalhado passo a passo em `ROADMAP.md`.
