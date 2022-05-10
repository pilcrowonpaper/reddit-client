<script lang="ts">
	//based on: https://svelte.dev/repl/ba55ae2896744aa8a467f3a6783ac141?version=3.35.0
	export let value = false;
    export let id : string

	function handleClick() {
		value = value ? false : true;
	}
</script>

<div class="toggle">
	<button
		role="switch"
		aria-checked={value}
		on:click={handleClick}
		class:bg-gray-200={!value}
		class:bg-blue-500={value}
        value="id"
	/>
</div>

<style>
	.toggle {
		display: flex;
		align-items: center;
	}

	.toggle button {
		width: 2.4em;
		height: 1.6em;
		position: relative;
		border: none;
	}

	.toggle button::before {
		content: '';
		position: absolute;
		width: 1.3em;
		height: 1.3em;
		background: #fff;
		top: 0.13em;
		right: 0.9em;
		transition: transform 0.2s;
	}

	.toggle button[aria-checked='true']::before {
		transform: translateX(0.7em);
		transition: transform 0.2s;
	}

	.toggle button {
		border-radius: 1.2em;
	}

	.toggle button::before {
		border-radius: 100%;
	}
</style>
