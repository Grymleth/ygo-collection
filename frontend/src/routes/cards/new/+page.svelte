<script lang="ts">
	import { createCard } from '$lib/api/cards';
	import CardForm from '$lib/components/CardForm.svelte';
	import { goto } from '$app/navigation';

	async function handleCreate(data: Record<string, unknown>) {
		const card = await createCard(data);
		goto(`/cards/${card._id}`);
	}
</script>

<h1>Add New Card</h1>
<CardForm onSubmit={handleCreate} submitLabel="Create Card" />