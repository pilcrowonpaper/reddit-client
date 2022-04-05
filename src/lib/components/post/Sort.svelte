<script lang="ts">
	import Select from '../utils/Select.svelte';

	import { createEventDispatcher } from 'svelte';
	import type { Comment_Filter } from '$lib/types/filter';
	import { comment_sort_options } from '$lib/utils/filter';

	const dispatch = createEventDispatcher();

	export let options: Comment_Filter;

	let default_sort_id: number;
	let sort: string;

	$: default_sort_id = comment_sort_options.includes(options.sort)
		? comment_sort_options.indexOf(options.sort)
		: 0;
	$: sort = comment_sort_options[default_sort_id];

	const select_sort = (e: CustomEvent) => {
		if (sort === e.detail.value) return;
		sort = e.detail.value;
		dispatch('select', {
			options: {
				sort
			}
		});
	};
</script>

<div>
	<div class="flex gap-2">
		<p>sort by:</p>
		<Select options={comment_sort_options} on:select={select_sort} id={default_sort_id} />
	</div>
</div>
