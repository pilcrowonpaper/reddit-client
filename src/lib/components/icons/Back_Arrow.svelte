<script lang="ts">
	export let size: number;
	export let custom_class = '';
	let bg_color = 'text-black';
</script>

<div style:width="{size / 4}rem" style:height="{size / 4}rem" on:click>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		class="{bg_color} h-full w-full fill-current {custom_class}"
		fill="#000000"
		><path d="M0 0h24v24H0V0z" fill="none" /><path
			d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
		/></svg
	>
</div>
