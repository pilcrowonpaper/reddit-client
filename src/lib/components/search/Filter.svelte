<script lang="ts">
	import Select from '../utils/Select.svelte';

	import { createEventDispatcher } from 'svelte';
	import type { Filter } from '$lib/types/filter';
	import {
		search_sort_options,
		search_sort_values,
		time_values,
		time_options
	} from '$lib/utils/filter';

	const dispatch = createEventDispatcher();

	export let filter: Filter;

	let default_sort_id: number;
	let default_time_id: number;
	let sort: string;
	let time: string;

	$: default_sort_id = search_sort_values.includes(filter.sort)
		? search_sort_values.indexOf(filter.sort)
		: 0;
	$: default_time_id = time_values.includes(filter.time) ? time_values.indexOf(filter.time) : 1;
	$: sort = search_sort_values[default_sort_id];
	$: time = time_values[default_time_id];

	$:console.log(sort, time)

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
	<div class="flex gap-2 text-sm">
		<p>sort by:</p>
		<Select
			options={search_sort_options}
			values={search_sort_values}
			on:select={select_sort}
			id={default_sort_id}
		/>
		{#if sort !== 'hot' && sort !== "new"}
			<Select
				options={time_options}
				values={time_values}
				id={default_time_id}
				on:select={select_time}
			/>
		{/if}
	</div>
</div>
