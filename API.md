# API Documentation — Yu-Gi-Oh! Card Collection Tracker

Base URL: `http://localhost:3000`

---

## `GET /api/cards` — List all cards

Query parameters (all optional):

| Param | Type | Example | Description |
|-------|------|---------|-------------|
| `search` | string | `"Dark Magician"` | Case-insensitive name search (regex) |
| `cardType` | string | `"Monster"` / `"Spell"` / `"Trap"` | Filter by card type |
| `attribute` | string | `"DARK"` | Filter by monster attribute |
| `monsterSubtype` | string | `"Effect, Fusion"` | Comma-separated monster subtypes |
| `rarity` | string | `"Ultra Rare"` | Filter by rarity |
| `condition` | string | `"Near Mint"` | Filter by condition |
| `sortBy` | string | `"atk"` / `"name"` / `"levelRank"` / `"createdAt"` | Field to sort by |
| `sortOrder` | string | `"asc"` / `"desc"` | Sort direction (default: desc) |

**Response** — Array of card objects:
```json
[
  {
    "_id": "6a1181e4ec2daf18e190a5d0",
    "name": "Dark Magician",
    "cardType": "Monster",
    "monsterType": "Spellcaster",
    "monsterSubtype": ["Normal"],
    "attribute": "DARK",
    "atk": 2500,
    "def": 2100,
    "levelRank": 7,
    "cardText": "The ultimate wizard in terms of attack and defense.",
    "set": "Legend of Blue Eyes",
    "quantity": 3,
    "condition": "Near Mint",
    "rarity": "Ultra Rare",
    "createdAt": "2026-05-23T10:31:00.432Z",
    "updatedAt": "2026-05-23T10:31:00.432Z"
  }
]
```

---

## `GET /api/cards/filters` — Get distinct filter values

Scans the collection and returns every unique value for each filterable field. Useful for populating dropdown menus.

**Response:**
```json
{
  "cardTypes": ["Monster", "Spell", "Trap"],
  "attributes": ["DARK", "LIGHT", "FIRE", "WATER"],
  "monsterSubtypes": ["Effect", "Normal", "Fusion", "Ritual", "Pendulum"],
  "rarities": ["Common", "Rare", "Super Rare", "Ultra Rare", "Secret Rare"],
  "conditions": ["Near Mint", "Lightly Played", "Moderately Played", "Damaged"],
  "spellTypes": ["Normal", "Continuous", "Equip", "Field", "Quick-Play", "Ritual"],
  "trapTypes": ["Normal", "Continuous", "Counter"]
}
```

---

## `GET /api/cards/:id` — Get a single card

URL parameter: `id` — MongoDB ObjectId (24 hex chars, e.g. `6a1181e4ec2daf18e190a5d0`)

**Response** — Single card object (same shape as array items above).

**404 response:**
```json
{ "error": "Card not found" }
```

---

## `POST /api/cards` — Create a new card

Request body (JSON):

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | ✅ | Card name |
| `cardType` | string | ✅ | `"Monster"`, `"Spell"`, or `"Trap"` |
| `monsterType` | string | ❌ | e.g. `"Warrior"`, `"Dragon"`, `"Spellcaster"` |
| `monsterSubtype` | string[] | ❌ | e.g. `["Effect"]`, `["Fusion", "Effect"]` |
| `attribute` | string | ❌ | `"DARK"`, `"LIGHT"`, `"FIRE"`, `"WATER"`, `"EARTH"`, `"WIND"`, `"DIVINE"` |
| `atk` | number | ❌ | ATK value |
| `def` | number | ❌ | DEF value (not used for Link monsters) |
| `levelRank` | number | ❌ | Level/Rank (1-12) |
| `linkRating` | number | ❌ | Link rating (1-6) |
| `linkArrows` | string[] | ❌ | e.g. `["Top", "Bottom", "Left"]` |
| `pendulumScale` | number | ❌ | Pendulum scale (0-13) |
| `spellType` | string | ❌ | `"Normal"`, `"Continuous"`, `"Equip"`, `"Field"`, `"Quick-Play"`, `"Ritual"` |
| `trapType` | string | ❌ | `"Normal"`, `"Continuous"`, `"Counter"` |
| `cardText` | string | ❌ | Card text/effect description |
| `set` | string | ❌ | Set name or code |
| `quantity` | number | ❌ | Defaults to `1` |
| `condition` | string | ❌ | `"Near Mint"`, `"Lightly Played"`, `"Moderately Played"`, `"Damaged"` |
| `rarity` | string | ❌ | `"Common"`, `"Rare"`, `"Super Rare"`, `"Ultra Rare"`, `"Secret Rare"`, etc. |
| `notes` | string | ❌ | Personal notes |

**Response** — `201 Created` with the created card object:
```json
{
  "_id": "6a1181e4ec2daf18e190a5d0",
  "name": "Dark Magician",
  "cardType": "Monster",
  ...
}
```

**400 response** (validation error):
```json
{ "error": "Card validation failed: name: Path `name` is required" }
```

---

## `PUT /api/cards/:id` — Update a card

URL parameter: `id` — MongoDB ObjectId

Request body: Same fields as POST (all optional — only include fields to update).

**Response** — Updated card object.

**404 response:**
```json
{ "error": "Card not found" }
```

**Tip:** Send only the fields that changed. For example, to update quantity:
```json
{ "quantity": 2 }
```

---

## `DELETE /api/cards/:id` — Delete a card

URL parameter: `id` — MongoDB ObjectId

**Response:**
```json
{ "message": "Card deleted" }
```

**404 response:**
```json
{ "error": "Card not found" }
```

---

## `GET /api/health` — Health check

**Response:**
```json
{ "status": "ok" }
```

---

## Summary Table

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cards` | List cards (with search, filter, sort) |
| `GET` | `/api/cards/filters` | Get distinct filter dropdown values |
| `GET` | `/api/cards/:id` | Get single card |
| `POST` | `/api/cards` | Create card |
| `PUT` | `/api/cards/:id` | Update card |
| `DELETE` | `/api/cards/:id` | Delete card |
| `GET` | `/api/health` | Server health check |

---

## Field Notes for the Frontend Agent

1. **Monster-specific fields** (`monsterType`, `attribute`, `atk`, `def`, `levelRank`, `linkRating`, `linkArrows`, `pendulumScale`) should only be shown/required when `cardType` is `"Monster"`.
2. **Spell-specific field** (`spellType`) should only be shown when `cardType` is `"Spell"`.
3. **Trap-specific field** (`trapType`) should only be shown when `cardType` is `"Trap"`.
4. `monsterSubtype` is an **array of strings** — the frontend should send it as a JSON array, e.g. `["Effect"]` or `["Fusion", "Effect"]`.
5. `linkArrows` is also an **array of strings** — valid values: `"Top"`, `"Bottom"`, `"Left"`, `"Right"`, `"Bottom-Left"`, `"Bottom-Right"`, `"Top-Left"`, `"Top-Right"`.
6. The `quantity` field defaults to `1` on the backend if omitted.
7. All `_id` values are MongoDB ObjectIds (24-character hex strings).
8. Timestamps (`createdAt`, `updatedAt`) are added automatically by Mongoose.