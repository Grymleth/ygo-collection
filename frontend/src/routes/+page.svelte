<script lang="ts">
	import { onMount } from 'svelte';
	import type { Card, CardFilters } from '$lib/types';
	import { getCards } from '$lib/api/cards';
	import FilterPanel from '$lib/components/FilterPanel.svelte';
	import CardTable from '$lib/components/CardTable.svelte';

	let cards: Card[] = $state([]);
	let loading = $state(true);
	let error = $state('');
	let filters: CardFilters = $state({ sortBy: 'createdAt', sortOrder: 'desc' });

	onMount(() => {
		loadCards();
	});

	async function loadCards() {
		loading = true;
		error = '';
		try {
			cards = await getCards(filters);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to load cards';
		} finally {
			loading = false;
		}
	}

	function handleFilterChange(newFilters: CardFilters) {
		filters = newFilters;
		loadCards();
	}

	function handleSort(field: string) {
		if (filters.sortBy === field) {
			filters = { ...filters, sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' };
		} else {
			filters = { ...filters, sortBy: field, sortOrder: 'asc' };
		}
		loadCards();
	}
</script>

<div class="page-header">
	<h1>Card Collection</h1>
	<a href="/cards/new" class="btn-add-card">+ Add Card</a>
</div>

<FilterPanel {filters} onFilterChange={handleFilterChange} />

{#if loading}
	<div class="status">Loading cards...</div>
{:else if error}
	<div class="status error">{error}</div>
{:else}
	<CardTable {cards} {filters} onSort={handleSort} />
{/if}

<style>
	.page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}
	.btn-add-card {
		padding: 0.5rem 1rem;
		background: #ffd700;
		color: #1a1a2e;
		border-radius: 6px;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.9rem;
	}
	.btn-add-card:hover {
		background: #ffed4a;
	}
	.status {
		text-align: center;
		padding: 3rem 1rem;
		color: #888;
		font-size: 1.1rem;
	}
	.status.error {
		color: #ff7a7a;
	}
</style>