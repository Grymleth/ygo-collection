<script lang="ts">
	import type { Card, CardFilters } from '$lib/types';

	let { cards, filters, onSort }: {
		cards: Card[];
		filters: CardFilters;
		onSort: (field: string) => void;
	} = $props();

	function sortIndicator(field: string): string {
		if (filters.sortBy !== field) return '↕';
		return filters.sortOrder === 'asc' ? '↑' : '↓';
	}

	const sortableColumns = [
		{ key: 'name', label: 'Name' },
		{ key: 'cardType', label: 'Type' },
		{ key: 'attribute', label: 'Attr' },
		{ key: 'atk', label: 'ATK' },
		{ key: 'def', label: 'DEF' },
		{ key: 'levelRank', label: 'Lv/Rk' },
		{ key: 'rarity', label: 'Rarity' },
		{ key: 'condition', label: 'Condition' },
		{ key: 'quantity', label: 'Qty' },
		{ key: 'createdAt', label: 'Added' },
	] as const;
</script>

<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				{#each sortableColumns as col}
					<th
						class="sortable"
						class:active={filters.sortBy === col.key}
						onclick={() => onSort(col.key)}
					>
						{col.label} {sortIndicator(col.key)}
					</th>
				{/each}
				<th class="actions-col">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each cards as card (card._id)}
				<tr>
					<td class="name-cell">
						<a href="/cards/{card._id}">{card.name}</a>
					</td>
					<td><span class="badge type-{card.cardType.toLowerCase()}">{card.cardType}</span></td>
					<td>{card.attribute ?? '—'}</td>
					<td>{card.atk ?? '—'}</td>
					<td>{card.def ?? '—'}</td>
					<td>{card.levelRank ?? '—'}</td>
					<td>{card.rarity ?? '—'}</td>
					<td>{card.condition ?? '—'}</td>
					<td class="qty-cell">{card.quantity}</td>
					<td class="date-cell">{new Date(card.createdAt).toLocaleDateString()}</td>
					<td class="actions-cell">
						<a href="/cards/{card._id}" class="btn-view">View</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	{#if cards.length === 0}
		<div class="empty-state">No cards found. Try adjusting your filters or add a new card.</div>
	{/if}
</div>

<style>
	.table-wrapper {
		overflow-x: auto;
		border: 1px solid #333;
		border-radius: 8px;
		background: #16213e;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.88rem;
	}
	th {
		padding: 0.65rem 0.75rem;
		text-align: left;
		font-weight: 600;
		color: #aaa;
		border-bottom: 2px solid #333;
		white-space: nowrap;
		user-select: none;
	}
	th.sortable {
		cursor: pointer;
	}
	th.sortable:hover {
		color: #ffd700;
	}
	th.active {
		color: #ffd700;
	}
	td {
		padding: 0.55rem 0.75rem;
		border-bottom: 1px solid #222;
		color: #d0d0d0;
	}
	tr:last-child td {
		border-bottom: none;
	}
	tr:hover td {
		background: #1a2744;
	}
	.name-cell a {
		color: #ffd700;
		text-decoration: none;
		font-weight: 500;
	}
	.name-cell a:hover {
		text-decoration: underline;
	}
	.qty-cell {
		text-align: center;
		font-weight: 600;
	}
	.date-cell {
		font-size: 0.82rem;
		color: #888;
	}
	.actions-cell {
		text-align: center;
	}
	.badge {
		display: inline-block;
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
		font-size: 0.78rem;
		font-weight: 600;
		text-transform: uppercase;
	}
	.type-monster {
		background: #5c2d1a;
		color: #e8a87c;
	}
	.type-spell {
		background: #1a4a5c;
		color: #7cd4e8;
	}
	.type-trap {
		background: #4a1a5c;
		color: #c87ce8;
	}
	.btn-view {
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		background: #0f3460;
		color: #8ab4f8;
		text-decoration: none;
		font-size: 0.8rem;
	}
	.btn-view:hover {
		background: #1a4a8a;
	}
	.empty-state {
		padding: 2rem;
		text-align: center;
		color: #666;
	}
</style>