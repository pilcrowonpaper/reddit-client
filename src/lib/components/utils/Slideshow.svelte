<script lang="ts">
	import type { Image_Size } from '$lib/types/format';
	import type { Media_Metadata } from '$lib/types/reddit';
	import { calculateImageSize } from '$lib/utils/media';

	export let media_metadata: Record<string, Media_Metadata>;
	export let max_height: number;
	let max_width: number;

	const media_metadata_vals = Object.values(media_metadata);

	interface Image {
		src: string;
		size: Image_Size;
	}

	let images: Image[] = [];
	let box_height: number;
	let page = 1;

	$: if (page > images.length) {
		page = 1;
	}

	const resizeImages = (max_w: number, max_h: number) => {
		images = media_metadata_vals.map((val) => {
			return {
				src: val.s.u,
				size: calculateImageSize(val.s.x, val.s.y, max_w, max_h)
			};
		});
		box_height = images
			.map((val) => val.size.height)
			.reduce((a, b) => {
				if (a > b) return a;
				if (a < b) return b;
			});
	};

	$: if (max_width && max_height) {
		resizeImages(max_width, max_height);
	}
</script>

<div bind:clientWidth={max_width} class="w-full">
	<div class="bg-black-500 flex w-full place-content-center place-items-center rounded-lg bg-black" style:height="{box_height}px">
		{#each images as image, i}
			{#if page === i + 1}
				<img
					src={image.src}
					alt=""
					style:height="{image.size.height}px"
					style:width="{image.size.width}px"
					on:click={() => {
						page += 1;
					}}
				/>
			{/if}
		{/each}
	</div>
	<div class="mt-2 flex w-full place-content-center gap-1">
		{#each Array(images.length) as _, i}
			<div
				class="h-2 w-2 rounded-full "
				class:bg-blue-500={page === i + 1}
				class:bg-gray-300={page !== i + 1}
			/>
		{/each}
	</div>
</div>
