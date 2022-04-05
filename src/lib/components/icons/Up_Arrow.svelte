<script lang="ts">
	export let size: number;
	let bg_color = 'text-gray-200';
</script>

<div style:width="{size / 4}rem" style:height="{size / 8}rem">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 2 26 24"
		class="{bg_color} h-full w-full fill-current"
		fill="#000000"
	>
		<path d="M0 0h24v24H0V0z" fill="none" />
		<path d="M10 17l5-5-5-5v10z" />
	</svg>
</div>

<style>
	path {
		transform: rotate(270deg) scale(4.75);
		transform-origin: 50% 50%;
	}
</style>
