<script lang="ts">
	import { goto } from '$app/navigation';

	export let user: User;
	export let show = true;

	import type { User } from '$lib/types/reddit/index';
</script>

<div>
	<div class="flex place-items-center gap-2 pt-8 pb-4">
		{#if user.data.icon_img}
			<img class="h-12 w-12 rounded-full" src={user.data.icon_img} alt="u/{user.data.name} icon" />
		{:else}
			<div
				class="h-12 w-12 rounded-full bg-blue-500 flex place-items-center place-content-center text-white text-2xl font-semibold"
			>
				{user.data.name.charAt(0).toLocaleLowerCase()}
			</div>
		{/if}
		<h1
			class="cursor-pointer text-2xl font-semibold"
			on:click={() => {
				goto(`/u/${user.data.name}`);
			}}
		>
			u/{user.data.name}
		</h1>
	</div>
	{#if show}
		<div class="mt-2 flex flex-col gap-y-2 text-sm">
			<div class="flex gap-4  font-medium">
				<p>{user.data.total_karma.toLocaleString()} karma</p>
			</div>
			<div>
				<p>{@html user.data.subreddit.public_description || ''}</p>
			</div>
		</div>
	{/if}
</div>
