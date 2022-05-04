<script lang="ts">
	import type { Post } from '$lib/types/reddit';

	import Horizontal from '$lib/components/voting/post/Horizontal.svelte';
	import { formatTime, removeEmoji } from '$lib/utils/format';
	import Slideshow from '$lib/components/utils/Slideshow.svelte';
	import Image from '$lib/components/utils/Image.svelte';
	import { validateGif, convertGif } from '$lib/utils/media';
	import Video from '../utils/Video.svelte';
	import Iframe from '$lib/components/utils/Iframe.svelte';

	export let post: Post;

	let inner_height: number;
	let max_height: number;
	$: max_height = (inner_height * 2) / 3;
	let max_width: number;

	let show = true
</script>

<svelte:window bind:innerHeight={inner_height} />

<div>
	<div class="flex grow flex-col gap-4 overflow-hidden">
		<div class="flex cursor-pointer flex-col gap-2">
			<div>
				<h2 class="break-words text-xl font-medium leading-tight sm:leading-tight">
					{post.data.title}
					{#if post.data.link_flair_text}
						<span
							class="w-fit rounded px-2 text-xs font-medium text-white"
							style:background-color={post.data.link_flair_background_color}
							class:text-white={post.data.link_flair_text_color === 'light'}
							class:text-black={post.data.link_flair_text_color === 'dark'}
						>
							{removeEmoji(post.data.link_flair_text)}
						</span>
					{/if}
				</h2>
				<div class="mt-0.5 flex gap-3 text-xs">
					<a class="font-medium hover:underline" href="/u/{post.data.author}"
						>u/{post.data.author}</a
					>
					<p>{formatTime(new Date().getTime() - post.data.created_utc * 1000)} ago</p>
				</div>
			</div>
		</div>
		<div class="grid grid-cols-1">
			<div class="flex flex-col place-items-center pb-2" bind:clientWidth={max_width}>
				{#if post.data.post_hint === 'image'}
					<Image
						src={post.data.url}
						alt={post.data.title}
						{max_height}
						{max_width}
						width={post.data.preview.images[0].source.width}
						height={post.data.preview.images[0].source.height}
						{show}
					/>
				{:else if post.data.post_hint === 'rich:video'}
					<Iframe
						src={post.data.media_embed.content.split('"').find((val) => val.includes('https'))}
						{max_height}
						{max_width}
						width={post.data.media_embed.width}
						height={post.data.media_embed.height}
						title={post.data.title}
						{show}
					/>
				{:else if post.data.domain === 'v.redd.it'}
					<Video
						src="{post.data.media.reddit_video.hls_url}/HLSPlaylist.m3u8"
						alt={post.data.title}
						{max_height}
						{max_width}
						width={post.data.media.reddit_video.width}
						height={post.data.media.reddit_video.height}
						autoplay={true}
						{show}
					/>
				{:else if post.data.post_hint === 'link' && validateGif(post.data.url)}
					<Video
						src={convertGif(post.data.url)}
						alt={post.data.title}
						{max_height}
						{max_width}
						width={post.data.preview.images[0].source.width}
						height={post.data.preview.images[0].source.height}
						autoplay={true}
						loop={true}
						{show}
					/>
				{:else if post.data.is_self}
					{#if post.data.selftext_html}
						<div class="w-full">
							{@html post.data.selftext_html}
						</div>
					{/if}
				{:else if post.data.url.includes('https://www.reddit.com/gallery/')}
					<Slideshow media_metadata={post.data.media_metadata} max_height={(max_height / 3) * 2} {show}/>
				{:else if post.data.domain}
					<div class="rounded-md h-12 bg-gray-100 flex w-full">
						{#if post.data.thumbnail === 'default'}
							<div
								class="h-full w-16 rounded-l-md object-cover bg-blue-500 flex place-items-center place-content-center"
							>
								<p class="text-white text-2xl">{post.data.domain.charAt(0)}</p>
							</div>
						{:else}
							<img
								src={post.data.thumbnail}
								class="h-full w-16 rounded-l-md object-cover"
								alt="thumbnail"
							/>
						{/if}
						<div class="self-center px-2">
							<a
								class="text-sm text-blue-500 hover:underline cursor-pointer ellipsis"
								href={post.data.url}
							>
								{post.data.domain}
							</a>
						</div>
					</div>
				{/if}
			</div>
			<div class="flex gap-4 pt-2">
				<Horizontal {post} />
				<p class="text-xs">{post.data.num_comments} comments</p>
			</div>
		</div>
	</div>
</div>
