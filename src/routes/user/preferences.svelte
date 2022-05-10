<script lang="ts">
import { session } from '$app/stores';

	import ToggleItem from '$lib/components/profile/ToggleItem.svelte';
	import Cards from '$lib/components/subreddit/Cards.svelte';

	let card: string;
</script>


<div class="flex place-items-center gap-2 py-6">
	{#if $session.arctic.icon_img}
		<img class="h-12 w-12 rounded-full" src={$session.arctic.icon_img} alt="u/{$session.user.name} icon" />
	{:else}
		<div
			class="h-12 w-12 rounded-full bg-blue-500 flex place-items-center place-content-center text-white text-2xl font-semibold"
		>
			{$session.user.name.charAt(0).toLocaleLowerCase()}
		</div>
	{/if}
	<h1
		class="cursor-pointer text-2xl font-semibold"
	>
		u/{$session.user.name}
	</h1>
</div>

<!-- <h2 class="text-xl font-medium">account</h2>
<div>
	<div class="flex flex-col gap-y-4 text-sm">
		<ToggleItem label="show nsfw posts in feed" value={true} />
		<ToggleItem label="blur nsfw posts" value={true} />
		<ToggleItem label="show nsfw search results" value={true} />
		<ToggleItem label="autoplay videos" value={true} />
	</div>
</div> -->
<!-- <h2 class="text-xl font-medium">filters</h2>
<div>
    <p class="text-sm"></p>
</div> -->
