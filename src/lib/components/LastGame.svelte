<script lang="ts">
	import { games } from '$lib/data/games';
</script>

{#if games && games.length > 0}
	<div class="flex justify-between">
		<div class="min-w-20 font-semibold md:min-w-40">Skinkare:</div>
		<div class="hidden min-w-20 font-semibold md:block md:min-w-40">Speltyp:</div>
		<div class="flex min-w-20 justify-center font-semibold md:min-w-40">Summa:</div>
		<div class="flex min-w-20 justify-center font-semibold md:min-w-40">Antal rätt:</div>
	</div>
	<div class="flex justify-between text-gray-900">
		<div class="min-w-20 md:min-w-40">{games[0].player}</div>
		<div class="hidden min-w-20 md:block md:min-w-40">{games[0].type}</div>
		<div class="flex min-w-20 justify-center md:min-w-40">{games[0].invested}:-</div>
		<div class="flex min-w-20 justify-center md:min-w-40">{games[0].score}</div>
	</div>
{:else}
	<div class="text-gray-500">Inga spel hittades</div>
{/if}
