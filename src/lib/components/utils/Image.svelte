<script lang="ts">
	import type { Image_Size } from '$lib/types/format';

	import { calculateImageSize, convertGif } from '$lib/utils/media';

	export let src: string;
	export let width: number;
	export let height: number;
	export let max_height: number;
	export let max_width: number;
	export let alt = '';
	export let show = false;
	export let censor = false;

	let size: Image_Size;

	$: size = calculateImageSize(width, height, max_width, max_height);

	const handleImgClick = (e: Event) => {
		if (!censor) return;
		e.stopPropagation();
		censor = false;
	};
</script>

<div class="flex w-full place-content-center" style:height="{size.height}px">
	<div class="h-full overflow-hidden rounded-md" style:width="{size.width}px">
		{#if show}
			<img
				class="rounded-md object-contain"
				{src}
				{alt}
				height="{size.height}px"
				width="{size.width}px"
				style:height="{size.height}px"
				style:width="{size.width}px"
				on:click
				class:blur-xl={censor}
				on:click={handleImgClick}
			/>
		{:else}
			<div style:height="{size.height}px" style:width="{size.width}px" />
		{/if}
	</div>
</div>
