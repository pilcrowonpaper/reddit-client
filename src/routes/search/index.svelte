<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ url }) => {
		return {
			redirect: `/search/posts${url.search}`,
			status: 302
		};
	};
</script>
