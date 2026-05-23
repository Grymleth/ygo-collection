# Yu-Gi-Oh! Card Collection Tracker

A web application for tracking and managing your Yu-Gi-Oh! card collection. Built with a **Svelte** frontend, **Node.js/Express** backend, and **MongoDB** for storage.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | **Svelte** + Vite (bundler) |
| **Backend** | Node.js + Express.js |
| **Database** | **MongoDB** (via Mongoose ODM) |

---

## Project Structure

```
yugioh-collection/
├── backend/
│   ├── src/
│   │   ├── index.js              # Express server entry point
│   │   ├── config/
│   │   │   └── database.js       # MongoDB/Mongoose connection
│   │   ├── models/
│   │   │   └── Card.js           # Mongoose schema & model
│   │   └── routes/
│   │       └── cards.js          # CRUD API route handlers
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.svelte            # Root component
│   │   ├── main.js               # Svelte entry point
│   │   ├── lib/
│   │   │   ├── api.js            # API client
│   │   │   └── stores.js         # Svelte stores for state management
│   │   └── components/
│   │       ├── CardForm.svelte   # Add/Edit form (dynamic fields)
│   │       ├── Collection.svelte # Card list/table view
│   │       ├── CardItem.svelte   # Single card display row
│   │       ├── SearchBar.svelte  # Search + filter controls
│   │       └── FilterPanel.svelte# Advanced filter panel
│   ├── index.html
│   ├── vite.config.js            # Vite configuration
│   └── package.json
├── package.json                   # Root scripts (concurrently run both)
└── README.md                     # This file
```

---

## Database Schema (Mongoose)

MongoDB's document model is a natural fit for Yu-Gi-Oh! cards since different card types have vastly different fields. Each card document only stores the fields relevant to its type.

```javascript
const cardSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  cardType: { type: String, required: true, enum: ['Monster', 'Spell', 'Trap'] },

  // ── Monster-specific fields ──────────────────────────────────
  monsterType: String,        // Warrior, Dragon, Spellcaster, Pyro, etc.
  monsterSubtype: [String],   // ['Effect'], ['Fusion', 'Effect'], ['Pendulum', 'Effect'], etc.
  attribute: String,          // DARK, LIGHT, FIRE, WATER, EARTH, WIND, DIVINE
  atk: Number,
  def: Number,
  linkRating: Number,
  linkArrows: [String],       // ['Top', 'Bottom', 'Left', 'Right', 'Bottom-Left', 'Bottom-Right', 'Top-Left', 'Top-Right']
  levelRank: Number,
  pendulumScale: Number,      // For Pendulum monsters

  // ── Spell-specific fields ────────────────────────────────────
  spellType: String,          // Normal, Continuous, Equip, Field, Quick-Play, Ritual

  // ── Trap-specific fields ─────────────────────────────────────
  trapType: String,           // Normal, Continuous, Counter

  // ── Common fields ────────────────────────────────────────────
  cardText: String,
  set: String,                // Set name or code
  quantity: { type: Number, default: 1 },
  condition: String,          // Near Mint, Lightly Played, Moderately Played, Damaged
  rarity: String,             // Common, Rare, Super Rare, Ultra Rare, Secret Rare, etc.
  notes: String
}, { timestamps: true });     // Adds createdAt and updatedAt automatically
```

### Why MongoDB?

- **Flexible schema** — A Spell card doesn't need ATK/DEF/Level fields; a Link monster doesn't need DEF. MongoDB stores only what's relevant.
- **Easy filtering** — Query by any combination of fields with MongoDB's powerful query operators.
- **No migrations** — Add new fields to the schema without running table migrations.

---

## API Endpoints

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| `GET` | `/api/cards` | List all cards | `search`, `cardType`, `attribute`, `monsterSubtype`, `rarity`, `condition`, `sortBy`, `sortOrder` |
| `GET` | `/api/cards/:id` | Get a single card by ID | — |
| `POST` | `/api/cards` | Create a new card | — (JSON body) |
| `PUT` | `/api/cards/:id` | Update an existing card | — (JSON body) |
| `DELETE` | `/api/cards/:id` | Delete a card | — |
| `GET` | `/api/cards/filters` | Get distinct filter values from collection | — |

---

## Features

### Core Features
- **Add Cards** — Dynamic form that adapts based on card type selection. Only relevant fields are shown for Monster, Spell, or Trap cards.
- **View Collection** — Table/grid view displaying all cards with key information at a glance.
- **Search** — Live search bar to find cards by name.
- **Filter** — Filter by card type, attribute, monster subtype, spell type, trap type, rarity, condition, and set.
- **Sort** — Sort cards by name, ATK, DEF, level/rank, quantity, rarity, or date added.
- **Edit Cards** — Pre-filled form to update any card's information.
- **Delete Cards** — Remove cards from the collection with confirmation.

### Bonus / Nice-to-Have
- Collection statistics (total cards, distribution by type/attribute/rarity, charts)
- CSV export/import for backup

---

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm
- MongoDB (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) connection string)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd yugioh-collection

# Install all dependencies (root, backend, frontend)
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..

# Start both backend and frontend in development mode
npm run dev
```

The backend will start on `http://localhost:3000` and the frontend on `http://localhost:5173`.

### Environment Variables

Create a `backend/.env` file:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/yugioh-collection
```

---

## Development Roadmap

- [x] Architecture planning
- [x] Tech stack finalized (Svelte + Express + MongoDB)
- [ ] Project scaffolding (directories, package.json files, configs)
- [ ] MongoDB connection setup + Mongoose Card model
- [ ] Express API routes (CRUD + filters)
- [ ] Svelte + Vite frontend scaffolding
- [ ] API client module & Svelte stores
- [ ] CardForm component (dynamic fields)
- [ ] Collection, CardItem, SearchBar, FilterPanel components
- [ ] Edit & delete functionality
- [ ] End-to-end testing
- [ ] Polish & edge case handling

---

## License

MIT