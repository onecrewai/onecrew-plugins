# Dynamic tables

## Keep one target table per conversation

- Reuse the table already selected or created for the conversation. Retain its `table_id`, real column IDs, and row IDs.
- On the first save, use the user's specified or selected table. Create the first table only when no target table exists. For creator search results, first confirm at least one candidate is retained for writing; no retained candidates means no empty table.
- Once a target exists, create another only when the user explicitly requests a new table or the business subject changes. Explain the reason when creating another table. If the user selects a different existing table, use it directly without making a copy.
- Additional searches, changed keywords or filters, more records, revised evaluations, corrections, and requested column changes stay in the current table by default. These changes alone do not constitute a new subject.
- A subject change means a different business object or independent task, such as moving from a campaign's creator shortlist to a separate project's supplier list. Do not infer a subject change merely from another search or field edit.
- Query existing rows before modifying them, then update by their real row IDs. Append rows only for new entities. For creator results, match `identity.platform` and `identity.platform_id` to avoid inserting the same entity again.
- If the target ID is missing from context, recover it with `table_list` and `table_get`. Ask the user if the target remains ambiguous. Missing context, failed requests, or uncertain writes are not reasons to create a replacement table.

## Choose business types before creating columns

Define columns as `{ "name": "Column name", "data_type": "type" }`. Names describe the task; `data_type` defines the value structure. Do not send `type`, `presentation`, or invented types.

Create only requested or task-required business columns. Unless explicitly requested, do not add retrieval dates, sources, notes, or other auxiliary columns. Explain provenance or retrieval time in the reply when necessary.

| data_type | Cell value | Use |
|---|---|---|
| string | String | Plain text or requested notes |
| int | Integer | Ranks and counts |
| float | Finite number | Amounts and ratios |
| bool | true / false | Boolean conditions |
| date | ISO date or timestamp with timezone | Dates and times |
| people | `{name, image_url?, url?, identity?}` | People and individual creators; name and avatar share one cell |
| company | `{name, image_url?, url?, identity?}` | Companies, brands, and organizations; name and logo share one cell |
| website | HTTP(S) URL string | A separately displayed website link |
| email | Email address string | Email addresses |
| telephone | Telephone number string | Contact numbers |
| score | `{level, reason?}` | Rating badge with the reason shown on hover |

A `website` cell takes the URL string alone, never the `people`/`company` object. All types accept `null` for unknown values. `people` and `company` require a nonempty `name`; their URL fields are optional and must use HTTP or HTTPS. Supply an actual known image URL for `image_url`, not a homepage or an invented avatar URL.

### Prefer rich cells

Use `people` or `company` for entity details. Keep the name and avatar/logo in the same object rather than splitting them into text and image-link columns. New creator search tables default to three columns in order: Name (`people`), Profile (`website`), and Match (`score`). Localize the labels to the user's language; use 名称、主页、匹配度 in Chinese. An explicitly brand-only list may use `company` instead of `people`. Preserve an existing target table's schema unless the user requests changes.

Profile is the actual account or channel homepage. Use a handle URL only when verified by the source; do not invent a handle, substitute a video URL, or add a second source column. The entity's native identity stays in the Name cell for matching records. Missing avatars or evaluations remain absent or `null` without changing this default structure.

Keep a consistent rich type when individual and brand accounts share a column; do not reduce the column to plain text.

`score.level` must be `excellent`, `good`, `medium`, or `low`; put the explanation in `reason`. Before assigning or revising a rating, follow [Evaluation and reasons](match-evaluation.md). Do not add a separate evaluation or score-reason column by default. A separately requested biography or note may have its own column. Creator discovery evaluates fit to the current requirements; ordinary tables do not automatically need scores.

Rendering depends on `data_type`, not words such as “avatar” or “score” in the column name. Tables with a score column always display excellent → good → medium → low → null using the first score column in schema order, across the whole table before pagination. Ties keep stable row order; null appears as a neutral Unrated badge and stays null in storage. No sorting tool or insertion reordering is needed. Ordinary field sorting remains for tables without scores; people/company are not sorted as JSON.

## Search and assessment writes

Read all cached search pages, then use the screening rules in [Creator discovery](creator-discovery.md) before rating and saving. Do not add confirmed required-condition failures or candidates without topic evidence. Relevant but unverified records may have null scores when acceptable to the user; report them separately. An explicit request for all raw candidates overrides this default. Do not delete existing low/null rows or discard records solely by grade. Match by platform + native ID, not a similar name. Ordinary repeat searches preserve existing nonempty scores and nonempty fields when the new value is unknown. Explicit reassessment or deep evaluation updates the same row's score level and reason together; when old criteria no longer apply and required evidence is missing, clear the whole score to null.

Rich-cell updates replace the entire value. Read it first and preserve identity plus other unchanged fields when changing name, image or URL. Old cells without identity remain valid; show “Not recorded” rather than guessing or performing bulk ID lookups. Do not add a separate ID column or change column types to handle legacy data.

## Tool sequence

1. Select the target according to the continuity rules above. Use `table_get` to inspect its real column IDs and types; use `table_list` when locating a table. Call `table_create` only when creation is appropriate, with the necessary business columns.
2. A creation result already includes real column IDs; reuse it when sufficient. Keys in row `values` must be returned column IDs, not names.
3. Call `table_create_rows` for new records and `table_update_rows` for partial updates by real row ID. Omitted fields stay unchanged; `null` explicitly clears a cell. Each write accepts at most 100 rows; `table_add_columns` accepts at most 100 columns.
4. Read records with `table_query_rows`, following `has_more` until the needed records are available. Pages start at 1 and `size` is at most 100. Do not scrape the Web panel to read table data.
5. Creating, reading, or adding columns returns `web_url`. Row writes return `{table_id, web_url, rows}` under MCP `structuredContent.result`. Return the exact clickable detail URL and the confirmed added/updated counts. If only an empty table was created, say so.

After a failed or uncertain write, query the current state before retrying. Do not duplicate tables or records, or restructure an existing table to fix your own modeling choice without a user request.

## Value examples

When a new table is appropriate:

```json
{
  "name": "Creator shortlist",
  "columns": [
    {"name": "Creator", "data_type": "people"},
    {"name": "Channel link", "data_type": "website"},
    {"name": "Match", "data_type": "score"}
  ]
}
```

The following illustrates the value format only. Replace placeholder IDs with tool-returned IDs and use user-provided or verified data:

```json
{
  "table_id": "<returned-table-id>",
  "rows": [{"values": {
    "<creator-column-id>": {"name": "Example creator", "image_url": "https://example.com/avatar.png", "url": "https://example.com/profile", "identity": {"platform": "instagram", "platform_id": "<verified-native-id-string>"}},
    "<channel-column-id>": "https://example.com/profile",
    "<match-column-id>": {"level": "good", "reason": "<developed evidence-based evaluation paragraph>"}
  }}]
}
```

Do not save example URLs or values as real records. Omit unknown image URLs and use `null` for insufficiently supported values. The plugin itself does not automatically retrieve avatars or enrich records.

## Preserve platform identity

`people` and `company` support `identity: {platform, platform_id}`. When a search result supplies a native ID, save identity on the first write, with platform_id as a string even beyond JavaScript safe integer range; for YouTube results, use `platform: "youtube"` and the returned `platform_id`. Store identity with the name, avatar, and URL in the rich cell, not in another platform-ID column.

The grid stays compact; the people/company editor displays platform and a copyable native ID as read-only information. Identity is also returned when reading records. Omit it when manually entered data has no reliable identity; never infer native IDs from names, handles, or URLs. Preserve an existing identity when editing the rich cell unless intentionally replacing the entity.

The database does not enforce entity uniqueness within or across tables. The caller must inspect existing identities and choose update versus append; do not assume automatic deduplication.
