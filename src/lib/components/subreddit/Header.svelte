<script lang="ts">
	export let about: About;
	export let show = true

	import type { About } from '$lib/types/reddit';
	
</script>

<div>
	<div class="flex place-items-center gap-2 pt-8 pb-4">
		{#if about.data.community_icon || about.data.icon_img}
			<img
				class="h-12 w-12 rounded-full"
				src={about.data.community_icon || about.data.icon_img}
				alt="r/{about.data.display_name} icon"
			/>
		{:else}
			<div
				class="h-12 w-12 rounded-full bg-blue-500 flex place-items-center place-content-center text-white text-2xl font-semibold"
			>
				{about.data.display_name.charAt(0).toLocaleLowerCase()}
			</div>
		{/if}
		<h1 class="text-2xl font-semibold">r/{about.data.display_name}</h1>
	</div>
	{#if show}
	<div class="mt-2 flex flex-col gap-y-2 text-sm">
		<div class="flex gap-4  font-medium">
			<p>{about.data.subscribers.toLocaleString()} members</p>
			<p>{about.data.accounts_active.toLocaleString()} online</p>
		</div>
		<div>
			<p>{@html about.data.public_description_html || ''}</p>
		</div>
	</div>
	{/if}
</div>
