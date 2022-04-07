<script lang="ts">
	import type { Comment } from '$lib/types/reddit';
	import Comment_Block from '$lib/components/post/Comment.svelte';
	import Horizontal from '../voting/comment/Horizontal.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let comment: Comment;

	let collapse = false;

	export let depth = 1;
	export let depth_limit = 10;
	export let op: string;

	const continueThread = (id: string) => {
		dispatch('continue', {
			id
		});
	};

	const continueThreadForward = (e: CustomEvent) => {
		const id = e.detail.id;
		dispatch('continue', {
			id
		});
	};
</script>

<div
	class="flex grow flex-col gap-y-1 py-1"
>
	<div class="flex gap-x-2">
		<a class="w-fit text-xs font-medium hover:underline" href="/u/{comment.data.author}"
			>u/{comment.data.author}</a
		>
		{#if op === comment.data.author}
			<p class="text-xs font-semibold text-blue-500">OP</p>
		{/if}
	</div>
	<div class="flex gap-x-2">
		<div
			class="group flex w-4 shrink-0 cursor-pointer place-content-center"
			on:click={() => {
				collapse = true;
			}}
		>
			<div class="h-full w-px bg-gray-200" class:group-hover:bg-blue-500={!collapse} />
		</div>
		{#if !collapse}
			<div class="overflow-hidden">
				<div>
					<div class="w-full">
						{@html comment.data.body_html}
					</div>
					<div class="mt-1">
						<Horizontal {comment} />
					</div>
					{#if depth === depth_limit}
						<button
							class="cursor-pointer text-sm text-blue-500 hover:underline"
							on:click={() => {
								continueThread(comment.data.id);
							}}>continue thread</button
						>
					{/if}
				</div>
				{#if depth < depth_limit}
					{#if comment.data.replies}
						<div class="mt-2 flex flex-col gap-y-4">
							{#each comment.data.replies.data.children as reply}
								{#if reply.data.body_html}
									<Comment_Block
										comment={reply}
										depth={depth + 1}
										on:continue={continueThreadForward}
										{depth_limit}
										{op}
									/>
								{/if}
							{/each}
						</div>
					{/if}
				{/if}
			</div>
		{:else}
			<p
				class="text-sm text-blue-500 hover:underline cursor-pointer"
				on:click={() => {
					collapse = false;
				}}
			>
				expand
			</p>
		{/if}
	</div>
</div>
