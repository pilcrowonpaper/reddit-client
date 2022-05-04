<script lang="ts">
	import type { Image_Size } from '$lib/types/format';

	import { calculateImageSize, convertGif } from '$lib/utils/media';

	export let src: string;
	export let width: number;
	export let height: number;
	export let max_height: number;
	export let max_width: number;
	export let alt = '';
	export let loop = false;
	export let muted = true;
	export let controls = true;
	export let autoplay = false;
	export let show = false;

	let size: Image_Size;
	$: size = calculateImageSize(width, height, max_width, max_height);
</script>

{#if show}
	<video
		class="rounded-md object-contain"
		{src}
		{alt}
		style:height="{size.height}px"
		style:width="{size.width}px"
		on:click
		{controls}
		{muted}
		{autoplay}
		{loop}
		on:click|stopPropagation={() => {}}
	>
		<src src={convertGif(src)} /></video
	>
{:else}
	<div style:height="{size.height}px" style:width="{size.width}px" />
{/if}
