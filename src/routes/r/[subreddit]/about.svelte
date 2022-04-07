<script context="module" lang="ts">
	import type { About, Listing, Post, Subreddit_Rules } from '$lib/types/reddit';
	import type { Load } from '@sveltejs/kit';

	// this page also handles r/[subreddit]/index.svelte

	export const load: Load = async ({ params, fetch, url }) => {
		const subreddit = params.subreddit;
		if (!subreddit) {
			return {
				status: 404
			};
		}
		const rules_promise = fetch(
			`https://www.reddit.com/r/${subreddit}/about/rules.json?raw_json=1`
		);
		const about_promise = fetch(`https://www.reddit.com/r/${subreddit}/about.json?raw_json=1`);
		const response = (await Promise.allSettled([rules_promise, about_promise])) as {
			status: string;
			value?: Response;
		}[];
		if (response.filter((val) => val.status !== 'fulfilled').length > 0) {
			return { status: 404 };
		}
		const rules: any = await response[0].value.json();
		const about: any = await response[1].value.json();
		if (about.error || rules.error)
			return {
				status: 404
			};
		return {
			props: {
				rules: rules as Subreddit_Rules,
				about: about as About
			}
		};
	};
</script>

<script lang="ts">
	export let rules: Subreddit_Rules;
	export let about: About;

	import Header from '$lib/components/subreddit/Header.svelte';
</script>

<div class="px-4 py-3 sm:px-8 md:px-16 lg:px-24">
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
</div>
