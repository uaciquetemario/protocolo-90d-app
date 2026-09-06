# PROTOCOLO 90D — App

App pessoal de acompanhamento do PROTOCOLO 90D: registo diário de hábitos, saúde, finanças, espiritualidade, inglês, habilidade profissional e vida social, com pontuação de consistência e exportação de dados para análise.

## Objetivo do app

- Registar dados diários rapidamente (idealmente < 2 min por dia).
- Guardar tudo numa base de dados local (funciona offline, sem custos de servidor).
- Calcular automaticamente: sequência de dias sem apostar, média de tela, média de sono, consistência semanal, progresso das 10 metas-mãe.
- Exportar os dados (CSV/JSON/Excel) para analisar fora do app (Excel, Google Sheets, Python).

## Documentos deste repositório

| Ficheiro | Conteúdo |
|---|---|
| `docs/PROTOCOLO-90D.md` | O protocolo completo (regras, metas, filosofia) — fonte da verdade do conteúdo |
| `docs/TECH-STACK.md` | Stack técnica recomendada e porquê |
| `docs/DATABASE-SCHEMA.md` | Esquema da base de dados (tabelas, campos, relações) |
| `docs/FEATURES.md` | Ecrãs e funcionalidades do app, ligados às áreas do protocolo |
| `docs/EXPORT.md` | Como funciona a exportação de dados para análise |
| `docs/ROADMAP.md` | Ordem de construção do app, passo a passo |

## Como usar este repositório

1. Cria um repositório novo no GitHub, ex.: `protocolo-90d-app`, e faz upload de **todos** estes ficheiros e pastas (incluindo `src/`, `docs/`, `.github/` e os ficheiros na raiz).
2. Segue o `docs/ROADMAP.md` na ordem indicada se quiseres continuar a evoluir o app — cada passo é pequeno e testável.
3. Se estiveres a usar uma ferramenta de IA para codar (Claude Code, Copilot, etc.), aponta-a para `docs/DATABASE-SCHEMA.md` e `docs/FEATURES.md` — são a especificação que ela deve seguir.

## Correr localmente (para testar antes de publicar)

Precisas de ter o [Node.js](https://nodejs.org) instalado (versão 18 ou superior).

```bash
npm install
npm run dev
```

Abre o endereço que aparecer no terminal (normalmente `http://localhost:5173`).

## Publicar no GitHub Pages (automático)

Este repositório já inclui `.github/workflows/deploy.yml`, que publica o app automaticamente sempre que fizeres push para a branch `main`.

1. No GitHub, vai a **Settings → Pages**.
2. Em "Build and deployment", escolhe a origem **GitHub Actions**.
3. Faz um push para `main` (ou usa "Upload files" novamente) — a Action corre sozinha e publica o app.
4. Em alguns minutos o link fica disponível em **Settings → Pages** (formato `https://teu-utilizador.github.io/protocolo-90d-app/`).

## Estado atual do código

Já implementado: base de dados local (IndexedDB), ecrã "Hoje" com todos os campos do protocolo, sequência de dias sem apostar, painel com as 10 metas-mãe e Índice de Consistência, exportação CSV/JSON e importação de backup, ecrã de definições.

Ainda por fazer (ver `docs/ROADMAP.md`, Passos 6–9): ecrãs dedicados de Finanças e Habilidade/Renda com CRUD próprio (por agora, esses dados exportam-se mas ainda não têm ecrã de gestão), e configuração como PWA instalável.

## Licença / uso

Projeto pessoal. Sem licença de terceiros envolvida.
