<script lang="ts">
	import Select from '../utils/Select.svelte';

	import { createEventDispatcher } from 'svelte';
	import type { Filter } from '$lib/types/filter';
	import { post_sort_options, time_options, time_values } from '$lib/utils/filter';

	const dispatch = createEventDispatcher();

	export let filter: Filter;

	let default_sort_id: number;
	let default_time_id: number;
	let sort: string;
	let time: string;

	$: default_sort_id = post_sort_options.includes(filter.sort)
		? post_sort_options.indexOf(filter.sort)
		: 0;
	$: default_time_id = time_values.includes(filter.time) ? time_values.indexOf(filter.time) : 1;
	$: sort = post_sort_options[default_sort_id];
	$: time = time_options[default_time_id];

	const select_sort = (e: CustomEvent) => {
		if (sort === e.detail.value) return;
		sort = e.detail.value;
		dispatch('select', {
			options: {
				sort,
				time
			}
		});
	};

	const select_time = (e: CustomEvent) => {
		if (time === e.detail.value) return;
		time = e.detail.value;
		dispatch('select', {
			options: {
				sort,
				time
			}
		});
	};
</script>

<div>
	<div class="flex gap-2 text-sm sm:text-base">
		<p>sort by:</p>
		<Select options={post_sort_options} on:select={select_sort} id={default_sort_id} />
		{#if sort === 'top' || sort === 'controversial'}
			<Select
				options={time_options}
				values={time_values}
				id={default_time_id}
				on:select={select_time}
			/>
		{/if}
	</div>
</div>
