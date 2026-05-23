import { Router } from 'express';
import Card from '../models/Card.js';

const router = Router();

// ── GET /api/cards ─────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const {
      search,
      cardType,
      attribute,
      monsterSubtype,
      rarity,
      condition,
      sortBy,
      sortOrder,
    } = req.query;

    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (cardType) filter.cardType = cardType;
    if (attribute) filter.attribute = attribute;
    if (monsterSubtype) filter.monsterSubtype = { $in: monsterSubtype.split(',') };
    if (rarity) filter.rarity = rarity;
    if (condition) filter.condition = condition;

    // Build sort object
    const sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1; // default: newest first
    }

    const cards = await Card.find(filter).sort(sort);
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/cards/filters — distinct filter values ────────────────
router.get('/filters', async (_req, res) => {
  try {
    const [
      cardTypes,
      attributes,
      monsterSubtypes,
      rarities,
      conditions,
      spellTypes,
      trapTypes,
    ] = await Promise.all([
      Card.distinct('cardType'),
      Card.distinct('attribute'),
      Card.distinct('monsterSubtype'),
      Card.distinct('rarity'),
      Card.distinct('condition'),
      Card.distinct('spellType'),
      Card.distinct('trapType'),
    ]);

    res.json({
      cardTypes,
      attributes: attributes.filter(Boolean),
      monsterSubtypes: [...new Set(monsterSubtypes.flat())].filter(Boolean).sort(),
      rarities: rarities.filter(Boolean),
      conditions: conditions.filter(Boolean),
      spellTypes: spellTypes.filter(Boolean),
      trapTypes: trapTypes.filter(Boolean),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/cards/:id ─────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/cards ────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const card = await Card.create(req.body);
    res.status(201).json(card);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── PUT /api/cards/:id ─────────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json(card);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── DELETE /api/cards/:id ──────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json({ message: 'Card deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;