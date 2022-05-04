<script lang="ts">
	export let size: number;
	export let color = 'text-black';
</script>

<svg
	style:width="{size / 4}rem"
	style:height="{size / 4}rem"
	viewBox="0 0 24 24"
	class="{color} fill-current"
>
	<path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
	<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
</svg>
