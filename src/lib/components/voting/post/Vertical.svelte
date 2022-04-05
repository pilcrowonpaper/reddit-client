<script lang="ts">
	import type { Post } from '$lib/types/reddit';

	import Up_Arrow from '$lib/components/icons/Up_Arrow.svelte';
	import Down_Arrow from '$lib/components/icons/Down_Arrow.svelte';

	import { formatNumber } from '$lib/utils/format';

	export let post: Post;
</script>

<div class="flex h-full w-12 shrink-0 flex-col place-items-center py-2">
	<Up_Arrow size={7} />
	<p class="my-1 font-medium">{formatNumber(post.data.score)}</p>
	<Down_Arrow size={7} />
</div>
