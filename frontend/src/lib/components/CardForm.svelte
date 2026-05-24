<script lang="ts">
	import type { CardFormData, Card } from '$lib/types';
	import { MONSTER_ATTRIBUTES, MONSTER_SUBTYPES, LINK_ARROWS, CONDITIONS, SPELL_TYPES, TRAP_TYPES } from '$lib/types';

	let { card, onSubmit, submitLabel }: {
		card?: Card;
		onSubmit: (data: Record<string, unknown>) => Promise<void>;
		submitLabel?: string;
	} = $props();

	function initialFormData(c?: Card): CardFormData {
		return {
			name: c?.name ?? '',
			cardType: c?.cardType ?? 'Monster',
			monsterType: c?.monsterType ?? '',
			monsterSubtype: c?.monsterSubtype ?? [],
			attribute: c?.attribute ?? '',
			atk: c?.atk ?? null,
			def: c?.def ?? null,
			levelRank: c?.levelRank ?? null,
			linkRating: c?.linkRating ?? null,
			linkArrows: c?.linkArrows ?? [],
			pendulumScale: c?.pendulumScale ?? null,
			spellType: c?.spellType ?? '',
			trapType: c?.trapType ?? '',
			cardText: c?.cardText ?? '',
			set: c?.set ?? '',
			quantity: c?.quantity ?? 1,
			condition: c?.condition ?? '',
			rarity: c?.rarity ?? '',
			notes: c?.notes ?? '',
		};
	}

	let formData: CardFormData = $state(initialFormData(card));

	let error = $state('');
	let saving = $state(false);

	function toggleArray(arr: string[], value: string): string[] {
		if (arr.includes(value)) {
			return arr.filter((v) => v !== value);
		}
		return [...arr, value];
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		saving = true;

		if (!formData.name.trim()) {
			error = 'Card name is required.';
			saving = false;
			return;
		}

		const payload: Record<string, unknown> = {
			name: formData.name.trim(),
			cardType: formData.cardType,
			quantity: formData.quantity,
		};

		if (formData.cardType === 'Monster') {
			if (formData.monsterType) payload.monsterType = formData.monsterType;
			if (formData.monsterSubtype.length > 0) payload.monsterSubtype = formData.monsterSubtype;
			if (formData.attribute) payload.attribute = formData.attribute;
			if (formData.atk !== null) payload.atk = formData.atk;
			if (formData.def !== null) payload.def = formData.def;
			if (formData.levelRank !== null) payload.levelRank = formData.levelRank;
			if (formData.linkRating !== null) payload.linkRating = formData.linkRating;
			if (formData.linkArrows.length > 0) payload.linkArrows = formData.linkArrows;
			if (formData.pendulumScale !== null) payload.pendulumScale = formData.pendulumScale;
		}

		if (formData.cardType === 'Spell' && formData.spellType) {
			payload.spellType = formData.spellType;
		}
		if (formData.cardType === 'Trap' && formData.trapType) {
			payload.trapType = formData.trapType;
		}

		if (formData.cardText) payload.cardText = formData.cardText;
		if (formData.set) payload.set = formData.set;
		if (formData.condition) payload.condition = formData.condition;
		if (formData.rarity) payload.rarity = formData.rarity;
		if (formData.notes) payload.notes = formData.notes;

		try {
			await onSubmit(payload);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to save card';
		} finally {
			saving = false;
		}
	}
</script>

<form onsubmit={handleSubmit}>
	{#if error}
		<div class="error-banner">{error}</div>
	{/if}

	<div class="form-grid">
		<div class="field">
			<label for="name">Card Name *</label>
			<input
				id="name"
				type="text"
				value={formData.name}
				oninput={(e) => formData.name = (e.target as HTMLInputElement).value}
				required
			/>
		</div>

		<div class="field">
			<label for="cardType">Card Type</label>
			<select
				id="cardType"
				value={formData.cardType}
				onchange={(e) => formData.cardType = (e.target as HTMLSelectElement).value as 'Monster' | 'Spell' | 'Trap'}
			>
				<option value="Monster">Monster</option>
				<option value="Spell">Spell</option>
				<option value="Trap">Trap</option>
			</select>
		</div>
	</div>

	{#if formData.cardType === 'Monster'}
		<fieldset class="fieldset">
			<legend>Monster Details</legend>
			<div class="form-grid">
				<div class="field">
					<label for="monsterType">Monster Type</label>
					<input
						id="monsterType"
						type="text"
						placeholder="e.g. Dragon, Warrior"
						value={formData.monsterType}
						oninput={(e) => formData.monsterType = (e.target as HTMLInputElement).value}
					/>
				</div>
				<div class="field">
					<label for="attribute">Attribute</label>
					<select
						id="attribute"
						value={formData.attribute}
						onchange={(e) => formData.attribute = (e.target as HTMLSelectElement).value}
					>
						<option value="">— Select —</option>
						{#each MONSTER_ATTRIBUTES as attr}
							<option value={attr}>{attr}</option>
						{/each}
					</select>
				</div>
				<div class="field">
					<label for="atk">ATK</label>
					<input
						id="atk"
						type="number"
						min="0"
						value={formData.atk ?? ''}
						oninput={(e) => {
							const v = (e.target as HTMLInputElement).value;
							formData.atk = v ? Number(v) : null;
						}}
					/>
				</div>
				<div class="field">
					<label for="def">DEF</label>
					<input
						id="def"
						type="number"
						min="0"
						value={formData.def ?? ''}
						oninput={(e) => {
							const v = (e.target as HTMLInputElement).value;
							formData.def = v ? Number(v) : null;
						}}
					/>
				</div>
				<div class="field">
					<label for="levelRank">Level / Rank</label>
					<input
						id="levelRank"
						type="number"
						min="1"
						max="12"
						value={formData.levelRank ?? ''}
						oninput={(e) => {
							const v = (e.target as HTMLInputElement).value;
							formData.levelRank = v ? Number(v) : null;
						}}
					/>
				</div>
				<div class="field">
					<label for="linkRating">Link Rating</label>
					<input
						id="linkRating"
						type="number"
						min="1"
						max="6"
						value={formData.linkRating ?? ''}
						oninput={(e) => {
							const v = (e.target as HTMLInputElement).value;
							formData.linkRating = v ? Number(v) : null;
						}}
					/>
				</div>
				<div class="field">
					<label for="pendulumScale">Pendulum Scale</label>
					<input
						id="pendulumScale"
						type="number"
						min="0"
						max="13"
						value={formData.pendulumScale ?? ''}
						oninput={(e) => {
							const v = (e.target as HTMLInputElement).value;
							formData.pendulumScale = v ? Number(v) : null;
						}}
					/>
				</div>
			</div>

			<div class="field">
				<label>Monster Subtypes</label>
				<div class="checkbox-group">
					{#each MONSTER_SUBTYPES as sub}
						<label class="checkbox-label">
							<input
								type="checkbox"
								checked={formData.monsterSubtype.includes(sub)}
								onchange={() => formData.monsterSubtype = toggleArray(formData.monsterSubtype, sub)}
							/>
							{sub}
						</label>
					{/each}
				</div>
			</div>

			<div class="field">
				<label>Link Arrows</label>
				<div class="checkbox-group">
					{#each LINK_ARROWS as arrow}
						<label class="checkbox-label">
							<input
								type="checkbox"
								checked={formData.linkArrows.includes(arrow)}
								onchange={() => formData.linkArrows = toggleArray(formData.linkArrows, arrow)}
							/>
							{arrow}
						</label>
					{/each}
				</div>
			</div>
		</fieldset>
	{/if}

	{#if formData.cardType === 'Spell'}
		<fieldset class="fieldset">
			<legend>Spell Details</legend>
			<div class="field">
				<label for="spellType">Spell Type</label>
				<select
					id="spellType"
					value={formData.spellType}
					onchange={(e) => formData.spellType = (e.target as HTMLSelectElement).value}
				>
					<option value="">— Select —</option>
					{#each SPELL_TYPES as st}
						<option value={st}>{st}</option>
					{/each}
				</select>
			</div>
		</fieldset>
	{/if}

	{#if formData.cardType === 'Trap'}
		<fieldset class="fieldset">
			<legend>Trap Details</legend>
			<div class="field">
				<label for="trapType">Trap Type</label>
				<select
					id="trapType"
					value={formData.trapType}
					onchange={(e) => formData.trapType = (e.target as HTMLSelectElement).value}
				>
					<option value="">— Select —</option>
					{#each TRAP_TYPES as tt}
						<option value={tt}>{tt}</option>
					{/each}
				</select>
			</div>
		</fieldset>
	{/if}

	<fieldset class="fieldset">
		<legend>Collection Info</legend>
		<div class="form-grid">
			<div class="field">
				<label for="set">Set / Code</label>
				<input
					id="set"
					type="text"
					placeholder="e.g. LOB-001"
					value={formData.set}
					oninput={(e) => formData.set = (e.target as HTMLInputElement).value}
				/>
			</div>
			<div class="field">
				<label for="rarity">Rarity</label>
				<input
					id="rarity"
					type="text"
					placeholder="e.g. Ultra Rare"
					value={formData.rarity}
					oninput={(e) => formData.rarity = (e.target as HTMLInputElement).value}
				/>
			</div>
			<div class="field">
				<label for="condition">Condition</label>
				<select
					id="condition"
					value={formData.condition}
					onchange={(e) => formData.condition = (e.target as HTMLSelectElement).value}
				>
					<option value="">— Select —</option>
					{#each CONDITIONS as c}
						<option value={c}>{c}</option>
					{/each}
				</select>
			</div>
			<div class="field">
				<label for="quantity">Quantity</label>
				<input
					id="quantity"
					type="number"
					min="1"
					value={formData.quantity}
					oninput={(e) => formData.quantity = Math.max(1, Number((e.target as HTMLInputElement).value))}
				/>
			</div>
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<legend>Additional Info</legend>
		<div class="field">
			<label for="cardText">Card Text / Effect</label>
			<textarea
				id="cardText"
				rows="4"
				value={formData.cardText}
				oninput={(e) => formData.cardText = (e.target as HTMLTextAreaElement).value}
			></textarea>
		</div>
		<div class="field">
			<label for="notes">Personal Notes</label>
			<textarea
				id="notes"
				rows="2"
				value={formData.notes}
				oninput={(e) => formData.notes = (e.target as HTMLTextAreaElement).value}
			></textarea>
		</div>
	</fieldset>

	<div class="form-actions">
		<button type="submit" class="btn-primary" disabled={saving}>
			{saving ? 'Saving...' : submitLabel ?? 'Save Card'}
		</button>
		<a href="/" class="btn-secondary">Cancel</a>
	</div>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
	.error-banner {
		padding: 0.6rem 1rem;
		background: #5c1a1a;
		color: #ff7a7a;
		border-radius: 6px;
		font-size: 0.9rem;
	}
	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	@media (max-width: 600px) {
		.form-grid {
			grid-template-columns: 1fr;
		}
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}
	.field label {
		font-size: 0.82rem;
		color: #aaa;
		font-weight: 500;
	}
	.field input,
	.field select,
	.field textarea {
		padding: 0.55rem 0.7rem;
		border: 1px solid #444;
		border-radius: 6px;
		background: #1a1a2e;
		color: #e0e0e0;
		font-size: 0.9rem;
		font-family: inherit;
	}
	.field input:focus,
	.field select:focus,
	.field textarea:focus {
		outline: none;
		border-color: #ffd700;
	}
	.field textarea {
		resize: vertical;
	}
	.fieldset {
		border: 1px solid #333;
		border-radius: 8px;
		padding: 1rem;
		background: #0f0f23;
	}
	.fieldset legend {
		font-size: 0.85rem;
		font-weight: 600;
		color: #ffd700;
		padding: 0 0.5rem;
	}
	.checkbox-group {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 0.8rem;
		margin-top: 0.3rem;
	}
	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.85rem;
		color: #ccc;
		cursor: pointer;
	}
	.checkbox-label input {
		cursor: pointer;
	}
	.form-actions {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}
	.btn-primary {
		padding: 0.6rem 1.5rem;
		background: #ffd700;
		color: #1a1a2e;
		border: none;
		border-radius: 6px;
		font-weight: 600;
		font-size: 0.95rem;
		cursor: pointer;
	}
	.btn-primary:hover {
		background: #ffed4a;
	}
	.btn-primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	.btn-secondary {
		padding: 0.6rem 1.5rem;
		background: transparent;
		color: #aaa;
		border: 1px solid #555;
		border-radius: 6px;
		text-decoration: none;
		font-size: 0.95rem;
	}
	.btn-secondary:hover {
		background: #333;
		color: #fff;
	}
</style>