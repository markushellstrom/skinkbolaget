<script lang="ts">
	let { title, children } = $props();
</script>

<div class="flex h-42 w-full flex-col p-6 text-gray-800">
	<h2 class="mb-2 text-center">
		{#if title === '13 rätt' || title === 'Flest 13 rätt'}
			<div class="flex justify-center">
				<div
					class="flex h-8 w-8 items-center justify-center rounded-full bg-white"
					style="border: 3px solid #ef4444; box-shadow: 0 0 0 3px #1e3a8a;"
				>
					<span class="text-lg font-bold text-blue-900">13</span>
				</div>
			</div>
		{:else}
			<div class="h-8">
				{title}
			</div>
		{/if}
	</h2>
	<div class="flex w-full flex-1 items-center justify-center text-center font-medium">
		{@render children?.()}
	</div>
</div>
