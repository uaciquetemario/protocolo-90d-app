# Exportação de Dados

Objetivo: permitir analisar os dados fora do app (Excel, Google Sheets, Python, etc.) e ter backups de segurança, já que os dados vivem no dispositivo (ver `TECH-STACK.md`).

## Formatos

### 1. CSV (para análise em Excel/Sheets)
Um ficheiro `.csv` por tabela:
- `daily_entries.csv`
- `expenses.csv`
- `debts.csv`
- `skill_projects.csv`
- `outreach_log.csv`
- `weekly_reviews.csv`
- `goals.csv`

Cada linha = um registo; cada coluna = um campo (conforme `DATABASE-SCHEMA.md`). Gerado no browser (sem backend) convertendo os dados guardados para texto CSV e disparando o download.

### 2. JSON (para backup completo / re-importação)
Um único ficheiro `protocolo-90d-backup-YYYY-MM-DD.json` com todas as tabelas, ex.:

```json
{
  "exported_at": "2026-09-05T20:00:00Z",
  "settings": { ... },
  "daily_entries": [ ... ],
  "expenses": [ ... ],
  "debts": [ ... ],
  "skill_projects": [ ... ],
  "outreach_log": [ ... ],
  "weekly_reviews": [ ... ],
  "goals": [ ... ]
}
```

Este ficheiro serve para:
- **Backup:** guardar no Google Drive/email semanalmente.
- **Importação:** se trocar de telemóvel ou limpar o browser, importa-se este ficheiro e os dados voltam.

## Funcionalidade de importação

Ao carregar um `.json` de backup, o app deve:
1. Validar que tem a estrutura esperada (as chaves acima).
2. Perguntar se é para **substituir** os dados atuais ou **juntar** (merge por data/id).
3. Recarregar o painel depois de importar.

## Lembrete automático de backup

Sugestão: o app mostra um aviso discreto se passaram mais de 7 dias desde a última exportação (guardar a data do último export em `settings`).

## Análise fora do app

Com o CSV de `daily_entries.csv`, dá para no Excel/Sheets:
- Criar gráfico de tendência de sono, tela e água ao longo dos 90 dias.
- Calcular médias mensais.
- Cruzar `betting_free` com `betting_urge`/`betting_trigger` para identificar padrões de gatilho.
- Comparar `day_score` por fase (Reset/Construção/Expansão).

Se no futuro quiser algo mais avançado (ex.: Python com pandas), o JSON de backup é a fonte mais completa — cada tabela vira facilmente um `DataFrame`.
