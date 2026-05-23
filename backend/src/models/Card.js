import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    cardType: {
      type: String,
      required: true,
      enum: ['Monster', 'Spell', 'Trap'],
    },

    // ── Monster-specific ──────────────────────────────────────────
    monsterType: String, // Warrior, Dragon, Spellcaster, etc.
    monsterSubtype: [String], // ['Effect'], ['Fusion', 'Effect'], ['Pendulum', 'Effect'], etc.
    attribute: {
      type: String,
      enum: ['DARK', 'LIGHT', 'FIRE', 'WATER', 'EARTH', 'WIND', 'DIVINE'],
    },
    atk: Number,
    def: Number,
    linkRating: Number,
    linkArrows: [String], // Top, Bottom, Left, Right, Bottom-Left, Bottom-Right, Top-Left, Top-Right
    levelRank: Number,
    pendulumScale: Number,

    // ── Spell-specific ────────────────────────────────────────────
    spellType: {
      type: String,
      enum: ['Normal', 'Continuous', 'Equip', 'Field', 'Quick-Play', 'Ritual'],
    },

    // ── Trap-specific ─────────────────────────────────────────────
    trapType: {
      type: String,
      enum: ['Normal', 'Continuous', 'Counter'],
    },

    // ── Common ────────────────────────────────────────────────────
    cardText: String,
    set: String,
    quantity: { type: Number, default: 1, min: 0 },
    condition: {
      type: String,
      enum: ['Near Mint', 'Lightly Played', 'Moderately Played', 'Damaged'],
    },
    rarity: String,
    notes: String,
  },
  { timestamps: true }
);

const Card = mongoose.model('Card', cardSchema);

export default Card;