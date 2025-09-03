<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Skinkbolaget 2025</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<main
	class="flex h-full min-h-screen w-full justify-center bg-gray-200 p-2 text-gray-800 sm:p-4 md:p-6"
>
	{@render children?.()}
</main>
