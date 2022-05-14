<script lang="ts">
	import Up_Arrow from '$lib/components/icons/Up_Arrow.svelte';
	import Down_Arrow from '$lib/components/icons/Down_Arrow.svelte';
	import type { Comment, Post } from '$lib/types/reddit/index';
	import { formatNumber } from '$lib/utils/format';

	export let comment: Comment;
</script>

<div class="flex place-items-center">
	<Up_Arrow size={5} />
	<p class="w-9 text-center text-xs font-medium">{formatNumber(comment.data.score)}</p>
	<Down_Arrow size={5} />
</div>
