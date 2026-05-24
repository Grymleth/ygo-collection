<script lang="ts">
	import { onMount } from 'svelte';
	import type { Card } from '$lib/types';
	import { getCard, updateCard, deleteCard } from '$lib/api/cards';
	import CardForm from '$lib/components/CardForm.svelte';
	import { goto } from '$app/navigation';

	let { params } = $props();

	let card: Card | null = $state(null);
	let loading = $state(true);
	let error = $state('');
	let isEditing = $state(false);
	let deleting = $state(false);
	let copySuccess = $state(false);

	onMount(() => {
		loadCard();
	});

	async function loadCard() {
		loading = true;
		error = '';
		try {
			card = await getCard(params.id);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to load card';
		} finally {
			loading = false;
		}
	}

	async function handleUpdate(data: Record<string, unknown>) {
		const updated = await updateCard(params.id, data);
		card = updated;
		isEditing = false;
	}

	async function handleDelete() {
		if (!confirm('Are you sure you want to delete this card?')) return;
		deleting = true;
		try {
			await deleteCard(params.id);
			goto('/');
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to delete card';
			deleting = false;
		}
	}

	async function copyId() {
		try {
			await navigator.clipboard.writeText(params.id);
			copySuccess = true;
			setTimeout(() => copySuccess = false, 2000);
		} catch {
			// fallback
		}
	}

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleString();
	}
</script>

{#if loading}
	<div class="status">Loading card...</div>
{:else if error}
	<div class="status error">{error}</div>
	<a href="/" class="back-link">← Back to collection</a>
{:else if card}
	<div class="detail-header">
		<a href="/" class="back-link">← Back</a>
		<div class="header-actions">
			<button class="btn-edit" onclick={() => isEditing = !isEditing}>
				{isEditing ? 'Cancel Edit' : '✏️ Edit'}
			</button>
			<button class="btn-delete" onclick={handleDelete} disabled={deleting}>
				{deleting ? 'Deleting...' : '🗑️ Delete'}
			</button>
		</div>
	</div>

	{#if isEditing}
		<h1>Edit: {card.name}</h1>
		<CardForm {card} onSubmit={handleUpdate} submitLabel="Save Changes" {isEditing} />
	{:else}
		<div class="card-detail">
			<div class="detail-head">
				<h1>{card.name}</h1>
				<span class="badge type-{card.cardType.toLowerCase()}">{card.cardType}</span>
			</div>

			<div class="detail-grid">
				{#if card.cardType === 'Monster'}
					<div class="detail-item">
						<span class="detail-label">Monster Type</span>
						<span class="detail-value">{card.monsterType ?? '—'}</span>
					</div>
					<div class="detail-item">
						<span class="detail-label">Attribute</span>
						<span class="detail-value">{card.attribute ?? '—'}</span>
					</div>
					<div class="detail-item">
						<span class="detail-label">ATK / DEF</span>
						<span class="detail-value">{card.atk ?? '?'} / {card.def ?? '?'}</span>
					</div>
					<div class="detail-item">
						<span class="detail-label">Level / Rank</span>
						<span class="detail-value">{card.levelRank ?? '—'}</span>
					</div>
					{#if card.linkRating}
						<div class="detail-item">
							<span class="detail-label">Link Rating</span>
							<span class="detail-value">{card.linkRating}</span>
						</div>
					{/if}
					{#if card.linkArrows && card.linkArrows.length > 0}
						<div class="detail-item full-width">
							<span class="detail-label">Link Arrows</span>
							<span class="detail-value">{card.linkArrows.join(', ')}</span>
						</div>
					{/if}
					{#if card.pendulumScale !== undefined}
						<div class="detail-item">
							<span class="detail-label">Pendulum Scale</span>
							<span class="detail-value">{card.pendulumScale}</span>
						</div>
					{/if}
					{#if card.monsterSubtype && card.monsterSubtype.length > 0}
						<div class="detail-item full-width">
							<span class="detail-label">Subtypes</span>
							<span class="detail-value">
								{#each card.monsterSubtype as sub}
									<span class="subtype-badge">{sub}</span>
								{/each}
							</span>
						</div>
					{/if}
				{/if}

				{#if card.cardType === 'Spell' && card.spellType}
					<div class="detail-item">
						<span class="detail-label">Spell Type</span>
						<span class="detail-value">{card.spellType}</span>
					</div>
				{/if}

				{#if card.cardType === 'Trap' && card.trapType}
					<div class="detail-item">
						<span class="detail-label">Trap Type</span>
						<span class="detail-value">{card.trapType}</span>
					</div>
				{/if}

				<div class="detail-item">
					<span class="detail-label">Set / Code</span>
					<span class="detail-value">{card.set ?? '—'}</span>
				</div>
				<div class="detail-item">
					<span class="detail-label">Rarity</span>
					<span class="detail-value">{card.rarity ?? '—'}</span>
				</div>
				<div class="detail-item">
					<span class="detail-label">Condition</span>
					<span class="detail-value">{card.condition ?? '—'}</span>
				</div>
				<div class="detail-item">
					<span class="detail-label">Quantity</span>
					<span class="detail-value">{card.quantity}</span>
				</div>
			</div>

			{#if card.cardText}
				<div class="detail-section">
					<h3>Card Text</h3>
					<p class="card-text">{card.cardText}</p>
				</div>
			{/if}

			{#if card.notes}
				<div class="detail-section">
					<h3>Notes</h3>
					<p class="notes-text">{card.notes}</p>
				</div>
			{/if}

			<div class="detail-meta">
				<span>ID: <button class="copy-id" onclick={copyId}>{params.id}</button> {#if copySuccess}<span class="copied">Copied!</span>{/if}</span>
				<span>Added: {formatDate(card.createdAt)}</span>
				<span>Updated: {formatDate(card.updatedAt)}</span>
			</div>
		</div>
	{/if}
{/if}

<style>
	.detail-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}
	.back-link {
		color: #8ab4f8;
		text-decoration: none;
		font-size: 0.9rem;
	}
	.back-link:hover {
		text-decoration: underline;
	}
	.header-actions {
		display: flex;
		gap: 0.5rem;
	}
	.btn-edit {
		padding: 0.4rem 0.8rem;
		background: #0f3460;
		color: #8ab4f8;
		border: 1px solid #1a4a8a;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.85rem;
	}
	.btn-edit:hover {
		background: #1a4a8a;
	}
	.btn-delete {
		padding: 0.4rem 0.8rem;
		background: #5c1a1a;
		color: #ff7a7a;
		border: 1px solid #8a2a2a;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.85rem;
	}
	.btn-delete:hover {
		background: #7a2a2a;
	}
	.btn-delete:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	.status {
		text-align: center;
		padding: 3rem 1rem;
		color: #888;
	}
	.status.error {
		color: #ff7a7a;
	}
	.card-detail {
		background: #16213e;
		border: 1px solid #333;
		border-radius: 10px;
		padding: 1.5rem;
	}
	.detail-head {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.25rem;
	}
	.detail-head h1 {
		margin: 0;
	}
	.badge {
		display: inline-block;
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		font-size: 0.78rem;
		font-weight: 600;
		text-transform: uppercase;
	}
	.type-monster { background: #5c2d1a; color: #e8a87c; }
	.type-spell { background: #1a4a5c; color: #7cd4e8; }
	.type-trap { background: #4a1a5c; color: #c87ce8; }
	.detail-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem 1.5rem;
		margin-bottom: 1.25rem;
	}
	@media (max-width: 600px) {
		.detail-grid {
			grid-template-columns: 1fr;
		}
	}
	.detail-item {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}
	.detail-item.full-width {
		grid-column: 1 / -1;
	}
	.detail-label {
		font-size: 0.78rem;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
	.detail-value {
		font-size: 0.95rem;
		color: #e0e0e0;
	}
	.subtype-badge {
		display: inline-block;
		padding: 0.1rem 0.5rem;
		background: #1a1a3e;
		border: 1px solid #444;
		border-radius: 4px;
		font-size: 0.82rem;
		margin-right: 0.3rem;
		margin-bottom: 0.2rem;
	}
	.detail-section {
		margin-bottom: 1rem;
		padding-top: 1rem;
		border-top: 1px solid #333;
	}
	.detail-section h3 {
		font-size: 0.9rem;
		color: #aaa;
		margin-bottom: 0.5rem;
	}
	.card-text, .notes-text {
		color: #d0d0d0;
		line-height: 1.6;
		font-size: 0.9rem;
	}
	.detail-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		padding-top: 1rem;
		border-top: 1px solid #333;
		font-size: 0.8rem;
		color: #666;
	}
	.copy-id {
		cursor: pointer;
		padding: 0.1rem 0.3rem;
		background: #1a1a2e;
		border: none;
		border-radius: 3px;
		color: #888;
		font-family: monospace;
		font-size: inherit;
	}
	.copy-id:hover {
		color: #ffd700;
		background: #2a2a3e;
	}
	.copied {
		color: #4caf50;
		font-weight: 500;
	}
</style>