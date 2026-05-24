<script lang="ts">
	import type { FilterValues, CardFilters } from '$lib/types';
	import { onMount } from 'svelte';
	import { getFilterValues } from '$lib/api/cards';

	let { filters, onFilterChange }: {
		filters: CardFilters;
		onFilterChange: (filters: CardFilters) => void;
	} = $props();

	let filterValues: FilterValues = $state({
		cardTypes: [],
		attributes: [],
		monsterSubtypes: [],
		rarities: [],
		conditions: [],
		spellTypes: [],
		trapTypes: [],
	});
	let loading = $state(true);

	onMount(async () => {
		try {
			filterValues = await getFilterValues();
		} catch (e) {
			console.error('Failed to load filters', e);
		} finally {
			loading = false;
		}
	});

	function update(key: keyof CardFilters, value: string | undefined) {
		onFilterChange({ ...filters, [key]: value || undefined });
	}

	function clearFilters() {
		onFilterChange({});
	}

	function clearSearch() {
		update('search', '');
	}
</script>

<div class="filter-panel">
	<div class="search-row">
		<input
			type="search"
			placeholder="Search cards..."
			value={filters.search ?? ''}
			oninput={(e) => update('search', (e.target as HTMLInputElement).value || undefined)}
		/>
		{#if filters.search}
			<button class="btn-clear" onclick={clearSearch}>✕</button>
		{/if}
	</div>

	<div class="filter-row">
		{#if !loading}
			<select
				value={filters.cardType ?? ''}
				onchange={(e) => update('cardType', (e.target as HTMLSelectElement).value || undefined)}
			>
				<option value="">All Types</option>
				{#each filterValues.cardTypes as t}
					<option value={t}>{t}</option>
				{/each}
			</select>

			<select
				value={filters.attribute ?? ''}
				onchange={(e) => update('attribute', (e.target as HTMLSelectElement).value || undefined)}
			>
				<option value="">All Attributes</option>
				{#each filterValues.attributes as a}
					<option value={a}>{a}</option>
				{/each}
			</select>

			<select
				value={filters.rarity ?? ''}
				onchange={(e) => update('rarity', (e.target as HTMLSelectElement).value || undefined)}
			>
				<option value="">All Rarities</option>
				{#each filterValues.rarities as r}
					<option value={r}>{r}</option>
				{/each}
			</select>

			<select
				value={filters.condition ?? ''}
				onchange={(e) => update('condition', (e.target as HTMLSelectElement).value || undefined)}
			>
				<option value="">All Conditions</option>
				{#each filterValues.conditions as c}
					<option value={c}>{c}</option>
				{/each}
			</select>
		{/if}

		<button class="btn-clear-all" onclick={clearFilters}>Clear Filters</button>
	</div>
</div>

<style>
	.filter-panel {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}
	.search-row {
		display: flex;
		gap: 0.25rem;
		align-items: center;
	}
	.search-row input {
		flex: 1;
		padding: 0.6rem 0.75rem;
		border: 1px solid #444;
		border-radius: 6px;
		background: #1a1a2e;
		color: #e0e0e0;
		font-size: 0.95rem;
	}
	.search-row input::placeholder {
		color: #666;
	}
	.btn-clear {
		background: none;
		border: none;
		color: #888;
		cursor: pointer;
		font-size: 1.1rem;
		padding: 0.4rem;
	}
	.btn-clear:hover {
		color: #fff;
	}
	.filter-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
	}
	.filter-row select {
		padding: 0.45rem 0.6rem;
		border: 1px solid #444;
		border-radius: 6px;
		background: #1a1a2e;
		color: #e0e0e0;
		font-size: 0.85rem;
		min-width: 130px;
	}
	.btn-clear-all {
		padding: 0.45rem 0.8rem;
		border: 1px solid #555;
		border-radius: 6px;
		background: transparent;
		color: #aaa;
		cursor: pointer;
		font-size: 0.85rem;
	}
	.btn-clear-all:hover {
		background: #333;
		color: #fff;
	}
</style>