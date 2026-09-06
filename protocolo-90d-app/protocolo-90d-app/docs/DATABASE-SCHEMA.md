# Esquema da Base de Dados

Desenhado para funcionar tanto em IndexedDB (Opção A) como em SQLite/PostgreSQL (Opção B) — cada "tabela" abaixo é um `object store` no IndexedDB ou uma tabela SQL.

## 1. `daily_entries` — registo diário (o coração do app)

Um registo por dia. Preenchido através do formulário diário.

| Campo | Tipo | Descrição |
|---|---|---|
| `date` | string (`YYYY-MM-DD`) | chave primária |
| `sleep_hours` | number | horas de sono |
| `sleep_bed_time` | string (`HH:MM`) | hora que foi dormir |
| `sleep_wake_time` | string (`HH:MM`) | hora que acordou |
| `screen_hours` | number | tempo de tela do dia |
| `screen_free_morning` | boolean | 30 min sem redes ao acordar |
| `screen_free_night` | boolean | 30 min sem redes antes de dormir |
| `screen_free_meal` | boolean | 1 refeição sem celular |
| `water_liters` | number | água consumida |
| `exercise_done` | boolean | treinou hoje |
| `exercise_notes` | string | tipo/duração |
| `back_pain_level` | number (0–10) | opcional, para acompanhar a lombar |
| `food_logged` | boolean | alimentação registada |
| `food_symptoms` | string | sintomas de gastrite percebidos |
| `bible_done` | boolean | leitura bíblica |
| `prayer_minutes` | number | minutos de oração |
| `rosary_done` | boolean | terço |
| `gratitude_items` | string (3 itens, separados por `;`) | gratidão do dia |
| `charity_done` | boolean | ato de caridade/serviço |
| `english_minutes` | number | minutos de inglês |
| `english_skill` | string | listening/reading/vocab/writing/speaking |
| `skill_minutes` | number | minutos na habilidade profissional |
| `skill_notes` | string | o que foi feito |
| `reading_minutes` | number | leitura de livros |
| `writing_done` | boolean | journaling feito |
| `journal_text` | string | texto livre do dia (opcional) |
| `meditation_minutes` | number | minutos de meditação |
| `betting_free` | boolean | **true = não apostou hoje** |
| `betting_urge` | boolean | sentiu vontade forte de apostar |
| `betting_trigger` | string | gatilho identificado, se houve vontade |
| `relationship_quality_time` | boolean | momento de qualidade com a namorada |
| `new_social_interaction` | boolean | nova conversa/interação social |
| `life_experience_done` | boolean | experiência significativa da semana feita hoje |
| `life_experience_notes` | string | o que foi |
| `expenses_logged` | boolean | gastos do dia registados (ver tabela `expenses`) |
| `day_type` | enum (`normal`,`corrido`,`ruim`) | tipo de dia, autoavaliado |
| `day_score` | number (0–100) | pontuação do dia (calculada ou manual) |
| `day_note` | string | nota livre do dia |

## 2. `expenses` — gastos individuais

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string/uuid | chave primária |
| `date` | string | data do gasto |
| `category` | string | ex.: transporte, alimentação, estudos, lazer |
| `amount` | number | valor (MZN) |
| `description` | string | descrição curta |
| `is_income` | boolean | true = entrada de dinheiro, false = despesa |

## 3. `debts` — dívidas

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string/uuid | chave primária |
| `name` | string | nome da dívida |
| `amount_total` | number | valor total |
| `amount_paid` | number | valor já pago |
| `due_date` | string | prazo |
| `priority` | enum (`alta`,`media`,`baixa`) | prioridade |

## 4. `skill_projects` — portfólio da habilidade profissional

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string/uuid | chave primária |
| `title` | string | nome do projeto |
| `status` | enum (`planeado`,`em_progresso`,`concluido`,`oferecido`) | estado |
| `date_started` | string | início |
| `date_finished` | string | conclusão |
| `link` | string | link do projeto/portfólio, se houver |
| `notes` | string | notas |

## 5. `outreach_log` — propostas/ofertas de trabalho enviadas (fase D76–90)

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string/uuid | chave primária |
| `date` | string | data do contacto |
| `channel` | string | onde foi enviado (ex.: WhatsApp, redes sociais, indicação) |
| `result` | enum (`sem_resposta`,`recusado`,`interessado`,`cliente`) | resultado |

## 6. `weekly_reviews` — revisões semanais / checkpoints

| Campo | Tipo | Descrição |
|---|---|---|
| `week_start` | string | data de início da semana |
| `consistency_score` | number (0–100) | Índice de Consistência 90D da semana |
| `what_worked` | string | reflexão |
| `what_didnt_work` | string | reflexão |
| `hardest_habit` | string | hábito mais difícil |
| `stoic_reflection` | string | reflexão estoica (controlável vs incontrolável) |
| `next_action` | string | próxima ação sob controle |

## 7. `goals` — as 10 metas-mãe (dados fixos + progresso)

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | ex.: `zero_apostas`, `controle_digital`, `saude`, etc. |
| `title` | string | nome da meta |
| `target_description` | string | descrição da meta-alvo |
| `progress_value` | number | valor atual (ex.: dias sem apostar, nº de sessões) |
| `target_value` | number | valor-alvo (ex.: 120 dias, 30 sessões) |

## 8. `settings` — configurações do app

| Campo | Tipo | Descrição |
|---|---|---|
| `protocol_start_date` | string | data de início do protocolo (Dia 1) |
| `current_phase` | enum (`reset`,`construcao`,`expansao`) | fase atual (calculada a partir da data) |
| `betting_free_streak_start` | string | data de início da sequência sem apostar (permite continuar a contagem dos 30 dias já feitos) |

---

## Campos calculados (não guardados, calculados em tempo real a partir dos dados acima)

- **Dias sem apostar:** diferença entre hoje e `betting_free_streak_start`, mantendo a sequência enquanto `betting_free = true` todos os dias.
- **Média semanal de tela / sono / água:** média dos últimos 7 `daily_entries`.
- **Consistência da semana:** % de hábitos-alvo cumpridos nos 7 dias, comparado com as regras da secção 18 do protocolo.
- **Progresso das 10 metas-mãe:** cruzamento de `daily_entries`, `expenses`, `skill_projects` e `outreach_log` com os valores-alvo em `goals`.
- **Fase atual:** calculada a partir de `protocol_start_date` (D1–30 = Reset, D31–60 = Construção, D61–90 = Expansão).

## Relações

- `expenses.date` e `daily_entries.date` relacionam-se pela data (não é preciso foreign key rígida se usares IndexedDB).
- `outreach_log` e `skill_projects` são independentes de `daily_entries`, mas alimentam o cálculo da meta-mãe "07 — Renda".
