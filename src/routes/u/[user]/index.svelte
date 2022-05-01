<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ params }) => {
		return {
			redirect: `/u/${params.user}/posts`,
			status: 302
		};
	};
</script>
