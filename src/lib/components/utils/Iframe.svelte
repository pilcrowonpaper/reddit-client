<script lang="ts">
	import type { Image_Size } from '$lib/types/format';

	import { calculateImageSize } from '$lib/utils/media';
import { onMount } from 'svelte';

	export let src: string;
	export let width: number;
	export let height: number;
	export let max_height: number;
	export let max_width: number;
	export let title: string;
	export let show = false;
	export let censor = false;

	let size: Image_Size;

	$: size = calculateImageSize(width, height, max_width, max_height);

	const handleVideoClick = () => {
		console.log(1);
		if (!censor) return;
		censor = false;
	};

	let iframe : HTMLIFrameElement

	$: if (iframe && show) {
		console.log(0)
		iframe.contentDocument.body.addEventListener("click", handleVideoClick)
		console.log(iframe)
	}
</script>

<div class="flex w-full place-content-center" style:height="{size.height}px">
	<div
		class="h-full overflow-hidden rounded-md"
		style:width="{size.width}px"
	>
		{#if show}
			<iframe
				class="rounded-md"
				{src}
				{title}
				style:height="{size.height}px"
				style:width="{size.width}px"
				allow="fullscreen;"
				class:blur-xl={censor}
				bind:this={iframe}
			/>
		{:else}
			<div style:height="{size.height}px" style:width="{size.width}px" />
		{/if}
	</div>
</div>
