<script lang="ts">
	let { title, children } = $props<{
		title?: string;
		children: () => any;
	}>();
</script>

<div class="w-full">
	{#if title}
		<h2 class="py-2 text-3xl font-semibold tracking-wide">
			{title}
		</h2>
	{/if}
	<div class="flex flex-col gap-1 rounded-xl bg-gray-100 p-4 md:p-6 lg:p-8">
		{@render children?.()}
	</div>
</div>
