<script lang="ts">
	import '../app.postcss';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<slot />

<style lang="postcss">
	:global(body) {
		font-family: 'Poppins', sans-serif;
	}
	:global(.md) {
		@apply text-sm;
	}
	:global(.md p, h1, h2) {
		@apply mb-2;
	}
	:global(p:last-child, h1:last-child, h2:last-child) {
		@apply mb-0;
	}
	:global(.md h1, h2) {
		@apply text-base font-medium;
	}
	:global(.md strong) {
		@apply font-semibold;
	}
	:global(.md a) {
		@apply break-all text-blue-500 hover:underline;
	}
	:global(.md p:empty) {
		@apply hidden;
	}
	:global(.md ol) {
		@apply mb-2 list-inside list-decimal;
	}
	:global(.md ul) {
		@apply mb-2 list-inside list-disc;
	}
	:global(.md :not(pre) code) {
		@apply break-all rounded bg-gray-200 px-1;
	}
	:global(.md pre) {
		@apply mb-2 overflow-x-auto rounded-lg bg-gray-200 px-2 pb-3 pt-2;
	}
	:global(.md hr) {
		@apply hidden;
	}
	:global(.md blockquote) {
		@apply mb-2 ml-1 border-l-4 border-gray-200 py-0.5 pl-2;
	}
	:global(.md img) {
		@apply rounded-md;
	}
</style>
