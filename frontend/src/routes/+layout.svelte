<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="app-shell">
	<header>
		<div class="header-inner">
			<a href="/" class="logo">
				<span class="logo-icon">⚔️</span>
				<span class="logo-text">YGO Collection</span>
			</a>
			<nav>
				<a href="/" class="nav-link">Cards</a>
				<a href="/cards/new" class="nav-link btn-add">+ Add Card</a>
			</nav>
		</div>
	</header>
	<main>
		{@render children()}
	</main>
	<footer>
		<p>Yu-Gi-Oh! Card Collection Tracker</p>
	</footer>
</div>

<style>
	.app-shell {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	header {
		background: #0f0f23;
		border-bottom: 1px solid #333;
		padding: 0 1rem;
		position: sticky;
		top: 0;
		z-index: 10;
	}
	.header-inner {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 56px;
	}
	.logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
	}
	.logo-icon {
		font-size: 1.4rem;
	}
	.logo-text {
		font-size: 1.15rem;
		font-weight: 700;
		color: #ffd700;
		letter-spacing: 0.5px;
	}
	nav {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.nav-link {
		padding: 0.4rem 0.75rem;
		border-radius: 6px;
		text-decoration: none;
		color: #ccc;
		font-size: 0.9rem;
	}
	.nav-link:hover {
		background: #1a1a3e;
		color: #fff;
	}
	.btn-add {
		background: #ffd700;
		color: #1a1a2e !important;
		font-weight: 600;
	}
	.btn-add:hover {
		background: #ffed4a;
	}
	main {
		flex: 1;
		max-width: 1200px;
		width: 100%;
		margin: 0 auto;
		padding: 1.5rem 1rem;
	}
	footer {
		text-align: center;
		padding: 1rem;
		color: #555;
		font-size: 0.8rem;
		border-top: 1px solid #222;
	}
</style>