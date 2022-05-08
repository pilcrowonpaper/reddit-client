<script lang="ts">
	import type { Image_Size } from '$lib/types/format';

	import { calculateImageSize, convertGif } from '$lib/utils/media';

	export let src: string;
	export let fallback: string = null;
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
	export let play = false;
	export let censor = false

	let size: Image_Size;
	$: size = calculateImageSize(width, height, max_width, max_height);

	let videoElement: HTMLVideoElement;

	$: if (videoElement) {
		if (play && !censor) {
			videoElement.play();
		} else {
			videoElement.pause();
		}
	}

	const handleVideoClick = (e: Event) => {
		if (!censor) return
		censor = false
	}
</script>

<div class="flex w-full place-content-center" style:height="{size.height}px">
	<div class="h-full overflow-hidden rounded-md" style:width="{size.width}px">
		{#if show}
			<video
				class="rounded-md object-contain"
				{alt}
				height="{size.height}px"
				width="{size.width}px"
				style:height="{size.height}px"
				style:width="{size.width}px"
				on:click
				{controls}
				{muted}
				{autoplay}
				{loop}
				on:click|stopPropagation={handleVideoClick}
				bind:this={videoElement}
				class:blur-xl={censor}
			>
				<source src={convertGif(src)} />
				{#if fallback}
					<source src={fallback} />
				{/if}
			</video>
		{:else}
			<div style:height="{size.height}px" style:width="{size.width}px" />
		{/if}
	</div>
</div>
