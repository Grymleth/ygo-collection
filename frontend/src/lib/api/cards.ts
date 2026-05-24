import type { Card, CardFilters, FilterValues } from '$lib/types';

const BASE_URL = 'http://localhost:3000/api';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
	const res = await fetch(`${BASE_URL}${path}`, {
		headers: { 'Content-Type': 'application/json' },
		...options,
	});
	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		throw new Error(body.error || `Request failed: ${res.status}`);
	}
	return res.json();
}

export async function getCards(filters: CardFilters = {}): Promise<Card[]> {
	const params = new URLSearchParams();
	if (filters.search) params.set('search', filters.search);
	if (filters.cardType) params.set('cardType', filters.cardType);
	if (filters.attribute) params.set('attribute', filters.attribute);
	if (filters.monsterSubtype) params.set('monsterSubtype', filters.monsterSubtype);
	if (filters.rarity) params.set('rarity', filters.rarity);
	if (filters.condition) params.set('condition', filters.condition);
	if (filters.sortBy) params.set('sortBy', filters.sortBy);
	if (filters.sortOrder) params.set('sortOrder', filters.sortOrder);

	const qs = params.toString();
	return apiFetch<Card[]>(`/cards${qs ? `?${qs}` : ''}`);
}

export async function getFilterValues(): Promise<FilterValues> {
	return apiFetch<FilterValues>('/cards/filters');
}

export async function getCard(id: string): Promise<Card> {
	return apiFetch<Card>(`/cards/${id}`);
}

export async function createCard(data: Record<string, unknown>): Promise<Card> {
	return apiFetch<Card>('/cards', {
		method: 'POST',
		body: JSON.stringify(data),
	});
}

export async function updateCard(id: string, data: Record<string, unknown>): Promise<Card> {
	return apiFetch<Card>(`/cards/${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
	});
}

export async function deleteCard(id: string): Promise<void> {
	await apiFetch<{ message: string }>(`/cards/${id}`, { method: 'DELETE' });
}