<script lang="ts">
	import type { Image_Size } from '$lib/types/format';

	import { calculateImageSize } from '$lib/utils/media';

	export let src: string;
	export let width: number;
	export let height: number;
	export let max_height: number;
	export let max_width: number;
	export let title: string;

	let size: Image_Size;

	$: size = calculateImageSize(width, height, max_width, max_height);
</script>

<iframe
	class="rounded-md"
	{src}
	{title}
	style:height="{size.height}px"
	style:width="{size.width}px"
	on:click
    allow="fullscreen;"
/>
