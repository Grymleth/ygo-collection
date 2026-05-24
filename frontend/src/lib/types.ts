export interface Card {
	_id: string;
	name: string;
	cardType: 'Monster' | 'Spell' | 'Trap';
	monsterType?: string;
	monsterSubtype?: string[];
	attribute?: string;
	atk?: number;
	def?: number;
	levelRank?: number;
	linkRating?: number;
	linkArrows?: string[];
	pendulumScale?: number;
	spellType?: string;
	trapType?: string;
	cardText?: string;
	set?: string;
	quantity: number;
	condition?: string;
	rarity?: string;
	notes?: string;
	createdAt: string;
	updatedAt: string;
}

export interface FilterValues {
	cardTypes: string[];
	attributes: string[];
	monsterSubtypes: string[];
	rarities: string[];
	conditions: string[];
	spellTypes: string[];
	trapTypes: string[];
}

export interface CardFilters {
	search?: string;
	cardType?: string;
	attribute?: string;
	monsterSubtype?: string;
	rarity?: string;
	condition?: string;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
	page?: number;
	limit?: number;
}

export interface CardFormData {
	name: string;
	cardType: 'Monster' | 'Spell' | 'Trap';
	monsterType?: string;
	monsterSubtype?: string[];
	attribute?: string;
	atk?: number | null;
	def?: number | null;
	levelRank?: number | null;
	linkRating?: number | null;
	linkArrows?: string[];
	pendulumScale?: number | null;
	spellType?: string;
	trapType?: string;
	cardText?: string;
	set?: string;
	quantity: number;
	condition?: string;
	rarity?: string;
	notes?: string;
}

export const MONSTER_ATTRIBUTES = ['DARK', 'LIGHT', 'FIRE', 'WATER', 'EARTH', 'WIND', 'DIVINE'] as const;
export const MONSTER_SUBTYPES = ['Normal', 'Effect', 'Fusion', 'Ritual', 'Synchro', 'XYZ', 'Pendulum', 'Link', 'Flip', 'Toon', 'Spirit', 'Union', 'Gemini', 'Tuner'] as const;
export const LINK_ARROWS = ['Top', 'Bottom', 'Left', 'Right', 'Bottom-Left', 'Bottom-Right', 'Top-Left', 'Top-Right'] as const;
export const CONDITIONS = ['Near Mint', 'Lightly Played', 'Moderately Played', 'Damaged'] as const;
export const SPELL_TYPES = ['Normal', 'Continuous', 'Equip', 'Field', 'Quick-Play', 'Ritual'] as const;
export const TRAP_TYPES = ['Normal', 'Continuous', 'Counter'] as const;