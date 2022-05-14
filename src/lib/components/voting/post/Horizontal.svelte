<script lang="ts">
	import Up_Arrow from '$lib/components/icons/Up_Arrow.svelte';
	import Down_Arrow from '$lib/components/icons/Down_Arrow.svelte';
	import type { Post } from '$lib/types/reddit/index';
	import { formatNumber } from '$lib/utils/format';

	export let post: Post;
</script>

<div class="flex place-items-center">
	<Up_Arrow size={5} />
	<p class="w-9 text-center text-xs font-medium">{formatNumber(post.data.score)}</p>
	<Down_Arrow size={5} />
</div>
