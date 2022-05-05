<script lang="ts">
	import Select from '../utils/Select.svelte';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const card_options = ['Large', 'Compact'];
	const card_values = ['large', 'compact'];

	export let type = card_values[0];

	const select_card = (e: CustomEvent) => {
		if (type === e.detail.value) return;
		type = e.detail.value;
		dispatch('select', {
			value: type
		});
	};
</script>

<div class="text-sm sm:text-base">
	<Select options={card_options} values={card_values} on:select={select_card} />
</div>
