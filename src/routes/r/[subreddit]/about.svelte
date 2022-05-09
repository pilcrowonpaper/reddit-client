<script lang="ts">
	export let rules: Subreddit_Rules;
	export let about: About;

	import type { About, Subreddit_Rules } from '$lib/types/reddit';

	import Header from '$lib/components/subreddit/Header.svelte';
</script>

<Header {about} />
<div class="mt-12">
	<h2 class="break-words text-xl font-medium leading-tight sm:leading-tight">rules</h2>
	<div class="flex flex-col gap-6">
		{#each rules.rules as rule, i}
			<div>
				<h3 class="font-medium">{i + 1}. {rule.short_name}</h3>
				{#if rule.description_html}
					<div class="text-sm">
						{@html rule.description_html}
					</div>
				{/if}
				<div class="mt-1 flex flex-wrap gap-x-4 text-xs">
					<p>
						<span class="font-semibold">report reason:</span>
						{rule.violation_reason}
					</p>
					<p><span class="font-semibold">applies to:</span> {rule.kind}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
