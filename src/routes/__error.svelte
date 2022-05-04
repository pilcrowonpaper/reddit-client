<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ status }) => {
		return {
			props: {
				status
			}
		};
	};
</script>

<script lang="ts">
	export let status: number;
</script>

<div class="flex h-full place-content-center place-items-center text-sm">
	{#if status === 404}
		<p>the requested page does not exist</p>
	{:else}
		<p>an unknown error occured</p>
	{/if}
</div>
